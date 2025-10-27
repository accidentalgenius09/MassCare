import PageBanner from "@/components/sections/Common/PageBanner";
import ServiceSection from "@/components/sections/Services/ServiceSection";
import React from "react";
import NursingCareSection from "@/components/sections/Services/MCMSection";
import MassHomeCareSection from "@/components/sections/Services/MassHomeCareSection";

function Services() {
  return (
    <>
      <PageBanner
        title="Services"
        breadcrumb="Home / Services"
        description="Lorem Ipsum 8 years of meaningful care... care without compromise."
      />
      <ServiceSection />
      <NursingCareSection description2="From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates." />
      <MassHomeCareSection />
      <NursingCareSection
        title="Mass Training Academy"
        imageSrc="/services/mass-training.jpg"
        imageAlt="Mass Training Academy"
        ctaLink="/services/mass-training-academy"
        description1="From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates."
        sectionTitle="Provides accredited healthcare training, NVQ (RQF) qualifications, and CPD courses to upskill professionals and support career growth."
      />
    </>
  );
}

export default Services;
