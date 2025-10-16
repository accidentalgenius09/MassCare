"use client";

import React, { useState, useEffect } from "react";
import {
  CandidateMatchingIcon,
  ComplianceChecksIcon,
  InitialConsultationIcon,
  OngoingSupportIcon,
  PlacementInductionIcon,
} from "../../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";

// Decorative flower component (from your SVG)
const FlowerDecoration = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="68"
    viewBox="0 0 80 91"
    fill="none"
  >
    <path
      d="M50.5557 61.5088C52.5217 62.3515 55.6113 64.9927 55.6113 69.0928C55.6113 74.1479 54.7681 75.8331 53.083 80.0459C51.7928 83.2715 47.1846 88.4718 47.1846 89.3145C47.1846 89.9885 46.0617 90.7191 45.5 91C42.4105 89.3148 36.2315 84.0905 36.2314 76.6758C36.2314 69.2613 40.7247 66.8455 42.9717 66.5645C42.41 67.9688 41.2871 70.946 41.2871 71.6201C41.2871 72.4627 39.6019 78.3609 41.2871 80.8887C42.6349 82.9104 43.5334 83.9777 43.8145 84.2588L45.5 81.7314V69.0928C46.0617 66.565 47.8594 61.5088 50.5557 61.5088ZM64.0371 49.7129C65.7222 48.0278 67.4071 46.3423 69.9346 47.1846C72.4622 48.0271 74.9903 50.5551 75.833 52.2402C76.5071 53.5884 78.3605 57.8582 79.2031 59.8242C79.484 60.6669 79.8771 62.5203 79.2031 63.1943C78.3602 64.0372 74.1475 67.4072 70.7773 67.4072C67.4069 67.4072 58.9811 67.4072 57.2959 63.1943C55.6109 58.9818 54.7687 55.6115 54.7686 54.7686V52.2402C56.1729 54.4871 59.4866 59.1501 61.5088 59.8242C64.0366 60.6668 67.4074 63.194 72.4629 61.5088C76.5068 60.1607 73.0242 58.7004 70.7773 58.1387L64.0371 56.4531L58.1387 52.2402C59.543 51.9593 62.689 51.061 64.0371 49.7129ZM26.9629 31.1758C29.6592 31.1758 32.0187 31.7377 32.8613 32.0186L33.7031 32.8613C32.0178 33.1422 28.3111 33.8719 26.9629 34.5459C25.2779 35.3884 24.4351 37.0737 25.2773 38.7588C25.9514 40.1068 28.9286 38.7596 30.333 37.917C31.1755 37.6362 33.0289 36.9054 33.7031 36.2314C34.5457 35.3889 37.9168 35.389 37.0742 37.0742C36.2316 38.7594 33.7033 41.2873 34.5459 42.1299C35.3884 42.9725 35.3889 44.6572 36.2314 44.6572C37.0739 44.6571 37.9163 43.815 38.7588 44.6572L41.2871 47.1846C41.9612 47.8586 43.2527 47.4654 43.8145 47.1846C44.3762 46.3419 45.3312 44.4885 44.6572 43.8145C43.9831 43.1402 42.6916 40.163 42.1299 38.7588L42.9717 37.0742L43.8145 37.917C44.0954 38.7598 44.826 40.7819 45.5 42.1299C46.343 43.8156 50.5557 49.7131 50.5557 50.5557C50.5558 51.3985 51.3974 53.9257 48.8701 56.4531L44.6572 60.666C43.8146 61.5086 38.7586 63.194 37.916 61.5088C37.0735 59.8236 36.2312 57.2956 35.3887 56.4531C34.546 55.6106 32.8611 54.7688 32.0186 55.6113C31.1758 56.4537 27.8059 55.6108 27.8057 51.3984C27.8057 48.0289 28.9284 46.6241 29.4902 46.3428L33.7031 41.2871C33.984 40.4445 34.3772 38.7588 33.7031 38.7588C32.8604 38.7588 31.1755 38.7594 30.333 40.4443C29.6589 41.7925 27.2436 46.0613 26.1201 48.0273C24.7158 49.7125 21.7385 52.9143 21.0645 52.2402C20.2747 51.4505 19.4855 50.6608 19.3896 49.8711L19.3701 49.5547C19.2743 48.768 18.4842 48.0273 17.6943 48.0273C16.8517 48.0274 15.1668 48.8699 14.3242 48.0273C13.4816 47.1847 12.6389 45.4998 13.4814 44.6572C14.1555 43.9832 14.3242 43.2525 14.3242 42.9717C14.3243 41.0055 14.8296 36.7368 16.8516 35.3887C19.3793 33.7035 23.5925 31.1758 26.9629 31.1758ZM58.9814 19.3799C62.3516 19.3798 66.5644 18.5371 67.4072 21.0645C68.0812 23.0865 68.8119 24.7155 69.0928 25.2773C70.2163 25.8391 72.4629 27.1316 72.4629 27.8057C72.463 28.6491 73.3047 37.0745 69.9346 37.917C66.5645 38.7597 63.1946 41.2869 63.1943 43.8145C63.1943 46.3421 58.1392 49.7122 55.6113 48.8701C53.0836 48.0275 47.1854 42.1293 46.3428 39.6016C45.5002 37.0738 43.8148 33.7041 45.5 33.7041C46.848 33.7043 47.7465 35.3889 48.0273 36.2314C49.4317 37.9166 52.5776 40.781 53.9258 38.7588C55.2736 36.7368 54.4875 35.6695 53.9258 35.3887C53.9258 34.5461 54.0945 33.0301 54.7686 33.7041C55.6115 34.5466 58.1393 35.3884 59.8242 34.5459C61.5087 33.7031 60.6667 31.1756 59.8242 30.333C59.1502 29.659 56.735 29.4903 55.6113 29.4902C55.8921 28.3667 56.1162 26.1204 54.7686 26.1201C53.4204 26.1201 49.7125 27.8058 48.0273 28.6484C47.4657 28.6425 46.5112 28.4654 47.1846 27.8057C49.9932 24.997 56.2852 19.3799 58.9814 19.3799ZM16.0088 20.2227C15.3347 18.8745 17.4137 19.099 18.5371 19.3799V21.9072L19.3799 23.5928H30.333C32.0182 23.5928 37.9166 26.1205 40.4443 27.8057C42.4663 29.1538 41.2869 31.176 40.4443 32.0186C39.7703 32.6926 39.0396 32.8613 38.7588 32.8613L36.2314 31.1758L26.1201 26.1201C24.4349 25.8392 20.8957 25.2773 20.2217 25.2773C19.5472 25.2776 17.694 25.8393 16.8516 26.1201V27.8057C16.8515 28.3675 16.6828 29.4902 16.0088 29.4902C15.1667 29.4902 15.1664 29.4906 14.3242 28.6484C13.4816 27.8058 14.3244 27.8055 15.167 26.9629L16.0088 26.1201C16.0087 25.8392 15.8406 25.2776 15.167 25.2773C14.3244 25.2773 14.324 26.1201 13.4814 26.1201H12.6387V29.4902C12.6387 30.3328 12.6385 30.333 11.7959 30.333H10.1113C9.26874 30.333 10.1115 28.6484 10.9541 28.6484C11.7958 28.6481 10.954 27.8059 11.7959 27.8057C12.4698 27.8057 11.5159 27.2438 10.9541 26.9629H9.26855L7.58301 27.8057C7.30213 28.0866 6.74048 28.8165 6.74023 29.4902V30.333C7.0211 30.8947 7.58301 32.1873 7.58301 32.8613C7.58301 33.7036 7.58309 33.7031 5.89844 33.7031C5.05585 33.7031 5.05548 32.8613 4.21289 32.8613H1.68555C0.842958 32.8613 1.68536 32.0182 0.842773 30.333C0.168799 29.659 3.46289e-05 28.3675 0 27.8057H0.842773L1.68555 26.9629V24.4355C1.68555 23.0874 3.3703 23.3119 4.21289 23.5928V26.9629H7.58301C8.25708 26.9629 8.98769 26.401 9.26855 26.1201V25.2773C9.2684 24.9964 9.09955 24.4355 8.42578 24.4355C7.58337 24.4355 7.58301 24.4351 7.58301 23.5928C7.58301 22.7502 7.58319 22.7498 8.42578 21.9072C9.09984 21.2332 9.26855 22.1883 9.26855 22.75C9.54944 22.75 10.1113 22.9188 10.1113 23.5928C10.1116 24.2666 11.2341 24.9964 11.7959 25.2773L12.6387 24.4355H14.3242L13.4814 23.5928C13.2006 23.5928 12.47 23.2554 11.7959 21.9072C11.1221 20.5593 12.6389 20.2227 13.4814 20.2227L14.3242 21.9072L15.167 23.5928L16.8516 24.4355L17.6943 23.5928C17.6943 23.0311 17.3569 21.5708 16.0088 20.2227ZM58.1387 0C60.6664 2.71263e-05 61.5088 3.37049 61.5088 5.05566C61.5088 6.74083 62.3519 8.42578 64.0371 8.42578C65.7218 8.42659 64.8792 14.3247 62.3516 16.0098C59.8237 17.6949 54.7682 20.2219 53.083 21.0645C51.3979 21.907 48.0281 26.1199 46.3428 26.9629C44.9947 27.6369 45.7811 25.559 46.3428 24.4355C47.0047 22.7505 52.2398 16.0104 53.083 15.167C53.9256 14.3244 52.2401 13.4814 51.3975 13.4814C50.5547 13.4821 48.8698 15.1673 48.0273 16.0098C47.1852 16.8516 47.1849 16.0093 46.3428 15.167C45.5002 14.3244 43.8143 15.1672 42.9717 16.0098C42.1299 16.8544 42.9718 24.4331 42.1299 23.5928C41.2873 22.7502 40.4444 13.4824 40.4443 10.9541C40.4443 8.42636 42.9718 7.58337 43.8145 5.05566C44.657 2.52791 48.0277 2.52754 49.7129 3.37012C51.398 4.21266 51.3981 4.21322 53.083 2.52832C54.7682 0.843143 55.6109 0 58.1387 0ZM26.9629 0.842773C27.8055 0.842825 31.176 2.52832 32.0186 2.52832C32.8609 2.52821 32.0185 1.68579 35.3887 2.52832C38.7588 3.37089 37.9171 9.26789 37.917 11.7959C37.917 13.8181 39.0398 19.3794 39.6016 21.9072V22.75L38.7588 21.9072C37.3544 19.3793 34.3772 13.9868 33.7031 12.6387C32.8605 10.9539 31.1753 10.9534 29.4902 11.7959C27.8053 12.6386 30.3334 16.852 32.0186 18.5371C33.3667 19.8853 35.3889 22.4694 36.2314 23.5928C35.9506 23.3119 35.0513 22.75 33.7031 22.75C32.0172 22.7496 25.2776 20.2221 22.75 18.5371C20.2222 16.8519 19.3799 12.6385 19.3799 11.7959C19.3805 10.9532 21.0648 9.26822 21.9072 8.42578C22.7497 7.58321 21.9072 6.74059 21.9072 4.21289C21.9074 1.68525 26.1203 0.842773 26.9629 0.842773Z"
      fill="#C4D0ED"
    />
  </svg>
);

