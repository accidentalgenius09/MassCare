import React from "react";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import { McmNursingCareAgencyServiceDetail } from "@/types/Service.type";

interface TrustedPartnerBannerProps {
  buttonText?: string;
  MCMData: McmNursingCareAgencyServiceDetail;
}

const TrustedPartnerBanner: React.FC<TrustedPartnerBannerProps> = ({
  buttonText = "Download Brochure",
  MCMData,
}) => {
  const handleDownload = () => {
    const brochureUrl = MCMData?.service_detail_cms?.brochure_value;
    if (brochureUrl) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = brochureUrl;
      link.download = brochureUrl.split("/").pop() || "brochure";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className="pt-1 pb-12 md:pt-1 md:pb-16 lg:pt-1 lg:pb-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-32">
        <div className="bg-[#00235C] rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
            {/* Left Content */}
            <div className="flex-1 space-y-4">
              <h2 className="text-5xl font-medium text-white max-w-4xl leading-tight">
                <TTSWrapper text={MCMData?.service_detail_cms?.brochure_title}>
                  {MCMData?.service_detail_cms?.brochure_title}
                </TTSWrapper>
              </h2>

              <p className="text-base text-white leading-relaxed">
                <TTSWrapper
                  text={MCMData?.service_detail_cms?.brochure_subtitle}
                >
                  {MCMData?.service_detail_cms?.brochure_subtitle}
                </TTSWrapper>
              </p>
            </div>

            {/* Right Button */}
            <div className="flex-shrink-0">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 bg-[#0A5BE0] hover:bg-blue-700 cursor-pointer text-white font-normal px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 hover:shadow-lg active:scale-100 group w-full lg:w-auto justify-center"
              >
                <TTSWrapper text={buttonText}>{buttonText}</TTSWrapper>
                <TopRightArrowWhite />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartnerBanner;
