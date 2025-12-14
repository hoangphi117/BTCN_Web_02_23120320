import React from "react";

import FeaturedMovie from "@/components/common/FeaturedMovie";
import MovieRow from "./MovieRow";

function MainContent({ featuredList, popular, topRated }) {
  return (
    <div className="space-y-8 py-4">
      <FeaturedMovie movies={featuredList} />
      <MovieRow
        title="Most Popular"
        Movies={popular}
        endpoint="/movies/most-popular"
      />
    </div>
  );
}

export default MainContent;
