import React from "react";
import { Award, Cake, Ruler, Film, BookOpen } from "lucide-react";

import PersonMovieCard from "@/components/common/PersonMovieCard";

import { formatDate } from "@/lib/utils";

function PersonDetail() {
  const foregroundColor = "text-[rgb(var(--foreground-rgb))]";

  const isDead = false;

  const birthDate = formatDate(person.birth_date);
  const deathDate = person.death_date ? formatDate(person.birth_date) : null;

  if (deathDate) {
    console.log(deathDate);
    isDead = true;
  }

  return (
    <div className="animate-fade-in pb-10 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="md:col-span-1 lg:col-span-1 space-y-6">
          <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-auto object-cover"
            />
          </div>

          <h2 className={`text-2xl font-bold ${foregroundColor}`}>
            {person.name}
          </h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Role: {person.role}
          </p>

          <div className={`p-4 rounded-xl dark:bg-slate-800 text-sm`}>
            <h3 className="font-bold text-white mb-3 border-b pb-2 border-gray-200 dark:border-gray-700">
              Personal Info
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cake size={18} className="text-pink-500" />
                <span className="text-white">Born: {birthDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler size={18} className="text-teal-500" />
                <span className="text-white">Height: {person.height}</span>
              </div>
              {isDead && (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <span>🪦 Died: {deathDate}</span>
                </div>
              )}
              {person.awards && (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                    <Award size={18} />
                    <span className="font-bold">Awards</span>
                  </div>
                  <p className="text-xs pl-6 mt-1">{person.awards}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-3 lg:col-span-4 space-y-10">
          <section>
            <h3
              className={`text-2xl font-bold mb-4 ${foregroundColor} flex items-center gap-2`}
            >
              <BookOpen size={24} className="text-blue-500" /> Biography
            </h3>
            <p
              className={`${foregroundColor} opacity-85 leading-relaxed whitespace-pre-wrap`}
            >
              {person.summary}
            </p>
          </section>

          <section>
            <h3
              className={`text-2xl font-bold mb-4 ${foregroundColor} flex items-center gap-2`}
            >
              <Film size={24} className="text-red-500" /> Known For
            </h3>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
              {person.known_for &&
                person.known_for.map((movie) => (
                  <PersonMovieCard
                    key={`${movie.id}-${movie.role}`}
                    movie={movie}
                    role={movie.role}
                    character={movie.character}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PersonDetail;
