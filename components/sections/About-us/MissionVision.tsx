"use client";

import React, { useState, useEffect } from "react";
import { FlowerDecoration } from "../../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import { AboutUsDataType } from "@/types/Aboutus.type";

// Main Component
const MissionVisionSection = ({
  aboutUsData,
}: {
  aboutUsData: AboutUsDataType;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const steps = [
    {
      title: aboutUsData?.about_cms?.section2_title1,
      description: aboutUsData?.about_cms?.section2_description1,
    },
    {
      title: aboutUsData?.about_cms?.section2_title2,
      description: aboutUsData?.about_cms?.section2_description2,
    },
    {
      title: aboutUsData?.about_cms?.section2_title3,
      description: aboutUsData?.about_cms?.section2_description3,
    },
  ];

  const totalSlides =
    itemsPerView > 0 ? Math.ceil(steps.length / itemsPerView) : 1;
  const isCarousel = totalSlides > 1;
  const gapSize = itemsPerView === 1 ? 16 : itemsPerView === 2 ? 24 : 32;

  const nextSlide = () => {
    if (!isCarousel) return;
    setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const prevSlide = () => {
    if (!isCarousel) return;
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        {/* Carousel Container */}
        <div className="max-w-full mx-auto">
          {/* Carousel Track */}
          {isCarousel ? (
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full px-2 sm:px-4 lg:px-6 xl:px-10 flex gap-4 sm:gap-6 xl:gap-8"
                  >
                    {steps
                      .slice(
                        slideIndex * itemsPerView,
                        (slideIndex + 1) * itemsPerView
                      )
                      .map((step, index) => (
                        <div
                          key={slideIndex * itemsPerView + index}
                          className="flex-shrink-0"
                          style={{
                            width: `calc((100% - ${
                              (itemsPerView - 1) * gapSize
                            }px) / ${itemsPerView})`,
                          }}
                        >
                          <div className="bg-[#012367] p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl h-full w-full border border-gray-200 relative">
                            <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                              <FlowerDecoration />
                            </div>

                            <div className="relative z-10 max-w-full">
                              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                                <TTSWrapper
                                  text={step.title}
                                  className="text-xl sm:text-2xl font-semibold text-white"
                                >
                                  {step.title}
                                </TTSWrapper>
                              </h3>
                              <p className="text-white text-base sm:text-lg font-normal mt-3">
                                <TTSWrapper text={step.description}>
                                  {step.description}
                                </TTSWrapper>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 sm:px-4 lg:px-6 xl:px-10 gap-4 sm:gap-6 xl:gap-8">
              {steps.map((step, index) => (
                <div key={index} className="min-w-0">
                  <div className="bg-[#012367] p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl h-full min-h-[220px] max-w-full border border-gray-200 relative">
                    {/* Decorative Flower */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                      <FlowerDecoration />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-full">
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        <TTSWrapper text={step.title}>{step.title}</TTSWrapper>
                      </h3>
                      <p className="text-white text-base sm:text-lg font-normal mt-3">
                        <TTSWrapper text={step.description}>
                          {step.description}
                        </TTSWrapper>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isCarousel && (
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={currentIndex === 0}
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="text-sm font-medium text-gray-700">
                  {currentIndex + 1} / {totalSlides}
                </span>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={currentIndex === totalSlides - 1}
                  aria-label="Next slide"
                >
                  <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
