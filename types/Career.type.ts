export interface CareerDataType {
    banner: Banner
    career_cms: CareerCms
    departments: Department[]
    locations: Location[]
    values: Value[]
    process: Process[]
    faqs: Faq[]
}

export interface Banner {
    id: number
    banner_title: string
    banner_description: string
}

export interface CareerCms {
    id: number
    section1_title: string
    section2_title: string
    section2_description: string
    section3_title: string
    section3_description: string
    section4_title: string
    section4_description: string
}

export interface Department {
    id: number
    title: string
}

export interface Location {
    id: number
    name: string
}

export interface Value {
    id: number
    title: string
    description: string
}

export interface Process {
    id: number
    title: string
    description: string
}

export interface Faq {
    id: number
    question: string
    answer: string
}