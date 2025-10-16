import React from "react";
import { Checkbox, TopRightArrowWhite } from "../../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import Image from "next/image";

const CareerPathwaysSection = () => {
  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Career Pathways Section */}
        <div
          style={{
            background: "rgba(1, 35, 103, 1)",
          }}
          className="rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Content */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white ">
                <TTSWrapper
                  text="Career Pathways"
                  className="text-3xl sm:text-4xl font-bold text-white "
                >
                  Career Pathways
                </TTSWrapper>
              </h2>
              <p className="text-white text-2xl mb-6">
                <TTSWrapper
                  text="From Level 2 to Level 5..."
                  className="text-white text-2xl mb-6"
                >
                  From Level 2 to Level 5...
                </TTSWrapper>
              </p>

              <p className="text-white text-sm mb-8 leading-relaxed">
                <TTSWrapper
                  text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley"
                  className="text-white text-sm mb-8 leading-relaxed"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s when an unknown
                  printer took a galley
                </TTSWrapper>
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Checkbox />
                  <p className="text-white text-sm">
                    <strong>
                      <TTSWrapper
                        text="Fully Funded NVQ (RQF Career Progression)"
                        className="text-white text-sm"
                      >
                        Fully Funded NVQ (RQF Career Progression)
                      </TTSWrapper>
                    </strong>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox />
                  <p className="text-white text-sm">
                    <strong>
                      <TTSWrapper
                        text="Training available from Level 2 through Level 5"
                        className="text-white text-sm"
                      >
                        Training available from Level 2 through Level 5
                      </TTSWrapper>
                    </strong>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox />
                  <p className="text-white text-sm">
                    <strong>
                      <TTSWrapper
                        text="CPD‑Accredited Training A wide selection of Continuing Professional Development (CPD) courses."
                        className="text-white text-sm"
                      >
                        CPD‑Accredited Training A wide selection of Continuing
                        Professional Development (CPD) courses.
                      </TTSWrapper>
                    </strong>
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <button
                  className="text-white px-6 py-3 flex items-center gap-2 group cursor-pointer"
                  style={{
                    borderRadius: "300px",
                    background: "#0A5BE0",
                  }}
                >
                  <TTSWrapper
                    text="Explore Career Routes"
                    className="text-white flex items-center gap-1 group cursor-pointer"
                  >
                    Explore Career Routes
                  </TTSWrapper>
                  <TopRightArrowWhite />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-64 lg:h-auto">
              <Image
                src="/services/careerpathways.png"
                alt="Healthcare professional with elderly patient"
                fill
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPathwaysSection;
