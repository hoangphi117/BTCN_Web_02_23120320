import React, { useState, useEffect } from "react";

function FeaturedMovie({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const movie = movies[currentIndex];

  const changeMovie = (direction) => {
    if (isFading) return;

    setIsFading(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        if (direction === "next") {
          return prevIndex === movies.length - 1 ? 0 : prevIndex + 1;
        } else {
          return prevIndex === 0 ? movies.length - 1 : prevIndex - 1;
        }
      });
      setIsFading(false);
    }, 300);
  };

  if (!movie) return null;

  return (
    <section className="relative w-full max-w-4xl mx-auto my-8 px-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => changeMovie("prev")}
          className="p-2 rounded-full bg-gray-200/50 dark:bg-slate-700/50 z-20"
        >
          <span className="text-2xl text-gray-800 dark:text-white">&lt;</span>
        </button>

        <div
          className={`flex flex-col items-center transition-opacity duration-300 ease-in-out ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative w-64 md:w-72 aspect-[2/3] rounded-lg shadow-2xl overflow-hidden mb-6 border-4 border-white dark:border-slate-700">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center space-y-2 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--foreground-rgb))] drop-shadow-sm">
              {movie.title}
            </h2>
          </div>

          <div className="flex items-center justify-center gap-1 my-2">
            <p className="ml-2 text-gray-600 dark:text-gray-400 font-medium text-lg">
              Rate: <span className="text-yellow-500">{movie.rate}</span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {movie.genres &&
              movie.genres.map((genre, idx) => (
                <span
                  key={idx}
                  className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                >
                  {genre}
                </span>
              ))}
          </div>
        </div>

        <button
          onClick={() => changeMovie("next")}
          className="p-2 rounded-full bg-gray-200/50 dark:bg-slate-700/50 z-20"
        >
          <span className="text-2xl text-gray-800 dark:text-white">&gt;</span>
        </button>
      </div>
      <div className="flex justify-center mt-6 gap-2">
        {movies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx !== currentIndex) {
                setIsFading(true);
                setTimeout(() => {
                  setCurrentIndex(idx);
                  setIsFading(false);
                }, 300);
              }
            }}
            className={`h-2 rounded-full ${
              idx === currentIndex
                ? "w-2 bg-blue-600 dark:bg-blue-400"
                : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedMovie;
