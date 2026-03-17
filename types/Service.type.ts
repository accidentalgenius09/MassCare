export interface ServicesPageData {
    banner: Banner
    service_cms: ServiceCms
    services: Service[]
  }
  
  export interface Banner {
    id: number
    banner_title: string
    banner_description: any
  }
  
  export interface ServiceCms {
    id: number
    title: string
    description: string
    image_one_value: string
    image_one_alt_text_value: string
    image_two_value: string
    image_two_alt_text_value: string
  }
  
  export interface ServiceFacility {
    id: number
    title: string
    description: string
    image_value: string
    image_alt_text_value: string
  }

  export interface Service {
    id: number
    title: string
    slug: string
    subtitle: string
    service_facilities: ServiceFacility[]
  }

  export interface McmNursingCareAgencyServiceDetail {
    id: number
    banner_title: string
    banner_description: string
    detail_page_title: string
    detail_page_description: string
    meta_title: string
    meta_description: any
    meta_keywords: any
    other_meta_tags: any
    detail_image_value: string
    image_alt_text_value: any
    service_detail_cms: ServiceDetailCms
    what_we_dos: WhatWeDo[]
    service_offers: ServiceOffer[]
    branch_locations: BranchLocation[]
    service_testimonials: ServiceTestimonial[]
    map_locations: any[]
    offered_courses: any[]
    who_can_applies: any[]
    upcoming_course_dates: any[]
  }
  
  export interface ServiceDetailCms {
    id: number
    what_we_do_title: string
    who_can_apply_title: any
    service_offered_title: string
    service_offered_subtitle: string
    location_we_cover_title: any
    location_we_cover_subtitle: any
    enquiry_title: string
    enquiry_subtitle: string
    testimonial_title: string
    courses_offered_title: any
    branch_location_title: string
    upcoming_course_date_title: any
    upcoming_course_date_subtitle: any
    brochure_title: string
    brochure_subtitle: string
    quality_section_title: string
    quality_image_title: string
    rating: string
    service_performance_title: string
    service_performance_subtitle: string
    last_inspection_date: string
    apply_section_img_one_value: any
    apply_section_img_one_alt_text_value: any
    apply_section_img_two_value: any
    apply_section_img_two_alt_text_value: any
    apply_section_logo_value: any
    apply_section_logo_alt_text_value: any
    brochure_value: string
    quality_image_value: string
    quality_image_alt_text_value: string
  }
  
  export interface WhatWeDo {
    id: number
    title: string
    description: string
  }
  
  export interface ServiceOffer {
    id: number
    title: string
    description: string
    image_value: string
    image_alt_text_value: string
  }
  
  export interface BranchLocation {
    id: number
    name: string
    address: string
    phone_number_one: string
    phone_number_two: string
    map_link: string
    icon_value: string
    icon_alt_text_value: string
  }
  
  export interface ServiceTestimonial {
    id: number
    name: string
    location: string
    comment: string
    rating: string
    image_value: string
    image_alt_text_value: string
  }
  