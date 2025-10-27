import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { GreenCheckmark } from "@/components/helpers/svgs";

interface ServiceCardProps {
  title: string;
  description: string;
}

interface CareNursingAgencyProps {
  imageSrc?: string;
  imageAlt?: string;
  mainTitle?: string;
  description1?: string;
  description2?: string;
  services?: ServiceCardProps[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 h-[200px] overflow-y-auto">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <div className="w-6 h-6 flex items-center justify-center">
            <GreenCheckmark />
          </div>
        </div>
        <div className="flex-1 items-center justify-center my-auto">
          <h3 className="text-2xl max-w-[250px] font-semibold text-black mb-2">{title}</h3>
          <p className="text-sm text-black leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const CareNursingAgency: React.FC<CareNursingAgencyProps> = ({
  imageSrc = "/care-consultation.jpg",
  imageAlt = "Healthcare consultation",
  mainTitle = "What is a Care & Nursing Agency",
  description1 = "Mass Care Momentum represents the proud milestones, meaningful connections, and impactful moments we've achieved on our journey in healthcare staffing. From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates.",
  description2 = "From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates.",
  services = [
    {
      title: "Registered Nurse Placements",
      description:
        "Connecting skilled and qualified nurses with trusted healthcare employers nationwide.",
    },
    {
      title: "Tailored Staffing Solutions",
      description:
        "Whether you're an employer seeking dedicated seeking professionals or a nurse looking for the right opportunity, we customise our approach to meet your needs.",
    },
    {
      title: "Compliance & Vetting",
      description:
        "All candidates undergo rigorous screening, reference checks, and full compliance verification for peace of mind.",
    },
    {
      title: "Nationwide Recruitment Network",
      description:
        "Access to a broad network of healthcare providers, offering diverse job opportunities and talent pools.",
    },
    {
      title: "End-to-End Support",
      description:
        "From initial consultation to successful placement, we guide both clients and candidates throughout the entire process.",
    },
    {
      title: "24/7 Availability",
      description:
        "Our team is always ready to assist—day or night—because healthcare never stops.",
    },
  ],
}) => {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-32">
        {/* Top Section - Image and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 mb-16 md:mb-20 lg:mb-24">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden max-w-[800px] max-h-[500px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={500}
                className="object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-1/2 font-bold text-black mb-6 leading-tight">
              {mainTitle}
            </h2>

            <div className="space-y-4 font-normal max-w-2xl">
              <p className="text-sm text-black leading-relaxed">
                {description1}
              </p>

              <p className="text-sm text-black leading-relaxed">
                {description2}
              </p>
            </div>
          </div>
        </div>

        {/* What We Do Section */}
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-8 md:mb-12">
            What We Do
          </h2>

                                {/* Services Grid - Single Container with Partitions */}
           <div className="border border-gray-300 rounded-2xl overflow-hidden bg-white">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
               {services.map((service, index) => {
                 const isLastRow = index >= services.length - 3; // Last 3 items
                 const isLastInMobile = index === services.length - 1;
                 const isEvenInMd = (index + 1) % 2 === 0; // 2nd, 4th, 6th
                 const isThirdInLg = (index + 1) % 3 === 0; // 3rd, 6th
                 
                 const borderClasses = [
                   'border-r border-b border-gray-300',
                   isLastInMobile ? 'border-r-0' : '',
                   isEvenInMd ? 'md:border-r-0' : 'md:border-r',
                   isThirdInLg ? 'lg:border-r-0' : 'lg:border-r',
                   isLastRow ? 'lg:border-b-0' : 'lg:border-b'
                 ].filter(Boolean).join(' ');
                 
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
        </div>
      </div>
    </section>
  );
};

export default CareNursingAgency;
