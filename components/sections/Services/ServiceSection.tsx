import React from "react";
import Image from "next/image";
import TTSWrapper from "@/hooks/TTSWrapper";
import { GreenCheckmark } from "@/components/helpers/svgs";

function ServiceSection() {
  const services = [
    {
      title: "MCM Nursing Care Agency",
      description: "Professional staffing solutions for healthcare facilities",
    },
    {
      title: "Mass Home Care",
      description: "Compassionate, home-based personal care services",
    },
    {
      title: "Mass Training Academy",
      description: "Accredited healthcare training and career development",
    },
  ];

  return (
    <section className="py-12 container mx-auto md:py-16 lg:py-20 my-16 sm:my-20 md:my-25 bg-white">
      <div className="max-w-full px-14 sm:px-16 lg:px-24 justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-25">
          {/* Left Section - Images */}
          <div>
            <div className="flex gap-3 sm:gap-4 md:gap-5">
              {/* First Image */}
              <div className="relative w-full h-64 sm:h-72 md:h-96 lg:h-96 lg:w-74 rounded-2xl overflow-hidden">
                <Image
                  src="/services/service-1.jpg"
                  alt="Elderly woman in wheelchair with care professionals in garden setting"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Second Image */}
              <div className="relative w-full h-64 sm:h-72 md:h-96 lg:h-96 lg:w-140 rounded-2xl overflow-hidden">
                <Image
                  src="/services/service-2.jpg"
                  alt="Close-up of care professional holding elderly woman's hands"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="space-y-5 sm:space-y-6 max-w-2xl">
            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[40px] font-semibold text-black leading-tight">
              <TTSWrapper
                text="Comprehensive Care, Staffing & Training Services"
              >
                Comprehensive Care, Staffing & Training Services
              </TTSWrapper>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-sm lg:text-sm text-black font-normal leading-relaxed mb-6 sm:mb-7 lg:mb-8">
              <TTSWrapper
                text="At Mass Care, we bring together three core pillars of support for the healthcare sector: MCM Nursing Care Agency for professional staffing solutions, Mass Home Care for compassionate, home-based personal care, and the Mass Training Academy for accredited healthcare training and career development. Together, these services ensure quality care delivery, skilled professionals, and continuous growth across the industry."
              >
                At Mass Care, we bring together three core pillars of support
                for the healthcare sector: MCM Nursing Care Agency for
                professional staffing solutions, Mass Home Care for
                compassionate, home-based personal care, and the Mass Training
                Academy for accredited healthcare training and career
                development. Together, these services ensure quality care
                delivery, skilled professionals, and continuous growth across
                the industry.{" "}
              </TTSWrapper>
            </p>

            {/* Services List */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              {services.map((service, index) => (
                <div key={index} className="flex items-start space-x-3 lg:mb-6">
                  {/* Green Checkmark Icon */}
                  <div className="flex-shrink-0 w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mt-0.5">
                   <GreenCheckmark />
                  </div>

                  {/* Service Text */}
                  <div>
                    <h3 className="text-lg sm:text-lg lg:text-xl font-semibold text-black">
                      <TTSWrapper
                        text={service.title}
                        className="text-lg sm:text-lg lg:text-xl font-semibold text-black"
                      >
                        {service.title}
                      </TTSWrapper>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceSection;
