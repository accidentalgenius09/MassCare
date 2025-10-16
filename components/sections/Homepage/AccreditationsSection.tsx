"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import TTSWrapper from "@/hooks/TTSWrapper";

const AccreditationsSection = () => {
  const accreditations = [
    { name: "Care Quality Commission", logo: "/logos/careQC.png" },
    { name: "CPD CERTIFIED", logo: "/logos/cpd.png" },
    { name: "skillsforcare", logo: "/logos/skillsforcare.png" },
    { name: "DBS", logo: "/logos/dbs.png" },
    { name: "Care Quality Commission", logo: "/logos/careQC.png" },
    { name: "CPD CERTIFIED", logo: "/logos/cpd.png" },
    { name: "skillsforcare", logo: "/logos/skillsforcare.png" },
    { name: "DBS", logo: "/logos/dbs.png" },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            <TTSWrapper
              text="Our Accreditations"
              className="text-4xl font-bold text-gray-900 mb-8"
            >
              Our Accreditations
            </TTSWrapper>
          </h2>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {accreditations.map((accreditation, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_22%] mx-auto me-2"
              >
                <div className="text-center px-2">
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "250px",
                      height: "120px",
                      borderRadius: "40px",
                      border: "1px solid #C7C7C7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="mx-auto"
                  >
                    <Image
                      src={accreditation.logo}
                      alt={accreditation.name}
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccreditationsSection;
