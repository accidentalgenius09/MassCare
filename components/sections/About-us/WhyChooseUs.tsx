"use client";
import React, { useState } from "react";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import EnquireNowPopup from "./EnquireNowPopup";
import { AboutUsDataType } from "@/types/Aboutus.type";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WhyChooseUs: React.FC<{ aboutUsData: AboutUsDataType }> = ({
  aboutUsData,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useRouter();
  return (
    <div className="container mx-auto bg-white pb-16 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            <TTSWrapper text={aboutUsData?.about_cms?.section4_title}>
              {aboutUsData?.about_cms?.section4_title}
            </TTSWrapper>
          </h2>
          <p className="text-black font-normal max-w-2xl mx-auto text-sm">
            <TTSWrapper text={aboutUsData?.about_cms?.section4_description}>
              {aboutUsData?.about_cms?.section4_description}
            </TTSWrapper>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {aboutUsData?.why_choose_us?.map((feature, index) => (
            <div
              key={index}
              className="bg-[#E8EFFF] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                {feature.icon_value && (
                  <Image
                    src={feature.icon_value}
                    alt={feature.icon_alt_text_value}
                    width={64}
                    height={64}
                  />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <TTSWrapper text={feature.title}>{feature.title}</TTSWrapper>
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                <TTSWrapper
                  text={feature.description}
                  className="text-gray-600 text-sm leading-relaxed"
                >
                  {feature.description}
                </TTSWrapper>
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate.push("/contact-us")}
            className="relative overflow-hidden bg-[#0A5BE0] text-white font-medium px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0A5BE0] before:to-[#003C9F] before:content-[''] before:-translate-x-full before:transition-transform before:duration-300 before:z-0 hover:before:translate-x-0"
          >
            <span className="relative z-10 flex items-center gap-2">
              <TTSWrapper text="Contact Us">Contact Us</TTSWrapper>
              <TopRightArrowWhite />
            </span>
          </button>
        </div>
      </div>
      {showPopup && <EnquireNowPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default WhyChooseUs;
