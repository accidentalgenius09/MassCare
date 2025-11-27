"use client";

import TTSWrapper from "@/hooks/TTSWrapper";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { UploadOutline, XOutline } from "../helpers/svgs";

interface ApplyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

const ApplyNowModal: React.FC<ApplyNowModalProps> = ({
  isOpen,
  onClose,
  jobTitle,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    cv: null as File | null,
    agreeToTerms: false,
  });

  const [isExperienceDropdownOpen, setExperienceDropdownOpen] = useState(false);
  const experienceDropdownRef = useRef<HTMLDivElement | null>(null);

  const dropdownCloseTimeoutRef = useRef<number | null>(null);

  const experienceOptions = [
    { value: "0-1", label: "0-1 years" },
    { value: "1-2", label: "1-2 years" },
    { value: "2-5", label: "2-5 years" },
    { value: "5-10", label: "5-10 years" },
    { value: "10+", label: "10+ years" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleExperienceSelect = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: value,
    }));
    if (dropdownCloseTimeoutRef.current) {
      window.clearTimeout(dropdownCloseTimeoutRef.current);
    }

    dropdownCloseTimeoutRef.current = window.setTimeout(() => {
      setExperienceDropdownOpen(false);
      dropdownCloseTimeoutRef.current = null;
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        experienceDropdownRef.current &&
        !experienceDropdownRef.current.contains(event.target as Node)
      ) {
        setExperienceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (dropdownCloseTimeoutRef.current) {
        window.clearTimeout(dropdownCloseTimeoutRef.current);
        dropdownCloseTimeoutRef.current = null;
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      cv: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0000004f] overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-md w-[98%] max-w-6xl max-h-[90vh] my-auto relative flex flex-col">
        {/* Close Button */}
        {/* Modal Content */}
        <div className="px-4 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-12 overflow-y-auto scrollbar-hide flex-1">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between items-start gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-base text-black mb-2 flex-1">
                <TTSWrapper text="Apply Now">Apply Now</TTSWrapper>
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                aria-label="Close modal"
              >
                <XOutline />
              </button>
            </div>
            <p className="text-sm sm:text-base font-extralight text-black">
              <TTSWrapper text={`Submit your application for the ${jobTitle}`}>
                Submit your application for the {jobTitle} Role
              </TTSWrapper>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                <TTSWrapper text="Full Name *">Full Name *</TTSWrapper>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                <TTSWrapper text="Email Address *">Email Address *</TTSWrapper>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                <TTSWrapper text="Phone Number *">Phone Number *</TTSWrapper>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter Phone number"
                className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                required
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                <TTSWrapper text="Experience *">Experience *</TTSWrapper>
              </label>
              <div
                className="relative"
                ref={experienceDropdownRef}
              >
                <button
                  type="button"
                  onClick={() =>
                    setExperienceDropdownOpen((prev) => !prev)
                  }
                  className={`w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base flex items-center justify-between ${
                    formData.experience === ""
                      ? "text-gray-500  bg-white"
                      : "text-black"
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={isExperienceDropdownOpen}
                  aria-label="Select your experience in this field"
                >
                  <span>
                    {formData.experience
                      ? experienceOptions.find(
                          (option) =>
                            option.value === formData.experience
                        )?.label
                      : "Select your experience in this field"}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="5"
                    viewBox="0 0 8 5"
                    fill="none"
                    className={`transition-transform ${
                      isExperienceDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M0.142787 0.938336L3.55548 4.80157C3.61049 4.86381 3.67873 4.91376 3.75551 4.94802C3.8323 4.98227 3.91581 5 4.00032 5C4.08483 5 4.16835 4.98227 4.24513 4.94802C4.32191 4.91376 4.39015 4.86381 4.44516 4.80157L7.85786 0.938336C8.18355 0.569585 7.91352 0 7.41302 0H0.586647C0.0861442 0 -0.183883 0.569585 0.142787 0.938336Z"
                      fill="#212121"
                    />
                  </svg>
                </button>
                {isExperienceDropdownOpen && (
                  <ul
                    role="listbox"
                    className="absolute z-30 mt-2 w-full rounded-xl border border-gray-200 bg-white py-2 shadow-lg focus:outline-none"
                  >
                    {experienceOptions.map((option) => {
                      const isSelected =
                        formData.experience === option.value;
                      return (
                        <li key={option.value}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onMouseDown={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              handleExperienceSelect(option.value);
                            }}
                            onKeyDown={(event) => {
                              if (
                                event.key === "Enter" ||
                                event.key === " "
                              ) {
                                event.preventDefault();
                                handleExperienceSelect(option.value);
                              }
                            }}
                            className={`w-full text-left px-4 py-2 text-sm sm:text-base transition ${
                              isSelected
                                ? "bg-blue-50 text-blue-700"
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
                  name="experience"
                  value={formData.experience}
                  required
                />
              </div>
            </div>

            {/* Upload CV */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                <TTSWrapper text="Upload CV *">Upload CV *</TTSWrapper>
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="cv"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  required
                />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 lg:p-8 text-center hover:border-blue-500 transition-colors">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2">
                    <UploadOutline />
                  </div>
                  <p className="text-xs sm:text-sm text-[#00000066]">
                    <TTSWrapper text="Click To Upload Your CV (PDF, DOC, DOCX)">
                      Click To Upload Your CV (PDF, DOC, DOCX)
                    </TTSWrapper>
                  </p>
                </div>
              </div>
              {formData.cv && (
                <p className="text-sm text-green-600 mt-2">
                  <TTSWrapper text={`Selected: ${formData.cv.name}`}>
                    Selected: {formData.cv.name}
                  </TTSWrapper>
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-5 h-5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <label className="text-sm text-black">
                <TTSWrapper text="I Agree To The Terms & Conditions *">
                  I Agree To The Terms & Conditions *
                </TTSWrapper>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 sm:py-3 border border-[#0A5BE0] text-[#0A5BE0] rounded-full font-medium hover:bg-blue-50 hover:border-blue-600 transition-all duration-300 text-sm sm:text-base"
              >
                <TTSWrapper text="Cancel">Cancel</TTSWrapper>
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0A5BE0] text-white rounded-full font-medium hover:bg-blue-700 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <TTSWrapper text="Submit Application">
                  Submit Application
                </TTSWrapper>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyNowModal;
