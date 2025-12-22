"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import PageBanner from "@/components/sections/Common/PageBanner";
import TTSWrapper from "@/hooks/TTSWrapper";
import FAQ from "@/components/sections/Common/FAQ";
import { MetaData, TestimonialCategory } from "@/types/Home.type";
import restApiWrapper from "@/service/RestApiWrapper";
import toast from "react-hot-toast";
import { ContactUsDataType } from "@/types/Contact.type";
import Image from "next/image";
import {
  ClockBlueOutline,
  ClockWhiteOutline,
  MailBlueOutline,
  MailWhiteOutline,
  MapPinWithBg,
  MapPinWithBgWhite,
  PhoneBlueOutline,
  PhoneWhiteOutline,
  TopRightArrowWhite,
  UploadIcon,
} from "@/components/helpers/svgs";

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

    // Check required fields
    const missingFields: string[] = [];
    if (!payload.name.trim()) missingFields.push("Name");
    if (!payload.phone_number.trim()) missingFields.push("Phone");
    if (!payload.purpose_of_enquiry_id) missingFields.push("Area of Interest");
    if (!payload.message.trim()) missingFields.push("Message");

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
    // Validate phone number (count digits, not total length)
    const phoneDigits = formData.phone_number.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Validate message
    const messageLength = formData.message.trim().length;
    if (messageLength < 2) {
      toast.error("Message must be at least 2 characters");
      return;
    }
    if (messageLength > 500) {
      toast.error("Message must be less than 500 characters");
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
        console.error(err);
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
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For phone number field, only allow digits, +, spaces, dashes, and parentheses
    if (name === "phone_number") {
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
  const [metaData, setMetaData] = useState<MetaData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response2 = await restApiWrapper.get("/contact-us");
        const response = await restApiWrapper.get("/get-purpose-of-enquiries");
        setPurposeOfEnquiries(response.data);
        setContactUsData(response2.data);
        const meta = await restApiWrapper.get("/meta-tags?page=contact-us");
        // Parse the metadata if it's a string, otherwise use directly
        const parsedMeta =
          typeof meta.data === "string" ? JSON.parse(meta.data) : meta.data;
        setMetaData(parsedMeta);
      } catch (error) {
        console.error("Error fetching contact us data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!metaData) return;

    // 1. Set title
    if (metaData.meta_title) {
      document.title = metaData.meta_title;
    }

    // 2. Set or create meta description
    let metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    if (metaData.meta_description) {
      metaDescription.setAttribute("content", metaData.meta_description);
    }

    // 3. Set or append meta keywords (with dedupe)
    let metaKeywords = document.querySelector<HTMLMetaElement>(
      'meta[name="keywords"]'
    );
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }

    if (metaData.meta_keywords) {
      const existingKeywords = metaKeywords.getAttribute("content") || "";

      const combinedKeywords = [
        ...existingKeywords.split(","),
        ...metaData.meta_keywords.split(","),
      ]
        .map((k) => k.trim())
        .filter(Boolean);

      const uniqueKeywords = Array.from(new Set(combinedKeywords));

      metaKeywords.setAttribute("content", uniqueKeywords.join(", "));
    }

    // 4. Parse and append other_meta_tags (e.g., <meta name="author" ...>)
    if (metaData.other_meta_tags) {
      try {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = metaData.other_meta_tags;

        const metaTags = tempDiv.querySelectorAll("meta");

        metaTags.forEach((tag) => {
          const name = tag.getAttribute("name") || tag.getAttribute("property");
          const content = tag.getAttribute("content");
          const httpEquiv = tag.getAttribute("http-equiv");

          if (!content && !httpEquiv && !name) return;

          let existingTag: HTMLMetaElement | null = null;

          if (name) {
            existingTag = document.querySelector(
              `meta[name="${name}"], meta[property="${name}"]`
            );
          } else if (httpEquiv) {
            existingTag = document.querySelector(
              `meta[http-equiv="${httpEquiv}"]`
            );
          }

          // Only append if not already present
          if (!existingTag) {
            const newMeta = document.createElement("meta");
            if (name) newMeta.setAttribute("name", name);
            if (httpEquiv) newMeta.setAttribute("http-equiv", httpEquiv);
            if (content) newMeta.setAttribute("content", content);
            document.head.appendChild(newMeta);
          }
        });
      } catch (error) {
        console.error("Error parsing other_meta_tags:", error);
      }
    }

    // 5. Cleanup: optional – restore default title on unmount
    return () => {
      document.title =
        "Mass Care - Professional Nursing, Home Care & Training Services";
    };
  }, [metaData]);

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

  const [contactIcons, setContactIcons] = useState<
    Array<{
      id: number;
      icon: React.ReactElement;
      hoverIcon: React.ReactElement;
      title: string;
      content: string;
    }>
  >([]);

  useEffect(() => {
    if (
      !contactUsData?.contact_infos ||
      !Array.isArray(contactUsData.contact_infos) ||
      contactUsData.contact_infos.length === 0
    ) {
      setContactIcons([]);
      return;
    }

    // Validate that all icon components are defined
    const iconComponents = {
      ClockBlueOutline,
      ClockWhiteOutline,
      MailBlueOutline,
      MailWhiteOutline,
      MapPinWithBg,
      MapPinWithBgWhite,
      PhoneBlueOutline,
      PhoneWhiteOutline,
    };

    // Check if any icon component is undefined
    const undefinedIcons = Object.entries(iconComponents).filter(
      ([_, component]) => !component
    );
    if (undefinedIcons.length > 0) {
      console.error(
        "Undefined icon components:",
        undefinedIcons.map(([name]) => name)
      );
      setContactIcons([]);
      return;
    }

    const respData = contactUsData.contact_infos
      .map((item) => {
        let icon: React.ReactElement;
        let hoverIcon: React.ReactElement;
        if (item.title === "Open Hours") {
          icon = <ClockWhiteOutline />;
          hoverIcon = <ClockBlueOutline />;
        } else if (item.title === "Mail To Us") {
          icon = <MailWhiteOutline />;
          hoverIcon = <MailBlueOutline />;
        } else if (item.title === "Location") {
          icon = <MapPinWithBg />;
          hoverIcon = <MapPinWithBgWhite />;
        } else if (item.title === "Get Consultation") {
          icon = <PhoneWhiteOutline />;
          hoverIcon = <PhoneBlueOutline />;
        } else {
          icon = <ClockWhiteOutline />;
          hoverIcon = <ClockBlueOutline />; // Default icon
        }
        return {
          id: item.id,
          icon: icon,
          hoverIcon: hoverIcon,
          title: item.title,
          content: item.content,
        };
      })
      .filter((item) => item.icon && item.hoverIcon); // Filter out any items with undefined icons
    setContactIcons(respData);
  }, [contactUsData?.contact_infos]);

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
              <p className="text-[#0A5BE0] text-sm mt-3 max-w-md">
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
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
                {contactIcons.map((item) => {
                  if (!item.icon || !item.hoverIcon) return null;
                  return (
                    <div
                      key={item.id}
                      className="group rounded-2xl p-6 cursor-pointer
                 bg-blue-50 hover:bg-[#0A5BE0]
                 transition-colors duration-300"
                    >
                      <div
                        className="w-12 h-12 flex items-center justify-center mb-4 
                      bg-[#0A5BE0] group-hover:bg-white 
                      rounded-full transition-colors duration-300 relative"
                      >
                        <span className="block group-hover:hidden">
                          {item.icon}
                        </span>
                        <span className="hidden group-hover:block">
                          {item.hoverIcon}
                        </span>
                      </div>
                      <h3
                        className="font-bold text-base sm:text-lg mb-2 
                     text-black group-hover:text-white 
                     transition-colors duration-300"
                      >
                        {item.title}
                      </h3>

                      {/* Content */}
                      <TTSWrapper text={item.content}>
                        <div
                          className="text-sm text-gray-700 group-hover:text-white 
                     transition-colors duration-300"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </TTSWrapper>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Main Contact Section */}
          <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16 relative">
            <div className="max-w-full mx-auto">
              <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
                {/* Left Side - Contact Info */}
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">
                      <TTSWrapper
                        text={contactUsData?.contact_cms.section2_title || ""}
                      >
                        {contactUsData?.contact_cms.section2_title || ""}
                      </TTSWrapper>
                    </h2>
                    <p className="text-gray-600 mb-6 md:mb-8 text-sm leading-relaxed">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Emergency Helpline */}
                    {contactUsData?.contact_items.map((item) => (
                      <div key={item.id}>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full flex items-center flex-shrink-0">
                            <Image
                              src={item.icon_value}
                              alt={item.icon_alt_text_value}
                              width={29}
                              height={29}
                              loading="lazy"
                              sizes="29px"
                            />
                          </div>
                          <span className="font-semibold text-base text-black flex-1 min-w-0 break-words">
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
                        <div className="text-sm text-black mt-3 max-w-sm break-words">
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
                <div className="bg-[#012B71] lg:absolute rounded-2xl sm:rounded-3xl p-4 md:p-6 lg:p-8 relative lg:right-10 lg:-translate-x-16 h-auto pb-4 md:pb-6 lg:pb-8 mt-6 lg:mt-0">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 text-center pt-3">
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
                        className="w-full px-3 py-2.5 sm:py-3 bg-white rounded-xl border-0 focus:outline-none text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone*"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 sm:py-3 bg-white rounded-xl border-0 focus:outline-none text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                      />
                    </div>

                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-3 py-2.5 sm:py-3 rounded-xl border-0 focus:outline-none text-gray-700 bg-white appearance-none text-left flex items-center justify-between text-sm sm:text-base"
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
                        className="w-full px-3 py-2 h-32 sm:h-36 rounded-xl border-0 focus:outline-none bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base resize-none"
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
                      className={`w-full sm:w-auto mx-auto bg-[#0A5BE0] text-white py-2.5 sm:py-3 px-4 sm:px-6 mt-3 rounded-full flex items-center justify-center group text-sm sm:text-base hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ${
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
