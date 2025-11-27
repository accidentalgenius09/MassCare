export interface AboutUsDataType {
  banner: Banner;
  about_cms: AboutCms;
  services: Service[];
  why_choose_us: WhyChooseU[];
}

export interface Banner {
  id: number;
  banner_title: string;
  banner_description: any;
}

export interface AboutCms {
  id: number;
  section1_title: string;
  section1_sub_title: string;
  section1_description: string;
  section2_title1: string;
  section2_description1: string;
  section2_title2: string;
  section2_description2: string;
  section2_title3: string;
  section2_description3: string;
  section3_title: string;
  section4_title: string;
  section4_description: string;
  section1_image_value: string;
  section1_image_alt_text_value: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  features: string[];
  image_value: string;
  image_alt_text_value: string;
}

export interface WhyChooseU {
  id: number;
  title: string;
  description: string;
  icon_value: string;
  icon_alt_text_value: string;
}
