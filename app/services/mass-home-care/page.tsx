import PageBanner from "@/components/sections/Common/PageBanner";
import WorkingForUs from "@/components/sections/Common/WorkingForUs";
import TestimonialsSection from "@/components/sections/Homepage/TestimonialsSection";
import FormMHC from "@/components/sections/Services/MassHomeCare/FormMHC";
import LocationsMap from "@/components/sections/Services/MassHomeCare/LocationsWeCover";
import LocationsWeCover from "@/components/sections/Services/MassHomeCare/LocationsWeCover";
import BranchLocationsSection from "@/components/sections/Services/NursingCare/BranchLocationsSection";
import CareNursingAgency from "@/components/sections/Services/NursingCare/CareNursingAgency";
import CQCRatingCard from "@/components/sections/Services/NursingCare/CQCRatingCard";
import ServicesOfferedSection from "@/components/sections/Services/NursingCare/ServicesOfferedSection";
import TrustedPartnerBanner from "@/components/sections/Services/NursingCare/TrustedPartnerBanner";
import React from "react";

function MassHomeCare() {
  const services = [
    {
      title: "Personalized Care",
      description:
        "Assistance with daily activities such as bathing, grooming, dressing, and toileting.",
    },
    {
      title: "Companionship",
      description:
        "Friendly, reliable support to reduce loneliness and promote emotional well-being.",
    },
    {
      title: "Medication Support",
      description: "Ensuring medications are taken correctly and on time.",
    },
    {
      title: "Meal Preparation",
      description:
        "Nutritious, tailored meals prepared according to dietary needs.",
    },
    {
      title: "Mobility Assistance",
      description: "Help with moving around the home safely and confidently.",
    },
    {
      title: "Specialist Care",
      description:
        "Support for individuals with dementia, disabilities, or complex health conditions.",
    },
  ];
  return (
    <>
      <PageBanner
        title="MCM Nursing Care Agency"
        breadcrumb="Home / Services / MCM Nursing Care Agency"
        description="Lorem Ipsum 8 years of meaningful care... care without compromise."
      />
      <CareNursingAgency
        imageAlt="Nurse caring for the elderly"
        imageSrc="/services/mass-home-care.png"
        mainTitle="What is Mass Home Care"
        services={services}
        description2="From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates."
        description1="Mass Care Momentous represents the proud milestones, meaningful connections, and impactful moments we’ve achieved on our journey in healthcare staffing. From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates."
      />
      <ServicesOfferedSection
        img2="/services/service-offered1.png"
        img1="/services/service-offered2.png"
        imgAlt1="Nurse Caring for the Elderly"
        imgAlt2="Nurse Serving Food"
      />
      <LocationsMap />
      <FormMHC />
      <div className="mt-20"><TrustedPartnerBanner /></div>
      <TestimonialsSection showTabs={false} />
      <CQCRatingCard />
    </>
  );
}

export default MassHomeCare;
