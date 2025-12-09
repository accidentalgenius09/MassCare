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
import { HomeData, MetaData, TestimonialCategory } from "@/types/Home.type";
import TTSWrapper from "@/hooks/TTSWrapper";

function HomePage() {
  const [homeData, setHomeData] = useState<HomeData>();
  const [metaData, setMetaData] = useState<MetaData | null>(null);
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
        const meta = await restApiWrapper.get("/meta-tags?page=home");
        // Parse the metadata if it's a string, otherwise use directly
        const parsedMeta =
          typeof meta.data === "string" ? JSON.parse(meta.data) : meta.data;
        setMetaData(parsedMeta);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!metaData) return;

    // 1. Set title
    if (metaData.meta_title) {
      document.title = metaData.meta_title;
    }

    // 2. Set or create meta description
    let metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    if (metaData.meta_description) {
      metaDescription.setAttribute("content", metaData.meta_description);
    }

    // 3. Set or append meta keywords (with dedupe)
    let metaKeywords = document.querySelector<HTMLMetaElement>(
      'meta[name="keywords"]'
    );
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }

    if (metaData.meta_keywords) {
      const existingKeywords = metaKeywords.getAttribute("content") || "";

      const combinedKeywords = [
        ...existingKeywords.split(","),
        ...metaData.meta_keywords.split(","),
      ]
        .map((k) => k.trim())
        .filter(Boolean);

      const uniqueKeywords = Array.from(new Set(combinedKeywords));

      metaKeywords.setAttribute("content", uniqueKeywords.join(", "));
    }

    // 4. Parse and append other_meta_tags (e.g., <meta name="author" ...>)
    if (metaData.other_meta_tags) {
      try {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = metaData.other_meta_tags;

        const metaTags = tempDiv.querySelectorAll("meta");

        metaTags.forEach((tag) => {
          const name = tag.getAttribute("name") || tag.getAttribute("property");
          const content = tag.getAttribute("content");
          const httpEquiv = tag.getAttribute("http-equiv");

          if (!content && !httpEquiv && !name) return;

          let existingTag: HTMLMetaElement | null = null;

          if (name) {
            existingTag = document.querySelector(
              `meta[name="${name}"], meta[property="${name}"]`
            );
          } else if (httpEquiv) {
            existingTag = document.querySelector(
              `meta[http-equiv="${httpEquiv}"]`
            );
          }

          // Only append if not already present
          if (!existingTag) {
            const newMeta = document.createElement("meta");
            if (name) newMeta.setAttribute("name", name);
            if (httpEquiv) newMeta.setAttribute("http-equiv", httpEquiv);
            if (content) newMeta.setAttribute("content", content);
            document.head.appendChild(newMeta);
          }
        });
      } catch (error) {
        console.error("Error parsing other_meta_tags:", error);
      }
    }

    // 5. Cleanup: optional – restore default title on unmount
    return () => {
      document.title =
        "Mass Care - Professional Nursing, Home Care & Training Services";
    };
  }, [metaData]);

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
              <p className="text-[#0A5BE0] text-sm mt-3 max-w-md">
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
            <ServicesSection
              title={homeData.home_cms.service_title}
              ServiceData={homeData.services}
            />
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
