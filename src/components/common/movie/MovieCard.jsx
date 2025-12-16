import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Calendar, Clock } from "lucide-react";
import FavoritesButton from "@/components/common/movie/FavoriteButton";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const foregroundColor = "text-[rgb(var(--foreground-rgb))]";

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="w-[160px] md:w-[180px] flex-shrink-0 cursor-pointer flex flex-col gap-2 group px-2 relative"
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 shadow-sm transition-opacity hover:opacity-90">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FavoritesButton movie={movie} />
        </div>

        {movie.rank && (
          <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            #{movie.rank}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3
          className={`text-sm font-bold truncate ${foregroundColor} group-hover:text-blue-500 transition-colors`}
        >
          {movie.title}
        </h3>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{movie.year}</span>
          </div>

          {movie.rate && (
            <div className="flex items-center gap-1 text-yellow-500 font-medium">
              <Star size={12} fill="currentColor" />
              <span>{movie.rate}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400 truncate">
          {movie.runtime ? (
            <>
              <Clock size={12} />
              <span>{movie.runtime}</span>
            </>
          ) : (
            <span>{movie.genres?.[0]}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
