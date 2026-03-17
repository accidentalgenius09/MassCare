import React from "react";
import Image from "next/image";
import { GreenCheckmark } from "@/components/helpers/svgs";
import { McmNursingCareAgencyServiceDetail } from "@/types/Service.type";
import TTSWrapper from "@/hooks/TTSWrapper";

interface ServiceCardProps {
  title: string;
  description: string;
}

interface CareNursingAgencyProps {
  MCMData?: McmNursingCareAgencyServiceDetail;
  imageSrc?: string;
  imageAlt?: string;
  mainTitle?: string;
  whatWeDo?: boolean;
  description1?: string;
  description2?: string;
  services?: ServiceCardProps[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 h-[200px] overflow-y-auto scrollbar-hide">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <div className="w-6 h-6 flex items-center justify-center">
            <GreenCheckmark />
          </div>
        </div>
        <div className="flex-1 items-center justify-center my-auto">
          <h3 className="text-2xl max-w-[250px] font-semibold text-black mb-2">
            {title}
          </h3>
          <p className="text-sm text-black leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const CareNursingAgency: React.FC<CareNursingAgencyProps> = ({
  MCMData,
  whatWeDo = true,
}) => {
  return (
    <section
      className={`bg-white ${
        whatWeDo ? "py-12 md:py-16 lg:py-20" : "pt-12 md:pt-16 lg:pt-20"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-32">
        {/* Top Section - Image and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 mb-16 md:mb-20 lg:mb-24">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden max-w-[800px] max-h-[500px]">
              {MCMData?.detail_image_value && (
                <Image
                  src={MCMData?.detail_image_value}
                  alt={MCMData?.image_alt_text_value || "Care Nursing Agency"}
                  width={800}
                  height={500}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-2/3 font-bold text-black mb-6 leading-tight">
              <TTSWrapper text={MCMData?.detail_page_title || ""}>
                {MCMData?.detail_page_title}
              </TTSWrapper>
            </h2>

            <div className="space-y-4 font-normal max-w-2xl">
              {MCMData?.detail_page_description && (
                <TTSWrapper text={MCMData?.detail_page_description}>
                  <div
                    className="text-sm text-black leading-relaxed prose prose-sm"
                    dangerouslySetInnerHTML={{
                      __html: MCMData.detail_page_description,
                    }}
                  />
                </TTSWrapper>
              )}
            </div>
          </div>
        </div>

        {/* What We Do Section */}
        {MCMData?.service_detail_cms &&
          MCMData?.service_detail_cms.what_we_do_title && (
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-8 md:mb-12">
                <TTSWrapper text={MCMData?.service_detail_cms.what_we_do_title}>
                  {MCMData?.service_detail_cms.what_we_do_title}
                </TTSWrapper>
              </h2>

              {/* Services Grid - Single Container with Partitions */}
              {(() => {
                const totalItems = MCMData?.what_we_dos?.length || 0;

                // Determine grid columns based on number of items
                const getGridCols = () => {
                  if (totalItems === 1) return "grid-cols-1";
                  if (totalItems === 2) return "grid-cols-1 md:grid-cols-2";
                  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
                };

                return (
                  <div className="border border-gray-300 rounded-2xl overflow-hidden bg-white w-fit">
                    <div className={`grid ${getGridCols()}`}>
                      {MCMData?.what_we_dos.map((service, index) => {
                        const isLastItem = index === totalItems - 1;

                        // Border logic based on number of items
                        let borderClasses = "border-r border-b border-gray-300";

                        if (totalItems === 1) {
                          // Single item: no borders
                          borderClasses = "";
                        } else if (totalItems === 2) {
                          // Two items: remove right border on last item, remove bottom border on both
                          if (isLastItem) {
                            borderClasses =
                              "border-b border-gray-300 md:border-r-0";
                          } else {
                            borderClasses =
                              "border-r border-b border-gray-300 md:border-b-0";
                          }
                        } else {
                          // Three or more items: calculate borders based on grid position
                          // Calculate row and column positions for different breakpoints
                          const rowMobile = index; // 1 column on mobile
                          const lastRowMobile = totalItems - 1;

                          const rowMd = Math.floor(index / 2); // 2 columns on md
                          const totalRowsMd = Math.ceil(totalItems / 2);
                          const isLastRowMd = rowMd === totalRowsMd - 1;
                          const isLastInRowMd =
                            (index + 1) % 2 === 0 || isLastItem;

                          const rowLg = Math.floor(index / 3); // 3 columns on lg
                          const totalRowsLg = Math.ceil(totalItems / 3);
                          const isLastRowLg = rowLg === totalRowsLg - 1;
                          const isLastInRowLg =
                            (index + 1) % 3 === 0 || isLastItem;

                          borderClasses = [
                            "border-r border-b border-gray-300",
                            // Mobile: remove right border on last item
                            rowMobile === lastRowMobile ? "border-r-0" : "",
                            // Medium: remove right border on last item in row, remove bottom border on last row
                            isLastInRowMd ? "md:border-r-0" : "md:border-r",
                            isLastRowMd ? "md:border-b-0" : "md:border-b",
                            // Large: remove right border on last item in row, remove bottom border on last row
                            isLastInRowLg ? "lg:border-r-0" : "lg:border-r",
                            isLastRowLg ? "lg:border-b-0" : "lg:border-b",
                          ]
                            .filter(Boolean)
                            .join(" ");
                        }

                        return (
                          <div key={index} className={borderClasses}>
                            <ServiceCard
                              title={service.title}
                              description={service.description}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
      </div>
    </section>
  );
};

export default CareNursingAgency;
