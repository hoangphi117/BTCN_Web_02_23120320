import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "@/components/common/movie/MovieCard";
import { Loader2, SearchX } from "lucide-react";

import PaginationControls from "@/components/common/Pagination";

import { API_ROOT, PUBLIC_HEADERS } from "@/config/api";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (query) {
      if (currentPage === 1) {
        fetchSearchResults(currentPage, query);
      } else {
        setCurrentPage(1);
      }
    }
  }, [query]);

  useEffect(() => {
    if (query && currentPage > 0) {
      fetchSearchResults(currentPage, query);
    }
  }, [currentPage]);

  const fetchSearchResults = async (page, currentQuery) => {
    if (!currentQuery) return;

    setLoading(true);
    setSearched(true);
    try {
      const limit = 20;
      const response = await fetch(
        `${API_ROOT}/movies/search?title=${encodeURIComponent(
          currentQuery
        )}&page=${page}&limit=${limit}`,
        { headers: PUBLIC_HEADERS }
      );

      if (!response.ok) throw new Error("Search failed");

      const result = await response.json();

      setMovies(result.data || []);

      setTotalPages(result.pagination?.total_pages || 1);
      setCurrentPage(result.pagination?.current_page || 1);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen pt-4 pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground-rgb))]">
          Search results for: <span className="text-blue-500">"{query}"</span>
        </h1>
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

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading}
      />

      {!loading && searched && movies.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <SearchX size={64} className="mb-4 opacity-50" />
          <p className="text-lg">No matching movies were found.</p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