// Main Component
const HowItWorksSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(5);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description:
        "We begin with a comprehensive consultation to understand your specific needs, preferences, and requirements.",
      icon: <InitialConsultationIcon />,
    },
    {
      number: "02",
      title: "Candidate Matching",
      description:
        "Our expert team carefully matches you with qualified professionals who meet your specific criteria and requirements.",
      icon: <CandidateMatchingIcon />,
    },
    {
      number: "03",
      title: "Compliance Checks",
      description:
        "We conduct thorough background checks, verify qualifications, and ensure all regulatory requirements are met.",
      icon: <ComplianceChecksIcon />,
    },
    {
      number: "04",
      title: "Placement & Induction",
      description:
        "We facilitate smooth placement with comprehensive induction programs to ensure seamless integration.",
      icon: <PlacementInductionIcon />,
    },
    {
      number: "05",
      title: "Ongoing Support",
      description:
        "We provide continuous support and monitoring to ensure quality care and satisfaction for all parties.",
      icon: <OngoingSupportIcon />,
    },
  ];

  const totalSlides = Math.ceil(steps.length / itemsPerView);
  console.log(steps.length);
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <TTSWrapper
              text="How It Works"
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              How It Works
            </TTSWrapper>
          </h2>
          <p className="text-md text-gray-700 max-w-xl mx-auto">
            <TTSWrapper
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
              className="text-md text-gray-700 max-w-xl mx-auto"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </TTSWrapper>
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Previous Button */}
          {steps.length > 5 && (
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
                  className="min-w-full flex gap-6 justify-center"
                >
                  {steps
                    .slice(
                      slideIndex * itemsPerView,
                      (slideIndex + 1) * itemsPerView
                    )
                    .map((step, index) => (
                      <div
                        key={slideIndex * itemsPerView + index}
                        style={{
                          width: `calc((100% - ${
                            (itemsPerView - 1) * 24
                          }px) / ${itemsPerView})`,
                          flexShrink: 0,
                        }}
                      >
                        <div className="bg-[#E8EFFF] p-6 rounded-3xl h-full shadow-sm hover:shadow-md transition-shadow border border-gray-200 relative">
                          {/* Decorative Flower */}
                          <div className="absolute top-2 right-2">
                            <FlowerDecoration />
                          </div>

                          {/* Icon */}
                          <div className="flex mb-4">{step.icon}</div>
                          <div className="max-w-[140px] mt-16 bottom-4">
                            <h3 className="max-w-[140px] mt-16 bottom-4 text-lg font-semibold text-gray-900">
                              <TTSWrapper
                                text={step.title}
                                className="text-lg font-semibold text-gray-900"
                              >
                                {step.title}
                              </TTSWrapper>
                            </h3>
                          </div>
                          <div className="absolute right-2 bottom-4">
                            <div className="w-8 h-8 text-[#3C5387] text-xl font-medium">
                              <TTSWrapper
                                text={step.number}
                                className="w-8 h-8 text-[#3C5387] text-xl font-medium"
                              >
                                {step.number}
                              </TTSWrapper>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          {steps.length > 5 && (
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

export default HowItWorksSection;
