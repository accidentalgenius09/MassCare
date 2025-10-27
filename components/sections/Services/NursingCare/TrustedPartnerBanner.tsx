import React from "react";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";

interface TrustedPartnerBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

const TrustedPartnerBanner: React.FC<TrustedPartnerBannerProps> = ({
  title = "Your Trusted Partner in Permanent Healthcare Staffing",
  description = "Discover how we connect registered nurses with top healthcare employers across the UK.",
  buttonText = "Download Brochure",
}) => {
  return (
    <section className="pt-1 pb-12 md:pt-1 md:pb-16 lg:pt-1 lg:pb-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-32">
        <div className="bg-[#00235C] rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
            {/* Left Content */}
            <div className="flex-1 space-y-4">
              <h2 className="text-5xl font-medium text-white max-w-4xl leading-tight">
                <TTSWrapper text={title}>{title}</TTSWrapper>
              </h2>

              <p className="text-base text-white leading-relaxed">
                <TTSWrapper text={description}>{description}</TTSWrapper>
              </p>
            </div>

            {/* Right Button */}
            <div className="flex-shrink-0">
              <button className="inline-flex items-center gap-2 bg-[#0A5BE0] hover:bg-blue-700 cursor-pointer text-white font-normal px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 hover:shadow-lg active:scale-100 group w-full lg:w-auto justify-center">
                <TTSWrapper
                  text={buttonText}
                >
                  {buttonText}
                </TTSWrapper>
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
