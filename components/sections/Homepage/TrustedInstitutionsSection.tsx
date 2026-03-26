"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TTSWrapper from "@/hooks/TTSWrapper";
import { HomeData } from "@/types/Home.type";

const TrustedInstitutionsSection = ({ homeData }: { homeData: HomeData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [gap, setGap] = useState(32);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = Math.ceil(
    homeData.trusted_institutions.length / itemsPerView
  );

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
        setGap(16);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
        setGap(24);
      } else {
        setItemsPerView(4);
        setGap(32);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Hide scrollbars
  useEffect(() => {
    const styleId = "trusted-institutions-scrollbar-hide";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .trusted-institutions-carousel::-webkit-scrollbar {
          display: none;
        }
        .trusted-institutions-carousel {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isDragging) return;

    autoScrollInterval.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [totalSlides, isDragging]);

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

    if (Math.abs(walk) > 0.3) {
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

    if (Math.abs(walk) > 0.3) {
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

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="px-4 sm:px-6 md:px-16 flex flex-col lg:flex-row items-center">
        <div className="text-center mb-6 lg:mb-0 lg:mr-4 lg:text-left flex-shrink-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center lg:whitespace-nowrap">
            <TTSWrapper
              text={homeData.home_cms.uk_institution_title || ""}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
            >
              {homeData.home_cms.uk_institution_title || ""}
            </TTSWrapper>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full lg:max-w-6xl mx-auto hidden-scrollbar">
          <div
            ref={carouselRef}
            className="cursor-grab active:cursor-grabbing trusted-institutions-carousel"
            style={{
              touchAction: "pan-x",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="min-w-full flex"
                  style={{ gap: `${gap}px` }}
                >
                  {homeData.trusted_institutions
                    .slice(
                      slideIndex * itemsPerView,
                      (slideIndex + 1) * itemsPerView
                    )
                    .map((institution, index) => (
                      <div
                        key={slideIndex * itemsPerView + index}
                        style={{
                          width: `calc((100% - ${
                            (itemsPerView - 1) * gap
                          }px) / ${itemsPerView})`,
                          flexShrink: 0,
                        }}
                        className="flex justify-center items-center"
                      >
                        <Image
                          src={institution.icon_value || ""}
                          alt={
                            institution.icon_alt_text_value ||
                            "Trusted institution logo"
                          }
                          width={120}
                          height={120}
                          className="object-contain max-h-[80px] max-w-[80px] sm:max-h-[90px] sm:max-w-[90px] md:max-h-[100px] md:max-w-[100px] pointer-events-none select-none"
                          draggable={false}
                          loading="lazy"
                          sizes="(max-width: 740px) 80px, (max-width: 1124px) 90px, 100px"
                        />
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

export default TrustedInstitutionsSection;
