import React, { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth";

const API_ROOT = "/api";
const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const AddToFavoritesButton = ({ movie }) => {
  const { user, favorites, refreshFavorites, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite =
    Array.isArray(favorites) &&
    movie?.id &&
    favorites.some((fav) => fav && String(fav.id) === String(movie.id));

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Vui lòng đăng nhập để sử dụng tính năng này!");
      return;
    }

    if (!movie?.id) return;

    setIsLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const method = isFavorite ? "DELETE" : "POST";
      const url = `${API_ROOT}/users/favorites/${movie.id}`;

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-app-token": APP_TOKEN,
        },
      });

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok) {
        throw new Error("Không thể cập nhật danh sách yêu thích");
      }

      await refreshFavorites();
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-200 group/btn"
      title={isFavorite ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 text-white animate-spin" />
      ) : (
        <Heart
          className={`w-5 h-5 transition-colors duration-200 ${
            isFavorite
              ? "fill-red-500 text-red-500"
              : "text-white group-hover/btn:text-red-400"
          }`}
        />
      )}
    </button>
  );
};

export default AddToFavoritesButton;
