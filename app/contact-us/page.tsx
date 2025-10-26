"use client";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import PageBanner from "@/components/sections/Common/PageBanner";
import TTSWrapper from "@/hooks/TTSWrapper";
import {
  ClockBlueOutline,
  MailBlueOutline,
  MapPinWithBg,
  PhoneBlueOutline,
  TopRightArrowWhite,
  UploadIcon,
} from "@/components/helpers/svgs";
import FAQ from "@/components/sections/Common/FAQ";

// Main Contact Page Component
const ContactPage: React.FC = () => {
  // Map Configuration - Easy to change coordinates
  // Simply update these values to change the map location and pin position
  const mapConfig = {
    latitude: 50.3755, // Change this to your desired latitude
    longitude: -4.1426, // Change this to your desired longitude
    zoom: 15, // Zoom level (1-20, higher = more zoomed in)
    title: "2nd Floor", // Location title shown in overlay
    address: "2nd Floor, 23 Lockyer St, Plymouth PL1 2QW, UK", // Full address
  };

  const [formData, setFormData] = useState({
    name: "",
    serviceType: "",
    message: "",
  });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateMapUrls = () => {
    const { latitude, longitude } = mapConfig;

    return {
      // Grayscale map with colored pin - using style parameters
      embed: `https://maps.google.com/maps?q=${latitude},${longitude}&t=m&z=${mapConfig.zoom}&output=embed`,
      search: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
      directions: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
    };
  };

  const mapUrls = generateMapUrls();

  return (
    <>
      <PageBanner
        title="Get In Touch With Us"
        breadcrumb="Home / Contact Us"
        image="/common/contact-banner.jpeg"
        description="Our team of healthcare professionals is here to help you. Get in touch with us to discuss your care needs and find the right solution for you."
      />

      <div className="min-h-screen bg-white">
        <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Contact Information
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-sm md:text-base">
              Mass Care Agency is a registered nursing agency. We are dedicated
              to the health profession, care industry all over the UK by
              supplying quality health care professionals. fulfill your staffing
              needs when you require, and we are available 24 hours a day 7 days
              a week.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Location Card */}
              <div className="bg-blue-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 flex items-center justify-center mb-4">
                  <MapPinWithBg />
                </div>
                <h3 className="font-bold text-lg mb-2">Location</h3>
                <p className="text-sm text-gray-700">
                  2nd Floor, 23 Lockyer Street,
                  <br />
                  Plymouth, PL1 2QW
                </p>
              </div>

              {/* Open Hours Card */}
              <div className="bg-blue-600 rounded-2xl p-6 text-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                  <ClockBlueOutline />
                </div>
                <h3 className="font-bold text-lg mb-2">Open Hours</h3>
                <p className="text-sm">
                  Mon - Fri: 8 AM to 8 PM
                  <br />
                  Sat: 9 AM to 4 PM
                </p>
              </div>

              {/* Email Card */}
              <div className="bg-blue-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <MailBlueOutline />
                </div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-sm text-gray-700 break-words">
                  plymouth@massiscareagency.co.uk
                  <br />
                  career@massiscareagency.co.uk
                </p>
              </div>

              {/* Phone Card */}
              <div className="bg-blue-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <PhoneBlueOutline />
                </div>
                <h3 className="font-bold text-lg mb-2">Phone</h3>
                <p className="text-sm text-gray-700">
                  01752 418385
                  <br />
                  0782 444 39 49
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16">
          <div className="max-w-full mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Side - Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-3">
                    <TTSWrapper text="Get In Touch With Us">
                      Get In Touch With Us
                    </TTSWrapper>
                  </h2>
                  <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                    <TTSWrapper text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the
                      industry&apos;s standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book.
                    </TTSWrapper>
                  </p>
                </div>

                {/* Contact Options */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Emergency Helpline */}
                  <div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                        >
                          <path
                            d="M16.208 2.78C12.4994 -0.927453 6.48747 -0.926563 2.78001 2.78205C-0.927454 6.49065 -0.926564 12.5025 2.78205 16.21C6.49066 19.9175 12.5025 19.9166 16.21 16.208C17.9905 14.4269 18.9906 12.0114 18.99 9.49296C18.9895 6.97494 17.9888 4.56024 16.208 2.78ZM14.3798 13.2264C14.3794 13.2268 14.379 13.2273 14.3786 13.2277V13.2245L13.8975 13.7024C13.2753 14.3325 12.3692 14.5917 11.5079 14.3861C10.6402 14.1538 9.81532 13.7841 9.06454 13.291C8.36703 12.8452 7.72063 12.3241 7.13706 11.737C6.60011 11.2039 6.11772 10.6187 5.69697 9.98989C5.23676 9.3133 4.8725 8.57625 4.61454 7.7997C4.31883 6.88744 4.56388 5.88642 5.24756 5.21391L5.81091 4.65055C5.96754 4.49322 6.22205 4.49266 6.37935 4.64929C6.37976 4.6497 6.3802 4.65011 6.38061 4.65055L8.15933 6.42927C8.31666 6.5859 8.31722 6.84041 8.16059 6.99771C8.16018 6.99812 8.15977 6.99852 8.15933 6.99897L7.11488 8.04342C6.81519 8.33984 6.77751 8.81088 7.02627 9.15118C7.40403 9.66962 7.82207 10.1575 8.27646 10.6103C8.78307 11.1191 9.33381 11.5819 9.92225 11.9934C10.2622 12.2305 10.7232 12.1905 11.0173 11.8984L12.0269 10.873C12.1836 10.7156 12.4381 10.7151 12.5954 10.8717C12.5958 10.8721 12.5962 10.8725 12.5966 10.873L14.3785 12.658C14.5359 12.8146 14.5365 13.0691 14.3798 13.2264Z"
                            fill="#0A5BE0"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold text-base text-black -ms-2">
                        <TTSWrapper text="Emergency Helpline">
                          Emergency Helpline
                        </TTSWrapper>
                      </span>
                    </div>
                    <p className="text-[13px] text-[#999]">
                      <TTSWrapper text="Available 24/7 for urgent care">
                        Available 24/7 for urgent care
                      </TTSWrapper>
                    </p>
                    <p className="text-sm text-black mt-3">
                      <TTSWrapper text="+44 20 7946 0958">
                        +44 20 7946 0958
                      </TTSWrapper>
                    </p>
                  </div>

                  {/* Support Email */}
                  <div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                        >
                          <circle
                            cx="9.495"
                            cy="9.495"
                            r="9.495"
                            fill="#0A5BE0"
                          />
                          <path
                            d="M8.86832 10.5871L4.0155 7.0575C4.00611 7.06228 4.00939 7.06061 4 7.06539V12.4065C4 12.9965 4.47826 13.4747 5.06822 13.4747H13.614C14.2039 13.4747 14.6822 12.9965 14.6822 12.4065V7.0526C14.6805 7.05172 14.6811 7.05203 14.6793 7.05115L9.814 10.5872C9.53206 10.7921 9.15019 10.7921 8.86832 10.5871Z"
                            fill="white"
                          />
                          <path
                            d="M9.81428 9.2681L14.1241 6.13388C13.9732 6.05127 13.7994 6 13.6142 6H5.06849C4.88333 6 4.71242 6.05127 4.55859 6.13388L8.86846 9.2681C9.1504 9.47313 9.53234 9.47313 9.81428 9.2681Z"
                            fill="white"
                          />
                        </svg>{" "}
                      </div>
                      <span className="font-semibold text-sm md:text-base text-black -ms-2">
                        <TTSWrapper text="Support Email">
                          Support Email
                        </TTSWrapper>
                      </span>
                    </div>
                    <p className="text-[13px] text-[#999]">
                      <TTSWrapper text="Response within 24 hours">
                        Response within 24 hours
                      </TTSWrapper>
                    </p>
                    <p className="text-sm text-black break-words mt-3">
                      <TTSWrapper text="support@maxxcare.co.uk">
                        support@maxxcare.co.uk
                      </TTSWrapper>
                    </p>
                  </div>

                  {/* General Enquiries */}
                  <div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                        >
                          <path
                            d="M9.4942 0C4.27239 0 0 4.27239 0 9.4942C0 14.716 4.27239 18.9884 9.4942 18.9884C14.716 18.9884 18.9884 14.716 18.9884 9.4942C18.9884 4.27239 14.716 0 9.4942 0ZM10.4436 13.2919C10.4436 13.8615 10.0638 14.2413 9.4942 14.2413C8.92454 14.2413 8.54478 13.8615 8.54478 13.2919V8.54478C8.54478 7.97512 8.92454 7.59536 9.4942 7.59536C10.0638 7.59536 10.4436 7.97512 10.4436 8.54478V13.2919ZM9.4942 6.64594C8.92454 6.64594 8.54478 6.26617 8.54478 5.69652C8.54478 5.12687 8.92454 4.7471 9.4942 4.7471C10.0638 4.7471 10.4436 5.12687 10.4436 5.69652C10.4436 6.26617 10.0638 6.64594 9.4942 6.64594Z"
                            fill="#0A5BE0"
                          />
                        </svg>{" "}
                      </div>
                      <span className="font-semibold text-sm md:text-base text-black -ms-2">
                        <TTSWrapper text="General Enquiries">
                          General Enquiries
                        </TTSWrapper>
                      </span>
                    </div>
                    <p className="text-[13px] text-[#999]">
                      <TTSWrapper text="Mon-Fri 8:00 AM - 6:00 PM">
                        Mon-Fri 8:00 AM - 6:00 PM
                      </TTSWrapper>
                    </p>
                    <p className="text-base text-black mt-3">
                      <TTSWrapper text="+44 20 7946 0955">
                        +44 20 7946 0955
                      </TTSWrapper>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="bg-[#012B71] rounded-3xl p-4 md:p-6 lg:p-8 absolute right-0 me-16 h-[60vh]">
                <h3 className="text-3xl font-semibold text-white mb-4 text-center pt-3">
                  <TTSWrapper text="Contact Form">Contact Form</TTSWrapper>
                </h3>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name*"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-white rounded-xl border-0 focus:outline-none text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div className="relative">
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleSelectChange}
                      className="w-full px-3 py-3 rounded-xl border-0 focus:outline-none text-gray-700 bg-white appearance-none pr-10"
                    >
                      <option value="" disabled>
                        Service Type*
                      </option>
                      <option value="elderly-care">Elderly Care</option>
                      <option value="post-surgery">Post-Surgery Support</option>
                      <option value="physiotherapy">Physiotherapy</option>
                      <option value="medication">Medication Management</option>
                      <option value="companionship">Companionship</option>
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#000] pointer-events-none" />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleTextareaChange}
                      rows={3}
                      className="w-full px-3 py-2 h-36 rounded-xl border-0 focus:outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div className="border-2 border-dashed border-white rounded-xl p-4 text-center cursor-pointert bg-transparent">
                    <div className="w-8 h-8 flex items-center justify-center mx-auto">
                      <UploadIcon />
                    </div>
                    <p className="text-white/80 text-xs px-3">
                      <TTSWrapper text="Upload medical records, referral letters, or other relevant document">
                        Upload medical records, referral letters, or other
                        relevant document
                      </TTSWrapper>
                    </p>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="mx-auto bg-[#0A5BE0] text-white py-3 px-4 mt-5 rounded-full flex items-center justify-center group text-sm hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
                  >
                    <TTSWrapper text="Submit Enquiry">
                      Submit Enquiry
                    </TTSWrapper>
                    <span className="ml-2">
                      {" "}
                      <TopRightArrowWhite />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="pb-8 md:pb-12">
        <div className="max-w-full mx-auto">
          <div className="overflow-hidden h-64 md:h-80 lg:h-100 bg-gray-200">
            {/* Interactive Map with Dynamic Coordinates */}
            <iframe
              src={mapUrls.embed}
              width="100%"
              height="100%"
              style={{
                border: 0,
                pointerEvents: "none", // disables zoom & pan
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mass Care Location Map"
            ></iframe>

            {/* Location Info Overlay */}
            {/* <div className="absolute top-4 left-4 bg-white rounded-lg p-4 shadow-lg max-w-xs">
              <p className="font-semibold text-sm mb-1 text-black">
                <TTSWrapper text={mapConfig.title}>
                  {mapConfig.title}
                </TTSWrapper>
              </p>
              <p className="text-xs text-gray-600 mb-2">
                <TTSWrapper text={mapConfig.address}>
                  {mapConfig.address}
                </TTSWrapper>
              </p>
              <div className="flex gap-4">
                <a
                  href={mapUrls.search}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs hover:underline"
                >
                  <TTSWrapper text="View larger map">
                    View larger map
                  </TTSWrapper>
                </a>
                <a
                  href={mapUrls.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs hover:underline flex items-center gap-1"
                >
                  <TTSWrapper text="Directions">Directions</TTSWrapper>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </>
  );
};

export default ContactPage;
