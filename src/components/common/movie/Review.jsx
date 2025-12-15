import React, { useEffect, useState } from "react";
import { Star, MessageSquare, Filter } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { API_ROOT, PUBLIC_HEADERS } from "@/config/api";

import PaginationControls from "../Pagination";

function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");

  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);

  const fetchReviews = async (page, sort) => {
    if (!movieId) return;

    setReviewLoading(true);
    try {
      const limit = 10;
      const url = `${API_ROOT}/movies/${movieId}/reviews?page=${page}&limit=${limit}&sort=${sort}`;

      const response = await fetch(url, { headers: PUBLIC_HEADERS });
      const result = await response.json();

      const newReviews = result.data || [];
      const pagination = result.pagination || {};

      setReviews(newReviews);

      setTotalReviews(pagination.total_items || 0);
      setTotalPages(pagination.total_pages || 1);
      setReviewPage(pagination.current_page || page);
    } catch (error) {
      console.error("Lỗi tải reviews:", error);
      setReviews([]);
    } finally {
      setReviewLoading(false);
    }
  };

  useEffect(() => {
    setReviewPage(1);
    fetchReviews(1, sortBy);
  }, [movieId, sortBy]);

  useEffect(() => {
    if (reviewPage > 0 && reviewPage !== 1) {
      fetchReviews(reviewPage, sortBy);
    }
  }, [reviewPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setReviewPage(newPage);
    }
  };

  const foregroundColor = "text-[rgb(var(--foreground-rgb))]";

  return (
    <section id="reviews" className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3
          className={`text-2xl font-bold ${foregroundColor} flex items-center gap-2`}
        >
          <MessageSquare className="text-blue-500" /> Reviews
          <span className="text-base font-normal opacity-60">
            ({totalReviews})
          </span>
        </h3>

        <div className="relative group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`appearance-none pl-4 pr-10 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm font-medium ${foregroundColor} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
          <Filter
            size={14}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${foregroundColor} opacity-50 pointer-events-none`}
          />
        </div>
      </div>

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="p-5 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 transition-colors hover:border-blue-200 dark:hover:border-blue-800"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md uppercase">
                    {review.username ? review.username.charAt(0) : "U"}
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${foregroundColor}`}>
                      {review.username || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(review.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <Star
                    size={14}
                    className="text-yellow-600 dark:text-yellow-500"
                    fill="currentColor"
                  />
                  <span className="font-bold text-yellow-700 dark:text-yellow-500 text-sm">
                    {review.rate}/10
                  </span>
                </div>
              </div>

              <h4 className={`font-bold text-base mb-2 ${foregroundColor}`}>
                {review.title}
              </h4>

              <div className="relative group/spoiler">
                {review.warning_spoilers && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50 dark:bg-black/50 backdrop-blur-md rounded-lg z-10 group-hover/spoiler:opacity-0 transition-opacity duration-300 cursor-pointer">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-lg">
                      ⚠️ Spoiler Alert (Hover to view)
                    </span>
                  </div>
                )}

                <p
                  className={`text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line ${
                    review.warning_spoilers
                      ? "blur-sm group-hover/spoiler:blur-none transition-all duration-300"
                      : ""
                  }`}
                >
                  {review.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl">
            No reviews yet
          </div>
        )}
      </div>

      <div className="mt-8">
        <PaginationControls
          currentPage={reviewPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={reviewLoading}
        />
      </div>
    </section>
  );
}

export default MovieReviews;
