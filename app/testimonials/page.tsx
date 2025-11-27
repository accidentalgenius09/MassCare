"use client";
import TestimonialsBanner from "@/components/sections/Testimonials/TestimonialsBanner";
import ClientStoriesSection from "@/components/sections/Testimonials/ClientStoriesSection";
import React, { useEffect, useState } from "react";
import TestimonialHero from "@/components/sections/Testimonials/TestimonialsSection";
import TestimonialsSection from "@/components/sections/Homepage/TestimonialsSection";
import ContactUsBanner from "@/components/sections/Testimonials/ContactUsBanner";
import restApiWrapper from "@/service/RestApiWrapper";
import { TestimonialsPageData } from "@/types/Testimonials.type";

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialsPageData>();

  useEffect(() => {
    const fetchTestimonials = async () => {
      const response = await restApiWrapper.get("/testimonials");
      setTestimonials(response.data);
    };
    fetchTestimonials();
  }, []);

  return (
    <>
      {testimonials && (
        <>
          <TestimonialsBanner testimonialsData={testimonials} />
          <TestimonialHero testimonialsData={testimonials} />
          <ClientStoriesSection testimonialsData={testimonials} />
          <TestimonialsSection
            testimonials={testimonials?.testimonials || []}
            title={testimonials?.testimonial_cms?.section4_title || ""}
            viewAll={false}
            tabs={["Home Care", "Learning", "Momentus"]}
          />
          <ContactUsBanner
            title={testimonials?.testimonial_cms?.section5_title || ""}
            description={
              testimonials?.testimonial_cms?.section5_description || ""
            }
            testimonialsData={testimonials}
          />
        </>
      )}
    </>
  );
}

export default TestimonialsPage;
