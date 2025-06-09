export interface ServiceCategory {
  title: string
  slug: string
  description: string
  icon: any // This would be a LucideIcon in actual implementation
  subCategories: SubServiceCategory[]
  services: Service[]
}

export interface SubServiceCategory {
  title: string
  slug: string
  description?: string
  services: Service[]
}

export interface Service {
  name: string
  slug: string
  description: string
  longDescription: string
}

export interface CaseStudy {
  title: string
  slug: string
  summary: string
  challenge: string
  approach: string
  solution: string
  image: string
  tags: string[]
  services: string[]
  results: {
    stat: string
    description: string
  }[]
  testimonial?: {
    quote: string
    author: string
    role: string
    company: string
  }
}

export interface BlogPost {
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  coverImage: string
  category: string
  readingTime: number
  author: {
    name: string
    avatar: string
    bio: string
  }
}

export interface Resource {
  title: string
  description: string
  type: string
  image: string
  fileUrl: string
}

export interface Client {
  name: string
  logo: string
}

export interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  avatar: string
}
