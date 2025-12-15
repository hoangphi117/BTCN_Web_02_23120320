import React, { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth";

import { API_ROOT, APP_TOKEN } from "@/config/api";

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
      alert("Please login to use this feature!");
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
        throw new Error("Cannot update favorites list");
      }

      await refreshFavorites();
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Error occurred, please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all duration-200 group/btn"
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
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
