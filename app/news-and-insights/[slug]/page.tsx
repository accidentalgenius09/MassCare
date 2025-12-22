"use client";
import React, { useState, useEffect, useRef } from "react";
import PageBanner from "@/components/sections/Common/PageBanner";
import Image from "next/image";
import TTSWrapper from "@/hooks/TTSWrapper";
import { TopRightArrowWhite } from "@/components/helpers/svgs";
import { useParams, useRouter } from "next/navigation";
import restApiWrapper from "@/service/RestApiWrapper";
import { BlogDetail } from "@/types/News-and-Insights";
import dayjs from "dayjs";
interface RecentNewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

export default function NewsAndInsightsDetailPage() {
  const [articleHeight, setArticleHeight] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);
  const [articleData, setArticleData] = useState<BlogDetail>();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useRouter();
  const { slug } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        // const responseBanner = await restApiWrapper.get("/blogs");
        // setNewsAndInsights(responseBanner.data);
        const response = await restApiWrapper.get(`/blog-details?slug=${slug}`);
        setArticleData(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

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
  ];

  // Calculate article height and determine visible items
  useEffect(() => {
    const updateArticleHeight = () => {
      if (articleRef.current) {
        const height = articleRef.current.offsetHeight;
        setArticleHeight(height);
      }
    };

    // Initial measurement
    updateArticleHeight();

    // Update on window resize
    window.addEventListener("resize", updateArticleHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateArticleHeight);
  }, [recentNews.length]);

  console.log(articleData?.related_blogs_list ,"articleData?.related_blogs_list ");

  const hasRelatedBlogs = articleData?.related_blogs_list && 
    articleData?.related_blogs_list?.length > 0;

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
                <TTSWrapper text="Loading Blog Details...">
                  Loading Blog Details...
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
          title={articleData?.banner_title}
          breadcrumb="Home / News"
          description={articleData?.banner_description}
        />

        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <p className="text-sm text-black font-semibold max-w-full lg:px-20 px-10 mx-auto">
            <TTSWrapper text={articleData?.published_on ? dayjs(articleData.published_on).format("DD-MM-YYYY") : ""}>
              {articleData?.published_on ? dayjs(articleData.published_on).format("DD-MM-YYYY") : ""}
            </TTSWrapper>
          </p>
          <div className={`grid ${hasRelatedBlogs ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'} gap-8 max-w-full lg:px-20 px-10 mx-auto`}>
            {/* Main Content */}
            <div ref={articleRef} className={hasRelatedBlogs ? 'lg:col-span-2' : ''}>
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
                <TTSWrapper text={articleData?.title || ""}>
                  {articleData?.title || ""}
                </TTSWrapper>
              </h1>

              {/* Main Image */}
              {articleData?.image_value && (
                <div className="relative w-full h-64 sm:h-80 lg:h-96 mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={articleData.image_value}
                    alt={articleData?.image_alt_text_value || ""}
                    fill
                    className="object-cover"
                    priority
                    sizes={hasRelatedBlogs ? "(max-width: 1024px) 100vw, 66vw" : "100vw"}
                  />
                </div>
              )}

              {/* Content Paragraphs */}
              <TTSWrapper text={articleData?.content || ""}>
                <div
                  className="space-y-4 text-gray-700 text-xs sm:text-xs leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: articleData?.content || "",
                  }}
                />
              </TTSWrapper>
            </div>

            {/* Sidebar - Recent News */}
            {hasRelatedBlogs && (
            <div className="lg:col-span-1 mx-auto">
              <div
                className="flex flex-col"
                style={{
                  height: articleHeight > 0 ? `${articleHeight}px` : "auto",
                  minHeight: "400px",
                }}
              >
                {articleData?.related_blogs_list &&
                articleData?.related_blogs_list?.length &&
                articleData?.related_blogs_list?.length > 0 ? (
                  <div className="flex items-center justify-between mb-6 ms-3">
                    <h2 className="text-xl sm:text-2xl font-semibold text-black">
                      <TTSWrapper text="Recent News">Recent News</TTSWrapper>
                    </h2>
                  </div>
                ) : null}

                {/* Carousel Container */}
                <div className="flex-1 w-80">
                  <div className="space-y-6">
                    {articleData?.related_blogs_list?.map((card, i) => (
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
                              text={card.short_content}
                              className="text-black text-sm leading-relaxed"
                            >
                              {card.short_content}
                            </TTSWrapper>
                          </p>
                          <p className="text-sm text-black font-semibold">
                            <TTSWrapper
                              text={card.published_on ? dayjs(card.published_on).format("DD-MM-YYYY") : ""}
                              className="text-sm text-black font-semibold"
                            >
                              {card.published_on ? dayjs(card.published_on).format("DD-MM-YYYY") : ""}
                            </TTSWrapper>
                          </p>
                        </div>
                        <div className="relative h-48 overflow-hidden flex-shrink-0">
                          <Image
                            src={card.image_value}
                            alt={card.image_alt_text_value}
                            fill
                            className="w-full h-full object-cover"
                            loading="lazy"
                            sizes="320px"
                            style={{
                              borderRadius: "20px",
                            }}
                          />
                          <button
                            style={{
                              backgroundColor: "rgba(10, 91, 224, 1)",
                              borderRadius: "300px",
                            }}
                            className="absolute cursor-pointer bottom-4 right-4 px-5 py-2.5 text-white text-sm font-medium rounded-lg flex items-center gap-2"
                            onClick={() =>
                              navigate.push(`/news-and-insights/${card.slug}`)
                            }
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
