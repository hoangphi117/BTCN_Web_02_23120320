import React from "react";

import FeaturedMovie from "@/components/common/FeaturedMovie";

function MainContent({ featuredList }) {
  return (
    <div className="space-y-8 py-4">
      <FeaturedMovie movies={featuredList} />
    </div>
  );
}

export default MainContent;
