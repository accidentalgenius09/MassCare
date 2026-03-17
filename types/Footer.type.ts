export interface FooterData {
    site_settings: SiteSettings
    policies: Policy[]
    social_links: SocialLink[]
    footer_cms: FooterCms
    accreditations: Accreditation[]
  }
  
  export interface SiteSettings {
    id: number
    address: string
    email: string
    phone_number: string
    whatsapp_number: string
    map_link: string
  }
  
  export interface Policy {
    id: number
    title: string
    slug: string
  }
  
  export interface SocialLink {
    id: number
    name: string
    url: string
    icon_value: string
  }
  
  export interface FooterCms {
    id: number
    image_value: string
    image_alt_text_value: string
  }
  
  export interface Accreditation {
    id: number
    icon_value: string
    icon_alt_text_value?: string
  }
  