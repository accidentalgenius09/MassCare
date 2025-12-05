"use client";
import React, { useEffect, useState } from "react";
import TTSWrapper from "@/hooks/TTSWrapper";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BlogCard, NewsAndInsightsData } from "@/types/News-and-Insights";
import restApiWrapper from "@/service/RestApiWrapper";
import dayjs from "dayjs";

interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

function NewsAndInsightsSection({
  newsAndInsights,
}: {
  newsAndInsights: NewsAndInsightsData;
}) {
  // Set first category as default, or null if no categories
  const defaultCategoryId = newsAndInsights?.blog_categories?.[0]?.id || null;
  const defaultCategorySlug = newsAndInsights?.blog_categories?.[0]?.slug || "";
  const [activeTab, setActiveTab] = useState<number>(defaultCategoryId || 0);
  const [activeTabSlug, setActiveTabSlug] =
    useState<string>(defaultCategorySlug);
  const [activeTab2, setActiveTab2] = useState(1);
  const [newsCards, setNewsCards] = useState<BlogCard[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [tabs, setTabs] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [pagination, setPagination] = useState<Pagination>();
  const navigate = useRouter();

  useEffect(() => {
    const fetchTabs = async () => {
      const response = await restApiWrapper.get(
        `/blog-category-tags?slug=${activeTabSlug}`
      );
      setTabs(response.data);
      setActiveTab2(response.data[0].id);
    };
    fetchTabs();
  }, [activeTab, activeTabSlug]);

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoadingCards(true);
      try {
        const response = await restApiWrapper.get(
          `/blog-list?slug=${activeTabSlug}&per_page=${visibleCount}&page=1&tag=${activeTab2}`
        );
        setNewsCards(response.data.blogs || []);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("Error fetching cards:", error);
        setNewsCards([]);
      } finally {
        setIsLoadingCards(false);
      }
    };
    fetchCards();
  }, [activeTab2, activeTabSlug, visibleCount]);

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-black">
            <TTSWrapper text={newsAndInsights?.blog_cms?.title}>
              {newsAndInsights?.blog_cms?.title}
            </TTSWrapper>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            <TTSWrapper text={newsAndInsights?.blog_cms?.description}>
              {newsAndInsights?.blog_cms?.description}
            </TTSWrapper>
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 border border-gray-300 rounded-full p-1">
            {newsAndInsights?.blog_categories?.map((category) => {
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveTab(category.id);
                    setActiveTabSlug(category.slug);
                  }}
                  className={`
                  flex items-center justify-center gap-2 
                  px-8 sm:px-10 py-1 sm:py-1.5 
                  rounded-full font-medium text-sm sm:text-base
                  transition-all duration-300 whitespace-nowrap
                  ${
                    isActive
                      ? "bg-[#0A5BE0] text-white shadow-md"
                      : "bg-transparent text-black hover:bg-gray-100"
                  }
                `}
                >
                  <TTSWrapper text={category.title}>
                    {category.title}
                  </TTSWrapper>
                  {isActive && <TopRightArrowWhite />}
                </button>
              );
            })}
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
                  className={`text-xs sm:text-sm font-medium cursor-pointer transition-colors pb-1 ${
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
          {isLoadingCards
            ? [1, 2, 3, 4, 5, 6].slice(0, 6).map((index) => (
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
            : activeTab !== null && newsCards.length > 0
            ? newsCards.map((card, i) => (
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
                      <TTSWrapper text={card.title}>{card.title}</TTSWrapper>
                    </h3>
                    <p className="text-black text-sm mb-4 leading-relaxed line-clamp-3">
                      <TTSWrapper text={card.short_content}>
                        {card.short_content}
                      </TTSWrapper>
                    </p>
                    <p className="text-sm text-black font-semibold">
                      <TTSWrapper
                        text={
                          card.published_on
                            ? dayjs(card.published_on).format("DD-MM-YYYY")
                            : ""
                        }
                        className="text-sm text-black font-semibold"
                      >
                        {card.published_on
                          ? dayjs(card.published_on).format("DD-MM-YYYY")
                          : ""}
                      </TTSWrapper>
                    </p>
                  </div>
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <Image
                      src={card.image_value}
                      alt={card.image_alt_text_value}
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
                        navigate.push(`/news-and-insights/${card.slug}`)
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
            : !isLoadingCards &&
              newsCards.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    <TTSWrapper text="No data available">
                      No data available
                    </TTSWrapper>
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm">
                    <TTSWrapper text="There are no blog posts available for this category and tag combination.">
                      There are no blog posts available for this category and
                      tag combination.
                    </TTSWrapper>
                  </p>
                </div>
              )}
        </div>

        {/* View More Button */}
        {activeTab !== null &&
          pagination &&
          pagination?.last_page &&
          pagination?.current_page &&
          pagination?.last_page > pagination?.current_page && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
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
