"use client";
import React from "react";
import { TopRightArrowWhite } from "../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import { useRouter } from "next/navigation";
import Image from "next/image";

const InternalServerError: React.FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-[90vh] bg-[#012B71] w-full flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full text-center">
        <div className="relative mb-8">
          {/* Medical Illustration */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Nurse Standing */}
              <Image
                src="/common/404-patient.png"
                alt="404"
                width={550}
                height={350}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white mb-4">
            <TTSWrapper text="Internal Server Error">
              Internal Server Error
            </TTSWrapper>
          </h1>
          <p className="text-blue-200 text-base max-w-2xl mx-auto text-center leading-relaxed px-4">
            <TTSWrapper
              text="Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since"
              className="text-blue-200 text-base text-center leading-relaxed"
            >
              Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy text of
              the printing and typesetting ndustry. Lorem Ipsum has been the
              industry's standard dummy text ever since
            </TTSWrapper>
          </p>
        </div>

        {/* Go Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 bg-[#0A5BE0] text-white font-medium px-6 sm:px-8 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <TTSWrapper text="Go Back">Go Back </TTSWrapper>
          <TopRightArrowWhite />
        </button>
      </div>
    </div>
  );
};

export default InternalServerError;
