export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      service_categories: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          // icon: string | null
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          // icon?: string | null
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          // icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      subcategories: {
        Row: {
          id: string;
          category_id: string;
          title: string;
          slug: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          title: string;
          slug: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          category_id: string;
          subcategory_id: string | null;
          name: string;
          slug: string;
          description: string;
          tagline: string | null;
          paragraph1: string | null;
          paragraph2: string | null;
          paragraph3: string | null;
          approaches: string[] | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          subcategory_id?: string | null;
          name: string;
          slug: string;
          description: string;
          tagline?: string | null;
          paragraph1?: string | null;
          paragraph2?: string | null;
          paragraph3?: string | null;
          approaches?: string[] | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          subcategory_id?: string | null;
          name?: string;
          slug?: string;
          description?: string;
          tagline?: string | null;
          paragraph1?: string | null;
          paragraph2?: string | null;
          paragraph3?: string | null;
          approaches?: string[] | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      case_studies: {
        Row: {
          id: string;
          title: string;
          slug: string;
          summary: string;
          challenge: string | null;
          approach: string | null;
          solution: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          summary: string;
          challenge?: string | null;
          approach?: string | null;
          solution?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          summary?: string;
          challenge?: string | null;
          approach?: string | null;
          solution?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      case_study_tags: {
        Row: {
          id: string;
          case_study_id: string;
          tag: string;
        };
        Insert: {
          id?: string;
          case_study_id: string;
          tag: string;
        };
        Update: {
          id?: string;
          case_study_id?: string;
          tag?: string;
        };
      };
      case_study_services: {
        Row: {
          id: string;
          case_study_id: string;
          service: string;
        };
        Insert: {
          id?: string;
          case_study_id: string;
          service: string;
        };
        Update: {
          id?: string;
          case_study_id?: string;
          service?: string;
        };
      };
      case_study_results: {
        Row: {
          id: string;
          case_study_id: string;
          stat: string;
          description: string;
        };
        Insert: {
          id?: string;
          case_study_id: string;
          stat: string;
          description: string;
        };
        Update: {
          id?: string;
          case_study_id?: string;
          stat?: string;
          description?: string;
        };
      };
      case_study_testimonials: {
        Row: {
          id: string;
          case_study_id: string;
          quote: string;
          author: string;
          role: string | null;
          company: string | null;
        };
        Insert: {
          id?: string;
          case_study_id: string;
          quote: string;
          author: string;
          role?: string | null;
          company?: string | null;
        };
        Update: {
          id?: string;
          case_study_id?: string;
          quote?: string;
          author?: string;
          role?: string | null;
          company?: string | null;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          date: string;
          cover_image: string | null;
          category: string;
          reading_time: number | null;
          author_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          date?: string;
          cover_image?: string | null;
          category: string;
          reading_time?: number | null;
          author_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          date?: string;
          cover_image?: string | null;
          category?: string;
          reading_time?: number | null;
          author_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      authors: {
        Row: {
          id: string;
          name: string;
          avatar: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          avatar?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          avatar?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          bio: string | null;
          image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          bio?: string | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          bio?: string | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string | null;
          company: string | null;
          quote: string;
          avatar: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role?: string | null;
          company?: string | null;
          quote: string;
          avatar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string | null;
          company?: string | null;
          quote?: string;
          avatar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          name: string;
          logo: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      resources: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: string;
          image: string | null;
          file_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          type: string;
          image?: string | null;
          file_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          type?: string;
          image?: string | null;
          file_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string;
          message?: string;
          created_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
