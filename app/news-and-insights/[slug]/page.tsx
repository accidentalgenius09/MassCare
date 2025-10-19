"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import PageBanner from "@/components/sections/Common/PageBanner";
import Image from "next/image";
import TTSWrapper from "@/hooks/TTSWrapper";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
interface RecentNewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

export default function NewsAndInsightsDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [articleHeight, setArticleHeight] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const articleRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();
  // Mock data - replace with actual data fetching based on slug
  const article = {
    date: "11.07.2025",
    title: "Lorem Ipsum experience will do again",
    mainImage: "/news/news-detail.png",
    content: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "Dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ],
  };

  const recentNews: RecentNewsItem[] = [
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
      title: "Lorem Ipsum is simply dummy text of the",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "05.07.2025",
      image: "/news/news2.jpg",
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
      id: 3,
      title: "Lorem Ipsum is simply dummy text of the",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "01.07.2025",
      image: "/news/news4.jpg",
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
      id: 3,
      title: "Lorem Ipsum is simply dummy text of the",
      description:
        "Lorem Ipsum is simply dummy text of the printing and types Lorem Ipsum is",
      date: "01.07.2025",
      image: "/news/news4.jpg",
    },
  ];

  // Calculate article height and determine visible items
  useEffect(() => {
    const updateArticleHeight = () => {
      if (articleRef.current) {
        const height = articleRef.current.offsetHeight;
        setArticleHeight(height);
        
        // Calculate how many items can fit based on article height
        // Each news card is approximately 320px (content + image + padding)
        const cardHeight = 320;
        const headerHeight = 60; // "Recent News" header height
        const availableHeight = height - headerHeight;
        const maxItems = Math.floor(availableHeight / cardHeight);
        
        // Ensure we don't exceed the total number of items
        setVisibleItems(Math.min(maxItems, recentNews.length));
      }
    };

    // Initial measurement
    updateArticleHeight();

    // Update on window resize
    window.addEventListener('resize', updateArticleHeight);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateArticleHeight);
  }, [recentNews.length]);

  // Get the items to display based on current slide and visible items
  const getDisplayItems = () => {
    const startIndex = currentSlide;
    const endIndex = Math.min(startIndex + visibleItems, recentNews.length);
    return recentNews.slice(startIndex, endIndex);
  };

  return (
    <>
      <PageBanner
        title="News & Insights"
        breadcrumb="Home / News"
        description="Lorem Ipsum 8 years of meaningful care... care without compromise."
      />

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <p className="text-sm text-black font-semibold max-w-7xl mx-auto">
          <TTSWrapper text={article.date}>{article.date}</TTSWrapper>
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div ref={articleRef} className="lg:col-span-2">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              <TTSWrapper text={article.title}>{article.title}</TTSWrapper>
            </h1>

            {/* Main Image */}
            <div className="relative w-full h-64 sm:h-80 lg:h-96 mb-6 rounded-2xl overflow-hidden">
              <Image
                src={article.mainImage}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-4 text-gray-700 text-xs sm:text-xs leading-relaxed">
              {article.content.map((paragraph, index) => (
                <p key={index}>
                  <TTSWrapper text={paragraph}>{paragraph}</TTSWrapper>
                </p>
              ))}
            </div>
          </div>

          {/* Sidebar - Recent News */}
          <div className="lg:col-span-1 mx-auto">
            <div 
              className="flex flex-col"
              style={{ 
                height: articleHeight > 0 ? `${articleHeight}px` : 'auto',
                minHeight: '400px'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-black">
                  <TTSWrapper text="Recent News">Recent News</TTSWrapper>
                </h2>
                
                {/* Carousel Navigation - only show if there are more items than visible */}
                {recentNews.length > visibleItems && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                      disabled={currentSlide === 0}
                      className={`p-2 rounded-full border ${
                        currentSlide === 0
                          ? "border-gray-300 text-gray-300 cursor-not-allowed"
                          : "border-gray-600 text-gray-600 hover:bg-gray-100"
                      }`}
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentSlide(Math.min(recentNews.length - visibleItems, currentSlide + 1))}
                      disabled={currentSlide >= recentNews.length - visibleItems}
                      className={`p-2 rounded-full border ${
                        currentSlide >= recentNews.length - visibleItems
                          ? "border-gray-300 text-gray-300 cursor-not-allowed"
                          : "border-gray-600 text-gray-600 hover:bg-gray-100"
                      }`}
                      aria-label="Next slide"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>

              {/* Carousel Container */}
              <div className="flex-1 overflow-hidden w-64">
                <div className="space-y-6">
                  {getDisplayItems().map((card, i) => (
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
                          className="absolute bottom-4 right-4 px-5 py-2.5 text-white text-sm font-medium rounded-lg flex items-center gap-2"
                          onClick={() => navigate.push(`/news-and-insights/${card.id}`)}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}