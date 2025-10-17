import React from "react";
import {
  BadgeCheckIcon,
  CustomerSupport,
  FastPlacementIcon,
  GlobeIcon,
  LocalExpertise,
  QualityAssurance,
  TopRightArrowWhite,
} from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <GlobeIcon />,
      title: "Nationwide Network",
      description:
        "Access to healthcare employers across England, Scotland, Wales, and Northern Ireland through our extensive client network.",
    },
    {
      icon: <BadgeCheckIcon />,
      title: "Quality Matches",
      description:
        "We carefully match registered nurses with positions that align with their skills, experience, and career goals.",
    },
    {
      icon: <FastPlacementIcon />,
      title: "Fast Placement",
      description:
        "Streamlined recruitment process that gets qualified nurses into positions quickly and efficiently.",
    },
    {
      icon: <CustomerSupport />,
      title: "Professional Support",
      description:
        "Dedicated recruitment specialists provide ongoing support throughout the placement process and beyond.",
    },
    {
      icon: <QualityAssurance />,
      title: "Verified Employers",
      description:
        "All our healthcare employers are thoroughly vetted to ensure safe, professional working environments.",
    },
    {
      icon: <LocalExpertise />,
      title: "Local Expertise",
      description:
        "Deep understanding of regional healthcare markets and requirements across different UK locations.",
    },
  ];

  return (
    <div className="w-full bg-white pb-16 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            <TTSWrapper text="Why Choose Us?">Why Choose Us?</TTSWrapper>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
            <TTSWrapper
              text="We are committed to connecting healthcare professionals with meaningful opportunities while helping employers find the right talent for their teams."
              className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base"
            >
              We are committed to connecting healthcare professionals with
              meaningful opportunities while helping employers find the right
              talent for their teams.
            </TTSWrapper>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#E8EFFF] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <TTSWrapper
                  text={feature.title}
                  className="text-xl font-semibold text-gray-900 mb-3"
                >
                  {feature.title}
                </TTSWrapper>
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
          <button className="bg-[#0A5BE0] text-white font-medium px-8 py-3 rounded-full flex items-center gap-2">
            <TTSWrapper text="Book a Consultation">
              Book a Consultation
            </TTSWrapper>
            <TopRightArrowWhite />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
