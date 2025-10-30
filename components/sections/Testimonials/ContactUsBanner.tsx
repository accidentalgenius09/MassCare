import React from "react";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";

interface ContactUsBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

const ContactUsBanner: React.FC<ContactUsBannerProps> = ({
  title = "Contact Us",
  description = "Dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has the leap into electronic typesetting, remaining essentially unchanged.",
  buttonText = "Contact Us",
}) => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-32">
        <div
          style={{
            backgroundImage: "url('/testimonials/Frame-3.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
          }}
          className="rounded-3xl bg-[#0D2D62] p-8 md:p-12 lg:p-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
            {/* Left Content */}
            <div className="flex-1 space-y-4">
              <h2 className="text-5xl font-medium text-white max-w-4xl leading-tight">
                <TTSWrapper text={title}>{title}</TTSWrapper>
              </h2>

              <p className="text-base text-white leading-relaxed max-w-2xl">
                <TTSWrapper text={description}>{description}</TTSWrapper>
              </p>
              <button className="inline-flex items-center gap-2 bg-[#0A5BE0] hover:bg-blue-700 cursor-pointer text-white font-normal px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:shadow-lg active:scale-100 group w-full lg:w-auto justify-center">
                <TTSWrapper text={buttonText}>{buttonText}</TTSWrapper>
                <TopRightArrowWhite />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsBanner;
