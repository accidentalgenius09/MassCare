import PageBanner from "@/components/sections/Common/PageBanner";
import BranchLocationsSection from "@/components/sections/Services/NursingCare/BranchLocationsSection";
import CareNursingAgency from "@/components/sections/Services/NursingCare/CareNursingAgency";
import TrustedPartnerBanner from "@/components/sections/Services/NursingCare/TrustedPartnerBanner";
import React from "react";
import WorkingForUs from "@/components/sections/Common/WorkingForUs";
import ServicesOfferedSection from "@/components/sections/Services/NursingCare/ServicesOfferedSection";
import TestimonialsSection from "@/components/sections/Homepage/TestimonialsSection";
import CQCRatingCard from "@/components/sections/Services/NursingCare/CQCRatingCard";

function McmNursingCarePage() {
  return (
    <>
      <PageBanner
        title="MCM Nursing Care Agency"
        breadcrumb="Home / Services / MCM Nursing Care Agency"
        description="Lorem Ipsum 8 years of meaningful care... care without compromise."
      />
      <CareNursingAgency imageSrc="/services/mcm-agency.png" />
      <ServicesOfferedSection />
      <BranchLocationsSection />
      <TrustedPartnerBanner />
      <WorkingForUs />
      <TestimonialsSection showTabs={false} />
      <CQCRatingCard />
    </>
  );
}

export default McmNursingCarePage;
