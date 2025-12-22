"use client";

import TTSWrapper from "@/hooks/TTSWrapper";
import { HomeCms } from "@/types/Home.type";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WelcomeSectionHome = ({
  homeData,
  page = "other",
}: {
  homeData: HomeCms;
  page: string;
}) => {
  const router = useRouter();
  return (
    <section className="pb-2 pt-8 sm:pt-12 md:pt-16 bg-white text-black">
      <div
        className={`container mx-auto ${page === "home" ? "px-4 lg:px-24" : "px-4"}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 ms-0 sm:ms-4 md:ms-6 me-0 sm:me-6 md:me-10 justify-between">
          {/* Left Content */}
          <div>
            <TTSWrapper text={homeData.title}>
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-gray-900 mb-2">
                {homeData.title}
              </h2>
            </TTSWrapper>

            <div className="justify-start text-neutral-900 text-lg sm:text-xl md:text-2xl font-normal mb-3 sm:mb-4 max-w-lg">
              <TTSWrapper text={homeData.sub_title}>
                {homeData.sub_title}
              </TTSWrapper>
            </div>

            <div className="max-w-2xl">
              <TTSWrapper text={homeData.description || ""}>
                <p className="text-black font-normal text-xs sm:text-sm">
                  {homeData.description || ""}
                </p>
              </TTSWrapper>
            </div>
          </div>

          {/* Right Content - Mission, Vision & Accreditation */}
          <div
            onClick={() => router.push("/about-us")}
            className={`ml-0 cursor-pointer sm:ml-12 md:ml-24`}
          >
            {/* Mission */}
            <div className="px-4 sm:px-5 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-3 sm:pb-4 rounded-2xl sm:rounded-3xl md:rounded-[40px] border border-gray-200">
              <div className="mb-3 sm:mb-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                  <TTSWrapper text={homeData.mission_title || ""}>
                    {homeData.mission_title || ""}
                  </TTSWrapper>
                </h2>
                <p className="text-sm sm:text-base md:text-lg font-normal">
                  <TTSWrapper text={homeData.mission_description || ""}>
                    {homeData.mission_description || ""}
                  </TTSWrapper>
                </p>
              </div>
              <div className="mb-3 sm:mb-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                  <TTSWrapper text={homeData.vision_title || ""}>
                    {homeData.vision_title || ""}
                  </TTSWrapper>
                </h2>
                <p className="text-sm sm:text-base md:text-lg font-normal">
                  <TTSWrapper text={homeData.vision_description || ""}>
                    {homeData.vision_description || ""}
                  </TTSWrapper>
                </p>
              </div>
              <div className="inline-flex items-center space-x-2 sm:space-x-3 pt-2 sm:pt-3">
                <Image
                  src={homeData.image_value || ""}
                  alt={homeData.image_alt_text_value || ""}
                  width={100}
                  height={80}
                  className="sm:w-[130px] sm:h-[100px]"
                  loading="lazy"
                  sizes="(max-width: 640px) 100px, 130px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSectionHome;
