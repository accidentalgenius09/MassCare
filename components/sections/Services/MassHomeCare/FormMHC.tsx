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
  typeofCare: number | "";
  howSoonCareNeed: number | "";
  location: string;
}

interface ApiOptionItem {
  id: number;
  title: string;
}

interface DropdownOption {
  value: number;
  label: string;
}

function FormMHC({ MCMData }: { MCMData: McmNursingCareAgencyServiceDetail }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    typeofCare: "",
    howSoonCareNeed: "",
    location: "",
  });
  const [isTypeOfCareDropdownOpen, setIsTypeOfCareDropdownOpen] =
    useState(false);
  const [isHowSoonDropdownOpen, setIsHowSoonDropdownOpen] = useState(false);
  const typeOfCareDropdownRef = useRef<HTMLDivElement | null>(null);
  const howSoonDropdownRef = useRef<HTMLDivElement | null>(null);
  const typeOfCareCloseTimeoutRef = useRef<number | null>(null);
  const howSoonCloseTimeoutRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const handleSubmit = async () => {
    if (!formData) return;

    // Check required fields
    const missingFields: string[] = [];
    if (!formData.name.trim()) missingFields.push("Name");
    if (!formData.email.trim()) missingFields.push("Email");
    if (!formData.phone.trim()) missingFields.push("Phone");
    if (!formData.location.trim()) missingFields.push("Location");
    if (!formData.typeofCare) missingFields.push("Type of Care");
    if (!formData.howSoonCareNeed) missingFields.push("How soon care is needed");

    if (missingFields.length > 0) {
      toast.error(
        missingFields.length === 1
          ? `Please fill in ${missingFields[0]}`
          : `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    // Validate name
    const nameLength = formData.name.trim().length;
    if (nameLength < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }
    if (nameLength > 100) {
      toast.error("Name must be less than 100 characters");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone number (count digits, not total length)
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Validate location
    const locationLength = formData.location.trim().length;
    if (locationLength < 2) {
      toast.error("Location must be at least 2 characters");
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

      // All validations passed, proceed with submission
      const payload = {
        service_id: MCMData.id,
        type_of_care_id: formData.typeofCare,
        phone_number: formData.phone,
        how_soon_need_care_id: formData.howSoonCareNeed,
        location: formData.location.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
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
          toast.error("Failed to submit enquiry. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
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
      // Only allow digits and plus sign
      const filteredValue = e.target.value.replace(/[^\d+]/g, "");
      
      // If filtered value is different from input, invalid characters were entered
      if (filteredValue !== e.target.value) {
        toast.error("Phone number can only contain digits and plus sign (+)");
        return;
      }
      
      // Update with filtered value
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

  const handleTypeOfCareSelect = (value: number) => {
    setFormData((prev) => ({ ...prev, typeofCare: value }));
    if (typeOfCareCloseTimeoutRef.current) {
      window.clearTimeout(typeOfCareCloseTimeoutRef.current);
    }
    typeOfCareCloseTimeoutRef.current = window.setTimeout(() => {
      setIsTypeOfCareDropdownOpen(false);
      typeOfCareCloseTimeoutRef.current = null;
    }, 120);
  };

  const handleHowSoonSelect = (value: number) => {
    setFormData((prev) => ({ ...prev, howSoonCareNeed: value }));
    if (howSoonCloseTimeoutRef.current) {
      window.clearTimeout(howSoonCloseTimeoutRef.current);
    }
    howSoonCloseTimeoutRef.current = window.setTimeout(() => {
      setIsHowSoonDropdownOpen(false);
      howSoonCloseTimeoutRef.current = null;
    }, 120);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        typeOfCareDropdownRef.current &&
        !typeOfCareDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTypeOfCareDropdownOpen(false);
      }
      if (
        howSoonDropdownRef.current &&
        !howSoonDropdownRef.current.contains(event.target as Node)
      ) {
        setIsHowSoonDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (typeOfCareCloseTimeoutRef.current) {
        window.clearTimeout(typeOfCareCloseTimeoutRef.current);
        typeOfCareCloseTimeoutRef.current = null;
      }
      if (howSoonCloseTimeoutRef.current) {
        window.clearTimeout(howSoonCloseTimeoutRef.current);
        howSoonCloseTimeoutRef.current = null;
      }
    };
  }, []);
  const [typeOfCaresOptions, setTypeOfCaresOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [howSoonNeedCaresOptions, setHowSoonNeedCaresOptions] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    const fetchTypeOfCaresOptions = async () => {
      const response3 = await restApiWrapper.get<ApiOptionItem[]>(
        "/get-type-of-cares"
      );
      const response4 = await restApiWrapper.get<ApiOptionItem[]>(
        "/get-how-soon-need-cares"
      );
      const transformResponse = (
        responseData: ApiOptionItem[]
      ): DropdownOption[] => {
        return responseData.map((item: ApiOptionItem) => ({
          value: item.id,
          label: item.title,
        }));
      };
      setTypeOfCaresOptions(transformResponse(response3.data));
      setHowSoonNeedCaresOptions(transformResponse(response4.data));
    };
    fetchTypeOfCaresOptions();
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
            <TTSWrapper text={MCMData.service_detail_cms.enquiry_title}>
              {MCMData.service_detail_cms.enquiry_title}
            </TTSWrapper>
          </h1>
          <p className="text-white text-base">
            <TTSWrapper text="{MCMData.service_detail_cms.enquiry_subtitle}">
              {MCMData.service_detail_cms.enquiry_subtitle}
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
            <input
              type="text"
              name="location"
              placeholder="Location*"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-lg bg-white text-black placeholder-black"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative" ref={typeOfCareDropdownRef}>
              <button
                type="button"
                onClick={() => setIsTypeOfCareDropdownOpen((prev) => !prev)}
                className="w-full px-6 py-4 bg-white border-gray-200 text-black rounded-lg border text-left flex items-center justify-between gap-3"
                aria-haspopup="listbox"
                aria-expanded={isTypeOfCareDropdownOpen}
                aria-label="Select type of care"
              >
                <span>
                  {formData.typeofCare
                    ? typeOfCaresOptions.find(
                        (option) => option.value === formData.typeofCare
                      )?.label
                    : "Type of Care Needed*"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  className={`transition-transform ${
                    isTypeOfCareDropdownOpen ? "rotate-180" : ""
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
              {isTypeOfCareDropdownOpen && (
                <ul
                  role="listbox"
                  className="absolute z-30 mt-2 w-full rounded-lg border border-gray-200 bg-white py-2 shadow-lg focus:outline-none"
                >
                  {typeOfCaresOptions.map((option) => {
                    const isSelected = formData.typeofCare === option.value;
                    return (
                      <li key={option.value}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleTypeOfCareSelect(option.value);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              handleTypeOfCareSelect(option.value);
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
                name="typeofCare"
                value={formData.typeofCare}
                required
              />
            </div>
            <div className="relative" ref={howSoonDropdownRef}>
              <button
                type="button"
                onClick={() => setIsHowSoonDropdownOpen((prev) => !prev)}
                className="w-full px-6 py-4 bg-white border-gray-200 text-black rounded-lg border text-left flex items-center justify-between gap-3"
                aria-haspopup="listbox"
                aria-expanded={isHowSoonDropdownOpen}
                aria-label="Select how soon care is needed"
              >
                <span>
                  {formData.howSoonCareNeed
                    ? howSoonNeedCaresOptions.find(
                        (option) => option.value === formData.howSoonCareNeed
                      )?.label
                    : "How soon do you need care?*"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  className={`transition-transform ${
                    isHowSoonDropdownOpen ? "rotate-180" : ""
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
              {isHowSoonDropdownOpen && (
                <ul
                  role="listbox"
                  className="absolute z-30 mt-2 w-full rounded-lg border border-gray-200 bg-white py-2 shadow-lg focus:outline-none"
                >
                  {howSoonNeedCaresOptions.map((option) => {
                    const isSelected =
                      formData.howSoonCareNeed === option.value;
                    return (
                      <li key={option.value}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleHowSoonSelect(option.value);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              handleHowSoonSelect(option.value);
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
                name="howSoonCareNeed"
                value={formData.howSoonCareNeed}
                required
              />
            </div>
          </div>
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

export default FormMHC;
