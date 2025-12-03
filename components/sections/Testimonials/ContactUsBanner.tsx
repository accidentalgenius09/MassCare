"use client";
import React from "react";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import { useRouter } from "next/navigation";
import { TestimonialsPageData } from "@/types/Testimonials.type";
interface ContactUsBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  testimonialsData?: TestimonialsPageData;
}

const ContactUsBanner: React.FC<ContactUsBannerProps> = ({
  title = "Contact Us",
  description = "Dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has the leap into electronic typesetting, remaining essentially unchanged.",
  buttonText = "Contact Us",
  testimonialsData,
}) => {
  const navigate = useRouter();
  const backgroundImage =
    testimonialsData?.testimonial_cms?.section5_image_value || "";
  const hasBackgroundImage = Boolean(backgroundImage);

  const headingClasses =
    "text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight max-w-full lg:max-w-4xl";
  const descriptionClasses =
    "text-sm sm:text-base text-white leading-relaxed max-w-full lg:max-w-2xl";

  const renderTextContent = (wrapperClass = "") => (
    <div className={`flex-1 space-y-3 sm:space-y-4 ${wrapperClass}`}>
      <h2 className={headingClasses}>
        <TTSWrapper text={title}>{title}</TTSWrapper>
      </h2>

      <p className={descriptionClasses}>
        <TTSWrapper text={description}>{description}</TTSWrapper>
      </p>
      <button
        onClick={() => navigate.push("/contact-us")}
        className="inline-flex items-center gap-2 bg-[#0A5BE0] hover:bg-blue-700 cursor-pointer text-white font-normal px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 rounded-full transition-all duration-300 hover:shadow-lg active:scale-100 group w-full lg:w-auto justify-center text-sm sm:text-base"
      >
        <TTSWrapper text={buttonText}>{buttonText}</TTSWrapper>
        <TopRightArrowWhite />
      </button>
    </div>
  );

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-32 space-y-6">
        {/* Mobile layout - text overlay allowed */}
        <div
          style={{
            backgroundImage: hasBackgroundImage
              ? `linear-gradient(90deg, rgba(13,45,98,0.95) 0%, rgba(13,45,98,0.9) 45%, rgba(13,45,98,0.6) 70%, rgba(13,45,98,0) 100%), url("${backgroundImage}")`
              : "none",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="rounded-2xl sm:rounded-3xl bg-[#0D2D62] p-6 sm:p-8 min-h-[280px] sm:min-h-[320px] relative overflow-hidden md:hidden flex flex-col justify-center"
        >
          {renderTextContent("relative z-10")}
        </div>

        {/* Desktop layout - text beside image */}
        <div className="hidden md:flex rounded-3xl ps-20 bg-[#0D2D62] min-h-[18rem] gap-8 lg:gap-12 items-center">
          {renderTextContent()}
          {hasBackgroundImage && (
            <div
              className="w-full md:w-2/5 lg:w-1/3 h-52 md:h-60 lg:h-72 rounded-2xl overflow-hidden"
              style={{
                backgroundImage: `url("${backgroundImage}")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              aria-hidden="true"
            ></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactUsBanner;
