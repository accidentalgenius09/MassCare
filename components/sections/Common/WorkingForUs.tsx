"use client";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import restApiWrapper from "@/service/RestApiWrapper";
import { McmNursingCareAgencyServiceDetail } from "@/types/Service.type";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface FormData {
  name: string;
  email: string;
  phone: string;
  areaOfInterest: number | "";
  preferredIntake: number;
  message: string;
}

interface ApiOptionItem {
  id: number;
  title: string;
}

interface DropdownOption {
  value: number;
  label: string;
}

function WorkingForUs({
  MCMData,
}: {
  MCMData: McmNursingCareAgencyServiceDetail;
}) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    areaOfInterest: "",
    preferredIntake: 0,
    message: "",
  });
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [isPreferredDropdownOpen, setIsPreferredDropdownOpen] = useState(false);
  const areaDropdownRef = useRef<HTMLDivElement | null>(null);
  const preferredDropdownRef = useRef<HTMLDivElement | null>(null);
  const areaCloseTimeoutRef = useRef<number | null>(null);
  const preferredCloseTimeoutRef = useRef<number | null>(null);
  const [areaOfInterestOptions, setAreaOfInterestOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [preferredIntakeOptions, setPreferredIntakeOptions] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    const fetchWorkingForUsData = async () => {
      const response = await restApiWrapper.get<ApiOptionItem[]>(
        "/get-enquiry-course-of-interests"
      );
      const response2 = await restApiWrapper.get<ApiOptionItem[]>(
        "/get-preferred-intakes"
      );
      const transformResponse = (
        responseData: ApiOptionItem[]
      ): DropdownOption[] => {
        return responseData.map((item: ApiOptionItem) => ({
          value: item.id,
          label: item.title,
        }));
      };
      setAreaOfInterestOptions(transformResponse(response.data));
      setPreferredIntakeOptions(transformResponse(response2.data));
    };
    fetchWorkingForUsData();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleSubmit = async () => {
    const missingFields: string[] = [];
    if (!formData.name.trim()) missingFields.push("Name");
    if (!formData.email.trim()) missingFields.push("Email");
    if (!formData.phone.trim()) missingFields.push("Phone");
    if (!formData.areaOfInterest) missingFields.push("Area of Interest");
    if (!formData.preferredIntake) missingFields.push("Preferred Intake");
    if (!formData.message.trim()) missingFields.push("Message");
    if (missingFields.length > 0) {
      toast.error(missingFields.join(", "));
      return;
    }
    if (formData.name.length === 1) {
      toast.error("Name is too short");
      return;
    }
    if (formData.name.length > 50) {
      toast.error("Name must be less than 50 characters");
      return;
    }
    if (formData.email.length === 0) {
      toast.error("Please enter a valid email");
      return;
    }
    const validateEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (formData.phone.length < 10 || formData.phone.length > 13) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (formData.areaOfInterest === 0) {
      toast.error("Please select a valid area of interest");
      return;
    }
    if (formData.preferredIntake === 0) {
      toast.error("Please select a valid preferred intake");
      return;
    }
    if (formData.message.length === 1) {
      toast.error("Message is too short");
      return;
    }
    if (formData.message.length > 500) {
      toast.error("Message must be less than 500 characters");
      return;
    }
    // Get reCAPTCHA token right before submission
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA is not ready. Please try again.");
      return;
    }

    try {
      const token = await executeRecaptcha("submit");
      console.log("reCAPTCHA Token:", token);

      if (formData) {
        const payload = {
          service_id: MCMData.id,
          enquiry_course_of_interest_id: formData.areaOfInterest,
          phone_number: formData.phone,
          preferred_intake_id: formData.preferredIntake,
          message: formData.message,
          name: formData.name,
          email: formData.email,
          captcha_key: token,
        };
        setIsLoading(true);
        restApiWrapper
          .post("/service-enquiry", payload)
          .then(() => {
            router.push("/thankyou-enquiry");
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      toast.error("reCAPTCHA verification failed. Please try again.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.name === "phone") {
      const filteredValue = e.target.value.replace(/[^\d+]/g, "");
      if (filteredValue !== e.target.value) {
        return;
      }
      setFormData({
        ...formData,
        [e.target.name]: filteredValue,
      });
      return;
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAreaSelect = (value: number) => {
    setFormData((prev) => ({ ...prev, areaOfInterest: value }));
    if (areaCloseTimeoutRef.current) {
      window.clearTimeout(areaCloseTimeoutRef.current);
    }
    areaCloseTimeoutRef.current = window.setTimeout(() => {
      setIsAreaDropdownOpen(false);
      areaCloseTimeoutRef.current = null;
    }, 120);
  };

  const handlePreferredSelect = (value: number) => {
    setFormData((prev) => ({ ...prev, preferredIntake: value }));
    if (preferredCloseTimeoutRef.current) {
      window.clearTimeout(preferredCloseTimeoutRef.current);
    }
    preferredCloseTimeoutRef.current = window.setTimeout(() => {
      setIsPreferredDropdownOpen(false);
      preferredCloseTimeoutRef.current = null;
    }, 120);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        areaDropdownRef.current &&
        !areaDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAreaDropdownOpen(false);
      }
      if (
        preferredDropdownRef.current &&
        !preferredDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPreferredDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (areaCloseTimeoutRef.current) {
        window.clearTimeout(areaCloseTimeoutRef.current);
        areaCloseTimeoutRef.current = null;
      }
      if (preferredCloseTimeoutRef.current) {
        window.clearTimeout(preferredCloseTimeoutRef.current);
        preferredCloseTimeoutRef.current = null;
      }
    };
  }, []);
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: "rgba(1, 35, 103, 1)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-1">
            <TTSWrapper text="{MCMData?.service_detail_cms?.enquiry_title}">
              {MCMData?.service_detail_cms?.enquiry_title}
            </TTSWrapper>
          </h1>
          <p className="text-white text-base">
            <TTSWrapper text={MCMData?.service_detail_cms?.enquiry_subtitle}>
              {MCMData?.service_detail_cms?.enquiry_subtitle}
            </TTSWrapper>
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-lg bg-white text-black placeholder-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-lg bg-white text-black placeholder-black"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone*"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-lg bg-white text-black placeholder-black"
            />
            <div className="relative" ref={areaDropdownRef}>
              <button
                type="button"
                onClick={() => setIsAreaDropdownOpen((prev) => !prev)}
                className={`w-full px-6 py-4 bg-white border-gray-200 text-black rounded-lg border text-left flex items-center justify-between gap-3`}
                aria-haspopup="listbox"
                aria-expanded={isAreaDropdownOpen}
                aria-label="Select area of interest"
              >
                <span>
                  {formData.areaOfInterest
                    ? areaOfInterestOptions.find(
                        (option) => option.value === formData.areaOfInterest
                      )?.label
                    : "Area of Interest*"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  className={`transition-transform ${
                    isAreaDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M1 1L8 8L15 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isAreaDropdownOpen && (
                <ul
                  role="listbox"
                  className="absolute z-30 mt-2 w-full rounded-lg border border-gray-200 bg-white py-2 shadow-lg focus:outline-none"
                >
                  {areaOfInterestOptions.map((option) => {
                    const isSelected = formData.areaOfInterest === option.value;
                    return (
                      <li key={option.value}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleAreaSelect(option.value);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              handleAreaSelect(option.value);
                            }
                          }}
                          className={`w-full text-left px-5 py-2 text-sm sm:text-base transition ${
                            isSelected
                              ? "bg-blue-100 text-blue-900"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              <input
                type="hidden"
                name="areaOfInterest"
                value={formData.areaOfInterest}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="relative" ref={preferredDropdownRef}>
              <button
                type="button"
                onClick={() => setIsPreferredDropdownOpen((prev) => !prev)}
                className={`w-full bg-white text-black border-gray-200 px-6 py-4 rounded-lg border text-left flex items-center justify-between gap-3`}
                aria-haspopup="listbox"
                aria-expanded={isPreferredDropdownOpen}
                aria-label="Select preferred intake"
              >
                <span>
                  {formData.preferredIntake
                    ? preferredIntakeOptions.find(
                        (option) => option.value === formData.preferredIntake
                      )?.label
                    : "Preferred Intake*"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  className={`transition-transform ${
                    isPreferredDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M1 1L8 8L15 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isPreferredDropdownOpen && (
                <ul
                  role="listbox"
                  className="absolute z-30 mt-2 w-full rounded-lg border border-gray-200 bg-white py-2 shadow-lg focus:outline-none"
                >
                  {preferredIntakeOptions.map((option) => {
                    const isSelected =
                      formData.preferredIntake === option.value;
                    return (
                      <li key={option.value}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handlePreferredSelect(option.value);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              handlePreferredSelect(option.value);
                            }
                          }}
                          className={`w-full text-left px-5 py-2 text-sm sm:text-base transition ${
                            isSelected
                              ? "bg-blue-100 text-blue-900"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              <input
                type="hidden"
                name="preferredIntake"
                value={formData.preferredIntake}
                required
              />
            </div>
          </div>

          <textarea
            name="message"
            placeholder="Message*"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-6 py-4 rounded-lg bg-white text-black placeholder-black resize-none"
          />

          <div className="text-center pt-4">
            <button
              onClick={handleSubmit}
              className={`inline-flex items-center gap-2 px-8 py-3 cursor-pointer text-white font-medium rounded-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              style={{
                background: "rgba(10, 91, 224, 1)",
                borderRadius: "300px",
              }}
              disabled={isLoading}
            >
              <TTSWrapper
                text={isLoading ? "Submitting..." : "Submit Enquiry"}
                className="inline-flex items-center gap-1 text-white font-medium rounded-lg"
              >
                {isLoading ? "Submitting..." : "Submit Enquiry"}
              </TTSWrapper>
              {!isLoading && <TopRightArrowWhite />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkingForUs;
