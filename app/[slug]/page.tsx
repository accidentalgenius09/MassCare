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
              slug === "thankyou-enquiry" || slug === "application-received"
                ? "mt-16"
                : slug === "welcome-course"
                ? "mt-20"
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
                    ? 220
                    : slug === "thankyou-enquiry" ||
                      slug === "application-received"
                    ? 410
                    : 450
                }
                height={
                  slug === "welcome-course"
                    ? 247
                    : slug === "thankyou-enquiry" ||
                      slug === "application-received"
                    ? 316
                    : 300
                }
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-5">
          <h1 className={`text-5xl font-semibold text-white mb-2`}>
            <TTSWrapper
              className={`text-5xl font-semibold text-white mb-2`}
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
            className={`text-blue-200 text-base ${
              slug === "welcome-course"
                ? "max-w-lg"
                : slug === "application-received"
                ? "max-w-lg" 
                : slug === "thankyou-enquiry"
                ? "max-w-sm"
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
              className="text-blue-200 text-base max-w-2xl mx-auto text-center leading-relaxed"
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
          className="inline-flex items-center gap-2 bg-[#0A5BE0] text-white font-medium px-10 py-3 rounded-full"
        >
          <TTSWrapper text="Go Back">Go Back </TTSWrapper>
          <TopRightArrowWhite />
        </button>
      </div>
    </div>
  );
};

export default Page;
