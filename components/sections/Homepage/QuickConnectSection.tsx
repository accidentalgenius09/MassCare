"use client";
import { useState } from "react";
import { TopRightArrowBlack, TopRightArrowWhite } from "../../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  message: string;
}

interface NewsCard {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

export default function QuickConnect() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    areaOfInterest: "",
    message: "",
  });

  const newsCards: NewsCard[] = [
    {
      id: 1,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "11.07.2025",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Lorem Ipsum is simply dummy text of",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "05.07.2025",
      image:
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "03.07.2025",
      image:
        "https://images.unsplash.com/photo-1605433246995-23f532d1e001?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Lorem Ipsum is simply dummy text of the",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "01.07.2025",
      image:
        "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
    },
  ];

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
                text="Quick Connect"
                className="text-4xl md:text-5xl font-bold text-white mb-1"
              >
                Quick Connect
              </TTSWrapper>
            </h1>
            <p className="text-white text-sm md:text-base">
              <TTSWrapper
                text="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
                className="text-white text-sm md:text-base"
              >
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
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                name="phone"
                placeholder="Phone*"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                <option value="">Area of Interest*</option>
                <option value="healthcare">Healthcare</option>
                <option value="elderly-care">Elderly Care</option>
                <option value="home-services">Home Services</option>
                <option value="consultation">Consultation</option>
              </select>
            </div>

            <textarea
              name="message"
              placeholder="Message*"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            <div className="text-center pt-4">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-8 py-3 text-white font-medium rounded-lg focus:outline-none"
                style={{
                  background: "rgba(10, 91, 224, 1)",
                  borderRadius: "300px",
                }}
              >
                <TTSWrapper
                  text="Submit Enquiry"
                  className="inline-flex items-center gap-1 text-white font-medium rounded-lg focus:outline-none"
                >
                  Submit Enquiry{""}
                </TTSWrapper>
                <TopRightArrowWhite />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              <TTSWrapper
                text="News & Events"
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-5"
              >
                News & Events
              </TTSWrapper>
            </h2>
            <button className="text-black font-medium flex items-center gap-2">
              <TTSWrapper
                text="Visit News Hub"
                className="text-black font-medium flex items-center gap-1"
              >
                Visit News Hub
              </TTSWrapper>
              <TopRightArrowBlack />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsCards.map((card) => (
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
                    >{card.title}</TTSWrapper>
                  </h3>
                  <p className="text-black text-sm mb-4 leading-relaxed">
                    <TTSWrapper
                      text={card.description}
                      className="text-black text-sm mb-4 leading-relaxed"
                    >{card.description}</TTSWrapper>
                  </p>
                  <p className="text-sm text-black font-semibold">
                    <TTSWrapper
                      text={card.date}
                      className="text-sm text-black font-semibold"
                    >{card.date}</TTSWrapper>
                  </p>
                </div>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="w-full h-full object-cover"
                    style={{
                      borderRadius: "20px",
                    }}
                  />
                  <button
                    style={{
                      backgroundColor: "rgba(10, 91, 224, 1)",
                      borderRadius: "300px",
                    }}
                    className="absolute bottom-4 right-4 px-5 py-2.5 text-white text-sm font-medium rounded-lg flex items-center gap-2"
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
