export interface TestimonialsPageData {
  testimonial_cms: TestimonialCms;
  client_stories: ClientStory[];
  testimonials: Testimonial[];
}

export interface TestimonialCms {
  id: number;
  section1_title: string;
  section1_sub_title: string;
  section2_title: string;
  section2_description: string;
  section3_title: string;
  section3_description: string;
  section4_title: string;
  section5_title: string;
  section5_description: string;
  section1_video_thumbnail_image_value: string;
  section1_video_value: string;
  section2_image_value: string;
  section2_image_alt_text_value: string;
  section5_image_value: string;
  section5_image_alt_text_value: string;
}

export interface ClientStory {
  id: number;
  media_type: string;
  image_value?: string;
  image_alt_text_value?: string;
  video_thumbnail_image_value?: string;
  video_value?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  place: string;
  description: string;
  rating: string;
  image_value: string;
  image_alt_text_value: string;
  testimonial_category: TestimonialCategory;
}

export interface TestimonialCategory {
  id: number;
  title: string;
}
