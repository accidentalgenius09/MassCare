"use client";

import TTSWrapper from "@/hooks/TTSWrapper";
import Image from "next/image";

interface WelcomeSectionProps {
  section?: string;
}

const WelcomeSectionHome = ({ section = "home" }: WelcomeSectionProps) => {
  return (
    <section className="pb-2 pt-8 sm:pt-12 md:pt-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 ms-2 sm:ms-4 md:ms-6 me-4 sm:me-6 md:me-10 justify-between">
          {/* Left Content */}
          <div>
            <TTSWrapper text="Welcome to Mass Care">
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-gray-900 mb-2">
                Welcome to Mass Care
              </h2>
            </TTSWrapper>

            <div className="justify-start text-neutral-900 text-lg sm:text-xl md:text-2xl font-normal mb-3 sm:mb-4">
              <TTSWrapper text="Celebrating 8 years of meaningful care... ">
                Celebrating 8 years of meaningful care... <br />
              </TTSWrapper>
              <TTSWrapper text="care without compromise.">
                care without compromise.
              </TTSWrapper>
            </div>

            <div className="max-w-2xl">
              <TTSWrapper
                text="Mass Care Agency is a registered nursing agency; we are dedicated to the health profession, and we are passionate about caring for vulnerable adults. This passion comes from within the heart and means a lot to us. We aim to support the healthcare industry all over the UK by supplying quality health care professionals. We will fulfil your staffing needs when you require, and we are available 24 hours a day 7 days a week. <br /> <br />
                  You can also book your staffing requirement by calling one of
                  our friendly team members or using the booking form provided
                  on this site."
              >
                <p className="text-black font-normal text-xs sm:text-sm">
                  Mass Care Agency is a registered nursing agency; we are
                  dedicated to the health profession, and we are passionate
                  about caring for vulnerable adults. This passion comes from
                  within the heart and means a lot to us. We aim to support the
                  healthcare industry all over the UK by supplying quality
                  health care professionals. We will fulfil your staffing needs
                  when you require, and we are available 24 hours a day 7 days a
                  week.
                  <br /> <br />
                  You can also book your staffing requirement by calling one of
                  our friendly team members or using the booking form provided
                  on this site.
                </p>
              </TTSWrapper>
            </div>
          </div>

          {/* Right Content - Mission, Vision & Accreditation */}
          <div className={`ml-0 sm:ml-12 md:ml-24`}>
            {/* Mission */}

            <div className="px-4 sm:px-5 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-3 sm:pb-4 rounded-2xl sm:rounded-3xl md:rounded-[40px] border border-gray-200">
              <div className="mb-3 sm:mb-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                  <TTSWrapper text="Mission">Mission</TTSWrapper>
                </h2>
                <p className="text-sm sm:text-base md:text-lg font-normal">
                  <TTSWrapper text="To deliver dignified, person-centered care...">
                    To deliver dignified, person-centered care...
                  </TTSWrapper>
                </p>
              </div>
              <div className="mb-3 sm:mb-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                  <TTSWrapper text="Vision">Vision</TTSWrapper>
                </h2>
                <p className="text-sm sm:text-base md:text-lg font-normal">
                  <TTSWrapper text="To champion local communities, avoid outsourcing...">
                    To champion local communities, avoid outsourcing...
                  </TTSWrapper>
                </p>
              </div>
              <div className="inline-flex items-center space-x-2 sm:space-x-3 pt-2 sm:pt-3">
                <Image
                  src="/Rectangle.png"
                  alt="Care Quality Commission"
                  width={100}
                  height={80}
                  className="sm:w-[130px] sm:h-[100px]"
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
