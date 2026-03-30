import TTSWrapper from "@/hooks/TTSWrapper";
import { cmsFieldToString } from "@/lib/cmsFieldToString";
import React from "react";
import Link from "next/link";

interface PageBannerProps {
  title?: unknown;
  breadcrumb: string;
  description?: unknown;
  image?: string;
}

function PageBanner({
  title,
  breadcrumb,
  description,
  image,
}: PageBannerProps) {
  const titleStr = cmsFieldToString(title);
  const descriptionStr = cmsFieldToString(description);
  // Function to map breadcrumb text to URL
  const getBreadcrumbUrl = (text: string): string | null => {
    const normalizedText = text.trim().toLowerCase();

    // Map breadcrumb names to URLs - ordered by specificity
    if (normalizedText === "home") return "/";
    if (normalizedText === "about us") return "/about-us";
    if (normalizedText === "services") return "/services";
    if (
      normalizedText.includes("mass home care") ||
      normalizedText === "mass home care" ||
      normalizedText === "mass care"
    )
      return "/services/mass-home-care";
    if (
      normalizedText.includes("mcm nursing") ||
      normalizedText.includes("mcm nursing care agency") ||
      normalizedText === "mcm"
    )
      return "/services/mcm-nursing-care-agency";
    if (
      normalizedText.includes("mass training") ||
      normalizedText === "mass training academy" ||
      normalizedText === "training academy"
    )
      return "/services/mass-training-academy";
    if (
      normalizedText === "careers" ||
      normalizedText === "career opportunities"
    )
      return "/career-opportunities";
    if (
      normalizedText === "news" ||
      normalizedText === "news & insights" ||
      normalizedText === "news and insights"
    )
      return "/news-and-insights";
    if (normalizedText === "testimonials") return "/testimonials";
    if (normalizedText === "contact us" || normalizedText === "contact")
      return "/contact-us";

    return null;
  };

  // Parse breadcrumb string into array of items
  const parseBreadcrumbs = (breadcrumb: string): string[] => {
    // Split by " / " or "/" and clean up whitespace
    return breadcrumb
      .split(/\s*\/\s*/)
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const breadcrumbItems = parseBreadcrumbs(breadcrumb);

  return (
    <div
      className={`h-[40vh] sm:h-[45vh] md:h-[70vh] bg-cover bg-center flex items-center justify-center pt-16`}
      style={{
        backgroundImage: `url(${image ?? "/common/dna-banner.png"})`,
      }}
    >
      <div className="container mx-auto h-full px-4">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div
            className="rounded-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-center text-white font-extralight text-xs sm:text-sm md:text-[13px]"
            style={{ border: "1.535px solid rgba(255, 255, 255, 0.50)" }}
          >
            <TTSWrapper text={breadcrumb}>
              <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
                {breadcrumbItems.map((item, index) => {
                  const isLast = index === breadcrumbItems.length - 1;
                  const url = getBreadcrumbUrl(item);

                  return (
                    <React.Fragment key={index}>
                      {url && !isLast ? (
                        <Link
                          href={url}
                          className="text-white hover:text-gray-200 transition-colors decoration-white/50 hover:decoration-white"
                        >
                          {item}
                        </Link>
                      ) : (
                        <span className={isLast ? "text-white" : "text-white"}>
                          {item}
                        </span>
                      )}
                      {!isLast && <span className="text-white/70 mx-1">/</span>}
                    </React.Fragment>
                  );
                })}
              </div>
            </TTSWrapper>
          </div>
          {titleStr && (
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mt-3 sm:mt-4">
              <TTSWrapper text={titleStr}>{titleStr}</TTSWrapper>
            </h1>
          )}
          {descriptionStr && (
            <p className="text-white text-sm sm:text-base md:text-lg font-normal mt-3 sm:mt-4 max-w-2xl px-4">
              <TTSWrapper text={descriptionStr}>{descriptionStr}</TTSWrapper>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageBanner;
