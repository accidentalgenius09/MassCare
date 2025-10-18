"use client";
import React, { useEffect, useState } from "react";
import { TopRightArrowBlack, TopRightArrowWhite } from "../helpers/svgs";
import { usePathname, useRouter } from "next/navigation";
import TTSWrapper from "@/hooks/TTSWrapper";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email) {
      setSubscribedEmail(email);
      setShowModal(true);
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
      <div className="text-center">
        <h3 className="font-semibold text-lg mb-4">Subscribe Newsletter</h3>
        <form className="flex justify-between w-72 mx-auto items-center border border-white rounded-full">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border-r-0 rounded-full text-white w-64 outline-none focus:outline-none focus:ring-0 bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
            className="bg-white text-[#002D72] px-4 py-4 rounded-full font-semibold"
          >
            <TopRightArrowBlack />
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#012B71]/80 backdrop-blur-sm px-4">
          <div className="bg-[#012367] rounded-3xl p-6 md:p-8 w-[40vw] relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
            <div className="text-center text-white py-4">
              <h2 className="text-3xl font-semibold">
                <TTSWrapper text="Thank You for Subscribing!">
                  Thank You for Subscribing!
                </TTSWrapper>
              </h2>
              <p className="text-xs mb-4 text-white">
                <TTSWrapper text="Welcome to our newsletter! We're excited to have you on board.">
                  Welcome to our newsletter! We're excited to have you on board.
                </TTSWrapper>
              </p>

              {/* Email Confirmation Box */}
              <div className="bg-white rounded-xl p-3 mb-2 text-left">
                <p className="text-black text-sm">
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
              <div className="bg-white text-black backdrop-blur-sm rounded-xl p-4 mb-5 text-left">
                <h3 className="font-semibold mb-2 text-sm">
                  <TTSWrapper text="What's next?">What's next?</TTSWrapper>
                </h3>
                <ul className="space-y-2 text-xs">
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
                className={`inline-flex items-center gap-2 bg-[#0A5BE0] text-white font-medium px-5 py-2.5 rounded-full text-sm ${
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
