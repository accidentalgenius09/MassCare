"use client";

import { useState, useEffect, useRef } from "react";
import {
  CQC,
  HundredPercentIcon,
  InhouseCpD,
  NationalCoverage,
  NoOutsourcing,
} from "../../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";

const WhyChooseSection = () => {
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
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

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

  const benefits = [
    {
      icon: <CQC />,
      title: "CQC-recognized",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <NoOutsourcing />,
      title: "No Outsourcing",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <InhouseCpD />,
      title: "In-house CPD-certified training",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <NationalCoverage />,
      title: "National coverage",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <HundredPercentIcon />,
      title: "100% CBT/OSCE pass rate",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <InhouseCpD />,
      title: "In-house CPD-certified training",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <NationalCoverage />,
      title: "National coverage",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <HundredPercentIcon />,
      title: "100% CBT/OSCE pass rate",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <InhouseCpD />,
      title: "In-house CPD-certified training",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <NationalCoverage />,
      title: "National coverage",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <HundredPercentIcon />,
      title: "100% CBT/OSCE pass rate",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
  ];

  const totalSlides = Math.ceil(benefits.length / itemsPerView);
  
  // Calculate transform with special handling for the last slide
  const getTransform = () => {
    const isLastSlide = currentIndex === totalSlides - 1;
    const itemsInLastSlide = benefits.length % itemsPerView || itemsPerView;
    
    if (isLastSlide && itemsInLastSlide < itemsPerView && carouselWidth > 0) {
      // On the last slide with fewer items, align the last card to the right
      const cardWidth = carouselWidth / itemsPerView;
      const gap = 16; // gap-4
      const totalCardsWidth = itemsInLastSlide * cardWidth + (itemsInLastSlide - 1) * gap;
      const remainingSpace = carouselWidth - totalCardsWidth;
      const offsetPercent = (remainingSpace / carouselWidth) * 100;
      return -(currentIndex * 100) + offsetPercent;
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
              text="Why Choose Mass Care"
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
            >
              Why Choose Mass Care
            </TTSWrapper>
          </h2>
          <p className="text-sm sm:text-base md:text-md text-blue-200 mt-2 sm:mt-4">
            <TTSWrapper text="Lorem Ipsum is simply dummy text of the printing and typesetting industry" className="text-sm sm:text-base md:text-md text-blue-200">
            
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry{" "}
            </TTSWrapper>
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-full">
          <div
            ref={carouselRef}
            className="cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <div
              className="flex gap-4 transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${getTransform()}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex gap-4">
                  {benefits
                    .slice(
                      slideIndex * itemsPerView,
                      (slideIndex + 1) * itemsPerView
                    )
                    .map((benefit, index) => (
                      <div
                        key={slideIndex * itemsPerView + index}
                        style={{
                          width: `calc((100% - ${
                            (itemsPerView - 1) * 16
                          }px) / ${itemsPerView})`,
                          flexShrink: 0,
                        }}
                      >
                        <div className="bg-white px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 md:pt-6 rounded-2xl sm:rounded-3xl md:rounded-4xl pb-2 sm:pb-3 text-gray-900 hover:shadow-lg transition-shadow h-full select-none">
                          <div className="flex gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                            {/* Icon */}
                            <div className="flex-shrink-0">{benefit.icon}</div>

                            {/* Content */}
                            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                              <TTSWrapper text={benefit.title} className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">{benefit.title}</TTSWrapper>
                            </h3>
                          </div>
                          <hr className="mx-1 sm:mx-2 mb-1 sm:mb-2" />
                          <p className="text-gray-600 text-xs sm:text-sm">
                            <TTSWrapper text={benefit.description} className="text-gray-600 text-xs sm:text-sm">{benefit.description}</TTSWrapper>
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
