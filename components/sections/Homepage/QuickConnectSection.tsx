"use client";
import { useEffect, useRef, useState } from "react";
import { TopRightArrowBlack, TopRightArrowWhite } from "../../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import Image from "next/image";
import { HomeData, TestimonialCategory } from "@/types/Home.type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import restApiWrapper from "@/service/RestApiWrapper";
import dayjs from "dayjs";

export interface FormData {
  name: string;
  phone_number: string;
  purpose_of_enquiry_id: number;
  message: string;
}

export default function QuickConnect({
  homeData,
  purposeOfEnquiries,
}: {
  homeData: HomeData;
  purposeOfEnquiries: TestimonialCategory[];
}) {
  const navigate = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone_number: "",
    purpose_of_enquiry_id: 0,
    message: "",
  });
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const areaDropdownRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    // Check which fields are missing
    const missingFields: string[] = [];

    if (!formData.name.trim()) missingFields.push("Name");
    if (!formData.phone_number.trim()) missingFields.push("Phone");
    if (!formData.purpose_of_enquiry_id) missingFields.push("Area of Interest");
    if (!formData.message.trim()) missingFields.push("Message");

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
    setIsLoading(true);
    restApiWrapper
      .post("/contact-enquiry", formData)
      .then((res) => {
        navigate.push("/thankyou-enquiry");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
        setFormData({
          name: "",
          phone_number: "",
          purpose_of_enquiry_id: 0,
          message: "",
        });
      });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let value = e.target.value;

    // For phone field, only allow numbers and common phone characters (+, -, spaces, parentheses)
    if (e.target.name === "phone_number") {
      value = value.replace(/[^0-9+\-() ]/g, "");
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleAreaSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, purpose_of_enquiry_id: Number(value) }));
    setIsAreaDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        areaDropdownRef.current &&
        !areaDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAreaDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Form */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{
          background: "rgba(1, 35, 103, 1)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-1">
              <TTSWrapper
                text={homeData?.home_cms?.quick_connect_title}
                className="text-4xl md:text-5xl font-bold text-white mb-1"
              >
                {homeData?.home_cms?.quick_connect_title}
              </TTSWrapper>
            </h1>
            <p className="text-white text-sm md:text-base">
              <TTSWrapper
                text={homeData?.home_cms?.quick_connect_subtitle}
                className="text-white text-sm md:text-base"
              >
                {homeData?.home_cms?.quick_connect_subtitle}
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
                className="w-full px-6 py-4 rounded-lg bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone*"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-lg bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="relative" ref={areaDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsAreaDropdownOpen((prev) => !prev)}
                  className="w-full px-6 py-4 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between gap-3"
                  aria-haspopup="listbox"
                  aria-expanded={isAreaDropdownOpen}
                  aria-label="Select area of interest"
                >
                  <span>
                    {formData.purpose_of_enquiry_id
                      ? purposeOfEnquiries?.find(
                          (category) =>
                            category.id === formData.purpose_of_enquiry_id
                        )?.title
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
                    {purposeOfEnquiries &&
                      purposeOfEnquiries.map((category) => {
                        const isSelected =
                          formData.purpose_of_enquiry_id === category.id;
                        return (
                          <li key={category.id}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onMouseDown={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                handleAreaSelect(String(category.id));
                              }}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  event.preventDefault();
                                  handleAreaSelect(String(category.id));
                                }
                              }}
                              className={`w-full text-left px-5 py-2 text-sm sm:text-base transition ${
                                isSelected
                                  ? "bg-blue-100 text-blue-900"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {category.title}
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                )}
                <input
                  type="hidden"
                  name="purpose_of_enquiry_id"
                  value={formData.purpose_of_enquiry_id}
                />
              </div>
            </div>

            <textarea
              name="message"
              placeholder="Message*"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-6 py-4 rounded-lg bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none scrollbar-hide"
            />

            <div className="text-center pt-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="relative overflow-hidden bg-[#0A5BE0] text-white font-medium px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0A5BE0] before:to-[#003C9F] before:content-[''] before:-translate-x-full before:transition-transform before:duration-300 before:z-0 hover:before:translate-x-0 inline-flex items-center gap-2 focus:outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:before:translate-x-full"
                style={{
                  opacity: isLoading ? 0.5 : 1,
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <TTSWrapper text="Submit Enquiry">
                    Submit Enquiry{""}
                  </TTSWrapper>
                  <TopRightArrowWhite />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center flex-nowrap gap-2 sm:gap-4 mb-5 overflow-x-auto scrollbar-hide">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex-shrink-0">
              <TTSWrapper
                text={homeData?.home_cms?.news_and_events_title}
                className="text-3xl md:text-4xl font-bold text-gray-900"
              >
                {homeData?.home_cms?.news_and_events_title}
              </TTSWrapper>
            </h2>
            <button
              onClick={() => navigate.push("/news-and-insights")}
              className="text-black cursor-pointer font-medium flex items-center gap-2 hover:gap-3 hover:text-blue-600 transition-all duration-300 whitespace-nowrap flex-shrink-0 text-sm sm:text-base"
            >
              <TTSWrapper text="Visit News Hub">Visit News Hub</TTSWrapper>
              <TopRightArrowBlack />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeData?.blogs?.map((card) => (
              <div
                key={card.id}
                className="overflow-hidden"
                style={{
                  background: "rgba(232, 239, 255, 1)",
                  borderRadius: "40px 40px 20px 20px",
                }}
              >
                <div className="p-6 pb-4">
                  <h3 className="text-lg font-bold text-black mb-3 leading-tight">
                    <TTSWrapper
                      text={card.title}
                      className="text-lg font-bold text-black mb-3 leading-tight"
                    >
                      {card.title}
                    </TTSWrapper>
                  </h3>
                  <p className="text-black text-sm mb-6 leading-relaxed">
                    <TTSWrapper text={card.short_content}>
                      {card.short_content}
                    </TTSWrapper>
                  </p>
                  <p className="text-sm text-black font-semibold mb-4">
                    <TTSWrapper
                      text={
                        card.published_on
                          ? dayjs(card.published_on).format("DD-MM-YYYY")
                          : ""
                      }
                      className="text-sm text-black font-semibold mb-4"
                    >
                      {card.published_on
                        ? dayjs(card.published_on).format("DD-MM-YYYY")
                        : ""}
                    </TTSWrapper>
                  </p>
                </div>
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={card.image_value}
                    alt={card.image_alt_text_value}
                    fill
                    className="w-full h-full object-cover"
                    style={{
                      borderRadius: "20px",
                    }}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <button
                    style={{
                      backgroundColor: "rgba(10, 91, 224, 1)",
                      borderRadius: "300px",
                    }}
                    onClick={() =>
                      navigate.push(`/news-and-insights/${card.slug}`)
                    }
                    className="absolute bottom-4 cursor-pointer right-4 px-5 py-2.5 text-white text-sm font-medium rounded-lg flex items-center gap-2 hover:brightness-110 hover:shadow-lg transition-all duration-300"
                  >
                    <TTSWrapper
                      text="Read More"
                      className="text-white text-sm font-medium rounded-lg flex items-center gap-1"
                    >
                      Read More
                    </TTSWrapper>
                    <TopRightArrowWhite />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
