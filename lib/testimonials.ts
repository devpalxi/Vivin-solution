import type { Testimonial } from "./types";

export function getTestimonials(): Testimonial[] {
  return [
    {
      name: "Sarah Thompson",
      role: "E-commerce Director",
      company: "Fashion Forward",
      quote:
        "The team at Vivin Digital transformed our online store into a sales machine. The new design not only looks great but has significantly improved our bottom line.",
      avatar: "/images/testimonials/sarah-thompson.jpg",
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Director",
      company: "SoftSolutions Inc.",
      quote:
        "The SEO results we've seen have been nothing short of remarkable. Our website is now a lead generation machine, bringing in qualified prospects every day.",
      avatar: "/images/testimonials/michael-rodriguez.jpg",
    },
    {
      name: "Jessica Lee",
      role: "Brand Manager",
      company: "NaturalGoods",
      quote:
        "Vivin Digital helped us build a social media presence from scratch. Their strategic approach and creative content have made us a recognizable brand in our category.",
      avatar: "/images/testimonials/jessica-lee.jpg",
    },
    {
      name: "David Chen",
      role: "Customer Experience Director",
      company: "TeleCorp",
      quote:
        "The AI solution developed by Vivin Digital has transformed our customer service operations. Our customers are happier, and our team can focus on solving complex issues.",
      avatar: "/images/testimonials/david-chen.jpg",
    },
  ];
}
