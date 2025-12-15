import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "@/components/common/MovieCard";
import { Loader2, SearchX } from "lucide-react";

const API_ROOT = "/api";
const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const PUBLIC_HEADERS = {
  "x-app-token": APP_TOKEN,
  "Content-Type": "application/json",
};

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      setLoading(true);
      setSearched(true);
      try {
        const response = await fetch(
          `${API_ROOT}/movies/search?q=${encodeURIComponent(
            query
          )}&page=1&limit=20`,
          { headers: PUBLIC_HEADERS }
        );

        if (!response.ok) throw new Error("Search failed");

        const result = await response.json();
        setMovies(result.data || []);
      } catch (error) {
        console.error("Lỗi tìm kiếm:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen pt-4 pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground-rgb))]">
          Kết quả tìm kiếm cho: <span className="text-blue-500">"{query}"</span>
        </h1>
        {!loading && searched && (
          <p className="text-sm text-gray-500 mt-1">
            Tìm thấy {movies.length} kết quả
          </p>
        )}
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
      )}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}

      {!loading && searched && movies.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <SearchX size={64} className="mb-4 opacity-50" />
          <p className="text-lg">Không tìm thấy phim nào phù hợp.</p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
