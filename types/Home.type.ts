export interface HomeData {
    sliders: Slider[]
    home_cms: HomeCms
    work_steps: WorkStep[]
    mass_care_features: MassCareFeature[]
    trusted_institutions: TrustedInstitution[]
    testimonials: Testimonial[]
    accreditations: Accreditation[]
    services: Service2[]
    blogs: Blog[]
  }
  
  export interface Slider {
    id: number
    pre_title: string
    title: string
    description: string
    action_type: string
    action_title: string
    action_url: string
    is_default: number
    image_value: string
    image_mobile_value: string
    image_alt_text_value: string
    service: Service | null
  }
  
  export interface Service {
    id: number
    title: string
    image_value: string
    detail_image_value: string
    image_alt_text_value: string
  }
  
  export interface HomeCms {
    id: number
    title: string
    sub_title: string
    description: string
    mission_title: string
    mission_description: string
    vision_title: string
    vision_description: string
    how_it_works_title: string
    how_it_works_subtitle: string
    why_choose_title: string
    why_choose_subtitle: string
    uk_institution_title: string
    testimonial_title: string
    accreditation_title: string
    service_title: string
    career_pathway_title: string
    career_pathway_subtitle: string
    career_pathway_description: string
    career_pathway_points: string
    quick_connect_title: string
    quick_connect_subtitle: string
    news_and_events_title: string
    image_value: string
    image_alt_text_value: string
    career_pathway_image_value: string
    career_pathway_image_alt_text_value: string
  }
  
  export interface WorkStep {
    id: number
    title: string
    image_value: string
    image_alt_text_value: string
  }
  
  export interface MassCareFeature {
    id: number
    title: string
    subtitle: string
    icon_value: string
    icon_alt_text_value: string
  }
  
  export interface TrustedInstitution {
    id: number
    icon_value: string
    icon_alt_text_value: any
  }
  
  export interface Testimonial {
    id: number
    name: string
    place: string
    description: string
    rating: string
    image_value: string
    image_alt_text_value: string
    testimonial_category?: TestimonialCategory
  }
  
  export interface TestimonialCategory {
    id: number
    title: string
  }
  
  export interface Accreditation {
    id: number
    icon_value: string
    icon_alt_text_value: any
  }
  
  export interface Service2 {
    id: number
    title: string
    slug: string
    subtitle: string
    features: string[]
    image_value: string
    image_alt_text_value: string
  }
  
  export interface Blog {
    id: number
    title: string
    slug: string
    short_content: string
    published_on: string
    image_value: string
    image_alt_text_value: string
  }
  