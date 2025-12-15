import React from "react";

import FeaturedMovie from "@/components/common/movie/TopRevenue";
import MovieRow from "./movie/MovieRow";

function MainContent({ featuredList, popular, topRated }) {
  return (
    <div className="space-y-8 py-4">
      <FeaturedMovie movies={featuredList} />
      <MovieRow
        title="Most Popular"
        Movies={popular}
        endpoint="/movies/most-popular"
      />

      <MovieRow
        title="Top Rated"
        Movies={topRated}
        endpoint="/movies/top-rated"
      />
    </div>
  );
}

export default MainContent;
