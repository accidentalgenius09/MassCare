"use client";
import React from "react";
import { Checkbox, TopRightArrowBlack } from "../../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Service } from "@/types/Aboutus.type";

const ServicesSection = ({ ServiceData }: { ServiceData: Service[] }) => {
  const router = useRouter();
  return (
    <>
      <div className="container mx-auto bg-white pb-8 sm:pb-12 md:pb-16 pt-8 sm:pt-10 md:pt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto">
          {/* Section Header */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
            <TTSWrapper
              text="Our Services"
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8"
            >
              Our Services
            </TTSWrapper>
          </h2>
          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {ServiceData?.map((service, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden max-w-full h-[600px] sm:h-[700px] md:h-[800px]"
              >
                {/* Card Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={service.image_value}
                    alt={service.image_alt_text_value}
                    fill
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div> */}
                </div>

                {/* Card Content - Positioned on top of image */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 m-2 sm:m-3 text-black"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "30px",
                  }}
                >
                  {(() => {
                    // Split words from service.title, separate the last word
                    const words = service.title.split(" ");
                    const firstLine = words.slice(0, -1).join(" ");
                    const lastWord = words[words.length - 1];

                    // Helper: build <h3> with forced linebreak before last word
                    const h3 = (
                      <h3
                        style={{
                          color: "#111",
                          fontSize: "clamp(18px, 4vw, 30px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "clamp(24px, 5vw, 40px)",
                          // Prevent default text wrapping
                          wordBreak: "break-word",
                          overflow: "visible",
                        }}
                      >
                        {firstLine}
                        <br />
                        {lastWord}
                      </h3>
                    );

                    // If more than 2 lines by heuristics (>6 words?), use ellipsis and tooltip
                    if (words.length > 6) {
                      // We approximate line-length at 3 words per line for 30px, so 7+ is >2 lines
                      return (
                        <div
                          title={service.title}
                          style={{
                            display: "inline-block",
                            maxWidth: "100%",
                            cursor: "pointer",
                          }}
                        >
                          <h3
                            style={{
                              color: "#111",
                              fontSize: "clamp(18px, 4vw, 30px)",
                              fontStyle: "normal",
                              fontWeight: 300,
                              lineHeight: "clamp(24px, 5vw, 40px)",
                              wordBreak: "break-word",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              maxHeight: "clamp(48px, 10vw, 80px)",
                              // Show ellipsis [...], but last word on new line
                            }}
                          >
                            {firstLine.length > 0 ? (
                              <>
                                {firstLine + "..."}
                                <br />
                                {lastWord}
                              </>
                            ) : (
                              lastWord
                            )}
                          </h3>
                        </div>
                      );
                    }
                    return h3;
                  })()}
                  <p className="text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    <TTSWrapper
                      text={service.subtitle}
                      className="text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed"
                    >
                      {service.subtitle}
                    </TTSWrapper>
                  </p>

                  {/* Features List */}
                  <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 sm:gap-2"
                      >
                        <Checkbox />
                        <span className="text-sm sm:text-base md:text-lg font-semibold">
                          <TTSWrapper
                            text={feature}
                            className="text-sm sm:text-base md:text-lg font-semibold"
                          >
                            {feature}
                          </TTSWrapper>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Explore More Link */}
                  <button
                    onClick={() => router.push(`services/${service.slug}`)}
                    className="flex items-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm transition-all duration-300 hover:gap-2 hover:text-blue-600 group cursor-pointer"
                  >
                    <TTSWrapper text="Explore More">Explore More</TTSWrapper>
                    <TopRightArrowBlack />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesSection;
