import PageBanner from "@/components/sections/Common/PageBanner";
import WorkingForUs from "@/components/sections/Common/WorkingForUs";
import TestimonialsSection from "@/components/sections/Homepage/TestimonialsSection";
import CareNursingAgency from "@/components/sections/Services/NursingCare/CareNursingAgency";
import CQCRatingCard from "@/components/sections/Services/NursingCare/CQCRatingCard";
import TrustedPartnerBanner from "@/components/sections/Services/NursingCare/TrustedPartnerBanner";
import UpcomingCoursesSection from "@/components/sections/Services/MassTraining/UpcomingCoursesSection";
import React from "react";
import CoursesOffered from "@/components/sections/Services/MassTraining/CoursesOffered";

function page() {
  return (
    <>
      <PageBanner
        title="Mass Training Academy"
        breadcrumb="Home / Services / Mass Training Academy"
        description="Lorem Ipsum 8 years of meaningful care... care without compromise."
      />
      <CareNursingAgency
        mainTitle="About the Training Academy"
        imageSrc="/services/training-academy.png"
        imageAlt="Nurse Caring for the Elderly"
        description1="Mass Care Momentous represents the proud milestones, meaningful connections, and impactful moments we’ve achieved on our journey in healthcare staffing. From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates."
        description2="From placing skilled nurses in fulfilling roles across the UK to supporting healthcare providers with dependable staffing solutions, every success story reflects our core values of compassion, commitment, and care. These moments are not just achievements—they are the heartbeats of our mission to make a real difference in the lives of both our clients and candidates."
        whatWeDo={false}
      />
      <CoursesOffered />
      <UpcomingCoursesSection />
      <WorkingForUs />
      <div className="mt-20">
        <TrustedPartnerBanner
          title="Download Our Course Prospectus"
          description="Explore Our Training Programs and Start Your Journey in Healthcare Today"
          buttonText="Download Now"
        />
      </div>
      <TestimonialsSection showTabs={false} />
      <CQCRatingCard />
    </>
  );
}

export default page;
