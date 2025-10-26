import React from "react";
import HowItWorksSection from './HowItWorksSection'
import WhyChooseSection from './WhyChooseSection'
import TrustedInstitutionsSection from './TrustedInstitutionsSection'
import TestimonialsSection from './TestimonialsSection'
import AccreditationsSection from './AccreditationsSection'
import HeroSection from "./HeroSection";
import QuickConnect from "./QuickConnectSection";
import ServicesSection from "./ServicesSection";
import CareerPathwaysSection from "./CareerPathways";
import WelcomeSectionHome from "./WelcomeSectionHome";

function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <WelcomeSectionHome />
      <HowItWorksSection />
      <WhyChooseSection />
      <TrustedInstitutionsSection />
      <TestimonialsSection />
      <AccreditationsSection />
      <ServicesSection />
      <CareerPathwaysSection />
      <QuickConnect />
    </div>
  );
}

export default HomePage;
