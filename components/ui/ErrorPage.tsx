"use client";
import React from "react";
import { TopRightArrowWhite } from "../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  code?: number;
  title?: string;
  description?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  code = 404,
  title = "Page Not Found",
  description = "The page you're looking for doesn't exist or has been moved. Please check the URL or go back to the homepage.",
}) => {
  const router = useRouter();
  return (
    <div className="min-h-[90vh] bg-[#012B71] w-full flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full text-center">
        {/* 404 Background with Illustration */}
        <div className="relative mb-8">
          {/* Large 404 Text - Outlined Style */}
          <div
            className="text-[200px] sm:text-[250px] md:text-[300px] font-bold leading-none select-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(153, 153, 153, 0.00) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {code}
          </div>

          {/* Medical Illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* SVG for nurse illustration */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="60" r="60" fill="rgba(255, 255, 255, 0.1)" />
              <path
                d="M60 20C45.5 20 34 31.5 34 46V54C34 68.5 45.5 80 60 80C74.5 80 86 68.5 86 54V46C86 31.5 74.5 20 60 20Z"
                fill="rgba(255, 255, 255, 0.2)"
              />
              <path
                d="M50 40H70C72.2 40 74 41.8 74 44V66C74 68.2 72.2 70 70 70H50C47.8 70 46 68.2 46 66V44C46 41.8 47.8 40 50 40Z"
                fill="rgba(255, 255, 255, 0.3)"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white mb-4">
            <TTSWrapper text={title}>{title}</TTSWrapper>
          </h1>
          <p className="text-blue-200 text-base max-w-2xl mx-auto text-center leading-relaxed px-4">
            <TTSWrapper text={description} className="text-blue-200 text-base text-center leading-relaxed">
              {description}
            </TTSWrapper>
          </p>
        </div>

        {/* Go Back Button */}
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 bg-[#0A5BE0] text-white font-medium px-6 sm:px-8 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
          <TTSWrapper text="Go Back">Go Back </TTSWrapper>
          <TopRightArrowWhite />
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
