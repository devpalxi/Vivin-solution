import type { CaseStudy } from "./types";

export function getCaseStudies(): CaseStudy[] {
  return [
    {
      title: "E-commerce Redesign Boosts Conversion Rate",
      slug: "ecommerce-redesign",
      summary:
        "A complete redesign of an e-commerce platform resulting in a 45% increase in conversion rate and 60% increase in average order value.",
      challenge:
        "Our client, a mid-sized fashion retailer, was struggling with an outdated e-commerce platform that had a high cart abandonment rate and poor mobile experience.",
      approach:
        "We conducted extensive user research and competitive analysis to identify pain points in the customer journey. Based on our findings, we redesigned the entire shopping experience with a focus on mobile optimization and streamlined checkout process.",
      solution:
        "We developed a custom e-commerce solution with an intuitive user interface, advanced product filtering, personalized recommendations, and a simplified checkout process.",
      image: "/images/case-studies/ecommerce-redesign.jpeg",
      tags: ["e-commerce", "web development", "ui/ux design"],
      services: [
        "Website Development",
        "UI/UX Design",
        "E-commerce Solutions",
        "Conversion Rate Optimization",
        "Performance Optimization",
      ],
      results: [
        {
          stat: "45%",
          description: "Increase in conversion rate",
        },
        {
          stat: "60%",
          description: "Increase in average order value",
        },
        {
          stat: "30%",
          description: "Reduction in cart abandonment",
        },
        {
          stat: "3x",
          description: "Increase in mobile sales",
        },
      ],
      testimonial: {
        quote:
          "The team at Vivin Digital transformed our online store into a sales machine. The new design not only looks great but has significantly improved our bottom line.",
        author: "Sarah Thompson",
        role: "E-commerce Director",
        company: "Fashion Forward",
      },
    },
    {
      title: "SEO Campaign Drives Organic Traffic Growth",
      slug: "seo-campaign",
      summary:
        "A comprehensive SEO strategy that resulted in a 215% increase in organic traffic and 180% increase in lead generation for a B2B software company.",
      challenge:
        "Our client, a B2B software provider, was struggling to generate quality leads through their website due to poor search engine visibility and outdated content.",
      approach:
        "We conducted a thorough SEO audit, keyword research, and competitor analysis to develop a comprehensive strategy. This included technical SEO improvements, content optimization, and a link building campaign.",
      solution:
        "We implemented technical SEO fixes, created a content calendar focused on high-value keywords, and executed a targeted link building campaign to boost domain authority.",
      image: "/images/case-studies/seo-campaign.jpeg",
      tags: ["seo", "content marketing", "lead generation"],
      services: [
        "Search Engine Optimization (SEO)",
        "Content Marketing",
        "Technical SEO",
        "Link Building",
        "Analytics & Reporting",
      ],
      results: [
        {
          stat: "215%",
          description: "Increase in organic traffic",
        },
        {
          stat: "180%",
          description: "Increase in lead generation",
        },
        {
          stat: "#1",
          description: "Ranking for 15 target keywords",
        },
        {
          stat: "320%",
          description: "ROI on SEO investment",
        },
      ],
      testimonial: {
        quote:
          "The SEO results we've seen have been nothing short of remarkable. Our website is now a lead generation machine, bringing in qualified prospects every day.",
        author: "Michael Rodriguez",
        role: "Marketing Director",
        company: "SoftSolutions Inc.",
      },
    },
    {
      title: "Social Media Campaign Increases Brand Awareness",
      slug: "social-media-campaign",
      summary:
        "A strategic social media campaign that increased brand awareness by 75% and engagement by 120% for a consumer packaged goods company.",
      challenge:
        "Our client, a new entrant in the competitive CPG market, needed to build brand awareness and establish a strong social media presence with limited marketing budget.",
      approach:
        "We developed a social media strategy focused on creating engaging content, leveraging influencer partnerships, and implementing targeted paid social campaigns.",
      solution:
        "We created a content calendar with a mix of product features, lifestyle content, and user-generated content. We also identified and partnered with micro-influencers in the niche and ran highly targeted paid social campaigns.",
      image: "/images/case-studies/social-media-campaign.jpeg",
      tags: ["social media", "influencer marketing", "brand awareness"],
      services: [
        "Social Media Marketing",
        "Influencer Marketing",
        "Content Creation",
        "Paid Social Advertising",
        "Community Management",
      ],
      results: [
        {
          stat: "75%",
          description: "Increase in brand awareness",
        },
        {
          stat: "120%",
          description: "Increase in social engagement",
        },
        {
          stat: "45K",
          description: "New followers across platforms",
        },
        {
          stat: "35%",
          description: "Increase in website traffic from social",
        },
      ],
      testimonial: {
        quote:
          "Vivin Digital helped us build a social media presence from scratch. Their strategic approach and creative content have made us a recognizable brand in our category.",
        author: "Jessica Lee",
        role: "Brand Manager",
        company: "NaturalGoods",
      },
    },
    {
      title: "AI-Powered Customer Service Solution",
      slug: "ai-customer-service",
      summary:
        "Implementation of an AI-powered customer service solution that reduced response time by 80% and increased customer satisfaction by 40%.",
      challenge:
        "Our client, a large telecommunications company, was struggling with long customer service wait times and inconsistent quality of support, leading to customer dissatisfaction.",
      approach:
        "We analyzed the client's customer service data and identified patterns in customer inquiries. Based on this analysis, we developed an AI solution to handle common queries and support human agents.",
      solution:
        "We implemented an AI-powered chatbot for handling common customer inquiries, integrated with the existing CRM system, and provided a seamless handoff to human agents for complex issues.",
      image: "/images/case-studies/ai-customer-service.jpeg",
      tags: ["ai solutions", "customer service", "chatbot"],
      services: [
        "AI Strategy Consulting",
        "Natural Language Processing",
        "Chatbot Development",
        "CRM Integration",
        "Analytics & Reporting",
      ],
      results: [
        {
          stat: "80%",
          description: "Reduction in response time",
        },
        {
          stat: "40%",
          description: "Increase in customer satisfaction",
        },
        {
          stat: "65%",
          description: "Of inquiries resolved by AI",
        },
        {
          stat: "$2.5M",
          description: "Annual cost savings",
        },
      ],
      testimonial: {
        quote:
          "The AI solution developed by Vivin Digital has transformed our customer service operations. Our customers are happier, and our team can focus on solving complex issues.",
        author: "David Chen",
        role: "Customer Experience Director",
        company: "TeleCorp",
      },
    },
  ];
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((study) => study.slug === slug);
}
