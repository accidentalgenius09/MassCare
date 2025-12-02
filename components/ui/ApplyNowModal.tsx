"use client";

import TTSWrapper from "@/hooks/TTSWrapper";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { UploadOutline, XOutline } from "../helpers/svgs";
import restApiWrapper from "@/service/RestApiWrapper";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

interface ApplyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId: number;
}

const ApplyNowModal: React.FC<ApplyNowModalProps> = ({
  isOpen,
  onClose,
  jobTitle,
  jobId,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    cv: null as File | null,
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    experience?: string;
    cv?: string;
    agreeToTerms?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExperienceDropdownOpen, setExperienceDropdownOpen] = useState(false);
  const experienceDropdownRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dropdownCloseTimeoutRef = useRef<number | null>(null);

  const experienceOptions = [
    { value: 1, label: "1 year" },
    { value: 2, label: "2 years" },
    { value: 3, label: "3 years" },
    { value: 4, label: "4 years" },
    { value: 5, label: "5 years" },
  ];

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Allow only digits and plus sign, max 13 characters
    const phoneRegex = /^[\d\+]+$/;
    // Should have at least 10 digits and max 13 characters (including +)
    const digitsOnly = phone.replace(/\D/g, "");
    return (
      phoneRegex.test(phone) && phone.length <= 13 && digitsOnly.length >= 10
    );
  };

  const validateFile = (file: File | null): string | null => {
    if (!file) {
      return "CV file is required";
    }

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileExtension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(fileExtension)
    ) {
      return "Please upload a PDF, DOC, or DOCX file";
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    return null;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Allow only numbers and + sign
    value = value.replace(/[^\d\+]/g, "");

    // Limit to 13 characters
    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    // Ensure + is only at the beginning if present
    if (value.includes("+") && value.indexOf("+") !== 0) {
      value = value.replace(/\+/g, "");
      value = "+" + value;
    }

    // Limit to one + sign
    const plusCount = (value.match(/\+/g) || []).length;
    if (plusCount > 1) {
      value = "+" + value.replace(/\+/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
      // Clear error when checkbox is checked
      if ((e.target as HTMLInputElement).checked) {
        setErrors((prev) => ({ ...prev, agreeToTerms: undefined }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Clear error when user starts typing
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleExperienceSelect = (value: number | string) => {
    setFormData((prev) => ({
      ...prev,
      experience: String(value),
    }));
    // Clear error when experience is selected
    setErrors((prev) => ({ ...prev, experience: undefined }));
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

  // Close modal and reset form when pathname changes to /application-received
  useEffect(() => {
    if (pathname === "/application-received") {
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        experience: "",
        cv: null,
        agreeToTerms: false,
      });
      setErrors({});
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onClose();
    }
  }, [pathname, onClose]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      cv: file,
    }));

    // Validate file immediately
    const fileError = validateFile(file);
    if (fileError) {
      setErrors((prev) => ({ ...prev, cv: fileError }));
      // Clear the file input if invalid
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setErrors((prev) => ({ ...prev, cv: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone =
        "Please enter a valid phone number (10-13 digits, + allowed)";
    }

    // Validate experience
    if (!formData.experience) {
      newErrors.experience = "Please select your experience";
    }

    // Validate file
    const fileError = validateFile(formData.cv);
    if (fileError) {
      newErrors.cv = fileError;
    }

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object
      const formdata = new FormData();

      // Append form fields
      formdata.append("career_id", jobId.toString());
      formdata.append("name", formData.fullName.trim());
      formdata.append("email", formData.email.trim());
      formdata.append("phone_number", formData.phone.trim());
      formdata.append("experience", formData.experience);

      // Append resume file with filename as third parameter
      if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
        const file = fileInputRef.current.files[0];
        // Use the file's name as the filename (third parameter)
        formdata.append("resume", file, file.name);
      }

      const response = await restApiWrapper.post("/career-enquiry", formdata);
      if (response.status < 400) {
        router.push("/application-received");
        // Form reset and modal close will happen in useEffect when pathname changes
      } else {
        toast.error("Application submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBackdropWheel = (e: React.WheelEvent) => {
    // Prevent background scroll when scrolling on backdrop
    const target = e.target as HTMLElement;
    const modalContent = target.closest('.modal-content-wrapper');
    
    // If scrolling on backdrop (not modal content), prevent it
    if (!modalContent || target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore body scroll
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0000004f] overflow-y-auto"
      onClick={handleBackdropClick}
      onWheel={handleBackdropWheel}
      onScroll={(e) => {
        // Prevent backdrop from scrolling
        if (e.target === e.currentTarget) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onTouchMove={(e) => {
        // Prevent background scroll on touch devices
        const target = e.target as HTMLElement;
        const modalContent = target.closest('.modal-content-wrapper');
        if (!modalContent) {
          e.preventDefault();
        }
      }}
    >
      <div className="modal-content-wrapper bg-white rounded-md w-[98%] max-w-6xl max-h-[90vh] my-auto relative flex flex-col">
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
                className={`w-full px-4 py-2.5 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                required
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
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
                className={`w-full px-4 py-2.5 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
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
                onChange={handlePhoneChange}
                placeholder="Enter Phone number"
                maxLength={13}
                className={`w-full px-4 py-2.5 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                <TTSWrapper text="Experience *">Experience *</TTSWrapper>
              </label>
              <div className="relative" ref={experienceDropdownRef}>
                <button
                  type="button"
                  onClick={() => setExperienceDropdownOpen((prev) => !prev)}
                  className={`w-full px-4 py-2.5 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base flex items-center justify-between ${
                    errors.experience
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  } ${
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
                            String(option.value) === formData.experience
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
                        String(option.value) === formData.experience;
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
                              if (event.key === "Enter" || event.key === " ") {
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
              {errors.experience && (
                <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
              )}
            </div>

            {/* Upload CV */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                <TTSWrapper text="Upload CV *">Upload CV *</TTSWrapper>
              </label>
              <div className="relative">
                <input
                  ref={fileInputRef}
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
                      Click To Upload Your CV (PDF, DOC, DOCX) (Max 5MB)
                    </TTSWrapper>
                  </p>
                </div>
              </div>
              {formData.cv && !errors.cv && (
                <p className="text-sm text-green-600 mt-2">
                  <TTSWrapper text={`Selected: ${formData.cv.name}`}>
                    Selected: {formData.cv.name}
                  </TTSWrapper>
                </p>
              )}
              {errors.cv && (
                <p className="text-red-500 text-xs mt-1">{errors.cv}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className={`w-5 h-5 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.agreeToTerms ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                <label className="text-sm text-black">
                  <TTSWrapper text="I Agree To The Terms & Conditions *">
                    I Agree To The Terms & Conditions *
                  </TTSWrapper>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-xs mt-1 ml-8">
                  {errors.agreeToTerms}
                </p>
              )}
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
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0A5BE0] text-white rounded-full font-medium hover:bg-blue-700 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <TTSWrapper
                  text={isSubmitting ? "Submitting..." : "Submit Application"}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </TTSWrapper>
                {!isSubmitting && <ArrowUpRight className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyNowModal;
