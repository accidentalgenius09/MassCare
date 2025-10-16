"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TTSWrapper from "@/hooks/TTSWrapper";

const TrustedInstitutionsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  const institutions = [
    { name: "NHS", logo: "/logos/nhs.png" },
    { name: "care", logo: "/logos/careuk.png" },
    { name: "CGS", logo: "/logos/cgs.png" },
    { name: "TRAINING ACADEMY UK", logo: "/logos/training.png" },
    { name: "NHS", logo: "/logos/nhs.png" },
    { name: "care", logo: "/logos/careuk.png" },
    { name: "CGS", logo: "/logos/cgs.png" },
    { name: "TRAINING ACADEMY UK", logo: "/logos/training.png" },
    { name: "NHS", logo: "/logos/nhs.png" },
    { name: "care", logo: "/logos/careuk.png" },
    { name: "CGS", logo: "/logos/cgs.png" },
    { name: "TRAINING ACADEMY UK", logo: "/logos/training.png" },
    { name: "NHS", logo: "/logos/nhs.png" },
    { name: "care", logo: "/logos/careuk.png" },
    { name: "CGS", logo: "/logos/cgs.png" },
    { name: "TRAINING ACADEMY UK", logo: "/logos/training.png" },
  ];

  const totalSlides = Math.ceil(institutions.length / itemsPerView);

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 flex">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 whitespace-nowrap">
            <TTSWrapper
              text="Trusted by UK Institutions"
              className="text-4xl font-bold text-gray-900 whitespace-nowrap"
            >
              {" "}
              Trusted by UK Institutions
            </TTSWrapper>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <div
            ref={carouselRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
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
                <div key={slideIndex} className="min-w-full flex gap-8">
                  {institutions
                    .slice(
                      slideIndex * itemsPerView,
                      (slideIndex + 1) * itemsPerView
                    )
                    .map((institution, index) => (
                      <div
                        key={slideIndex * itemsPerView + index}
                        style={{
                          width: `calc((100% - ${
                            (itemsPerView - 1) * 32
                          }px) / ${itemsPerView})`,
                          flexShrink: 0,
                        }}
                        className="flex justify-center"
                      >
                        <Image
                          src={institution.logo}
                          alt={institution.name}
                          width={200}
                          height={150}
                          className="object-contain max-h-[150px] w-auto pointer-events-none select-none"
                          draggable={false}
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
