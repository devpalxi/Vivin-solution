import type { Resource } from "./types";

export function getResources(): Resource[] {
  return [
    {
      title: "The Ultimate SEO Checklist for 2023",
      description:
        "A comprehensive checklist to ensure your website is fully optimized for search engines in 2023.",
      type: "Checklist",
      image: "/images/resources/seo_checklist.png",
      fileUrl: "#",
    },
    {
      title: "Social Media Content Calendar Template",
      description:
        "A ready-to-use template to plan and organize your social media content strategy.",
      type: "Template",
      image: "/images/resources/Social_media_content.png",
      fileUrl: "#",
    },
    {
      title: "The Complete Guide to Digital Marketing",
      description:
        "An in-depth guide covering all aspects of digital marketing for businesses of all sizes.",
      type: "E-book",
      image: "/images/resources/Complete_Guide_to_Digital_Marketing.png",
      fileUrl: "#",
    },
    {
      title: "Website Performance Optimization Guide",
      description:
        "Learn how to improve your website speed and performance for better user experience and SEO.",
      type: "Guide",
      image: "/images/resources/Website_Performance_Optimization.png",
      fileUrl: "#",
    },
    {
      title: "Email Marketing Campaign Planner",
      description:
        "A comprehensive planner to help you create effective email marketing campaigns.",
      type: "Template",
      image: "/images/resources/Email_Marketing_Campaign.jpg",
      fileUrl: "#",
    },
    {
      title: "AI in Business: Implementation Strategies",
      description:
        "A practical guide to implementing AI solutions in your business operations.",
      type: "Whitepaper",
      image: "/images/resources/AI_in_Business.jpg",
      fileUrl: "#",
    },
  ];
}
