"use client";
import React from "react";
import TTSWrapper from "@/hooks/TTSWrapper";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { TopRightArrowWhite } from "@/components/helpers/svgs";

const Page: React.FC = () => {
  const router = useRouter();
  const { slug } = useParams();
  return (
    <div className="min-h-[80vh] bg-[#012B71] w-full flex items-center justify-center px-4 pt-8 pb-20">
      <div className="max-w-4xl w-full text-center my-auto">
        <div className="relative mb-8">
          {/* Medical Illustration */}
          <div
            className={`flex items-center justify-center ${
              slug === "thankyou-enquiry" ||
              slug === "application-received" ||
              slug === "welcome-course"
                ? "mt-24"
                : "mt-10"
            }
            }`}
          >
            <div className="relative">
              {/* Nurse Standing */}
              <Image
                src={
                  slug === "thankyou-enquiry"
                    ? "/common/thankyou-enquiry.png"
                    : slug === "application-received"
                    ? "/common/thankyou-enquiry.png"
                    : slug === "welcome-course"
                    ? "/common/course.png"
                    : "/common/404-patient.png"
                }
                alt={
                  slug === "thankyou-enquiry"
                    ? "Thank You for Your Enquiry!"
                    : slug === "application-received"
                    ? "Application Received Successfully!"
                    : slug === "welcome-course"
                    ? "Welcome to Your Course!"
                    : "Internal Server Error"
                }
                width={
                  slug === "welcome-course"
                    ? 200
                    : slug === "thankyou-enquiry" ||
                      slug === "application-received"
                    ? 300
                    : 450
                }
                height={
                  slug === "welcome-course"
                    ? 200
                    : slug === "thankyou-enquiry" ||
                      slug === "application-received"
                    ? 300
                    : 300
                }
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-5">
          <h1 className={`text-[40px] font-semibold text-white mb-2`}>
            <TTSWrapper
              text={`${
                slug === "thankyou-enquiry"
                  ? "Thank You for Your Enquiry!"
                  : slug === "application-received"
                  ? "Application Received Successfully!"
                  : slug === "welcome-course"
                  ? "Welcome to Your Course!"
                  : "Internal Server Error"
              }`}
            >
              {slug === "thankyou-enquiry"
                ? "Thank You for Your Enquiry!"
                : slug === "application-received"
                ? "Application Received Successfully!"
                : slug === "welcome-course"
                ? "Welcome to Your Course!"
                : "Internal Server Error"}
            </TTSWrapper>
          </h1>
          <p
            className={`text-white text-base ${
              slug === "welcome-course"
                ? "max-w-[450px]"
                : slug === "application-received"
                ? "max-w-lg"
                : slug === "thankyou-enquiry"
                ? "max-w-[400px]"
                : "max-w-3xl"
            } mx-auto text-center leading-relaxed px-4`}
          >
            <TTSWrapper
              text={
                slug === "thankyou-enquiry"
                  ? "We've received your enquiry and will get back to you as soon as possible."
                  : slug === "application-received"
                  ? "Thank you for your interest in joining our team. We're excited to review your application."
                  : slug === "welcome-course"
                  ? "Your enrollment has been successfully completed. Get ready to begin your healthcare education journey."
                  : "Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry standard dummy text ever since"
              }
              className="text-white text-base max-w-2xl mx-auto text-center leading-relaxed"
            >
              {slug === "thankyou-enquiry"
                ? "We've received your enquiry and will get back to you as soon as possible."
                : slug === "application-received"
                ? "Thank you for your interest in joining our team. We're excited to review your application."
                : slug === "welcome-course"
                ? "Your enrollment has been successfully completed. Get ready to begin your healthcare education journey."
                : `Lorem Ipsum is simply dummy Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry standard dummy text ever since`}
            </TTSWrapper>
          </p>
        </div>

        {/* Go Back Button */}
        <button
          onClick={() => router.back()}
          className="relative cursor-pointer overflow-hidden bg-[#0A5BE0] text-white font-medium px-10 py-3 rounded-full hover:shadow-lg transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0A5BE0] before:to-[#003C9F] before:content-[''] before:-translate-x-full before:transition-transform before:duration-300 before:z-0 hover:before:translate-x-0"
        >
          <span className="relative z-10 flex items-center gap-2">
            <TTSWrapper text="Go Back">Go Back </TTSWrapper>
            <TopRightArrowWhite />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Page;
