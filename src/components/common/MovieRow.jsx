import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const API_ROOT = "/api";
const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const PAGE_SIZE = 12;
const ITEMS_PER_VIEW = 3;

const PUBLIC_HEADERS = {
  "x-app-token": APP_TOKEN,
  "Content-Type": "application/json",
};

function MovieCard({ movie }) {
  const foregroundColor = "text-[rgb(var(--foreground-rgb))]";

  return (
    <div className="basis-1/3 flex-shrink-0 px-2 cursor-pointer relative">
      <div className="relative w-full aspect-square">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full rounded-lg shadow-md transition-all duration-300 ease-out"
        />
      </div>

      <p
        className={`mt-4 mb-2 text-sm font-medium truncate ${foregroundColor} text-center`}
      >
        {movie.title}
      </p>
    </div>
  );
}

function MovieRow({ title, Movies = [], endpoint }) {
  const [apiPage, setApiPage] = useState(1);
  const [movies, setMovies] = useState(Movies);
  const [loading, setLoading] = useState(false);
  const [viewIndex, setViewIndex] = useState(0);

  const maxViewIndex = Math.ceil(movies.length / ITEMS_PER_VIEW) - 1;

  useEffect(() => {
    setMovies(Movies);
  }, [Movies]);

  const fetchMovies = async (startPage) => {
    setLoading(true);
    try {
      const promise1 = fetch(
        `${API_ROOT}${endpoint}?page=${startPage}&limit=${PAGE_SIZE}`,
        { headers: PUBLIC_HEADERS }
      );
      const promise2 = fetch(
        `${API_ROOT}${endpoint}?page=${startPage + 1}&limit=${PAGE_SIZE}`,
        { headers: PUBLIC_HEADERS }
      );

      const [res1, res2] = await Promise.all([promise1, promise2]);

      let combinedMovies = [];

      if (res1.ok) {
        const data1 = await res1.json();
        combinedMovies = [...combinedMovies, ...(data1.data || [])];
      }

      if (res2.ok) {
        const data2 = await res2.json();
        combinedMovies = [...combinedMovies, ...(data2.data || [])];
      }

      if (combinedMovies.length > 0) {
        setMovies(combinedMovies);
        setApiPage(startPage);
        setViewIndex(0); // reset slider
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint) {
      fetchMovies(apiPage);
    }
  }, [endpoint]);

  // NEXT
  const handleNext = () => {
    if (viewIndex < maxViewIndex) {
      setViewIndex((prev) => prev + 1);
    } else {
      setViewIndex(0);
    }
  };

  // PREV
  const handlePrev = () => {
    if (viewIndex > 0) {
      setViewIndex((prev) => prev - 1);
    } else {
      setViewIndex(maxViewIndex);
    }
  };

  const foregroundColor = "text-[rgb(var(--foreground-rgb))]";

  return (
    <section className="relative group my-8">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>

      <div className="relative w-full overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
            <Loader2 className={`w-8 h-8 animate-spin ${foregroundColor}`} />
          </div>
        )}

        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${viewIndex * 100}%)`,
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}

          {movies.length === 0 && !loading && (
            <div className="w-full text-center py-10 text-gray-500">
              Không có phim
            </div>
          )}
        </div>

        {/* PREV */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-gradient-to-r from-black/50 to-transparent"
        >
          <ChevronLeft className="w-10 h-10 text-white drop-shadow-lg active:scale-90 transition-transform" />
        </button>

        {/* NEXT */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-gradient-to-l from-black/50 to-transparent"
        >
          <ChevronRight className="w-10 h-10 text-white drop-shadow-lg active:scale-90 transition-transform" />
        </button>
      </div>
    </section>
  );
}

export default MovieRow;
