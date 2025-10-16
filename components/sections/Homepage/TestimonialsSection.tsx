"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { TopRightArrowBlack } from "../../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

const TestimonialsSection = () => {
  const [activeTab, setActiveTab] = useState("Client Stories");
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
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
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

  const tabs = ["Client Stories", "Nurse Testimonials", "Training Feedback"];

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

    // Check if this is the last card in the current visible slide
    const slideIndex = Math.floor(globalIndex / itemsPerView);
    const positionInSlide = globalIndex % itemsPerView;
    const isLastInCurrentSlide =
      positionInSlide === itemsPerView - 1 && slideIndex === currentIndex;

    setLastCardHovered(isLastInCurrentSlide && itemsPerView > 1);
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
    setLastCardHovered(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-0">
            <TTSWrapper
              text="Testimonials"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-0"
            >
              Testimonials
            </TTSWrapper>
          </h1>

          {/* Tabs and View All */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full md:w-auto overflow-x-auto">
            <div className="flex gap-4 sm:gap-6 whitespace-nowrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs sm:text-sm font-medium transition-colors pb-1 ${
                    activeTab === tab
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <TTSWrapper
                    text={tab}
                    className="text-xs sm:text-sm font-medium transition-colors pb-1"
                  >
                    {tab}
                  </TTSWrapper>
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-900 hover:gap-3 transition-all whitespace-nowrap">
              <TTSWrapper
                text="View All"
                className="text-xs sm:text-sm font-medium text-gray-900 hover:gap-3 transition-all whitespace-nowrap"
              >
                View All
              </TTSWrapper>{" "}
              <TopRightArrowBlack />
            </button>
          </div>
        </div>

        {/* Testimonials Container */}
        <div className="relative px-4 sm:px-8 md:px-12">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-20 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={20} className="text-gray-600 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-20 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                  transform: `translateX(calc(-${currentIndex * 100}% ${
                    lastCardHovered ? `- ${100 / itemsPerView}%` : ""
                  }))`,
                  transition: "transform 0.5s ease-out",
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full flex gap-3 sm:gap-4 md:gap-6 px-2"
                  >
                    {testimonials
                      .slice(
                        slideIndex * itemsPerView,
                        (slideIndex + 1) * itemsPerView
                      )
                      .map((testimonial, index) => {
                        const globalIndex = slideIndex * itemsPerView + index;
                        const isHovered = hoveredIndex === globalIndex;

                        return (
                          <div
                            key={globalIndex}
                            onMouseEnter={() => handleCardHover(globalIndex)}
                            onMouseLeave={handleCardLeave}
                            style={{
                              width:
                                isHovered && itemsPerView > 1
                                  ? `calc(${200 / itemsPerView}% - ${
                                      ((itemsPerView - 1) * 24) / itemsPerView
                                    }px)`
                                  : `calc(${100 / itemsPerView}% - ${
                                      ((itemsPerView - 1) * 24) / itemsPerView
                                    }px)`,
                              flexShrink: 0,
                              transition: "width 0.3s ease-out",
                              minWidth: 0,
                            }}
                            className="relative"
                          >
                            <div
                              className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 flex flex-col ${
                                isHovered ? "z-30" : "z-10"
                              }`}
                              style={{
                                height: "320px",
                                position: "relative",
                                overflow: "hidden",
                              }}
                            >
                              {/* Quote Icon */}
                              <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 pointer-events-none z-20">
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

                              {/* Content */}
                              <div className="relative z-30 flex-1 flex flex-col">
                                <div className="flex-1 overflow-hidden mb-4 sm:mb-6">
                                  <p
                                    className={`text-gray-700 text-xs sm:text-sm leading-relaxed transition-all duration-300 ${
                                      isHovered
                                        ? "overflow-y-auto max-h-[180px] pr-2"
                                        : "line-clamp-4"
                                    }`}
                                    style={{
                                      wordBreak: "break-word",
                                      overflowWrap: "break-word",
                                    }}
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
                                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="text-blue-500 sm:w-4 sm:h-4"
                                  >
                                    <path
                                      d="M8 0L10.3511 5.52786L16 6.12257L11.8 9.87214L13.0557 15.4L8 12.52L2.94427 15.4L4.2 9.87214L0 6.12257L5.64886 5.52786L8 0Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                  <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                    <TTSWrapper
                                      text={`${testimonial.rating.toFixed(1)}`}
                                      className="text-xs sm:text-sm font-semibold text-gray-900"
                                    >
                                      {testimonial.rating.toFixed(1)}
                                    </TTSWrapper>
                                  </span>
                                </div>

                                {/* Author */}
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                  />
                                  <div>
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                                      <TTSWrapper text={testimonial.name} className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</TTSWrapper>
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                      <TTSWrapper text={testimonial.location} className="text-xs sm:text-sm text-gray-500">{testimonial.location}</TTSWrapper>
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
