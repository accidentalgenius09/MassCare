"use client";
import React, { useEffect, useState } from "react";
import HowItWorksSection from "./HowItWorksSection";
import WhyChooseSection from "./WhyChooseSection";
import TrustedInstitutionsSection from "./TrustedInstitutionsSection";
import TestimonialsSection from "./TestimonialsSection";
import AccreditationsSection from "./AccreditationsSection";
import HeroSection from "./HeroSection";
import QuickConnect from "./QuickConnectSection";
import ServicesSection from "./ServicesSection";
import CareerPathwaysSection from "./CareerPathways";
import WelcomeSectionHome from "./WelcomeSectionHome";
import restApiWrapper from "@/service/RestApiWrapper";
import { HomeData, TestimonialCategory } from "@/types/Home.type";
import TTSWrapper from "@/hooks/TTSWrapper";

function HomePage() {
  const [homeData, setHomeData] = useState<HomeData>();
  const [isLoading, setIsLoading] = useState(true);
  const [purposeOfEnquiries, setPurposeOfEnquiries] = useState<
    TestimonialCategory[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await restApiWrapper.get("/home");
        setHomeData(response.data);
        const response2 = await restApiWrapper.get("/get-purpose-of-enquiries");
        setPurposeOfEnquiries(response2.data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
                <TTSWrapper text="Loading Home Page...">
                  Loading Home Page...
                </TTSWrapper>
              </p>
              <p className="text-gray-600 text-sm mt-3 max-w-md">
                <TTSWrapper text="Please wait while we fetch the latest content">
                  Please wait while we fetch the latest content
                </TTSWrapper>
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className={`w-full overflow-x-hidden ${
          isLoading ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {homeData && <HeroSection homeData={homeData} />}
        {homeData?.home_cms && (
          <WelcomeSectionHome homeData={homeData.home_cms} page="home" />
        )}
        {homeData && (
          <>
            <HowItWorksSection homeData={homeData} />
            <WhyChooseSection homeData={homeData} />
            <TrustedInstitutionsSection homeData={homeData} />
            <TestimonialsSection
              testimonials={homeData.testimonials}
              title={homeData.home_cms.testimonial_title}
            />
            <AccreditationsSection homeData={homeData} />
            <ServicesSection ServiceData={homeData.services} />
            <CareerPathwaysSection homeData={homeData} />
            <QuickConnect
              homeData={homeData}
              purposeOfEnquiries={purposeOfEnquiries}
            />
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;
