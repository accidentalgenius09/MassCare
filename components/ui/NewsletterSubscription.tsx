"use client";
import React, { useEffect, useState } from "react";
import { TopRightArrowBlack, TopRightArrowWhite } from "../helpers/svgs";
import { usePathname, useRouter } from "next/navigation";
import TTSWrapper from "@/hooks/TTSWrapper";
import toast from "react-hot-toast";
import restApiWrapper from "@/service/RestApiWrapper";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email) {
      return;
    }

    // Validate email format first
    if (!isValidEmail(email)) {
      toast.error("Email format is not correct");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await restApiWrapper.post(
        "/newsletter-subscription",
        formData
      );

      if (response.status === 200) {
        setSubscribedEmail(email);
        setShowModal(true);
      } else {
        toast.error(
          response.message ||
            response.data?.message ||
            "Subscription failed. Please try again."
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Subscription failed. Please try again.";
      toast.error(errorMessage);
      console.error("Error subscribing to newsletter:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEmail("");
  };

  useEffect(() => {
    if (isNavigating && pathname === "/newsletter-history") {
      closeModal();
      setIsNavigating(false);
    }
  }, [pathname, isNavigating]);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 ms-2 sm:ms-4 md:ms-6">
        <h3 className="font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap">
          Subscribe Newsletter
        </h3>
        <form className="flex w-full sm:w-auto mx-0 sm:mx-4 py-1 border border-white rounded-full pe-1">
          <input
            type="email"
            placeholder="Email"
            className="px-3 sm:px-4 py-2 border-r-0 rounded-full text-white w-full sm:w-48 md:w-56 lg:w-64 outline-none focus:outline-none focus:ring-0 bg-transparent placeholder-white text-sm sm:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
            className="bg-white text-[#002D72] cursor-pointer px-3 sm:px-4 py-3 sm:py-4 rounded-full font-semibold flex-shrink-0 hover:bg-gray-100 hover:shadow-md transition-all duration-300"
          >
            <TopRightArrowBlack />
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#012B71]/80 backdrop-blur-sm px-4">
          <div className="bg-[#012367] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:w-[40vw] relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Close modal"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-5 sm:h-5"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="text-center text-white py-2 sm:py-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-4">
                <TTSWrapper text="Thank You for Subscribing!">
                  Thank You for Subscribing!
                </TTSWrapper>
              </h2>
              <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-white">
                <TTSWrapper text="Welcome to our newsletter! We're excited to have you on board.">
                  Welcome to our newsletter! We&apos;re excited to have you on
                  board.
                </TTSWrapper>
              </p>

              {/* Email Confirmation Box */}
              <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 mb-2 sm:mb-3 text-left">
                <p className="text-black text-xs sm:text-sm">
                  <TTSWrapper text="Confirmation email sent to:">
                    Confirmation email sent to:
                  </TTSWrapper>{" "}
                  <span className="font-semibold">
                    <TTSWrapper text={subscribedEmail}>
                      {subscribedEmail}
                    </TTSWrapper>
                  </span>
                </p>
              </div>

              {/* Instructions Box */}
              <div className="bg-white text-black backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 text-left">
                <h3 className="font-semibold mb-2 text-xs sm:text-sm">
                  <TTSWrapper text="What's next?">What&apos;s next?</TTSWrapper>
                </h3>
                <ul className="space-y-1 sm:space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>
                      <TTSWrapper text="Check your inbox for our welcome email">
                        Check your inbox for our welcome email
                      </TTSWrapper>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>
                      <TTSWrapper text="Click the confirmation link to verify your subscription">
                        Click the confirmation link to verify your subscription
                      </TTSWrapper>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>
                      <TTSWrapper text="Add us to your contacts to ensure delivery">
                        Add us to your contacts to ensure delivery
                      </TTSWrapper>
                    </span>
                  </li>
                </ul>
              </div>

              {/* View Archives Button */}
              <button
                type="button"
                onClick={() => {
                  if (isNavigating) return;
                  setIsNavigating(true);
                  router.push("/newsletter-history");
                }}
                disabled={isNavigating}
                aria-disabled={isNavigating}
                className={`inline-flex items-center gap-2 bg-[#0A5BE0] text-white font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ${
                  isNavigating ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <TTSWrapper text={"View Archives"}>View Archives</TTSWrapper>
                <TopRightArrowWhite />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Newsletter;
