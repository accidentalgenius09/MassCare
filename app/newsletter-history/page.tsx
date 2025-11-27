"use client";
import DocumentList, {
  NewsletterList,
} from "@/components/sections/newsletter-history/DocumentCard";
import TTSWrapper from "@/hooks/TTSWrapper";
import restApiWrapper from "@/service/RestApiWrapper";
import React, { useEffect, useState } from "react";

interface Newsletter {
  title1?: string;
  description1?: string;
  title2?: string;
  description2?: string;
}

function NewsletterHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [newsletterList, setNewsletterList] = useState<NewsletterList | null>(
    null
  );
  const [displayCount, setDisplayCount] = useState(12);

  useEffect(() => {
    const fetchNewsletter = async () => {
      setIsLoading(true);
      try {
        const response = await restApiWrapper.get<Newsletter>("/newsletter");
        setNewsletter(response.data);
      } catch (error) {
        console.error("Error fetching newsletter:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsletter();
  }, []);

  useEffect(() => {
    const fetchNewsletterList = async () => {
      const response = await restApiWrapper.get<NewsletterList>(
        `/newsletter-list?per-page=${displayCount}&page=1`
      );
      setNewsletterList(response.data);
    };
    fetchNewsletterList();
  }, [displayCount]);

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
                <TTSWrapper text="Loading Newsletter History...">
                  Loading Newsletter History...
                </TTSWrapper>
              </p>
              <p className="text-gray-600 text-sm mt-3 max-w-md">
                <TTSWrapper text="Please wait while we fetch the newsletter documents">
                  Please wait while we fetch the newsletter documents
                </TTSWrapper>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={isLoading ? "blur-sm pointer-events-none" : ""}>
        <div className="h-[15vh] bg-[url('/common/news-history.png')] bg-cover bg-center"></div>
        <div className="p-20 bg-white text-black">
          <div>
            <h1 className="text-3xl font-semibold">
              <TTSWrapper text={newsletter?.title1 || ""}>
                {newsletter?.title1}
              </TTSWrapper>
            </h1>
            <div className="text-sm">
              <TTSWrapper text={newsletter?.description1 || ""}>
                <div
                  className="text-black leading-relaxed prose prose-sm"
                  dangerouslySetInnerHTML={{
                    __html: newsletter?.description1 ?? "",
                  }}
                />
              </TTSWrapper>
            </div>
          </div>
          <div className="mt-8">
            <h6 className="text-sm font-semibold">
              <TTSWrapper text={newsletter?.title2 || ""}>
                {newsletter?.title2}
              </TTSWrapper>
            </h6>
            <div className="text-sm">
              <TTSWrapper text={newsletter?.description2 || ""}>
                <div
                  className="text-black leading-relaxed prose prose-sm"
                  dangerouslySetInnerHTML={{
                    __html: newsletter?.description2 ?? "",
                  }}
                />
              </TTSWrapper>
            </div>
          </div>
          <DocumentList
            newsletterList={newsletterList}
            setDisplayCount={setDisplayCount}
            displayCount={displayCount}
          />
        </div>
      </div>
    </>
  );
}

export default NewsletterHistory;
