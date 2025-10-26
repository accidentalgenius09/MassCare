import React from "react";
import Image from "next/image";
import {
  FlowerDecorationBig,
  TopRightArrowWhite,
} from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";

interface NursingCareSectionProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  sectionTitle?: string;
  description1?: string;
  description2?: string;
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
}

const NursingCareSection: React.FC<NursingCareSectionProps> = ({
  title = "MCM Nursing Care Agency",
  subtitle = "Comprehensive healthcare training and education programs with round-the-clock support and CQC-rated quality standards.",
  imageSrc = "/services/bp-checking.jpg",
  imageAlt = "Healthcare professional with patient",
  sectionTitle = "Staffing for Healthcare Facilities",
  description1 = "From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates.",
  ctaText = "Know More",
  ctaLink = "#",
  description2,
  //   onCtaClick,
}) => {
  //   const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //     if (onCtaClick) {
  //       e.preventDefault();
  //       onCtaClick();
  //     }
  //   };

  return (
    <section className="relative bg-[#E8EFFF] overflow-hidden pb-20">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 opacity-5 overflow-hidden">
        <div className="absolute -top-14 -right-20">
          <FlowerDecorationBig />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative container px-4 sm:px-6 lg:px-12 xl:px-20 py-10 sm:py-12 md:py-16 lg:py-20">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 sm:mb-12 md:mb-16 lg:mb-20 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
              <TTSWrapper text={title}>{title}</TTSWrapper>
            </h1>
            <p className="text-base text-black font-normal max-w-2xl">
              <TTSWrapper text={subtitle}>{subtitle}</TTSWrapper>
            </p>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block pt-3">
            <a
              href={ctaLink}
              //   onClick={handleCtaClick}
              className="inline-flex items-center gap-2 bg-[#0A5BE0] text-white font-medium 
                       px-6 py-3 rounded-full transition-all duration-300 hover:bg-blue-700 hover:shadow-lg 
                       group"
            >
              <TTSWrapper text={ctaText}>{ctaText}</TTSWrapper>
              <TopRightArrowWhite />
            </a>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center">
          {/* Image Section */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden bg-gray-200 w-full h-64 sm:h-80 md:h-96 lg:h-[400px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Text Content Section */}
          <div className="order-1 max-w-3xl space-y-4 md:space-y-6 ps-0 md:ps-6 lg:ps-10 leading-tight">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-black leading-tight">
              <TTSWrapper text={sectionTitle}>{sectionTitle}</TTSWrapper>
            </h2>

            <div className="space-y-3 md:space-y-4">
              <p className="text-sm sm:text-base text-black font-normal">
                <TTSWrapper text={description1}>{description1}</TTSWrapper>
              </p>

              {description2 && (
                <p className="text-sm sm:text-base text-black font-normal">
                  <TTSWrapper text={description2}>{description2}</TTSWrapper>
                </p>
              )}
            </div>

            {/* CTA Button - Mobile & Tablet */}
            <div className="lg:hidden pt-4">
              <a
                href={ctaLink}
                // onClick={handleCtaClick}
                className="inline-flex items-center gap-2 bg-[#0A5BE0] text-white font-medium 
                         px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg 
                         group"
              >
                <TTSWrapper text={ctaText}>{ctaText}</TTSWrapper>
                <TopRightArrowWhite />{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NursingCareSection;
