"use client";

import React, { useState, useEffect } from "react";
import {
  CandidateMatchingIcon,
  ComplianceChecksIcon,
  FlowerDecoration,
  InitialConsultationIcon,
  OngoingSupportIcon,
  PlacementInductionIcon,
} from "../../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";

// Main Component
const MissionVisionSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
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
      number: "01",
      title: "Mission",
      description: "To champion local communities, avoid outsourcing...",
      icon: <InitialConsultationIcon />,
    },
    {
      number: "02",
      title: "Vision",
      description: "To champion local communities, avoid outsourcing...",
      icon: <CandidateMatchingIcon />,
    },
    {
      number: "03",
      title: "Values",
      description:
        "We care deeply for the well-being of vulnerable adults, providing support with empathy, dignity, and respect.",
      icon: <ComplianceChecksIcon />,
    },
    {
      number: "04",
      title: "Core Beliefs",
      description:
        "We facilitate smooth placement with comprehensive induction programs to ensure seamless integration.",
      icon: <PlacementInductionIcon />,
    },
    {
      number: "05",
      title: "Quality Promise",
      description:
        "We provide continuous support and monitoring to ensure quality care and satisfaction for all parties.",
      icon: <OngoingSupportIcon />,
    },
    {
      number: "04",
      title: "Core Beliefs",
      description:
        "We facilitate smooth placement with comprehensive induction programs to ensure seamless integration.",
      icon: <PlacementInductionIcon />,
    },
    {
      number: "05",
      title: "Quality Promise",
      description:
        "We provide continuous support and monitoring to ensure quality care and satisfaction for all parties.",
      icon: <OngoingSupportIcon />,
    },
  ];

  const isCarousel = steps.length > 3;
  const totalSlides = isCarousel ? Math.ceil(steps.length / itemsPerView) : 1;
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Previous Button */}
          {isCarousel && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 bg-[rgba(255, 255, 255, 0.2)] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex === 0}
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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
          )}
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
                    className="min-w-full flex gap-4 md:gap-6 xl:gap-8"
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
                              (itemsPerView - 1) *
                              (itemsPerView === 1
                                ? 16
                                : itemsPerView === 2
                                ? 24
                                : 32)
                            }px) / ${itemsPerView})`,
                          }}
                        >
                          <div className="bg-[#012367] p-4 md:p-6 rounded-3xl h-auto md:h-52 w-full border border-gray-200 relative">
                            {/* Decorative Flower */}
                            <div className="absolute top-2 right-2">
                              <FlowerDecoration />
                            </div>

                            {/* Icon */}
                            <div className="max-w-[540px]">
                              <h3 className="max-w-[540px] text-2xl font-semibold text-white">
                                <TTSWrapper
                                  text={step.title}
                                  className="text-2xl font-semibold text-white"
                                >
                                  {step.title}
                                </TTSWrapper>
                              </h3>
                            </div>
                            <p className="text-white text-lg font-normal mt-4">
                              <TTSWrapper text={step.description}>
                                {step.description}
                              </TTSWrapper>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-8">
              {steps.map((step, index) => (
                <div key={index} className="min-w-0">
                  <div className="bg-[#012367] p-4 md:p-6 rounded-3xl h-auto md:h-52 w-full border border-gray-200 relative">
                    {/* Decorative Flower */}
                    <div className="absolute top-2 right-2">
                      <FlowerDecoration />
                    </div>

                    {/* Icon */}
                    <div className="max-w-[540px]">
                      <h3 className="max-w-[540px] text-2xl font-semibold text-white">
                        <TTSWrapper
                          text={step.title}
                          className="text-2xl font-semibold text-white"
                        >
                          {step.title}
                        </TTSWrapper>
                      </h3>
                    </div>
                    <p className="text-white text-lg font-normal mt-4">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Next Button */}
          {isCarousel && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 bg-[rgba(255, 255, 255, 0.2)] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex === totalSlides - 1}
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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
          )}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
