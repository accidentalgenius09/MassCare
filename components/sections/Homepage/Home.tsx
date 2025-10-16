import React from "react";
import WelcomeSection from './WelcomeSection'
import HowItWorksSection from './HowItWorksSection'
import WhyChooseSection from './WhyChooseSection'
import TrustedInstitutionsSection from './TrustedInstitutionsSection'
import TestimonialsSection from './TestimonialsSection'
import AccreditationsSection from './AccreditationsSection'
import HeroSection from "./HeroSection";
import QuickConnect from "./QuickConnectSection";
import ServicesSection from "./ServicesSection";

function HomePage() {
  return (
    <div>
      <HeroSection />
      <WelcomeSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <TrustedInstitutionsSection />
      <TestimonialsSection />
      <AccreditationsSection />
      <ServicesSection />
      <QuickConnect />
    </div>
  );
}

export default HomePage;
