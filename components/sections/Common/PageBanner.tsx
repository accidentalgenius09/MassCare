import TTSWrapper from "@/hooks/TTSWrapper";
import React from "react";

interface PageBannerProps {
  title: string;
  breadcrumb: string;
  description: string;
  image?: string;
}

function PageBanner({
  title,
  breadcrumb,
  description,
  image,
}: PageBannerProps) {
  return (
    <div
      className={`h-[40vh] sm:h-[45vh] md:h-[50vh] bg-cover bg-center flex items-center justify-center pt-16`}
      style={{
        backgroundImage: `url(${image ?? "/common/dna-banner.png"})`,
      }}
    >
      <div className="container mx-auto h-full px-4">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div
            className="rounded-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-center text-white font-extralight text-xs sm:text-sm md:text-[13px]"
            style={{ border: "1.535px solid rgba(255, 255, 255, 0.50)" }}
          >
            <TTSWrapper text={breadcrumb}>{breadcrumb}</TTSWrapper>
          </div>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mt-3 sm:mt-4">
            <TTSWrapper text={title}>{title}</TTSWrapper>
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg font-normal mt-3 sm:mt-4 max-w-2xl px-4">
            <TTSWrapper text={description}>{description}</TTSWrapper>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageBanner;
