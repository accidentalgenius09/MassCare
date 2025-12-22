"use client";

import React from "react";
import Image from "next/image";
import { GoogleMapPinIcon, TopRightArrowBlack } from "../helpers/svgs";
import { useRouter } from "next/navigation";
import { SiteSettings } from "@/types/Footer.type";
import TTSWrapper from "@/hooks/TTSWrapper";

interface LocationCardProps {
  siteSettings?: SiteSettings;
  companyName?: string;
  logoSrc?: string;
  address?: string;
  googleMapsUrl?: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  siteSettings,
  companyName = "mass",
  logoSrc,
  address = "Unit A, Acorn Business Centre, Livingstone Way, Taunton, Somerset, United Kingdom, TA2 6BD",
  googleMapsUrl = "https://maps.google.com",
}) => {
  const router = useRouter();

  // Use siteSettings data if available, otherwise fallback to props
  const mapUrl = siteSettings?.map_link || googleMapsUrl;

  const handleMapClick = () => {
    window.open(mapUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-78 h-full max-w-sm rounded-2xl overflow-hidden flex flex-col justify-between">
      {/* Content Container */}
      <div className="py-10 flex flex-col items-end text-end">
        {/* Logo Section */}
        <div className="mb-6">
          <div
            className="relative w-48 h-24 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src={logoSrc ?? "/logo-white.png"}
              alt={`${companyName} logo`}
              fill
              className="object-contain"
              loading="lazy"
              sizes="256px"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-8 px-4">
          <div className="text-white text-base leading-relaxed font-light">
            {siteSettings?.address ? (
              <TTSWrapper text={siteSettings.address}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: siteSettings.address,
                  }}
                />
              </TTSWrapper>
            ) : (
              <TTSWrapper text={address}>
                <div>{address}</div>
              </TTSWrapper>
            )}
          </div>
        </div>
      </div>
      {/* Google Map Button Section */}
      <div className="me-4 mt-4 text-end flex flex-col items-end gap-5">
        <p className="text-white text-base font-bold me-3">Google Map</p>
        <div className="cursor-pointer">
          <button
            onClick={handleMapClick}
            className="group w-40 bg-white text-gray-800 cursor-pointer font-medium py-3 px-6 rounded-full 
                       flex items-center justify-between hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="w-5 h-5 relative">
              <GoogleMapPinIcon />
            </div>
            <span className="text-sm font-medium">Lets Go</span>
            <TopRightArrowBlack />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
