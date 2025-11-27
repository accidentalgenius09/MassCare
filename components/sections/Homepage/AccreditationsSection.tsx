"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import TTSWrapper from "@/hooks/TTSWrapper";
import { HomeData } from "@/types/Home.type";

const AccreditationsSection = ({ homeData }: { homeData: HomeData }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      dragFree: false,
      containScroll: "trimSnaps",
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      }),
    ]
  );

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">
            <TTSWrapper
              text={homeData?.home_cms?.accreditation_title}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8"
            >
              {homeData?.home_cms?.accreditation_title}
            </TTSWrapper>
          </h2>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {homeData?.accreditations?.map((accreditation, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-2 sm:px-3 md:px-4"
              >
                <div className="text-center">
                  <div
                    style={{
                      width: "100%",
                      height: "90px",
                      borderRadius: "30px",
                      border: "1px solid #C7C7C7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="mx-auto sm:h-[90px] md:h-[110px] sm:rounded-[35px] md:rounded-[40px]"
                  >
                    <Image
                      src={accreditation.icon_value}
                      alt={accreditation.icon_alt_text_value}
                      width={100}
                      height={100}
                      className="object-contain w-[70%] h-[70%] sm:w-[75%] sm:h-[75%] md:w-[80%] md:h-[80%]"
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
