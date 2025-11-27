import React from "react";
import Image from "next/image";
import { GoogleMapPinIcon, TopRightArrowBlack } from "../helpers/svgs";

interface LocationCardProps {
  companyName?: string;
  logoSrc?: string;
  address?: string;
  googleMapsUrl?: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  companyName = "mass",
  logoSrc,
  address = "Unit A, Acorn Business Centre, Livingstone Way, Taunton, Somerset, United Kingdom, TA2 6BD",
  googleMapsUrl = "https://maps.google.com",
}) => {
  const handleMapClick = () => {
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-78 h-full max-w-sm rounded-2xl overflow-hidden flex flex-col justify-between">
      {/* Content Container */}
      <div className="py-10 flex flex-col items-end text-end">
        {/* Logo Section */}
        <div className="mb-6">
          <div className="relative w-64 h-24">
            <Image
              src={logoSrc ?? "/logo-white.png"}
              alt={`${companyName} logo`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-8 px-4">
          <p className="text-white text-base leading-relaxed font-light">
            {address}
          </p>
        </div>
      </div>
      {/* Google Map Button Section */}
      <div className="me-4 mt-4 text-end flex flex-col items-end gap-5">
        <p className="text-white text-base font-bold me-3">Google Map</p>
        <button
          onClick={handleMapClick}
          className="group w-40 bg-white text-gray-800 font-medium py-3 px-6 rounded-full 
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
  );
};

export default LocationCard;
