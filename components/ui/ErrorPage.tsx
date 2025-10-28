"use client";
import React from "react";
import TTSWrapper from "@/hooks/TTSWrapper";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TopRightArrowWhite } from "@/components/helpers/svgs";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-[80vh] bg-[#012B71] w-full flex items-center justify-center px-4 pt-8 pb-20">
      <div className="max-w-4xl w-full text-center my-auto">
        <div className="relative mb-8">
          {/* Medical Illustration */}
          <div className={`flex items-center justify-center mt-10`}>
            <div className="relative">
              {/* Nurse Standing */}
              <Image
                src={"/common/404-patient.png"}
                alt={"Internal Server Error"}
                width={450}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-5">
          <h1 className={`text-5xl font-semibold text-white mb-2`}>
            <TTSWrapper
              className={`text-5xl font-semibold text-white mb-2`}
              text={"Internal Server Error"}
            >
              Internal Server Error
            </TTSWrapper>
          </h1>
          <p
            className={`text-blue-200 text-base max-w-3xl mx-auto text-center leading-relaxed px-4`}
          >
            <TTSWrapper
              text={
                "Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry standard dummy text ever since"
              }
              className="text-blue-200 text-base max-w-2xl mx-auto text-center leading-relaxed"
            >
              Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy text of
              the printing and typesetting ndustry. Lorem Ipsum has been the
              industry standard dummy text ever since
            </TTSWrapper>
          </p>
        </div>

        {/* Go Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 bg-[#0A5BE0] text-white font-medium px-10 py-3 rounded-full"
        >
          <TTSWrapper text="Go Back">Go Back </TTSWrapper>
          <TopRightArrowWhite />
        </button>
      </div>
    </div>
  );
};

export default Page;
