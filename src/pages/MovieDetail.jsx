import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Star,
  Calendar,
  Clock,
  Globe,
  DollarSign,
  Award,
  User,
} from "lucide-react";

import MovieCard from "@/components/common/MovieCard";
import MovieReviews from "@/components/common/Review";

const API_ROOT = "/api";
const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const PUBLIC_HEADERS = {
  "x-app-token": APP_TOKEN,
  "Content-Type": "application/json",
};

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`${API_ROOT}/movies/${id}`, {
          headers: PUBLIC_HEADERS,
        });

        if (!response.ok) throw new Error("Failed to fetch movie detail");
        const result = await response.json();

        setMovie(result.data || result);
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieDetail();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Đang tải...
      </div>
    );
  if (!movie)
    return (
      <div className="h-screen flex items-center justify-center">
        Không tìm thấy phim
      </div>
    );

  const foregroundColor = "text-[rgb(var(--foreground-rgb))]";

  return (
    <div className="animate-fade-in pb-20">
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <div className="absolute inset-0">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover blur-md opacity-60 dark:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--background-rgb))] via-[rgb(var(--background-rgb))]/40 to-black/60"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full px-4 md:px-10 pb-10 flex flex-col md:flex-row gap-8 items-end">
          <div className="hidden md:block w-52 lg:w-64 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 flex-shrink-0 transition-transform hover:scale-105">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex-1 space-y-4">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold ${foregroundColor} drop-shadow-lg leading-tight`}
            >
              {movie.full_title || movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-medium opacity-90">
              <span className="bg-yellow-500 text-black px-2 py-1 rounded font-bold flex items-center gap-1">
                <Star size={16} fill="currentColor" />
                {movie.ratings?.imDb || "N/A"}
              </span>

              <span className={`flex items-center gap-1 ${foregroundColor}`}>
                <Calendar size={18} /> {movie.year}
              </span>

              <span className={`flex items-center gap-1 ${foregroundColor}`}>
                <Clock size={18} /> {movie.runtime || "N/A"}
              </span>

              {movie.countries && (
                <span className={`flex items-center gap-1 ${foregroundColor}`}>
                  <Globe size={18} /> {movie.countries.join(", ")}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres &&
                movie.genres.map((genre, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 text-xs font-semibold rounded-full bg-white/10 backdrop-blur-md border border-white/20 ${foregroundColor}`}
                  >
                    {genre}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h3
              className={`text-2xl font-bold mb-4 ${foregroundColor} flex items-center gap-2`}
            >
              Storyline
            </h3>
            <div
              className={`${foregroundColor} opacity-80 leading-relaxed text-lg space-y-4`}
              dangerouslySetInnerHTML={{
                __html: movie.plot_full || movie.short_description,
              }}
            />
          </section>

          <section>
            <h3 className={`text-2xl font-bold mb-4 ${foregroundColor}`}>
              Top Cast
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
              {movie.actors &&
                movie.actors.map((actor) => (
                  <div
                    onClick={() => {
                      navigate(`/persons/${actor.id}`);
                    }}
                    key={actor.id}
                    className="min-w-[120px] w-[120px] flex flex-col items-center text-center space-y-2"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
                      <img
                        src={
                          actor.image ||
                          "https://via.placeholder.com/150?text=No+Img"
                        }
                        alt={actor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p
                        className={`font-bold text-sm ${foregroundColor} line-clamp-1`}
                      >
                        {actor.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {actor.character}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          <MovieReviews movieId={movie.id} />

          {movie.similar_movies && (
            <section className="mt-8">
              <h3 className={`text-2xl font-bold mb-4 ${foregroundColor}`}>
                Similar Movies
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {movie.similar_movies.map((similarMovie) => (
                  <MovieCard key={similarMovie.id} movie={similarMovie} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <div
            className={`p-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white`}
          >
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <DollarSign size={20} className="text-green-500" /> Box Office
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="opacity-70">Budget</span>
                <span className="font-medium">
                  {movie.box_office?.budget || "N/A"}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
                <span className="opacity-70">Worldwide Gross</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {movie.box_office?.cumulativeWorldwideGross || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {movie.awards && (
            <div
              className={`p-6 rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 ${foregroundColor}`}
            >
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
                <Award size={20} /> Awards
              </h3>
              <p className="text-sm opacity-90">{movie.awards}</p>
            </div>
          )}

          <div
            className={`p-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-white`}
          >
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <User size={20} /> Directors
            </h3>
            <div className="space-y-2">
              {movie.directors &&
                movie.directors.map((dir) => (
                  <div
                    onClick={() => {
                      navigate(`/persons/${dir.id}`);
                    }}
                    key={dir.id}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                      {dir.image ? (
                        <img
                          src={dir.image}
                          alt={dir.name}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <span className="font-medium">{dir.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
