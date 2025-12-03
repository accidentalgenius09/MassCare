import React, { useMemo } from "react";
import { Checkbox, TopRightArrowWhite } from "../../helpers/svgs";
import TTSWrapper from "@/hooks/TTSWrapper";
import Image from "next/image";
import { HomeData } from "@/types/Home.type";
import { useRouter } from "next/navigation";
const CareerPathwaysSection = ({ homeData }: { homeData: HomeData }) => {
  const navigate = useRouter();
  // Parse HTML string to extract list items
  const listItems = useMemo(() => {
    if (!homeData?.home_cms?.career_pathway_points) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      homeData.home_cms.career_pathway_points,
      "text/html"
    );
    const liElements = doc.querySelectorAll("li");
    return Array.from(liElements).map((li) => li.innerHTML);
  }, [homeData?.home_cms?.career_pathway_points]);

  return (
    <div className="container mx-auto bg-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-full mx-auto">
        {/* Career Pathways Section */}
        <div
          style={{
            background: "rgba(1, 35, 103, 1)",
          }}
          className="rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Content */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white ">
                <TTSWrapper
                  text={homeData?.home_cms?.career_pathway_title}
                  className="text-3xl sm:text-4xl font-bold text-white "
                >
                  {homeData?.home_cms?.career_pathway_title}
                </TTSWrapper>
              </h2>
              <p className="text-white text-2xl mb-6">
                <TTSWrapper
                  text={homeData?.home_cms?.career_pathway_subtitle}
                  className="text-white text-2xl mb-6"
                >
                  {homeData?.home_cms?.career_pathway_subtitle}
                </TTSWrapper>
              </p>

              <div className="text-white text-sm mb-8 leading-relaxed">
                <TTSWrapper
                  text={homeData?.home_cms?.career_pathway_description}
                  className="text-white text-sm mb-8 leading-relaxed"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        homeData?.home_cms?.career_pathway_description || "",
                    }}
                  />
                </TTSWrapper>
              </div>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {listItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-4 h-4 flex-shrink-0 mt-0.5">
                      <Checkbox />
                    </div>
                    <div className="text-white text-sm">
                      <strong>
                        <TTSWrapper
                          text={item.replace(/<[^>]*>/g, "")}
                          className="text-white text-sm"
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                          />
                        </TTSWrapper>
                      </strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div>
                <button
                  onClick={() => navigate.push("/career-opportunities")}
                  className="relative overflow-hidden bg-[#0A5BE0] text-white font-medium px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0A5BE0] before:to-[#003C9F] before:content-[''] before:-translate-x-full before:transition-transform before:duration-300 before:z-0 hover:before:translate-x-0 flex items-center gap-2 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <TTSWrapper text="Explore Career Routes">
                      Explore Career Routes
                    </TTSWrapper>
                    <TopRightArrowWhite />
                  </span>
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-auto lg:min-h-[500px] aspect-square lg:aspect-auto">
              <Image
                src={homeData?.home_cms?.career_pathway_image_value}
                alt={homeData?.home_cms?.career_pathway_image_alt_text_value}
                fill
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div
                className="absolute inset-y-0 left-0 w-full sm:w-3/4 md:w-1/2 lg:w-1/2"
                style={{
                  background:
                    "linear-gradient(90deg, #012367 0%, rgba(1, 35, 103, 0.00) 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPathwaysSection;
