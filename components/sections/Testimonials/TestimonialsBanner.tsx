import TTSWrapper from "@/hooks/TTSWrapper";
import React from "react";

function TestimonialsBanner() {
  return (
    <>
      <div
        className={`min-h-[99vh] bg-[#012B71] bg-center flex items-center justify-center pt-20 mb-20`}
      >
        <div className="container mx-auto h-full px-4">
          <div className="flex flex-col items-center justify-center h-full text-center pb-5">
            <div
              className="rounded-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-center text-white font-extralight text-xs sm:text-sm md:text-[13px]"
              style={{ border: "1.535px solid rgba(255, 255, 255, 0.50)" }}
            >
              <TTSWrapper text={"Home / Testimonials"}>
                Home / Testimonials
              </TTSWrapper>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mt-3 sm:mt-4">
              <TTSWrapper text={"Testimonials"}>Testimonials</TTSWrapper>
            </h1>
            <p className="text-white text-sm sm:text-base md:text-lg font-normal mt-2 max-w-2xl px-4">
              <TTSWrapper
                text={
                  "Lorem Ipsum 8 years of meaningful care... care without compromise."
                }
              >
                Lorem Ipsum 8 years of meaningful care... care without
                compromise.
              </TTSWrapper>
            </p>
            <div className="mx-auto mt-5 max-w-[1290px] h-[570px]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full rounded-[40px] sm:rounded-[30px] lg:rounded-[40px] "
              >
                <source src="/common/testimonials-video.mp4" type="video/mp4" />
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
