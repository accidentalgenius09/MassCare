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
    <div className="w-80 h-full max-w-sm items-end justify-end rounded-2xl overflow-hidden">
      {/* Content Container */}
      <div className="py-10 flex flex-col items-end justify-end text-end">
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

        {/* Google Map Button Section */}
        <div className="">
          <p className="text-white text-base font-bold mb-3">Google Map</p>
          <button
            onClick={handleMapClick}
            className="group w-40 bg-white text-gray-800 font-medium py-3 px-6 rounded-full 
                     flex items-center justify-between"
          >
            {/* Google Maps Icon */}
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

// Example usage:
// <LocationCard
//   companyName="mass"
//   address="Unit A, Acorn Business Centre, Livingstone Way, Taunton, Somerset, United Kingdom, TA2 6BD"
//   googleMapsUrl="https://www.google.com/maps/place/Your+Location"
// />
