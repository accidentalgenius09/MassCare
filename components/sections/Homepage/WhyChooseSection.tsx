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

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-20 bg-[#012367] text-white ps-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl font-bold">
            <TTSWrapper
              text="Why Choose Mass Care"
              className="text-4xl font-bold"
            >
              Why Choose Mass Care
            </TTSWrapper>
          </h2>
          <p className="text-md text-blue-200">
            <TTSWrapper text="Lorem Ipsum is simply dummy text of the printing and typesetting industry" className="text-md text-blue-200">
            
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry{" "}
            </TTSWrapper>
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          <div
            ref={carouselRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
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
                        <div className="bg-white px-6 pt-6 rounded-4xl pb-3 text-gray-900 hover:shadow-lg transition-shadow h-full select-none">
                          <div className="flex gap-4 mb-8">
                            {/* Icon */}
                            <div>{benefit.icon}</div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold">
                              <TTSWrapper text={benefit.title} className="text-xl font-semibold">{benefit.title}</TTSWrapper>
                            </h3>
                          </div>
                          <hr className="mx-2 mb-2" />
                          <p className="text-gray-600 text-sm">
                            <TTSWrapper text={benefit.description} className="text-gray-600 text-sm">{benefit.description}</TTSWrapper>
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
