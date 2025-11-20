"use client";
import React, { useEffect, useState, useMemo } from "react";
import TTSWrapper from "@/hooks/TTSWrapper";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NewsCard {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

function NewsAndInsightsSection() {
  const [activeTab, setActiveTab] = useState<"news" | "blogs">("news");
  const [activeTab2, setActiveTab2] = useState(1);
  const [newsCards, setNewsCards] = useState<NewsCard[]>([]);
  const [blogsCards, setBlogsCards] = useState<NewsCard[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useRouter();

  const homeCareCards: NewsCard[] = useMemo(() => [
    {
      id: 1,
      title:
        "Had a great experience will do again and Had a great experience will do again and ",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "11.07.2025",
      image: "/news/news1.png",
    },
    {
      id: 2,
      title: "Lorem Ipsum is simply dummy text of",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "05.07.2025",
      image: "/news/news2.jpg",
    },
    {
      id: 3,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "03.07.2025",
      image: "/news/news3.jpg",
    },
    {
      id: 4,
      title: "Lorem Ipsum is simply dummy text of the",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "01.07.2025",
      image: "/news/news4.jpg",
    },
    {
      id: 1,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "11.07.2025",
      image: "/news/news1.png",
    },
    {
      id: 2,
      title: "Lorem Ipsum is simply dummy text of",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "05.07.2025",
      image: "/news/news2.jpg",
    },
    {
      id: 3,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "03.07.2025",
      image: "/news/news3.jpg",
    },
    {
      id: 4,
      title: "Lorem Ipsum is simply dummy text of the",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "01.07.2025",
      image: "/news/news4.jpg",
    },
    {
      id: 2,
      title: "Lorem Ipsum is simply dummy text of",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "05.07.2025",
      image: "/news/news2.jpg",
    },
    {
      id: 3,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "03.07.2025",
      image: "/news/news3.jpg",
    },
    {
      id: 4,
      title: "Lorem Ipsum is simply dummy text of the",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "01.07.2025",
      image: "/news/news4.jpg",
    },
    {
      id: 2,
      title: "Lorem Ipsum is simply dummy text of",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "05.07.2025",
      image: "/news/news2.jpg",
    },
    {
      id: 3,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "03.07.2025",
      image: "/news/news3.jpg",
    },
    {
      id: 4,
      title: "Lorem Ipsum is simply dummy text of the",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "01.07.2025",
      image: "/news/news4.jpg",
    },
  ], []);

  const policiesCards: NewsCard[] = useMemo(() => [
    {
      id: 1,
      title: "Lorem Ipsum is simply dummy text of",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "05.07.2025",
      image: "/news/news2.jpg",
    },
    {
      id: 2,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "03.07.2025",
      image: "/news/news3.jpg",
    },
    {
      id: 3,
      title: "Lorem Ipsum is simply dummy text of the",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "01.07.2025",
      image: "/news/news4.jpg",
    },
    {
      id: 4,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "11.07.2025",
      image: "/news/news1.png",
    },
  ], []);

  const eventsCards: NewsCard[] = useMemo(() => [
    {
      id: 1,
      title: "Lorem Ipsum is simply dummy text of the",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "01.07.2025",
      image: "/news/news4.jpg",
    },
    {
      id: 2,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "11.07.2025",
      image: "/news/news1.png",
    },
    {
      id: 3,
      title: "Lorem Ipsum is simply dummy text of",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "05.07.2025",
      image: "/news/news2.jpg",
    },
    {
      id: 4,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "03.07.2025",
      image: "/news/news3.jpg",
    },
  ], []);

  const trainingCards: NewsCard[] = useMemo(() => [
    {
      id: 1,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "03.07.2025",
      image: "/news/news3.jpg",
    },
    {
      id: 2,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "11.07.2025",
      image: "/news/news1.png",
    },
    {
      id: 3,
      title: "Lorem Ipsum is simply dummy text of the",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "01.07.2025",
      image: "/news/news4.jpg",
    },
    {
      id: 4,
      title: "Lorem Ipsum is simply dummy text of",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "05.07.2025",
      image: "/news/news2.jpg",
    },
    {
      id: 1,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "03.07.2025",
      image: "/news/news3.jpg",
    },
    {
      id: 2,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "11.07.2025",
      image: "/news/news1.png",
    },
    {
      id: 3,
      title: "Lorem Ipsum is simply dummy text of the",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "01.07.2025",
      image: "/news/news4.jpg",
    },
    {
      id: 4,
      title: "Lorem Ipsum is simply dummy text of",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "05.07.2025",
      image: "/news/news2.jpg",
    },
    {
      id: 1,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "03.07.2025",
      image: "/news/news3.jpg",
    },
    {
      id: 2,
      title: "Had a great experience will do again and",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "11.07.2025",
      image: "/news/news1.png",
    },
    {
      id: 3,
      title: "Lorem Ipsum is simply dummy text of the",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "01.07.2025",
      image: "/news/news4.jpg",
    },
    {
      id: 4,
      title: "Lorem Ipsum is simply dummy text of",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "05.07.2025",
      image: "/news/news2.jpg",
    },
  ], []);
  const tabs = [
    { id: 1, title: "Home Care" },
    {
      id: 2,
      title: "Training",
    },
    {
      id: 3,
      title: "Policies",
    },
    {
      id: 4,
      title: "Events",
    },
  ];

  useEffect(() => {
    setVisibleCount(8);
    if (activeTab === "news") {
      setBlogsCards([]);
      if (activeTab2 === 1) {
        setNewsCards(homeCareCards);
      } else if (activeTab2 === 2) {
        setNewsCards(trainingCards);
      } else if (activeTab2 === 3) {
        setNewsCards(policiesCards);
      } else if (activeTab2 === 4) {
        setNewsCards(eventsCards);
      }
    } else if (activeTab === "blogs") {
      setNewsCards([]);
      if (activeTab2 === 1) {
        setBlogsCards(eventsCards);
      } else if (activeTab2 === 2) {
        setBlogsCards(policiesCards);
      } else if (activeTab2 === 3) {
        setBlogsCards(trainingCards);
      } else if (activeTab2 === 4) {
        setBlogsCards(homeCareCards);
      }
    }
  }, [activeTab2, activeTab, homeCareCards, trainingCards, policiesCards, eventsCards]);

  return (
    <div className="my-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            <TTSWrapper text="News & Insights">News &amp; Insights</TTSWrapper>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            <TTSWrapper text="Lorem Ipsum is simply dummy text of the printing and typesetting industry">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </TTSWrapper>
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 border border-gray-300 rounded-full p-1">
            {/* News Button */}
            <button
              onClick={() => setActiveTab("news")}
              className={`
              flex items-center justify-center gap-2 
              px-8 sm:px-10 py-1 sm:py-1.5 
              rounded-full font-medium text-sm sm:text-base
              transition-all duration-300 whitespace-nowrap
              ${
                activeTab === "news"
                  ? "bg-[#0A5BE0] text-white shadow-md"
                  : "bg-transparent text-black hover:bg-gray-100"
              }
            `}
            >
              <TTSWrapper text="News">News</TTSWrapper>
              {activeTab === "news" && <TopRightArrowWhite />}
            </button>

            {/* Blogs Button */}
            <button
              onClick={() => setActiveTab("blogs")}
              className={`
              flex items-center justify-center gap-2 
              px-8 sm:px-10 py-1 sm:py-1.5 
              rounded-full font-medium text-sm sm:text-base
              transition-all duration-300 whitespace-nowrap
              ${
                activeTab === "blogs"
                  ? "bg-[#0A5BE0] text-white shadow-md"
                  : "bg-transparent text-black hover:bg-gray-100"
              }
            `}
            >
              <TTSWrapper text="Blogs">Blogs</TTSWrapper>
              {activeTab === "blogs" && <TopRightArrowWhite />}
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
            <div className="flex gap-6 whitespace-nowrap mt-5">
              {tabs.map((tab: { id: number; title: string }) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab2(tab.id)}
                  className={`text-xs sm:text-sm font-medium transition-colors pb-1 ${
                    activeTab2 === tab.id
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <TTSWrapper
                    text={tab.title}
                    className="text-xs sm:text-sm font-medium transition-colors pb-1"
                  >
                    {tab.title}
                  </TTSWrapper>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeTab === "news"
            ? newsCards.length > 0
              ? newsCards.slice(0, visibleCount).map((card, i) => (
                  <div
                    key={i}
                    className="overflow-hidden flex flex-col"
                    style={{
                      background: "rgba(232, 239, 255, 1)",
                      borderRadius: "40px 40px 20px 20px",
                    }}
                  >
                    <div className="p-6 pb-4 flex-grow">
                      <h3 className="text-lg font-bold text-black mb-3 leading-tight line-clamp-2">
                        <TTSWrapper
                          text={card.title}
                          className="text-lg font-bold text-black leading-tight"
                        >
                          {card.title}
                        </TTSWrapper>
                      </h3>
                      <p className="text-black text-sm mb-4 leading-relaxed line-clamp-3">
                        <TTSWrapper
                          text={card.description}
                          className="text-black text-sm leading-relaxed"
                        >
                          {card.description}
                        </TTSWrapper>
                      </p>
                      <p className="text-sm text-black font-semibold">
                        <TTSWrapper
                          text={card.date}
                          className="text-sm text-black font-semibold"
                        >
                          {card.date}
                        </TTSWrapper>
                      </p>
                    </div>
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
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
                        onClick={() =>
                          navigate.push(`/news-and-insights/${card.id}`)
                        }
                        className="absolute bottom-4 right-4 px-5 py-2.5 text-white text-sm font-medium rounded-lg flex items-center gap-2"
                      >
                        <TTSWrapper
                          text="Read More"
                          className="text-white text-sm font-light rounded-lg flex items-center gap-1"
                        >
                          Read More
                        </TTSWrapper>
                        <TopRightArrowWhite />
                      </button>
                    </div>
                  </div>
                ))
              : [1, 2, 3, 4, 5, 6].slice(0, 6).map((index) => (
                  <div
                    key={index}
                    className="overflow-hidden animate-pulse h-full"
                    style={{
                      background: "rgba(232, 239, 255, 1)",
                      borderRadius: "40px 40px 20px 20px",
                    }}
                  >
                    <div className="p-6 pb-4 h-[180px]">
                      <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4 w-5/6"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    </div>
                    <div
                      className="relative h-48 bg-gray-300 overflow-hidden"
                      style={{ borderRadius: "20px" }}
                    >
                      <div
                        style={{
                          backgroundColor: "rgba(156, 163, 175, 0.5)",
                          borderRadius: "300px",
                        }}
                        className="absolute bottom-4 right-4 px-5 py-2.5 h-9 w-28"
                      ></div>
                    </div>
                  </div>
                ))
            : blogsCards.length > 0
            ? blogsCards.slice(0, visibleCount).map((card) => (
                <div
                  key={card.id}
                  className="overflow-hidden flex flex-col"
                  style={{
                    background: "rgba(232, 239, 255, 1)",
                    borderRadius: "40px 40px 20px 20px",
                  }}
                >
                  <div className="p-6 pb-4 flex-grow">
                    <h3 className="text-lg font-bold text-black mb-3 leading-tight line-clamp-2">
                      <TTSWrapper
                        text={card.title}
                        className="text-lg font-bold text-black leading-tight"
                      >
                        {card.title}
                      </TTSWrapper>
                    </h3>
                    <p className="text-black text-sm mb-4 leading-relaxed line-clamp-3">
                      <TTSWrapper text={card.description}>
                        {card.description}
                      </TTSWrapper>
                    </p>
                    <p className="text-sm text-black font-semibold">
                      <TTSWrapper
                        text={card.date}
                        className="text-sm text-black font-semibold"
                      >
                        {card.date}
                      </TTSWrapper>
                    </p>
                  </div>
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
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
                      onClick={() =>
                        navigate.push(`/news-and-insights/${card.id}`)
                      }
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
              ))
            : [1, 2, 3, 4, 5, 6].slice(0, 6).map((index) => (
                <div
                  key={index}
                  className="overflow-hidden animate-pulse h-full"
                  style={{
                    background: "rgba(232, 239, 255, 1)",
                    borderRadius: "40px 40px 20px 20px",
                  }}
                >
                  <div className="p-6 pb-4 h-[180px]">
                    <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4 w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  </div>
                  <div
                    className="relative h-48 bg-gray-300 overflow-hidden"
                    style={{ borderRadius: "20px" }}
                  >
                    <div
                      style={{
                        backgroundColor: "rgba(156, 163, 175, 0.5)",
                        borderRadius: "300px",
                      }}
                      className="absolute bottom-4 right-4 px-5 py-2.5 h-9 w-28"
                    ></div>
                  </div>
                </div>
              ))}
        </div>

        {/* View More Button */}
        {((activeTab === "news" && newsCards.length > visibleCount) ||
          (activeTab === "blogs" && blogsCards.length > visibleCount)) && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-3 bg-[#0A5BE0] text-white font-medium rounded-full flex items-center gap-2 hover:bg-[#084CC0] transition-colors"
            >
              <TTSWrapper text="View More" className="text-white font-medium">
                View More
              </TTSWrapper>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsAndInsightsSection;
