"use client";

import TTSWrapper from "@/hooks/TTSWrapper";
import Image from "next/image";

interface WelcomeSectionProps {
  section?: string;
}

const WelcomeSection = ({ section = "home" }: WelcomeSectionProps) => {
  return (
    <section className="pb-2 pt-8 sm:pt-12 md:pt-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 ms-2 sm:ms-4 md:ms-6 me-4 sm:me-6 md:me-10 justify-between">
          {/* Left Content */}
          <div className="mt-4 sm:mt-6 md:mt-10">
            <TTSWrapper
              text="Welcome to Mass Care"
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Welcome to Mass Care
              </h2>
            </TTSWrapper>

            <div className="justify-start text-neutral-900 text-lg sm:text-xl font-normal mb-3 sm:mb-4">
              <TTSWrapper
                text="Celebrating 8 years of meaningful care... "
                className="justify-start text-neutral-900 text-lg sm:text-xl font-normal"
              >
                Celebrating 8 years of meaningful care... <br />
              </TTSWrapper>
              <TTSWrapper
                text="care without compromise."
                className="justify-start text-neutral-900 text-lg sm:text-xl font-normal mb-3 sm:mb-4"
              >
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
                <p className="text-black font-light text-sm sm:text-base">
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
          <div
            className={`space-y-8 sm:space-y-10 md:space-y-12 ${section === "aboutus" ? "ml-0" : "ml-0 sm:ml-12 md:ml-24"}`}
          >
            {/* Mission */}

            {section === "aboutus" ? (
              <div className="rounded-2xl sm:rounded-3xl md:rounded-[40px] border border-gray-200">
                <Image
                  src="/aboutus/aboutus.png"
                  alt="About Us"
                  width={850}
                  height={500}
                  className="object-cover w-full h-auto"
                />
              </div>
            ) : (
              <div className="p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl md:rounded-[40px] border border-gray-200">
                <div className="mb-3 sm:mb-4">
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    <TTSWrapper
                      text="Mission"
                      className="text-xl sm:text-2xl font-semibold"
                    >
                      Mission
                    </TTSWrapper>
                  </h2>
                  <div className="text-sm sm:text-base">
                    <TTSWrapper text="To deliver dignified, person-centered care...">
                      To deliver dignified, person-centered care...
                    </TTSWrapper>
                  </div>
                </div>
                <div className="mb-3 sm:mb-4">
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    <TTSWrapper
                      text="Vision"
                      className="text-xl sm:text-2xl font-semibold"
                    >
                      Vision
                    </TTSWrapper>
                  </h2>
                  <div className="text-sm sm:text-base">
                    <TTSWrapper text="To champion local communities, avoid outsourcing...">
                      To champion local communities, avoid outsourcing...
                    </TTSWrapper>
                  </div>
                </div>
                <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white px-3 sm:px-4 py-2 rounded-lg shadow-sm">
                  <Image
                    src="/Rectangle.png"
                    alt="Care Quality Commission"
                    width={80}
                    height={80}
                    className="sm:w-[100px] sm:h-[100px]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
