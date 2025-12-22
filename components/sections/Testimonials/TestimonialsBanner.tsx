import TTSWrapper from "@/hooks/TTSWrapper";
import { TestimonialsPageData } from "@/types/Testimonials.type";
import React from "react";
import Link from "next/link";

function TestimonialsBanner({
  testimonialsData,
}: {
  testimonialsData: TestimonialsPageData;
}) {
  return (
    <>
      <div
        className={`min-h-full bg-[#012B71] bg-center flex items-center justify-center pt-12 sm:pt-16 md:pt-20 mb-12 sm:mb-16 md:mb-20`}
      >
        <div className="container mx-auto h-full px-4 py-8 sm:py-12 md:py-16">
          <div className="flex flex-col items-center justify-center h-full text-center pb-5">
            <div
              className="rounded-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-center text-white font-extralight text-xs sm:text-sm md:text-[13px]"
              style={{ border: "1.535px solid rgba(255, 255, 255, 0.50)" }}
            >
              <TTSWrapper text={"Home / Testimonials"}>
                <span className="inline-flex items-center gap-1">
                  <Link href="/" className="cursor-pointer">
                    Home
                  </Link>
                  <span> / </span>
                  <span>Testimonials</span>
                </span>
              </TTSWrapper>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mt-3 sm:mt-4">
              <TTSWrapper
                text={testimonialsData.testimonial_cms.section1_title}
              >
                {testimonialsData.testimonial_cms.section1_title}
              </TTSWrapper>
            </h1>
            <p className="text-white text-sm sm:text-base md:text-lg font-normal mt-2 mb-4 max-w-2xl px-4">
              <TTSWrapper
                text={testimonialsData.testimonial_cms.section1_sub_title}
              >
                {testimonialsData.testimonial_cms.section1_sub_title}
              </TTSWrapper>
            </p>
            <div className="mx-auto mt-5 max-w-[1290px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[570px]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-[40px] "
              >
                <source
                  src={testimonialsData.testimonial_cms.section1_video_value}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestimonialsBanner;
