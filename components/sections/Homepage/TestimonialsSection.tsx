"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TopRightArrowBlack } from "../../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

const TestimonialsSection = ({
  showTabs = true,
  viewAll = true,
  tabs = ["Client Stories", "Nurse Testimonials", "Training Feedback"],
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastCardHovered, setLastCardHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Selina",
      location: "UK",
      rating: 5.0,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Steeev",
      location: "UK",
      rating: 5.0,
      text: "Lorem Ipsum is simply dummy  dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the i dummy text of the printing and typesetting industry. Lorem Ipsum has been the itext of the printing and typesetting industry. Lorem Ipsum has been the i  dummy text of the printing and typesetting industry. Lorem Ipsum has been the i  dummy text of the printing and typesetting industry. Lorem Ipsum has been the i  dummy text of the printing and typesetting industry. Lorem Ipsum has been the i  dummy text of the printing and typesetting industry. Lorem Ipsum has been the i ndustry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Stanly",
      location: "UK",
      rating: 5.0,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Stella",
      location: "UK",
      rating: 5.0,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Selina",
      location: "UK",
      rating: 5.0,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 6,
      name: "Steeev",
      location: "UK",
      rating: 5.0,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 7,
      name: "Stanly",
      location: "UK",
      rating: 5.0,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 8,
      name: "Stella",
      location: "UK",
      rating: 5.0,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  ];

  const totalSlides = Math.ceil(testimonials.length / itemsPerView);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isDragging || hoveredIndex !== null) return;

    autoScrollInterval.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [totalSlides, isDragging, hoveredIndex]);

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleCardHover = (globalIndex: number) => {
    setHoveredIndex(globalIndex);
    setLastCardHovered(false); // Always show 4 cards, no special handling needed
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
    setLastCardHovered(false);
  };

  const handleTextScrollReset = (e: React.MouseEvent<HTMLParagraphElement>) => {
    // Reset scroll position when mouse leaves the text area
    e.currentTarget.scrollTop = 0;
  };

  return (
    <div className="bg-[#E8EFFF] pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-22 md:pb-22 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row ${
            showTabs ? "justify-between" : "justify-center"
          } items-start md:items-center mb-8 sm:mb-10 md:mb-12`}
        >
          <h1 className="text-5xl font-semibold text-gray-900 mb-4 md:mb-0 px-12">
            <TTSWrapper text="Testimonials">Testimonials</TTSWrapper>
          </h1>

          {showTabs && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
              <div className="flex gap-8 whitespace-nowrap">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(tab)}
                    className={`text-xs sm:text-sm text-black transition-colors pb-1 ${
                      activeTab === tab
                        ? "border-b-2 font-bold border-gray-900"
                        : "hover:text-gray-900 font-medium"
                    }`}
                  >
                    <TTSWrapper text={tab}>{tab}</TTSWrapper>
                  </button>
                ))}
              </div>
              <div className="mx-14">
                {viewAll && (
                  <button className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-900 hover:gap-3 hover:text-blue-600 transition-all duration-300 whitespace-nowrap">
                    <TTSWrapper text="View All">View All</TTSWrapper>{" "}
                    <TopRightArrowBlack />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Testimonials Container */}
        <div className="relative px-4 sm:px-8 md:px-12">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-20 rounded-full p-1.5 sm:p-2 transition-all duration-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={20} className="text-gray-600 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-20 rounded-full p-1.5 sm:p-2 transition-all duration-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === totalSlides - 1}
          >
            <ChevronRight size={20} className="text-gray-600 sm:w-6 sm:h-6" />
          </button>

          {/* Carousel */}
          <div
            className="overflow-hidden"
            style={{
              width: "100%",
              overflow: lastCardHovered ? "hidden" : "hidden",
              overflowY: itemsPerView === 1 && hoveredIndex !== null ? "visible" : "hidden",
              overflowX: "hidden",
            }}
          >
            <div
              ref={carouselRef}
              className="cursor-grab active:cursor-grabbing touch-pan-y"
              style={{ width: "100%" }}
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
                  transition: "transform 0.5s ease-out",
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className={`min-w-full flex gap-3 sm:gap-4 md:gap-6 px-2 ${itemsPerView === 1 ? "items-start" : ""}`}
                  >
                    {testimonials
                      .slice(
                        slideIndex * itemsPerView,
                        (slideIndex + 1) * itemsPerView
                      )
                      .map((testimonial, index) => {
                        const globalIndex = slideIndex * itemsPerView + index;
                        const isHovered = hoveredIndex === globalIndex;
                        const isInCurrentSlide = slideIndex === currentIndex;
                        const hasHoveredCardInSlide =
                          isInCurrentSlide && hoveredIndex !== null;

                        // Calculate width based on hover state
                        // On small screens (itemsPerView = 1), don't expand to prevent breaking
                        let cardWidth;
                        if (itemsPerView === 1) {
                          // On mobile, keep full width to prevent overflow
                          cardWidth = `calc(100% - 0px)`;
                        } else if (isHovered) {
                          cardWidth = `calc(${130 / itemsPerView}% - ${
                            ((itemsPerView - 1) * 24) / itemsPerView
                          }px)`;
                        } else if (hasHoveredCardInSlide) {
                          // Other cards in the same slide get slightly smaller
                          cardWidth = `calc(${89 / itemsPerView}% - ${
                            ((itemsPerView - 1) * 24) / itemsPerView
                          }px)`;
                        } else {
                          cardWidth = `calc(${100 / itemsPerView}% - ${
                            ((itemsPerView - 1) * 24) / itemsPerView
                          }px)`;
                        }

                        return (
                          <div
                            key={globalIndex}
                            onMouseEnter={() => handleCardHover(globalIndex)}
                            onMouseLeave={handleCardLeave}
                            style={{
                              width: cardWidth,
                              flexShrink: 0,
                              transition: "width 0.3s ease-out",
                              minWidth: itemsPerView === 1 ? "100%" : 0,
                              maxWidth: itemsPerView === 1 ? "100%" : "none",
                            }}
                            className="relative"
                          >
                            <div
                              className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 flex flex-col ${
                                isHovered ? "z-20" : "z-10"
                              }`}
                              style={{
                                height: "320px",
                                minHeight: "320px",
                                position: "relative",
                                overflow: "hidden",
                              }}
                            >
                              {/* Content */}
                              <div className="relative z-30 flex flex-col flex-1 h-full">
                                <div className="flex-1 overflow-hidden mb-4 sm:mb-6 min-h-0">
                                  <p
                                    className={`text-gray-700 text-xs sm:text-sm leading-relaxed transition-all duration-300 scrollbar-hide ${
                                      isHovered
                                        ? "overflow-x-auto overflow-y-auto max-h-[180px] pr-2"
                                        : "line-clamp-4"
                                    }`}
                                    style={{
                                      wordBreak: "break-word",
                                      overflowWrap: "break-word",
                                    }}
                                    onMouseLeave={handleTextScrollReset}
                                  >
                                    <TTSWrapper
                                      text={testimonial.text}
                                      className="text-gray-700 text-xs sm:text-sm leading-relaxed transition-all duration-300"
                                    >
                                      {testimonial.text}
                                    </TTSWrapper>
                                  </p>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-3 sm:mb-4 bg-[#DEE8FF] px-2 py-1 rounded-full w-16">
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="text-[#0a5be0] sm:w-4 sm:h-4"
                                  >
                                    <path
                                      d="M8 0L10.3511 5.52786L16 6.12257L11.8 9.87214L13.0557 15.4L8 12.52L2.94427 15.4L4.2 9.87214L0 6.12257L5.64886 5.52786L8 0Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                  <span className="text-xs sm:text-sm font-semibold text-gray-900 flex items-center">
                                    <TTSWrapper
                                      text={`${testimonial.rating.toFixed(1)}`}
                                    >
                                      {testimonial.rating.toFixed(1)}
                                    </TTSWrapper>
                                  </span>
                                </div>
                                {/* Quote Icon */}
                                <div className="absolute bottom-4 sm:bottom-6 right-0 pointer-events-none z-20">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="41"
                                    height="40"
                                    viewBox="0 0 41 40"
                                    fill="none"
                                  >
                                    <g clipPath="url(#clip0_673_5014)">
                                      <path
                                        d="M23.1133 22.5V5H40.6133V22.75C40.6133 34.75 29.3633 36.25 29.3633 36.25L27.8633 32.75C27.8633 32.75 32.8633 32 33.8633 28C34.8633 25 32.8633 22.5 32.8633 22.5H23.1133Z"
                                        fill="#0A5BE0"
                                      />
                                      <path
                                        d="M0.613281 22.5V5H18.1133V22.75C18.1133 34.75 6.86328 36.25 6.86328 36.25L5.36328 32.75C5.36328 32.75 10.3633 32 11.3633 28C12.3633 25 10.3633 22.5 10.3633 22.5H0.613281Z"
                                        fill="#0A5BE0"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_673_5014">
                                        <rect
                                          width="40"
                                          height="40"
                                          fill="white"
                                          transform="translate(0.613281)"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>

                                {/* Author - Fixed at bottom */}
                                <div className="flex items-center gap-2 sm:gap-3 mt-auto">
                                  <Image
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    width={48}
                                    height={48}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                  />
                                  <div>
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                                      <TTSWrapper
                                        text={testimonial.name}
                                        className="font-semibold text-gray-900 text-sm sm:text-base"
                                      >
                                        {testimonial.name}
                                      </TTSWrapper>
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                      <TTSWrapper
                                        text={testimonial.location}
                                        className="text-xs sm:text-sm text-gray-500"
                                      >
                                        {testimonial.location}
                                      </TTSWrapper>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
