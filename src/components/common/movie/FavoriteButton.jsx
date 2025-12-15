import React, { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";

const API_ROOT = "/api";
const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const FavoriteButton = ({
  movieId,
  initialIsFavorite = false,
  className = "",
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      if (
        confirm(
          "You need to log in to add movies to your favorites. Go to the login page now?"
        )
      ) {
        navigate("/login");
      }
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      const method = isFavorite ? "DELETE" : "POST";

      const response = await fetch(`${API_ROOT}/users/favorites/${movieId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "x-app-token": APP_TOKEN,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Operation failed");
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`group flex items-center justify-center p-2 rounded-full transition-all duration-200 cursor-pointer 
        ${
          isFavorite
            ? "bg-pink-100 dark:bg-pink-900/30 text-red-500"
            : "bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
        } 
        ${className}`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isLoading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <Heart
          size={20}
          className={`transition-transform duration-200 group-hover:scale-110 ${
            isFavorite ? "fill-current" : ""
          }`}
        />
      )}
    </button>
  );
};

export default FavoriteButton;
