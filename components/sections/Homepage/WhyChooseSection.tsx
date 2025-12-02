"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TTSWrapper from "@/hooks/TTSWrapper";
import { HomeData } from "@/types/Home.type";

const WhyChooseSection = ({ homeData }: { homeData: HomeData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerView(1);
      } else if (width < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Reset currentIndex when itemsPerView changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerView]);

  // Track carousel width
  useEffect(() => {
    const updateCarouselWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth);
      }
    };

    updateCarouselWidth();
    window.addEventListener("resize", updateCarouselWidth);
    return () => window.removeEventListener("resize", updateCarouselWidth);
  }, [itemsPerView]);


  const totalSlides = Math.ceil(homeData.mass_care_features.length / itemsPerView);

  // Calculate transform with special handling for the last slide
  const getTransform = () => {
    // Always start from the left (0% when currentIndex is 0)
    if (currentIndex === 0) {
      return 0;
    }

    const isLastSlide = currentIndex === totalSlides - 1;
    const itemsInLastSlide = homeData.mass_care_features.length % itemsPerView || itemsPerView;

    if (isLastSlide && itemsInLastSlide < itemsPerView && carouselWidth > 0) {
      // On the last slide with fewer items, keep items aligned to the left
      return -currentIndex * 100;
    }

    return -currentIndex * 100;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(currentIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(currentIndex);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (startX - x) / (carouselRef.current?.offsetWidth || 1);

    if (Math.abs(walk) > 0.1) {
      const newIndex = walk > 0 ? scrollLeft + 1 : scrollLeft - 1;
      if (newIndex >= 0 && newIndex < totalSlides) {
        setCurrentIndex(newIndex);
        setIsDragging(false);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (startX - x) / (carouselRef.current?.offsetWidth || 1);

    if (Math.abs(walk) > 0.1) {
      const newIndex = walk > 0 ? scrollLeft + 1 : scrollLeft - 1;
      if (newIndex >= 0 && newIndex < totalSlides) {
        setCurrentIndex(newIndex);
        setIsDragging(false);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#012367] text-white px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
      <div className="px-0 sm:px-4 md:px-8 lg:px-18">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <TTSWrapper
              text={homeData.home_cms.why_choose_title || ""}
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
            >
              {homeData.home_cms.why_choose_title || ""}
            </TTSWrapper>
          </h2>
          <p className="text-sm sm:text-base md:text-md text-blue-200 mt-2 sm:mt-4">
            <TTSWrapper
              text={homeData.home_cms.why_choose_subtitle || ""}
              className="text-sm sm:text-base md:text-md text-blue-200"
            >
              {homeData.home_cms.why_choose_subtitle || ""}
            </TTSWrapper>
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-full overflow-hidden">
          <div
            ref={carouselRef}
            className="cursor-grab active:cursor-grabbing overflow-hidden w-full"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            style={{ overflow: "hidden" }}
          >
            <div
              className="flex transition-transform duration-300 ease-out justify-start"
              style={{
                transform: `translateX(${getTransform()}%)`,
                gap: itemsPerView === 1 ? "0px" : itemsPerView === 2 ? "2%" : "16px",
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex justify-start" style={{ boxSizing: "border-box", gap: itemsPerView === 1 ? "0px" : itemsPerView === 2 ? "4px" : "16px", width: "100%", overflow: "hidden", maxWidth: "100%" }}>
                  {homeData.mass_care_features
                    .slice(
                      slideIndex * itemsPerView,
                      (slideIndex + 1) * itemsPerView
                    )
                    .map((feature, index) => (
                      <div
                        key={feature.id || slideIndex * itemsPerView + index}
                        style={{
                          width: itemsPerView === 1 
                            ? "100%" 
                            : itemsPerView === 2
                            ? "49%"
                            : `calc((100% - ${(itemsPerView - 1) * 16}px) / ${itemsPerView})`,
                          flexShrink: 0,
                          boxSizing: "border-box",
                          minWidth: 0,
                          maxWidth: itemsPerView === 2 ? "49%" : "none",
                        }}
                      >
                        <div className="bg-white px-3 sm:px-4 md:px-4 lg:px-6 pt-4 sm:pt-5 md:pt-5 lg:pt-6 rounded-2xl sm:rounded-3xl md:rounded-3xl lg:rounded-4xl pb-2 sm:pb-3 text-gray-900 hover:shadow-lg transition-shadow h-full select-none w-full overflow-hidden" style={{ maxWidth: "100%" }}>
                          <div className="flex gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                            {/* Icon */}
                            <div className="flex-shrink-0">
                              <Image
                                src={feature.icon_value || ""}
                                alt={feature.icon_alt_text_value || feature.title}
                                width={48}
                                height={48}
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                              />
                            </div>

                            {/* Content */}
                            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold break-words">
                              <TTSWrapper
                                text={feature.title}
                                className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold"
                              >
                                {feature.title}
                              </TTSWrapper>
                            </h3>
                          </div>
                          <hr className="mx-1 sm:mx-2 mb-1 sm:mb-2" />
                          <p className="text-gray-600 text-xs sm:text-sm break-words">
                            <TTSWrapper
                              text={feature.subtitle}
                              className="text-gray-600 text-xs sm:text-sm"
                            >
                              {feature.subtitle}
                            </TTSWrapper>
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
