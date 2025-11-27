export interface NewsAndInsightsData {
  banner: Banner;
  blog_cms: BlogCms;
  blog_categories: BlogCategory[];
}

export interface Banner {
  id: number;
  banner_title: string;
  banner_description: any;
}

export interface BlogCms {
  id: number;
  title: string;
  description: string;
}

export interface BlogCategory {
  id: number;
  title: string;
  slug: string;
}

export interface BlogCard {
  id: number;
  title: string;
  short_content: string;
  published_on: string;
  image_value: string;
  image_alt_text_value: string;
  slug: string;
}

export interface BlogDetail {
    id: number
    title: string
    content: string
    published_on: string
    banner_title: string
    banner_description: string
    meta_title: string
    meta_description: string
    meta_keywords: any
    other_meta_tags: any
    related_blogs_list: RelatedBlogsList[]
    image_value: string
    image_alt_text_value: string
  }
  
  export interface RelatedBlogsList {
    id: number
    title: string
    slug: string
    short_content: string
    published_on: string
    image_value: string
    image_alt_text_value: string
  }
  
