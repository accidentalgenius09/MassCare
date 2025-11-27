"use client";
import PageBanner from "@/components/sections/Common/PageBanner";
import ServiceSection from "@/components/sections/Services/ServiceSection";
import React, { useEffect, useState } from "react";
import NursingCareSection from "@/components/sections/Services/MCMSection";
import MassHomeCareSection from "@/components/sections/Services/MassHomeCareSection";
import restApiWrapper from "@/service/RestApiWrapper";
import { ServicesPageData } from "@/types/Service.type";
import TTSWrapper from "@/hooks/TTSWrapper";

function Services() {
  const [servicesData, setServicesData] = useState<ServicesPageData>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchServicesData = async () => {
      setIsLoading(true);
      try {
        const response = await restApiWrapper.get("/services");
        setServicesData(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServicesData();
  }, []);
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[9999]">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Animated Spinner */}
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[#E8EFFF] rounded-full"></div>
              <div className="w-20 h-20 border-4 border-[#0A5BE0] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#0A5BE0] rounded-full animate-pulse"></div>
              </div>
            </div>
            {/* Loading Text */}
            <div className="text-center">
              <p className="text-[#0A5BE0] text-xl font-semibold animate-pulse">
                <TTSWrapper text="Loading Services...">
                  Loading Services...
                </TTSWrapper>
              </p>
              <p className="text-gray-600 text-sm mt-3 max-w-md">
                <TTSWrapper text="Please wait while we fetch the services information">
                  Please wait while we fetch the services information
                </TTSWrapper>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={isLoading ? "blur-sm pointer-events-none" : ""}>
        <PageBanner
          title={servicesData?.banner.banner_title}
          breadcrumb="Home / Services"
          description={servicesData?.banner.banner_description}
        />
        {servicesData && (
          <>
            <ServiceSection servicesData={servicesData} />
            {servicesData.services.map((service) => {
              // Map service_facilities to sections format
              const sections = service.service_facilities?.map((facility) => ({
                sectionTitle: facility.title,
                imageSrc: facility.image_value,
                imageAlt: facility.image_alt_text_value,
              }));
              const sections2 = service.service_facilities?.map((facility) => ({
                title: facility.title,
                imageSrc: facility.image_value,
                imageAlt: facility.image_alt_text_value,
              }));

              if (service.slug === "mcm-nursing-care-agency") {
                return (
                  <NursingCareSection
                    key={service.id}
                    title={service.title}
                    subtitle={service.subtitle}
                    ctaLink={`/services/${service.slug}`}
                    sections={sections}
                  />
                );
              }
              if (service.slug === "mass-home-care") {
                return (
                  <MassHomeCareSection
                    title={service.title}
                    subtitle={service.subtitle}
                    key={service.id}
                    services={sections2}
                  />
                );
              }
              if (service.slug === "mass-training-academy") {
                return (
                  <NursingCareSection
                    key={service.id}
                    title={service.title}
                    subtitle={service.subtitle}
                    imageSrc="/services/mass-training.jpg"
                    imageAlt="Mass Training Academy"
                    ctaLink={`/services/${service.slug}`}
                    sections={sections}
                  />
                );
              }
              return null;
            })}
          </>
        )}
      </div>
    </>
  );
}

export default Services;
