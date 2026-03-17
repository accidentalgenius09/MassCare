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
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  MailContact,
  PhoneContact,
  MapPinContact,
  TopRightArrowWhite,
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
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async () => {
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

    // Get reCAPTCHA token right before submission
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA is not ready. Please try again.");
      return;
    }

    try {
      const token = await executeRecaptcha("submit");
      console.log("reCAPTCHA Token:", token);

      // All fields are filled and valid, proceed with submission
      setIsSubmitting(true);
      const finalPayload = {
        ...payload,
        captcha_key: token,
      };
      console.log("Final Payload being sent:", finalPayload);

      restApiWrapper
        .post("/contact-enquiry", finalPayload)
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
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      toast.error("reCAPTCHA verification failed. Please try again.");
    }
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

  const [contactIcons, setContactIcons] = useState<{
    id?: number;
    address?: string;
    phone_number?: string;
    email?: string;
    map_embed_url?: string;
    title?: string;
  }>({});
  const hasContactIcons = Object.keys(contactIcons).length > 0;

  const [selectedLocation, setSelectedLocation] = useState<
    ContactUsDataType["locations"][number] | null
  >(null);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const locationDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedLocation && contactUsData?.locations?.length) {
      setSelectedLocation(contactUsData.locations[0]);
    }
  }, [contactUsData?.locations, selectedLocation]);

  useEffect(() => {
    if (selectedLocation) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await restApiWrapper.get(
            `/contact-info?location=${selectedLocation.slug}`
          );
          setContactIcons(response?.data ?? {});
        } catch (error) {
          console.error("Error fetching contact infos:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [selectedLocation]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLocationDropdownOpen(false);
      }
    };

    if (isLocationDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLocationDropdownOpen]);

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

        <div className="bg-white">
          <section className="py-10 md:py-14 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
              {/* Locations + Map */}
              <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
                <div className="rounded-2xl bg-white">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
                        <TTSWrapper
                          text={contactUsData?.contact_cms.section1_title || ""}
                        >
                          {contactUsData?.contact_cms.section1_title || ""}
                        </TTSWrapper>
                      </h2>
                      <p className="text-gray-600 mt-2 max-w-xl text-sm md:text-base">
                        <TTSWrapper
                          text={
                            contactUsData?.contact_cms.section1_description || ""
                          }
                        >
                          {contactUsData?.contact_cms.section1_description || ""}
                        </TTSWrapper>
                      </p>
                    </div>

                    {/* Location dropdown (UI only) */}
                    <div
                      className="w-full sm:w-56"
                      ref={locationDropdownRef}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setIsLocationDropdownOpen(!isLocationDropdownOpen)
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-left flex items-center justify-between text-sm sm:text-base shadow-sm"
                      >
                        <span className="text-gray-900">
                          {selectedLocation?.name || "Select location"}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#000] transition-transform duration-200 ${isLocationDropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      {isLocationDropdownOpen && (
                        <div className="absolute w-full sm:w-56 mt-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
                          {contactUsData?.locations.map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => {
                                setSelectedLocation(option);
                                setIsLocationDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors text-sm ${selectedLocation?.id === option.id
                                ? "bg-blue-100 text-blue-700 font-medium"
                                : "text-gray-700"
                                }`}
                            >
                              {option.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-white">
                    <div className="mt-1 text-lg sm:text-xl font-semibold text-black">
                      <TTSWrapper text={contactIcons.title || ""}>
                        {contactIcons.title}
                      </TTSWrapper>
                    </div>

                    <div className="mt-1">
                      {hasContactIcons && (
                        <div key={contactIcons.id}>
                          {/* Address */}
                          <div className="py-4">
                            <div className="flex items-center gap-1 font-bold text-[#0D1B3E] text-sm mb-2">
                              <MapPinContact />
                              <TTSWrapper text="Address">Address</TTSWrapper>
                            </div>
                            <div className="text-base text-gray-700">
                              <TTSWrapper text={contactIcons.address || ""}>
                                {contactIcons.address}
                              </TTSWrapper>
                            </div>
                          </div>
                          <hr className="border-gray-200" />

                          {/* Phone */}
                          <div className="py-4">
                            <div className="flex items-center gap-1 font-bold text-[#0D1B3E] text-sm mb-2">
                              <PhoneContact />
                              <TTSWrapper text="Phone">Phone</TTSWrapper>
                            </div>
                            <div className="text-base text-gray-700">
                              <TTSWrapper text={contactIcons.phone_number || ""}>
                                {contactIcons.phone_number}
                              </TTSWrapper>
                            </div>
                          </div>
                          <hr className="border-gray-200" />

                          {/* Email */}
                          <div className="py-4">
                            <div className="flex items-center gap-1 font-bold text-[#0D1B3E] text-sm mb-2">
                              <MailContact />
                              <TTSWrapper text="Email">Email</TTSWrapper>
                            </div>
                            <div className="text-base text-gray-700">
                              <TTSWrapper text={contactIcons.email || ""}>
                                {contactIcons.email}
                              </TTSWrapper>
                            </div>
                          </div>
                          <hr className="border-gray-200" />

                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {hasContactIcons && (
                  <div className="rounded-2xl overflow-hidden bg-gray-200 min-h-[260px] md:min-h-[340px]">
                    <iframe
                      src={contactIcons?.map_embed_url ?? ""}
                      width="100%"
                      height="100%"
                      style={{
                        border: 0,
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mass Care Location Map"
                    ></iframe>
                  </div>
                )}
              </div>

              {/* Contact Form + Info Box */}
              <div className="mt-10 md:mt-14 w-full gap-6 md:gap-8 items-start grid lg:grid-cols-2">
                {/* Contact Form */}
                <div className="bg-[#012B71] rounded-2xl sm:rounded-3xl p-5 md:p-7 lg:p-8">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-5 text-center">
                    <TTSWrapper
                      text={contactUsData?.contact_cms.section3_title || ""}
                    >
                      {contactUsData?.contact_cms.section3_title || ""}
                    </TTSWrapper>
                  </h3>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name*"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white rounded-xl border-0 focus:outline-none text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                      />

                      <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone*"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white rounded-xl border-0 focus:outline-none text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                      />
                    </div>

                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-3 rounded-xl border-0 focus:outline-none text-gray-700 bg-white appearance-none text-left flex items-center justify-between text-sm sm:text-base"
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
                          className={`w-4 h-4 text-[#000] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                          {purposeOfEnquiries.map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => {
                                handleSelectChange(String(option.id));
                              }}
                              className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors ${formData.serviceType === String(option.id)
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

                    <textarea
                      name="message"
                      placeholder="Message*"
                      value={formData.message}
                      onChange={handleTextareaChange}
                      rows={5}
                      className="w-full px-4 py-3 h-32 sm:h-40 rounded-xl border-0 focus:outline-none bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base resize-none"
                    />

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto mx-auto bg-[#0A5BE0] text-white py-3 px-6 mt-2 rounded-full flex items-center justify-center group text-sm sm:text-base hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ${isSubmitting
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

                {/* Get in touch box */}
                <div>
                  <h3 className="text-4xl sm:text-5xl font-bold text-black">
                    <TTSWrapper
                      text={contactUsData?.contact_cms.section2_title || ""}
                    >
                      {contactUsData?.contact_cms.section2_title || ""}
                    </TTSWrapper>
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm md:text-md max-w-2xl">
                    <TTSWrapper
                      text={contactUsData?.contact_cms.section2_description || ""}
                    >
                      {contactUsData?.contact_cms.section2_description || ""}
                    </TTSWrapper>
                  </p>
                  <div className="rounded-2xl sm:rounded-3xl bg-[#EEF2FF] p-5 md:p-7 lg:p-8 mt-6">
                    <div className="grid grid-cols-2">
                      {contactUsData?.contact_items.map((item, index) => (
                        <div
                          key={item.id}
                          className={`p-5 md:p-6 min-w-0
          ${index % 2 === 0 ? "border-r border-gray-300" : ""}
          ${index < 2 ? "border-b border-gray-300" : ""}
        `}
                        >
                          <div className="font-semibold text-[#0D1B3E] text-base sm:text-lg mb-1">
                            <TTSWrapper text={item.title}>{item.title}</TTSWrapper>
                          </div>
                          <div className="text-sm text-[#6B7280] mb-3">
                            <TTSWrapper text={item.sub_title}>{item.sub_title}</TTSWrapper>
                          </div>
                          <div className="text-sm text-[#2563EB] break-words">
                            <TTSWrapper text={item.content}>
                              <div
                                className="text-sm text-[#2563EB]"
                                dangerouslySetInnerHTML={{ __html: item.content }}
                              />
                            </TTSWrapper>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

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
