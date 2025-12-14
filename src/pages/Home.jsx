import { useLoaderData } from "react-router-dom";
import MainContent from "@/components/common/MainContent";

const API_ROOT = "/api";
const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";
const PAGE_SIZE = 15;

const PUBLIC_HEADERS = {
  "x-app-token": APP_TOKEN,
  "Content-Type": "application/json",
};

async function fetchAndExtractData(path, page = 1) {
  const url = `${API_ROOT}${path}?page=${page}&page_size=${PAGE_SIZE}`;

  const response = await fetch(url, {
    method: "GET",
    headers: PUBLIC_HEADERS,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}. Status: ${response.status}`);
  }

  const result = await response.json();
  return result.data || [];
}

const parseRevenue = (value) => {
  if (!value) return 0;
  return Number(value.replace(/[^0-9.-]+/g, "")) || 0;
};

export async function homeLoader() {
  try {
    const TOTAL_PAGES_TO_FETCH = 25;

    const pageNumbers = Array.from(
      { length: TOTAL_PAGES_TO_FETCH },
      (_, i) => i + 1
    );

    const popularPromises = pageNumbers.map((page) =>
      fetchAndExtractData("/movies/most-popular", page)
    );

    const [allPopularPages, topRatedData] = await Promise.all([
      Promise.all(popularPromises),
      fetchAndExtractData("/movies/top-rated", 1),
    ]);

    const allPopularMovies = allPopularPages.flat();

    const sortedByRevenue = [...allPopularMovies].sort((a, b) => {
      const revA = parseRevenue(a.box_office_revenue);
      const revB = parseRevenue(b.box_office_revenue);
      return revB - revA;
    });

    const featuredList = sortedByRevenue.slice(0, 5);

    const popularRowData = allPopularPages[0] || [];

    return {
      featuredList: featuredList,
      popular: popularRowData,
      topRated: topRatedData,
    };
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu Home:", error);
    return { featuredList: [], popular: [], topRated: [] };
  }
}

function Home() {
  const data = useLoaderData();

  return (
    <MainContent featuredList={data.featuredList} popular={data.popular} />
  );
}

export default Home;
