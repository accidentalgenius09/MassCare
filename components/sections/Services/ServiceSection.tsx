import React from "react";
import Image from "next/image";
import TTSWrapper from "@/hooks/TTSWrapper";
import { GreenCheckmark } from "@/components/helpers/svgs";
import { ServicesPageData } from "@/types/Service.type";

function ServiceSection({ servicesData }: { servicesData: ServicesPageData }) {
  return (
    <section className="py-12 container mx-auto md:py-16 lg:py-20 my-16 sm:my-20 md:my-25 bg-white">
      <div className="max-w-full px-14 sm:px-16 lg:px-24 justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-25">
          {/* Left Section - Images */}
          <div>
            <div className="flex gap-3 sm:gap-4 md:gap-5">
              {/* First Image */}
              <div className="relative w-full h-64 sm:h-72 md:h-96 lg:h-96 lg:w-1/2 rounded-2xl overflow-hidden">
                <Image
                  src={servicesData.service_cms.image_one_value}
                  alt={servicesData.service_cms.image_one_alt_text_value || servicesData.service_cms.title || "Service image"}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Second Image */}
              <div className="relative w-full h-64 sm:h-72 md:h-96 lg:h-96 lg:w-3/4 rounded-2xl overflow-hidden">
                <Image
                  src={servicesData.service_cms.image_two_value}
                  alt={servicesData.service_cms.image_two_alt_text_value || servicesData.service_cms.title || "Service image"}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                />
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="space-y-5 sm:space-y-6 max-w-2xl">
            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[40px] font-semibold text-black leading-tight">
              <TTSWrapper text={servicesData.service_cms.title}>
                {servicesData.service_cms.title}
              </TTSWrapper>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-sm lg:text-sm text-black font-normal leading-relaxed mb-6 sm:mb-7 lg:mb-8">
              <TTSWrapper text={servicesData.service_cms.description}>
                {servicesData.service_cms.description}
              </TTSWrapper>
            </p>

            {/* Services List */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              {servicesData.services.map((service, index) => (
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
