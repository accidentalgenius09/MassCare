"use client";
import PageBanner from "@/components/sections/Common/PageBanner";
import WorkingForUs from "@/components/sections/Common/WorkingForUs";
import TestimonialsSection from "@/components/sections/Homepage/TestimonialsSection";
import CareNursingAgency from "@/components/sections/Services/NursingCare/CareNursingAgency";
import CQCRatingCard from "@/components/sections/Services/NursingCare/CQCRatingCard";
import TrustedPartnerBanner from "@/components/sections/Services/NursingCare/TrustedPartnerBanner";
import UpcomingCoursesSection from "@/components/sections/Services/MassTraining/UpcomingCoursesSection";
import React, { useEffect, useState } from "react";
import CoursesOffered from "@/components/sections/Services/MassTraining/CoursesOffered";
import restApiWrapper from "@/service/RestApiWrapper";
import {
  McmNursingCareAgencyServiceDetail,
  ServiceTestimonial,
} from "@/types/Service.type";
import { Testimonial } from "@/types/Home.type";
import TTSWrapper from "@/hooks/TTSWrapper";

function MassTrainingAcademyPage() {
  const [MCMData, setMCMData] = useState<McmNursingCareAgencyServiceDetail>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMCMData = async () => {
      try {
        setIsLoading(true);
        const response = await restApiWrapper.get(
          "/service-details?slug=mass-training-academy"
        );
        setMCMData(response.data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMCMData();
  }, []);

  const transformTestimonials = (
    serviceTestimonials: ServiceTestimonial[]
  ): Testimonial[] => {
    return serviceTestimonials.map((testimonial) => ({
      id: testimonial.id,
      name: testimonial.name,
      place: testimonial.location,
      description: testimonial.comment,
      rating: testimonial.rating,
      image_value: testimonial.image_value,
      image_alt_text_value: testimonial.image_alt_text_value,
    }));
  };
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
                <TTSWrapper text="Loading...">Loading...</TTSWrapper>
              </p>
              <p className="text-[#0A5BE0] text-sm mt-3 max-w-md">
                <TTSWrapper text="Please wait while we fetch the service details">
                  Please wait while we fetch the service details
                </TTSWrapper>
              </p>
            </div>
          </div>
        </div>
      )}
      <PageBanner
        title={MCMData?.banner_title}
        breadcrumb={`Home / Services / ${MCMData?.banner_title}`}
        description={MCMData?.banner_description}
      />
      {MCMData && (
        <>
          <CareNursingAgency MCMData={MCMData} whatWeDo={false} />
          <CoursesOffered MCMData={MCMData} />
          <UpcomingCoursesSection MCMData={MCMData} />
          <div id="enrollform">
            <WorkingForUs MCMData={MCMData} />
          </div>
          <div className="mt-20">
            <TrustedPartnerBanner MCMData={MCMData} />
          </div>
          <TestimonialsSection
            showTabs={false}
            testimonials={
              MCMData?.service_testimonials
                ? transformTestimonials(MCMData?.service_testimonials)
                : []
            }
            title={MCMData?.service_detail_cms?.testimonial_title || ""}
          />
          <CQCRatingCard MCMData={MCMData} />
        </>
      )}
    </>
  );
}

export default MassTrainingAcademyPage;
