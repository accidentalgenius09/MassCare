import MissionVisionSection from "@/components/sections/About-us/MissionVision";
import WhyChooseUs from "@/components/sections/About-us/WhyChooseUs";
import PageBanner from "@/components/sections/Common/PageBanner";
import ServicesSection from "@/components/sections/Homepage/ServicesSection";
import WelcomeSection from "@/components/sections/Homepage/WelcomeSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Mass Care",
  description:
    "Learn about Mass Care's mission, values, and commitment to quality nursing, home care, and training services.",
};

export default function AboutUsPage() {
  return (
    <>
      <PageBanner
        title="About Us"
        breadcrumb="Home / About Us"
        description="Lorem Ipsum 8 years of meaningful care... care without compromise."
      />
      <WelcomeSection section="aboutus" />
      <MissionVisionSection />
      <ServicesSection />
      <WhyChooseUs />
    </>
  );
}
