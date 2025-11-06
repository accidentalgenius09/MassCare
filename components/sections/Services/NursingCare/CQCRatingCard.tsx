import React from "react";
import Image from "next/image";
import TTSWrapper from "@/hooks/TTSWrapper";

function CQCRatingCard() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-32">
        <div className="border rounded-3xl p-3 sm:p-4 md:p-6 max-w-full mx-4 sm:mx-6 md:mx-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            {/* Left Section - CQC Information */}
            <div className="flex flex-col items-center md:items-start">
              <Image
                src="/services/cqc-logo.png"
                alt="Care Quality Commission Logo"
                width={200}
                height={140}
                className="object-contain w-40 sm:w-48 md:w-56"
              />
              <p className="text-xs sm:text-sm text-black font-normal -mt-2 text-center md:text-left">
                <TTSWrapper text="Independent Regulator of Health & Social Care">
                  Independent Regulator of Health &amp; Social Care
                </TTSWrapper>
              </p>
            </div>

            {/* Right Section - Rating Details */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 bg-[#E8EFFF] rounded-xl p-4 sm:p-6 w-full md:w-auto">
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-black mb-3">
                  <TTSWrapper text="Mass Care Home">Mass Care Home</TTSWrapper>
                </h4>
                <div className="bg-[#0A5BE0] rounded-full px-3 sm:px-4 py-2 inline-block mb-4">
                  <p className="text-white">
                    <span className="font-semibold text-lg">Overall Rating: </span>
                    <span className="font-light text-xs sm:text-sm">Outstanding</span>
                  </p>
                </div>
              </div>
              <div className="max-w-lg">
                <p className="text-base sm:text-lg font-bold text-black mb-3">
                  <TTSWrapper text="The service is performing exceptionally well">
                    The service is performing exceptionally well
                  </TTSWrapper>
                </p>
                <p className="text-xs sm:text-sm text-black font-normal mb-4">
                  <TTSWrapper text="CQC ratings help you choose care services. They show how well services are caring for people and how well they are managed.">
                    CQC ratings help you choose care services. They show how
                    well services are caring for people and how well they are
                    managed.
                  </TTSWrapper>
                </p>
                <p className="text-xs sm:text-sm text-black font-normal">
                  <TTSWrapper text="Last inspection: 06 August 2025">
                    Last inspection: 06 August 2025
                  </TTSWrapper>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CQCRatingCard;
