export interface ContactUsDataType {
  banner: Banner;
  contact_cms: ContactCms;
  contact_infos: ContactInfo[];
  contact_items: ContactItem[];
  faqs: Faq[];
}

export interface Banner {
  id: number;
  banner_title: string;
  banner_description: any;
}

export interface ContactCms {
  id: number;
  section1_title: string;
  section1_description: string;
  section2_title: string;
  section2_description: string;
  section3_title: string;
  section4_iframe_url: string;
  section5_title: string;
  section5_description: string;
}

export interface ContactInfo {
  id: number;
  title: string;
  content: string;
  icon_value: string;
  icon_alt_text_value: string;
}

export interface ContactItem {
  id: number;
  title: string;
  sub_title: string;
  content: string;
  icon_value: string;
  icon_alt_text_value: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
}
