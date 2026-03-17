"use client";
import PageBanner from "@/components/sections/Common/PageBanner";
import TTSWrapper from "@/hooks/TTSWrapper";
import restApiWrapper from "@/service/RestApiWrapper";
import React, { useEffect, useState } from "react";

interface Policy {
  banner_title?: string;
  banner_description?: string;
  title?: string;
  content?: string;
}

function TermsAndCondtions() {
  const [termsAndConditions, setTermsAndConditions] = useState<Policy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchTermsAndConditions = async () => {
      try {
        setIsLoading(true);
        const response = await restApiWrapper.get<Policy>(
          "/policy?slug=terms-and-conditions"
        );
        setTermsAndConditions(response.data);
      } catch (error) {
        console.error("Error fetching terms and conditions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTermsAndConditions();
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
                <TTSWrapper text="Loading Terms and Conditions...">
                  Loading Terms and Conditions...
                </TTSWrapper>
              </p>
              <p className="text-[#0A5BE0] text-sm mt-3 max-w-md">
                <TTSWrapper text="Please wait while we fetch the content">
                  Please wait while we fetch the content
                </TTSWrapper>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={isLoading ? "blur-sm pointer-events-none" : ""}>
        <PageBanner
          title={termsAndConditions?.banner_title || ""}
          breadcrumb="Home / Terms and Conditions"
          image="/common/privacypolicy-banner.png"
          description={termsAndConditions?.banner_description || ""}
        />
        {mounted && (
          <div className="px-8 py-8 lg:px-20 lg:py-15">
            <div>
              <h1 className="text-3xl font-bold">
                <TTSWrapper text={termsAndConditions?.title || ""}>
                  {termsAndConditions?.title || ""}
                </TTSWrapper>
              </h1>
              <div>
                <TTSWrapper text={termsAndConditions?.content || ""}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: termsAndConditions?.content || "",
                    }}
                  />
                </TTSWrapper>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TermsAndCondtions;
