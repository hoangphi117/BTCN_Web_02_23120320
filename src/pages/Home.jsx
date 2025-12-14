import { useLoaderData } from "react-router-dom";
import FeaturedMovie from "@/components/common/FeaturedMovie";

const API_BASE_URL = "https://34.124.214.214:2423";
const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const API_ROOT = `${API_BASE_URL}/api`;
const PAGE_SIZE = 15;

const PUBLIC_HEADERS = {
  "x-app-token": APP_TOKEN,
  "Content-Type": "application/json",
};

async function fetchData(path, page = 1) {
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

export async function homeLoader() {
  try {
    const [popularData, topRatedData] = await Promise.all([
      fetchData("/movies/most-popular"),
      fetchData("/movies/top-rated"),
    ]);

    const featured = popularData.length > 0 ? popularData[0] : null;

    return {
      featured: featured,
      popular: popularData,
      topRated: topRatedData,
    };
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu Home:", error);
    return { featured: null, popular: [], topRated: [] };
  }
}

function Home() {
  const { featured } = useLoaderData();

  return (
    <div className="space-y-8 py-4">
      {featured && <FeaturedMovie movie={featured} />}
    </div>
  );
}

export default Home;
