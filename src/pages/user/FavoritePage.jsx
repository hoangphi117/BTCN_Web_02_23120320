import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, HeartOff, Film } from "lucide-react";

import MovieCard from "@/components/common/movie/MovieCard";
import { useAuth } from "@/context/auth";

const API_ROOT = "/api";
const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

function FavoritePage() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const response = await fetch(`${API_ROOT}/users/favorites`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-app-token": APP_TOKEN,
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Không thể tải danh sách yêu thích");
        }

        const result = await response.json();
        setMovies(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Lỗi tải favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const foregroundColor = "text-[rgb(var(--foreground-rgb))]";

  return (
    <div className="container max-w-[1200px] mx-auto py-10 px-4 min-h-screen animate-fade-in">
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
        <h1
          className={`text-3xl font-bold flex items-center gap-3 ${foregroundColor}`}
        >
          <Film className="text-pink-500" />
          My favorite movies
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-gray-100 dark:bg-slate-800 p-6 rounded-full mb-4">
            <HeartOff size={48} className="text-gray-400" />
          </div>
          <h3 className={`text-xl font-bold mb-2 ${foregroundColor}`}>
            No favorite movies yet
          </h3>
          <Link
            to="/"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors"
          >
            Discover now
          </Link>
        </div>
      )}
    </div>
  );
}

export default FavoritePage;
