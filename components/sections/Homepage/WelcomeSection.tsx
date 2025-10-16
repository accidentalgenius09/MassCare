"use client";

import TextToSpeechWrapper from "@/components/ui/TextToSpeechWrapper";
import TTSWrapper from "@/hooks/TTSWrapper";
import Image from "next/image";

const WelcomeSection = () => {
  return (
    <section className="pb-2 pt-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-between">
          {/* Left Content */}
          <div>
            <TTSWrapper
              text="Welcome to Mass Care"
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome to Mass Care
              </h2>
            </TTSWrapper>

            <div className="justify-start text-neutral-900 text-xl font-normal mb-4">
              <TTSWrapper
                text="Celebrating 8 years of meaningful care... "
                className="justify-start text-neutral-900 text-xl font-normal"
              >
                Celebrating 8 years of meaningful care... <br />
              </TTSWrapper>
              <TTSWrapper
                text="care without compromise."
                className="justify-start text-neutral-900 text-xl font-normal mb-4"
              >
                care without compromise.
              </TTSWrapper>
            </div>

            <div className="max-w-xl">
              <TTSWrapper
                text="Mass Care Agency is a registered nursing agency; we are dedicated to the health profession, and we are passionate about caring for vulnerable adults. This passion comes from within the heart and means a lot to us. We aim to support the healthcare industry all over the UK by supplying quality health care professionals. We will fulfil your staffing needs when you require, and we are available 24 hours a day 7 days a week. <br /> <br />
                  You can also book your staffing requirement by calling one of
                  our friendly team members or using the booking form provided
                  on this site."
                className="text-gray-700 leading-relaxed text-sm"
              >
                <p className="text-gray-700 leading-relaxed text-sm">
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
          <div className="space-y-12 ml-24">
            {/* Mission */}
            <div className="p-6 rounded-[40px] border border-gray-200">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">
                  <TTSWrapper text="Mission" className="text-2xl font-semibold">
                    Mission
                  </TTSWrapper>
                </h2>
                <div>
                  <TTSWrapper text="To deliver dignified, person-centered care...">
                    To deliver dignified, person-centered care...
                  </TTSWrapper>
                </div>
              </div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">
                  <TTSWrapper text="Vision" className="text-2xl font-semibold">
                    Vision
                  </TTSWrapper>
                </h2>
                <div>
                  <TTSWrapper text="To champion local communities, avoid outsourcing...">
                    To champion local communities, avoid outsourcing...
                  </TTSWrapper>
                </div>
              </div>
              <div className="inline-flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow-sm">
                <Image
                  src="/Rectangle.png"
                  alt="Care Quality Commission"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
