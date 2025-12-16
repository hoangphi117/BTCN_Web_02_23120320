import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bug } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--background-rgb))] px-4">
      <div className="w-full max-w-md flex flex-col items-center text-center gap-6">
        <div className="relative flex flex-col items-center">
          <span className="text-[9rem] font-extrabold text-[rgb(var(--foreground-rgb))] opacity-80 leading-none">
            404
          </span>
          <Bug
            size={40}
            className="absolute top-3 -right-1 rotate-[10deg] text-red-500 animate-bounce"
          />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[rgb(var(--foreground-rgb))]">
          Page Not Found
        </h1>

        <p className="text-base text-gray-600 dark:text-gray-400">
          Oops! The page you are looking for does not exist. It may have been
          moved or deleted.
        </p>

        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
