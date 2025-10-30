import TestimonialsBanner from "@/components/sections/Testimonials/TestimonialsBanner";
import ClientStoriesSection from "@/components/sections/Testimonials/ClientStoriesSection";
import React from "react";
import TestimonialHero from "@/components/sections/Testimonials/TestimonialsSection";
import TestimonialsSection from "@/components/sections/Homepage/TestimonialsSection";
import ContactUsBanner from "@/components/sections/Testimonials/ContactUsBanner";

function page() {
  return (
    <>
      <TestimonialsBanner />
      <TestimonialHero />
      <ClientStoriesSection />
      <TestimonialsSection
        viewAll={false}
        tabs={["Home Care", "Learning", "Momentus"]}
      />
      <ContactUsBanner />
    </>
  );
}

export default page;
