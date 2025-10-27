"use client";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  typeofCare: string;
  howSoonCareNeed: string;
  location: string;
}
function FormMHC() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    typeofCare: "",
    howSoonCareNeed: "",
    location: "",
  });
  const handleSubmit = () => {
    alert("Form submitted successfully!");
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
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: "rgba(1, 35, 103, 1)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-1">
            <TTSWrapper text="Work for Us">Work for Us</TTSWrapper>
          </h1>
          <p className="text-white text-base">
            <TTSWrapper text="Lorem Ipsum is simply dummy text of the printing and typesetting industry">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
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
            <select
              name="typeofCare"
              value={formData.typeofCare}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-lg bg-white text-black appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                backgroundSize: "1.5em 1.5em",
              }}
            >
              <option value="">Type of Care Needed*</option>
              <option value="healthcare">Healthcare</option>
              <option value="elderly-care">Elderly Care</option>
              <option value="home-services">Home Services</option>
              <option value="consultation">Consultation</option>
            </select>
            <select
              name="howSoonCareNeed"
              value={formData.howSoonCareNeed}
              onChange={handleInputChange}
              className="w-full px-6 py-4 rounded-lg bg-white text-black appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                backgroundSize: "1.5em 1.5em",
              }}
            >
              <option value="">How soon do you need care?*</option>
              <option value="today">Today</option>
              <option value="week">Within 1week</option>
              <option value="month">Within 1 month</option>
            </select>
          </div>
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
  );
}

export default FormMHC;
