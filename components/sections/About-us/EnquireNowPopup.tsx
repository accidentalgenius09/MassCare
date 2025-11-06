"use client";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import React, { useState } from "react";
import { X } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  message: string;
}

interface EnquireNowPopupProps {
  onClose?: () => void;
}

function EnquireNowPopup({ onClose }: EnquireNowPopupProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    areaOfInterest: "",
    message: "",
  });
  const handleSubmit = () => {
    alert("Form submitted successfully!");
    if (onClose) onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto scrollbar-hide bg-[#012B71]/80"
      onClick={handleBackdropClick}
    >
      <div className="flex items-center justify-center min-h-screen p-4 mx-52">
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 hover:text-gray-600 text-white" />
            </button>
          )}

          <section
            className="py-16 px-4 sm:px-6 lg:px-8"
            style={{
              background: "rgba(1, 35, 103, 1)",
              borderRadius: "1rem",
            }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-1">
                  <TTSWrapper text="Enquire Now">Enquire Now</TTSWrapper>
                </h1>
                <p className="text-white text-base">
                  <TTSWrapper text="Lorem Ipsum is simply dummy text of the printing and typesetting industry">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
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
                  <select
                    name="areaOfInterest"
                    value={formData.areaOfInterest}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-lg bg-white text-black appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1.5em 1.5em",
                    }}
                  >
                    <option value="">Enquiry Type*</option>
                    <option value="healthcare">General Enquiry</option>
                    <option value="elderly-care">Care Enquiry</option>
                    <option value="home-services">Home Enquiry</option>
                    <option value="consultation">Consultation Enquiry</option>
                  </select>
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
                    className="inline-flex items-center gap-2 px-8 py-3 text-white font-medium rounded-lg "
                    style={{
                      background: "rgba(10, 91, 224, 1)",
                      borderRadius: "300px",
                    }}
                  >
                    <TTSWrapper
                      text="Submit Enquiry"
                      className="inline-flex items-center gap-1 text-white font-medium rounded-lg"
                    >
                      Submit Enquiry{""}
                    </TTSWrapper>
                    <TopRightArrowWhite />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default EnquireNowPopup;
