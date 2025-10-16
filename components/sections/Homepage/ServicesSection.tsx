import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Checkbox,
  TopRightArrowBlack,
  TopRightArrowWhite,
} from "../../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";

const ServicesSection = () => {
  const services = [
    {
      title: "MCM Nursing Care Agency",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. simply Ipsum is simply",
      image: "/services/oru-service1.png",
      features: ["1500+ pros", "Temp & Perm Roles", "Global Sourcing"],
    },
    {
      title: "Mass Home Care",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. simply Ipsum is simply",
      image: "/services/oru-service3.png",
      features: ["BLS", "ALS", "OSCE/CBT prep"],
    },
    {
      title: "Mass Training Academy",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. simply Ipsum is simply",
      image: "/services/oru-service2.png",
      features: ["24/7 support", "All-day sitting", "CQC-rated"],
    },
  ];

  return (
    <div className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          <TTSWrapper
            text="Our Services"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
          >
            Our Services
          </TTSWrapper>
        </h2>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl overflow-hidden max-w-[431px] h-[600px]"
            >
              {/* Card Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              </div>

              {/* Card Content - Positioned on top of image */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6 m-3 text-black"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "40px",
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
                        fontSize: "30px",
                        fontStyle: "normal",
                        fontWeight: 300,
                        lineHeight: "40px",
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
                            fontSize: "30px",
                            fontStyle: "normal",
                            fontWeight: 300,
                            lineHeight: "40px",
                            wordBreak: "break-word",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            maxHeight: "80px",
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
                <p className="text-sm mb-4 leading-relaxed">
                  <TTSWrapper
                    text={service.description}
                    className="text-sm mb-4 leading-relaxed"
                  >
                    {service.description}
                  </TTSWrapper>
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Checkbox />
                      <span className="text-sm font-semibold">
                        <TTSWrapper
                          text={feature}
                          className="text-sm font-semibold"
                        >
                          {feature}
                        </TTSWrapper>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Explore More Link */}
                <button className="flex items-center gap-2 font-medium text-sm transition-colors group cursor-pointer">
                  <TTSWrapper
                    text="Explore More"
                    className="flex items-center font-medium text-sm transition-colors group cursor-pointer"
                  >
                    Explore More
                  </TTSWrapper>
                  <TopRightArrowBlack />
                </button>
              </div>
            </div>
          ))}
        </div>

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
                  typesetting industry. Lorem Ipsum has been the industry's
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
                  >Explore Career Routes</TTSWrapper>
                  <TopRightArrowWhite />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-64 lg:h-auto">
              <img
                src="/services/careerpathways.png"
                alt="Healthcare professional with elderly patient"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
