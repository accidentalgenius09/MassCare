import PageBanner from "@/components/sections/Common/PageBanner";
import NewsAndInsightsSection from "@/components/sections/News-&-InsightsSection/page";
import React from "react";

function page() {
  return (
    <>
      <PageBanner   
        title="News & Insights"
        breadcrumb="Home / News"
        description="Lorem Ipsum 8 years of meaningful care... care without compromise."
      />
      <NewsAndInsightsSection />
    </>
  );
}

export default page;
