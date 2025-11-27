"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import PageBanner from "@/components/sections/Common/PageBanner";
import TTSWrapper from "@/hooks/TTSWrapper";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import FAQ from "@/components/sections/Common/FAQ";
import { TestimonialCategory } from "@/types/Home.type";
import restApiWrapper from "@/service/RestApiWrapper";
import toast from "react-hot-toast";
import { ContactUsDataType } from "@/types/Contact.type";
import Image from "next/image";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    serviceType: "",
    message: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    const payload = {
      name: formData.name,
      phone_number: formData.phone_number,
      purpose_of_enquiry_id: Number(formData.serviceType),
      message: formData.message,
    };

    // Check which fields are missing
    const missingFields: string[] = [];

    if (!payload.name.trim()) missingFields.push("Name");
    if (!payload.phone_number.trim()) missingFields.push("Phone");
    if (!payload.purpose_of_enquiry_id) missingFields.push("Area of Interest");
    if (!payload.message.trim()) missingFields.push("Message");

    // If any fields are missing, show toast
    if (missingFields.length > 0) {
      if (missingFields.length === 1) {
        toast.error(`Please fill in ${missingFields[0]}`);
      } else {
        toast.error(
          `Please fill in all required fields: ${missingFields.join(", ")}`
        );
      }
      return;
    }

    // All fields are filled and valid, proceed with submission
    setIsSubmitting(true);
    restApiWrapper
      .post("/contact-enquiry", payload)
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
        setFormData({
          name: "",
          phone_number: "",
          serviceType: "",
          message: "",
        });
      });

    console.log("Form submitted:", payload);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For phone number field, only allow digits, +, spaces, dashes, and parentheses
    if (name === "phone_number") {
      // Remove any characters that are not digits, +, spaces, dashes, or parentheses
      const filteredValue = value.replace(/[^\d+\s\-()]/g, "");
      setFormData({
        ...formData,
        [name]: filteredValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      serviceType: value,
    });
    setIsDropdownOpen(false);
  };

  const [purposeOfEnquiries, setPurposeOfEnquiries] = useState<
    TestimonialCategory[]
  >([]);
  const [contactUsData, setContactUsData] = useState<ContactUsDataType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response2 = await restApiWrapper.get("/contact-us");
        const response = await restApiWrapper.get("/get-purpose-of-enquiries");
        setPurposeOfEnquiries(response.data);
        setContactUsData(response2.data);
      } catch (error) {
        console.error("Error fetching contact us data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectedService = purposeOfEnquiries.find(
    (option) => String(option.id) === formData.serviceType
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[9999]">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Animated Spinner */}
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[#E8EFFF] rounded-full"></div>
              <div className="w-20 h-20 border-4 border-[#0A5BE0] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#0A5BE0] rounded-full animate-pulse"></div>
              </div>
            </div>
            {/* Loading Text */}
            <div className="text-center">
              <p className="text-[#0A5BE0] text-xl font-semibold animate-pulse">
                <TTSWrapper text="Loading Contact Us...">
                  Loading Contact Us...
                </TTSWrapper>
              </p>
              <p className="text-gray-600 text-sm mt-3 max-w-md">
                <TTSWrapper text="Please wait while we fetch the content">
                  Please wait while we fetch the content
                </TTSWrapper>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={isLoading ? "blur-sm pointer-events-none" : ""}>
        <PageBanner
          title={contactUsData?.banner?.banner_title || ""}
          breadcrumb="Home / Contact Us"
          image="/common/contact-banner.jpeg"
          description={contactUsData?.banner?.banner_description || ""}
        />

        <div className="min-h-screen bg-white">
          <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                <TTSWrapper
                  text={contactUsData?.contact_cms.section1_title || ""}
                >
                  {contactUsData?.contact_cms.section1_title || ""}
                </TTSWrapper>
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-sm md:text-base">
                <TTSWrapper
                  text={contactUsData?.contact_cms.section1_description || ""}
                >
                  {contactUsData?.contact_cms.section1_description || ""}
                </TTSWrapper>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Location Card */}
                {contactUsData?.contact_infos.map((item) => (
                  <div
                    key={item.id}
                    className="bg-blue-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                      <Image
                        src={item.icon_value}
                        alt={item.icon_alt_text_value}
                        width={48}
                        height={48}
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <TTSWrapper text={item.content}>
                      <div
                        className="text-sm text-gray-700"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </TTSWrapper>
                  </div>
                ))}
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
                      <TTSWrapper
                        text={contactUsData?.contact_cms.section2_title || ""}
                      >
                        {contactUsData?.contact_cms.section2_title || ""}
                      </TTSWrapper>
                    </h2>
                    <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                      <TTSWrapper
                        text={
                          contactUsData?.contact_cms.section2_description || ""
                        }
                      >
                        {contactUsData?.contact_cms.section2_description || ""}
                      </TTSWrapper>
                    </p>
                  </div>

                  {/* Contact Options */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    {/* Emergency Helpline */}
                    {contactUsData?.contact_items.map((item) => (
                      <div key={item.id}>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full flex items-center flex-shrink-0">
                            <Image
                              src={item.icon_value}
                              alt={item.icon_alt_text_value}
                              width={19}
                              height={19}
                            />
                          </div>
                          <span className="font-semibold text-base text-black -ms-2">
                            <TTSWrapper text={item.title}>
                              {item.title}
                            </TTSWrapper>
                          </span>
                        </div>
                        <p className="text-[13px] text-[#999]">
                          <TTSWrapper text={item.sub_title}>
                            {item.sub_title}
                          </TTSWrapper>
                        </p>
                        <div className="text-sm text-black mt-3">
                          <TTSWrapper text={item.content}>
                            <div
                              className="text-sm text-gray-700"
                              dangerouslySetInnerHTML={{ __html: item.content }}
                            />
                          </TTSWrapper>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Contact Form */}
                <div className="bg-[#012B71] rounded-3xl p-4 md:p-6 lg:p-8 absolute right-0 me-16 h-auto pb-4 md:pb-6 lg:pb-8">
                  <h3 className="text-3xl font-semibold text-white mb-4 text-center pt-3">
                    <TTSWrapper
                      text={contactUsData?.contact_cms.section3_title || ""}
                    >
                      {contactUsData?.contact_cms.section3_title || ""}
                    </TTSWrapper>
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
                    <div>
                      <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone*"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 bg-white rounded-xl border-0 focus:outline-none text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-3 py-3 rounded-xl border-0 focus:outline-none text-gray-700 bg-white appearance-none text-left flex items-center justify-between"
                      >
                        <span
                          className={
                            formData.serviceType
                              ? "text-gray-900"
                              : "text-gray-500"
                          }
                        >
                          {selectedService
                            ? selectedService.title
                            : "Service Type*"}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#000] transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                          {purposeOfEnquiries.map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => {
                                handleSelectChange(String(option.id));
                                console.log(option.id);
                              }}
                              className={`w-full px-3 py-1 text-left hover:bg-blue-50 transition-colors ${
                                formData.serviceType === String(option.id)
                                  ? "bg-blue-100 text-blue-700 font-medium"
                                  : "text-gray-700"
                              }`}
                            >
                              {option.title}
                            </button>
                          ))}
                        </div>
                      )}
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

                    <div className="rounded-xl px-4 text-center cursor-pointert bg-transparent">
                      {/* <div className="w-8 h-8 flex items-center justify-center mx-auto">
                      <UploadIcon />
                    </div> */}
                      <p className="text-[#012B71] text-xs px-3">
                        <TTSWrapper text="Upload medical records, referral letters, or other relevant document">
                          Upload medical records, referral letters, or other
                          relevant document
                        </TTSWrapper>
                      </p>
                    </div>

                    <button
                      onClick={handleSubmit}
                      className={`mx-auto bg-[#0A5BE0] text-white py-3 px-4 mt-3 rounded-full flex items-center justify-center group text-sm hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ${
                        isSubmitting
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <TTSWrapper
                        text={isSubmitting ? "Submitting..." : "Submit Enquiry"}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                      </TTSWrapper>
                      <span className="ml-2">
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
                src={contactUsData?.contact_cms.section4_iframe_url}
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
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ
          title={contactUsData?.contact_cms.section5_title || ""}
          description={contactUsData?.contact_cms.section5_description || ""}
          faqList={contactUsData?.faqs}
        />
      </div>
    </>
  );
};

export default ContactPage;
