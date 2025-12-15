import React from "react";
import MovieCard from "@/components/common/movie/MovieCard";

function PersonMovieCard({ movie, role, character }) {
  const movieCardProps = {
    movie: movie,
  };

  const foregroundColor = "text-[rgb(var(--foreground-rgb))]";

  return (
    <div className="w-[160px] md:w-[180px] flex-shrink-0">
      <MovieCard {...movieCardProps} />

      <div className="mt-1 px-2 text-center">
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 truncate">
          {role}
        </p>

        {character && (
          <p className={`text-xs ${foregroundColor} italic truncate1`}>
            as {character}
          </p>
        )}
      </div>
    </div>
  );
}

export default PersonMovieCard;
