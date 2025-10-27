import React from "react";
import { MapPin } from "lucide-react";
import {
  GoogleMapPinIcon,
  TopRightArrowBlack,
  UKFlagIcon,
} from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";

interface BranchLocation {
  city: string;
  addressLine1: string;
  addressLine2: string;
  phone1: string;
  phone2: string;
}

interface BranchLocationsSectionProps {
  title?: string;
  locations?: BranchLocation[];
  buttonText?: string;
}

const BranchLocationsSection: React.FC<BranchLocationsSectionProps> = ({
  title = "Branch Locations",
  locations = [
    {
      city: "PLYMOUTH",
      addressLine1: "Room B, 3rd Floor, 23 Lockyer Street",
      addressLine2: "Plymouth, PL1 2QW",
      phone1: "01752 418385",
      phone2: "0782 444 39 49",
    },
    {
      city: "BRISTOL",
      addressLine1: "123 Healthcare Avenue",
      addressLine2: "Bristol, BS1 1AA",
      phone1: "0117 123 4567",
      phone2: "0789 123 4567",
    },
    {
      city: "MANCHESTER",
      addressLine1: "456 Care Street",
      addressLine2: "Manchester, M1 2AB",
      phone1: "0161 234 5678",
      phone2: "0790 234 5678",
    },
  ],
}) => {
  return (
    <section className="pt-12 pb-6 md:pt-16 md:pb-8 lg:pt-20 lg:pb-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-32">
        {/* Section Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-8">
          <TTSWrapper text={title}>{title}</TTSWrapper>
        </h2>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {locations.map((location, index) => (
            <div
              key={index}
              className="relative bg-[#E8EFFF] rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* UK Flag Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <UKFlagIcon />
              </div>

              {/* Location Content */}
              <div>
                <h3 className="text-lg font-semibold text-black uppercase">
                  <TTSWrapper text={location.city}>{location.city}</TTSWrapper>
                </h3>

                <div className="mb-6">
                  <p className="text-base text-black font-normal">
                    <TTSWrapper text={location.addressLine1}>
                      {location.addressLine1}
                    </TTSWrapper>
                  </p>
                  <p className="text-base text-black font-normal">
                    <TTSWrapper text={location.addressLine2}>
                      {location.addressLine2}
                    </TTSWrapper>
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1 pt-2">
                    <p className="text-sm sm:text-base text-black">
                      <TTSWrapper
                        text={location.phone1}
                        className="text-sm sm:text-base text-black"
                      >
                        {location.phone1}
                      </TTSWrapper>
                    </p>
                    <p className="text-sm sm:text-base text-black">
                      <TTSWrapper
                        text={location.phone2}
                        className="text-sm sm:text-base text-black"
                      >
                        {location.phone2}
                      </TTSWrapper>
                    </p>
                  </div>

                  <button
                    // onClick={handleMapClick}
                    className="group w-40 bg-white text-gray-800 font-medium py-3 px-6 rounded-full 
                     flex items-center justify-between hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Google Maps Icon */}
                    <div className="w-5 h-5 mb-1 relative">
                      <GoogleMapPinIcon />
                    </div>
                    <span className="text-sm font-medium">Lets Go</span>
                    <TopRightArrowBlack />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchLocationsSection;
