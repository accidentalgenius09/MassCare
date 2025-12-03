"use client";
import PageBanner from "@/components/sections/Common/PageBanner";
import ServiceSection from "@/components/sections/Services/ServiceSection";
import React, { useEffect, useState } from "react";
import NursingCareSection from "@/components/sections/Services/MCMSection";
import MassHomeCareSection from "@/components/sections/Services/MassHomeCareSection";
import restApiWrapper from "@/service/RestApiWrapper";
import { ServicesPageData } from "@/types/Service.type";
import TTSWrapper from "@/hooks/TTSWrapper";
import { MetaData } from "@/types/Home.type";

function Services() {
  const [isLoading, setIsLoading] = useState(true);
  const [servicesData, setServicesData] = useState<ServicesPageData>();
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  useEffect(() => {
    const fetchServicesData = async () => {
      setIsLoading(true);
      try {
        const response = await restApiWrapper.get("/services");
        const meta = await restApiWrapper.get("/meta-tags?page=services");
        // Parse the metadata if it's a string, otherwise use directly
        const parsedMeta =
          typeof meta.data === "string" ? JSON.parse(meta.data) : meta.data;
        setMetaData(parsedMeta);
        setServicesData(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServicesData();
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
                <TTSWrapper text="Loading Services...">
                  Loading Services...
                </TTSWrapper>
              </p>
              <p className="text-[#0A5BE0] text-sm mt-3 max-w-md">
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
