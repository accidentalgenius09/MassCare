import React from "react";
import Image from "next/image";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";

interface ServiceItem {
  title: string;
  description1: string;
  description2: string;
  imageSrc: string;
  imageAlt: string;
}

interface MassHomeCareSectionProps {
  title?: string;
  subtitle?: string;
  services?: ServiceItem[];
  ctaText?: string;
  ctaLink?: string;
}

const MassHomeCareSection: React.FC<MassHomeCareSectionProps> = ({
  title = "Mass Home Care",
  subtitle = "Comprehensive home healthcare services with emergency medical support and professional training programs.",
  services = [
    {
      title: "Personalized Care",
      description1:
        "From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates",
      description2:
        "From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates.",
      imageSrc: "/services/caretaking-nurse.jpg",
      imageAlt: "Caregiver holding elderly woman's hands",
    },
    {
      title: "Medication Management",
      description1:
        "From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates",
      description2:
        "From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates.",
      imageSrc: "/services/mass-care2.png",
      imageAlt: "Caregiver with patient in garden setting",
    },
    {
      title: "Post-Hospital Support",
      description1:
        "From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates",
      description2:
        "From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates.",
      imageSrc: "/services/mass-care3.jpg",
      imageAlt: "Caregiver assisting elderly woman with walker",
    },
    {
      title: "Dementia Care",
      description1:
        "From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates",
      description2:
        "From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates.",
      imageSrc: "/services/mass-care4.jpg",
      imageAlt: "Caregiver assisting elderly woman with walker",
    },
  ],
  ctaText = "Know More",
  ctaLink = "#",
}) => {
  return (
    <section className="relative bg-white overflow-hidden py-12 md:py-16 lg:py-20 mb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-10 sm:mb-12 md:mb-16 lg:mb-20 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-black font-normal max-w-2xl">
              {subtitle}
            </p>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <a
              href={ctaLink}
              className="inline-flex items-center gap-2 bg-[#0A5BE0] hover:bg-[#0838A0] text-white font-medium 
                       px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg 
                       group mt-3"
            >
              <TTSWrapper text={ctaText} className="text-white">
                {ctaText}
              </TTSWrapper>
              <TopRightArrowWhite />
            </a>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center"
              >
                {/* Image Section */}
                {isEven ? (
                  <>
                    <div className="order-2 lg:order-1">
                      <div className="relative rounded-2xl overflow-hidden bg-gray-200 w-full h-56 sm:h-64 md:h-80 lg:h-96 xl:h-[450px]">
                        <Image
                          src={service.imageSrc}
                          alt={service.imageAlt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Text Content Section */}
                    <div className="order-1 max-w-3xl space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 lg:ps-10 md:ps-8 sm:ps-4 ps-0">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-black leading-tight">
                        <TTSWrapper
                          text={service.title}
                        >
                          {service.title}
                        </TTSWrapper>
                      </h2>

                      <div className="space-y-3 sm:space-y-4">
                      <p className="text-sm sm:text-base text-black font-normal leading-relaxed">
                      <TTSWrapper
                            text={service.description1}
                          >
                            {service.description1}
                          </TTSWrapper>
                        </p>

                        <p className="text-sm sm:text-base text-black font-normal leading-relaxed">
                        <TTSWrapper
                            text={service.description2}
                          >
                            {service.description2}
                          </TTSWrapper>
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Text Content Section */}
                    <div className="order-1 max-w-3xl lg:pe-10 md:pe-8 sm:pe-4 pe-0 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-black leading-tight">
                        <TTSWrapper
                          text={service.title}
                        >
                          {service.title}
                        </TTSWrapper>
                      </h2>

                      <div className="space-y-3 sm:space-y-4">
                      <p className="text-sm sm:text-base text-black font-normal leading-relaxed">
                      <TTSWrapper
                            text={service.description1}
                          >
                            {service.description1}
                          </TTSWrapper>
                        </p>

                        <p className="text-sm sm:text-base text-black font-normal leading-relaxed">
                        <TTSWrapper
                            text={service.description2}
                          >
                            {service.description2}
                          </TTSWrapper>
                        </p>
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="order-2 lg:order-2">
                      <div className="relative rounded-2xl overflow-hidden bg-gray-200 w-full h-56 sm:h-64 md:h-80 lg:h-96 xl:h-[450px]">
                        <Image
                          src={service.imageSrc}
                          alt={service.imageAlt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Button - Mobile & Tablet */}
        <div className="lg:hidden mt-8 sm:mt-10 md:mt-12">
          <a
            href={ctaLink}
            className="inline-flex items-center gap-2 bg-[#0A5BE0] hover:bg-[#0838A0] text-white font-medium 
                     px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-300 hover:shadow-lg 
                     group text-sm sm:text-base"
          >
            <TTSWrapper text={ctaText} className="text-white">
              {ctaText}
            </TTSWrapper>
            <TopRightArrowWhite />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MassHomeCareSection;
