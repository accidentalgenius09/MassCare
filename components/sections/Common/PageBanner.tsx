import TTSWrapper from "@/hooks/TTSWrapper";
import React from "react";

interface PageBannerProps {
  title: string;
  breadcrumb: string;
  description: string;
}

function PageBanner({ title, breadcrumb, description }: PageBannerProps) {
  return (
    <div className="h-[50vh] bg-[url('/common/dna-banner.png')] bg-cover bg-center flex items-center justify-center">
      <div className="container mx-auto h-full">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="border border-white rounded-full px-4 py-2 text-white text-sm">
            <TTSWrapper text={breadcrumb}>{breadcrumb}</TTSWrapper>
          </div>
          <h1 className="text-white text-5xl font-semibold mt-4">
            <TTSWrapper text={title}>{title}</TTSWrapper>
          </h1>
          <p className="text-white text-lg font-normal mt-4 max-w-2xl">
            <TTSWrapper text={description}>{description}</TTSWrapper>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageBanner;
