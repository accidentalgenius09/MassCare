import React from "react";
import Image from "next/image";
import { McmNursingCareAgencyServiceDetail } from "@/types/Service.type";
import TTSWrapper from "@/hooks/TTSWrapper";

interface LocationsMapProps {
  MCMData: McmNursingCareAgencyServiceDetail;
}

const LocationsMap: React.FC<LocationsMapProps> = ({ MCMData }) => {
  // Helper function to safely convert percentage values
  const formatPercentage = (
    value: string | number | null | undefined
  ): number => {
    if (value === null || value === undefined) return 0;
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(numValue) ? 0 : numValue;
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 pt-16 pb-1 md:pt-20 md:pb-1 lg:pt-24 lg:pb-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            <TTSWrapper
              text={MCMData?.service_detail_cms?.location_we_cover_title}
            >
              {MCMData?.service_detail_cms?.location_we_cover_title}
            </TTSWrapper>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            <TTSWrapper
              text={MCMData?.service_detail_cms?.location_we_cover_subtitle}
            >
              {MCMData?.service_detail_cms?.location_we_cover_subtitle}
            </TTSWrapper>
          </p>
        </div>

        {/* Map Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Dotted World Map Background */}
          <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
            {/* World Map SVG with Dots */}
            {/* <DotMap /> */}
            <Image
              src="/common/g3099.png"
              alt="Map"
              width={1178}
              height={596}
              className="w-full h-full object-cover"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 1178px"
            />

            {/* Location Pins Overlay */}
            <div className="absolute inset-0">
              {MCMData?.map_locations?.map((location) => {
                const topPercent = formatPercentage(location.top_percent);
                const leftPercent = formatPercentage(location.left_percent);
                return (
                  <div
                    key={location.id}
                    className="absolute group cursor-pointer"
                    style={{
                      top: `${topPercent}%`,
                      left: `${leftPercent}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Pin Icon */}
                    <div className="relative">
                      <div className="flex items-center justify-center transform transition-all duration-300 hover:scale-110">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="33"
                          height="33"
                          viewBox="0 0 33 33"
                          fill="none"
                        >
                          <path
                            d="M16.5 0C9.67519 0 4.125 5.55019 4.125 12.375C4.125 20.9529 15.2955 32.2224 15.7699 32.6989C15.972 32.8989 16.236 33 16.5 33C16.764 33 17.028 32.8989 17.2301 32.6989C17.7045 32.2224 28.875 20.9529 28.875 12.375C28.875 5.55019 23.3248 0 16.5 0Z"
                            fill="#00235C"
                          />
                          <path
                            d="M16.5 18.5625C19.9173 18.5625 22.6875 15.7923 22.6875 12.375C22.6875 8.95774 19.9173 6.1875 16.5 6.1875C13.0827 6.1875 10.3125 8.95774 10.3125 12.375C10.3125 15.7923 13.0827 18.5625 16.5 18.5625Z"
                            fill="#FAFAFA"
                          />
                        </svg>
                      </div>
                      {/* Location Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                          {location.title}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                            <div className="border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsMap;

// Example usage:
// <LocationsMap
//   title="Locations We Cover"
//   locations={customLocations}
// />
