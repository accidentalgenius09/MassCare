import React from "react";
import {
  GoogleMapPinIcon,
  TopRightArrowBlack,
} from "@/components/helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import { McmNursingCareAgencyServiceDetail } from "@/types/Service.type";
import Image from "next/image";

interface BranchLocation {
  city: string;
  addressLine1: string;
  addressLine2: string;
  phone1: string;
  phone2: string;
}

interface BranchLocationsSectionProps {
  MCMData: McmNursingCareAgencyServiceDetail;
  title?: string;
  locations?: BranchLocation[];
  buttonText?: string;
}

const BranchLocationsSection: React.FC<BranchLocationsSectionProps> = ({
  MCMData,
}) => {
  return (
    <section className="pt-12 pb-6 md:pt-16 md:pb-8 lg:pt-20 lg:pb-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-32">
        {/* Section Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-8">
          <TTSWrapper text={MCMData?.service_detail_cms?.branch_location_title}>
            {MCMData?.service_detail_cms?.branch_location_title}
          </TTSWrapper>
        </h2>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {MCMData?.branch_locations?.map((location, index) => (
            <div
              key={index}
              className="relative bg-[#E8EFFF] rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* UK Flag Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <Image
                  src={location.icon_value}
                  alt={location.icon_alt_text_value}
                  width={40}
                  height={40}
                  loading="lazy"
                  sizes="40px"
                />
              </div>

              {/* Location Content */}
              <div>
                <h3 className="text-lg font-semibold text-black uppercase">
                  <TTSWrapper text={location.name}>{location.name}</TTSWrapper>
                </h3>

                <div className="mb-6">
                  <p className="text-base text-black font-normal">
                    <TTSWrapper text={location.address}>
                      {location.address}
                    </TTSWrapper>
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="pt-2 flex flex-col gap-1">
                    <p className="text-sm sm:text-base text-black whitespace-nowrap">
                      <TTSWrapper
                        text={location.phone_number_one}
                        className="text-sm sm:text-base text-black whitespace-nowrap"
                      >
                        {location.phone_number_one}
                      </TTSWrapper>
                    </p>
                    <p className="text-sm sm:text-base text-black whitespace-nowrap">
                      <TTSWrapper
                        text={location.phone_number_two}
                        className="text-sm sm:text-base text-black whitespace-nowrap"
                      >
                        {location.phone_number_two}
                      </TTSWrapper>
                    </p>
                  </div>

                  <button
                    onClick={() => window.open(location.map_link, "_blank")}
                    className="group w-40 bg-white text-gray-800 font-medium py-3 px-4 rounded-full 
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
