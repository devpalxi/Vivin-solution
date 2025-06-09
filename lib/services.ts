import type { ServiceCategory, SubServiceCategory, Service } from "./types";

export function getServices(): ServiceCategory[] {
  return [
    {
      title: "Digital Development",
      slug: "digital-development",
      description:
        "Custom web and mobile solutions designed to enhance your digital presence and user experience.",
      icon: "Code",
      subCategories: [],
      services: [
        {
          name: "Web Design & Development",
          slug: "web-design-development",
          description:
            "Custom websites built with modern technologies for optimal performance and user experience.",
          longDescription:
            "Our web design and development services create stunning, functional websites that drive results. We combine beautiful aesthetics with technical excellence to deliver responsive, fast-loading sites that convert visitors into customers.",
        },
        {
          name: "App Design & Development",
          slug: "app-design-development",
          description:
            "Native and cross-platform mobile applications for iOS and Android devices.",
          longDescription:
            "We build powerful, intuitive mobile applications that solve real problems for your users. From concept to launch, our team handles every aspect of app development, ensuring a seamless experience across all devices and platforms.",
        },
        {
          name: "Software Development",
          slug: "software-development",
          description:
            "Custom software solutions tailored to your specific business needs and workflows.",
          longDescription:
            "Our software development team creates custom solutions that automate processes, improve efficiency, and solve complex business challenges. We build scalable, secure software that grows with your business and adapts to changing needs.",
        },
        {
          name: "Chatbot Development",
          slug: "chatbot-development",
          description:
            "Intelligent chatbots to enhance customer service and streamline communication.",
          longDescription:
            "Our chatbot solutions provide 24/7 customer support, qualify leads, and streamline internal processes. We develop AI-powered conversational interfaces that understand user intent and deliver personalized responses.",
        },
        {
          name: "Website Maintenance & Management",
          slug: "website-maintenance-management",
          description:
            "Ongoing support and maintenance to keep your website secure, up-to-date, and performing optimally.",
          longDescription:
            "Our website maintenance services ensure your site remains secure, fast, and up-to-date. We handle everything from security updates and backups to performance optimization and content updates, allowing you to focus on your business.",
        },
      ],
    },
    {
      title: "Marketing Solutions",
      slug: "marketing-solutions",
      description:
        "Strategic marketing services to increase brand awareness, generate leads, and drive conversions.",
      icon: "BarChart",
      subCategories: [
        {
          title: "Performance Marketing",
          slug: "performance-marketing",
          description:
            "Comprehensive strategies to drive measurable results and maximize your marketing ROI.",
          services: [
            {
              name: "Digital Marketing",
              slug: "digital-marketing",
              description:
                "Comprehensive digital marketing strategies to grow your online presence and drive results.",
              longDescription:
                "Our digital marketing services combine multiple channels and tactics to create a cohesive strategy that drives awareness, engagement, and conversions. We focus on measurable results and continuous optimization.",
            },
            {
              name: "Content Marketing",
              slug: "content-marketing",
              description:
                "High-quality content creation and distribution to attract and retain your target audience.",
              longDescription:
                "Our content marketing services help you create valuable, relevant content that attracts and engages your target audience. From blog posts and ebooks to videos and infographics, we develop content that builds authority and drives conversions.",
            },
            {
              name: "Email Marketing",
              slug: "email-marketing",
              description:
                "Personalized email campaigns to nurture leads and maintain customer relationships.",
              longDescription:
                "Our email marketing services help you build relationships with prospects and customers through personalized, targeted campaigns. We handle everything from list management and segmentation to campaign creation and performance analysis.",
            },
            {
              name: "LinkedIn Marketing",
              slug: "linkedin-marketing",
              description:
                "B2B marketing strategies leveraging LinkedIn to reach decision-makers and generate leads.",
              longDescription:
                "Our LinkedIn marketing services help B2B companies connect with decision-makers, establish thought leadership, and generate high-quality leads. We develop content strategies, optimize profiles, and manage targeted campaigns.",
            },
            {
              name: "E-Commerce Marketing",
              slug: "ecommerce-marketing",
              description:
                "Specialized marketing strategies to drive traffic and sales for online stores.",
              longDescription:
                "Our e-commerce marketing services help online retailers increase traffic, improve conversion rates, and boost sales. We implement strategies across multiple channels to attract shoppers and optimize the customer journey.",
            },
            {
              name: "Amazon Marketing",
              slug: "amazon-marketing",
              description:
                "Specialized strategies to optimize your Amazon listings and increase sales.",
              longDescription:
                "Our Amazon marketing services help sellers improve visibility, increase conversions, and grow sales on the world's largest marketplace. We optimize listings, manage advertising campaigns, and implement strategies to improve rankings.",
            },
            {
              name: "Social Media Management",
              slug: "social-media-management",
              description:
                "Strategic social media campaigns to build brand awareness and engage with your audience.",
              longDescription:
                "Our social media management services help you build a strong presence across relevant platforms. We develop content strategies, create engaging posts, manage communities, and analyze performance to continuously improve results.",
            },
            {
              name: "Conversion Rate Optimization",
              slug: "conversion-rate-optimization",
              description:
                "Data-driven strategies to improve website conversion rates and maximize ROI.",
              longDescription:
                "Our conversion rate optimization services help you turn more visitors into customers. We analyze user behavior, identify barriers to conversion, and implement data-driven improvements to increase your website's effectiveness.",
            },
          ],
        },
        {
          title: "Product Launch Marketing",
          slug: "product-launch-marketing",
          description:
            "Strategic approaches to ensure successful product introductions and market adoption.",
          services: [
            {
              name: "Prelaunch Marketing",
              slug: "prelaunch-marketing",
              description:
                "Build anticipation and gather early adopters before your product launch.",
              longDescription:
                "Our prelaunch marketing services help you build anticipation and gather a list of interested prospects before your product is available. We create buzz, collect feedback, and prepare the market for a successful launch.",
            },
            {
              name: "Launch Strategy Development",
              slug: "launch-strategy-development",
              description:
                "Comprehensive launch strategies to ensure a successful product introduction.",
              longDescription:
                "Our launch strategy development services create a roadmap for a successful product introduction. We identify target audiences, develop messaging, plan promotional activities, and establish metrics to measure success.",
            },
            {
              name: "Influencer & Partnership Marketing",
              slug: "influencer-partnership-marketing",
              description:
                "Leverage influencers and strategic partnerships to amplify your product launch.",
              longDescription:
                "Our influencer and partnership marketing services help you leverage external relationships to amplify your reach. We identify and engage with relevant influencers and potential partners to extend your message to new audiences.",
            },
            {
              name: "Digital Launch Marketing",
              slug: "digital-launch-marketing",
              description:
                "Multi-channel digital strategies to maximize the impact of your product launch.",
              longDescription:
                "Our digital launch marketing services ensure your product launch reaches the right audiences across multiple online channels. We coordinate content, advertising, email, and social media to create a cohesive launch campaign.",
            },
          ],
        },
        {
          title: "Search Engine Optimization (SEO)",
          slug: "search-engine-optimization",
          description:
            "Improve your visibility in search engines and drive organic traffic to your website.",
          services: [
            {
              name: "Global SEO",
              slug: "global-seo",
              description:
                "Optimize your website for international search visibility and traffic.",
              longDescription:
                "Our global SEO services help businesses reach international audiences through search engines. We implement strategies that account for language differences, regional search behaviors, and international competition.",
            },
            {
              name: "Local SEO",
              slug: "local-seo",
              description:
                "Improve your visibility in local search results to attract nearby customers.",
              longDescription:
                "Our local SEO services help businesses attract customers in specific geographic areas. We optimize Google Business Profiles, manage local citations, and implement strategies to improve visibility in local search results.",
            },
            {
              name: "On-Page SEO",
              slug: "on-page-seo",
              description:
                "Optimize your website content and structure to improve search engine rankings.",
              longDescription:
                "Our on-page SEO services optimize individual pages to rank higher in search results. We improve content quality, keyword usage, meta tags, internal linking, and other on-page factors that influence rankings.",
            },
            {
              name: "Technical SEO",
              slug: "technical-seo",
              description:
                "Resolve technical issues that may be preventing your website from ranking well.",
              longDescription:
                "Our technical SEO services address the behind-the-scenes factors that impact search performance. We improve site speed, mobile-friendliness, indexability, and other technical aspects that affect how search engines crawl and rank your site.",
            },
            {
              name: "Off-Page SEO",
              slug: "off-page-seo",
              description:
                "Build high-quality backlinks and improve your website's authority and reputation.",
              longDescription:
                "Our off-page SEO services build your site's authority through high-quality backlinks and other external signals. We develop strategies to earn links from reputable websites and improve your online reputation.",
            },
            {
              name: "E-commerce SEO",
              slug: "ecommerce-seo",
              description:
                "Specialized SEO strategies for online stores to increase product visibility and sales.",
              longDescription:
                "Our e-commerce SEO services help online retailers improve product visibility and drive more sales through organic search. We optimize product pages, category structures, and technical elements specific to e-commerce platforms.",
            },
          ],
        },
        {
          title: "Paid Ads and PPC",
          slug: "paid-ads-ppc",
          description:
            "Targeted paid advertising campaigns to reach your ideal customers and drive conversions.",
          services: [
            {
              name: "Facebook Ads",
              slug: "facebook-ads",
              description:
                "Targeted advertising on Facebook to reach your ideal customers.",
              longDescription:
                "Our Facebook Ads services help you reach your ideal customers with highly targeted campaigns. We develop ad creative, set up precise audience targeting, and continuously optimize for maximum return on ad spend.",
            },
            {
              name: "Google Ads",
              slug: "google-ads",
              description:
                "Pay-per-click advertising on Google to drive immediate traffic and conversions.",
              longDescription:
                "Our Google Ads services help you capture high-intent traffic from search results. We develop keyword strategies, create compelling ad copy, and optimize campaigns to maximize conversions while controlling costs.",
            },
            {
              name: "LinkedIn Ads",
              slug: "linkedin-ads",
              description:
                "B2B advertising on LinkedIn to reach decision-makers and generate leads.",
              longDescription:
                "Our LinkedIn Ads services help B2B companies reach decision-makers with precision targeting. We create campaigns that generate high-quality leads by targeting specific job titles, industries, company sizes, and other professional criteria.",
            },
            {
              name: "YouTube Ads",
              slug: "youtube-ads",
              description:
                "Video advertising on YouTube to increase brand awareness and engagement.",
              longDescription:
                "Our YouTube Ads services help you leverage the power of video to reach your target audience. We develop video ad strategies, create compelling content, and implement targeting to maximize views, engagement, and conversions.",
            },
          ],
        },
      ],
      services: [],
    },
    {
      title: "Sales Growth Solutions",
      slug: "sales-growth",
      description:
        "Strategies and solutions to optimize your sales process, increase conversions, and boost revenue.",
      icon: "TrendingUp",
      subCategories: [],
      services: [
        {
          name: "Sales Appointment Booking",
          slug: "sales-appointment-booking",
          description:
            "Proactive outreach to schedule qualified sales appointments with potential clients.",
          longDescription:
            "Our sales appointment booking services help you fill your calendar with qualified prospects. We handle the time-consuming process of prospecting and scheduling, allowing your sales team to focus on what they do best: closing deals.",
        },
        {
          name: "Lead Generation",
          slug: "lead-generation",
          description:
            "Targeted campaigns to attract high-quality leads for your business.",
          longDescription:
            "Our lead generation services help you attract and capture high-quality prospects. We implement multi-channel strategies to identify potential customers who are actively interested in your products or services.",
        },
        {
          name: "Brand Management",
          slug: "brand-management",
          description:
            "Comprehensive brand management to build and maintain a strong, consistent brand identity.",
          longDescription:
            "Our brand management services help you build and maintain a strong, consistent brand identity. We develop brand guidelines, monitor brand perception, and ensure consistent messaging across all customer touchpoints.",
        },
        {
          name: "Bookkeeping",
          slug: "bookkeeping",
          description:
            "Accurate financial record-keeping to support informed business decisions.",
          longDescription:
            "Our bookkeeping services provide accurate financial record-keeping to support informed business decisions. We handle transaction recording, reconciliation, financial reporting, and other essential accounting tasks to keep your finances organized.",
        },
      ],
    },
    {
      title: "Visual Content",
      slug: "visual-content",
      description:
        "Compelling visual content to enhance your brand identity and engage your audience.",
      icon: "ImageIcon",
      subCategories: [],
      services: [
        {
          name: "Graphic Design",
          slug: "graphic-design",
          description:
            "Custom graphics for marketing materials, social media, and other visual assets.",
          longDescription:
            "Our graphic design services create visually compelling assets that communicate your message effectively. From logos and brand identity to marketing materials and social media graphics, we deliver designs that capture attention and reinforce your brand.",
        },
        {
          name: "Video Production",
          slug: "video-production",
          description:
            "High-quality video content for marketing, training, and social media.",
          longDescription:
            "Our video production services create engaging content that tells your story and drives action. From concept development and scriptwriting to filming and post-production, we deliver professional videos that achieve your business objectives.",
        },
        {
          name: "Drone Video Production",
          slug: "drone-video-production",
          description:
            "Aerial videography to capture stunning footage for your marketing campaigns.",
          longDescription:
            "Our drone video production services capture stunning aerial footage that adds a unique perspective to your visual content. We create breathtaking shots for real estate, events, construction projects, and marketing campaigns.",
        },
      ],
    },
    {
      title: "Business Consulting",
      slug: "business-consulting",
      description:
        "Expert guidance to help you optimize operations, increase efficiency, and achieve your business goals.",
      icon: "Briefcase",
      subCategories: [],
      services: [
        {
          name: "Small Business Consulting",
          slug: "small-business-consulting",
          description:
            "Strategic guidance tailored to the unique challenges of small businesses.",
          longDescription:
            "Our small business consulting services provide strategic guidance tailored to the unique challenges of small businesses. We help you develop growth strategies, improve operations, and make informed decisions to achieve your business goals.",
        },
        {
          name: "Start-Up Consulting",
          slug: "startup-consulting",
          description:
            "Expert advice to help startups launch successfully and scale effectively.",
          longDescription:
            "Our startup consulting services help new ventures launch successfully and scale effectively. We provide guidance on business models, funding strategies, market entry, and operational setup to increase your chances of success.",
        },
        {
          name: "Tech Procurement Consulting",
          slug: "tech-procurement-consulting",
          description:
            "Guidance on selecting and implementing the right technology solutions for your business.",
          longDescription:
            "Our tech procurement consulting services help you select and implement the right technology solutions for your business. We assess your needs, evaluate options, negotiate with vendors, and oversee implementation to ensure successful technology adoption.",
        },
        {
          name: "E-Commerce Consulting",
          slug: "ecommerce-consulting",
          description:
            "Strategic advice to optimize your e-commerce operations and increase sales.",
          longDescription:
            "Our e-commerce consulting services help online retailers optimize operations and increase sales. We provide guidance on platform selection, user experience, inventory management, fulfillment, and growth strategies specific to e-commerce businesses.",
        },
      ],
    },
    {
      title: "AI Solutions",
      slug: "ai-solutions",
      description:
        "Cutting-edge AI technologies to automate processes, gain insights, and drive innovation.",
      icon: "Cpu",
      subCategories: [],
      services: [
        {
          name: "AI-Enhanced CRM Systems",
          slug: "ai-enhanced-crm-systems",
          description:
            "Leverage AI to improve customer relationship management and sales processes.",
          longDescription:
            "Our AI-enhanced CRM systems help you leverage artificial intelligence to improve customer relationship management. We implement solutions that automate data entry, provide predictive insights, and enhance customer interactions.",
        },
        {
          name: "Programmatic Advertising",
          slug: "programmatic-advertising",
          description:
            "AI-driven advertising that automatically optimizes targeting and bidding.",
          longDescription:
            "Our programmatic advertising services use AI to automatically optimize ad targeting and bidding. We implement systems that analyze data in real-time to make intelligent decisions about where, when, and how much to bid for ad placements.",
        },
        {
          name: "Customer Insights and Segmentation",
          slug: "customer-insights-segmentation",
          description:
            "AI-powered analysis to better understand your customers and their behaviors.",
          longDescription:
            "Our customer insights and segmentation services use AI to analyze customer data and identify meaningful patterns. We help you understand customer behaviors, preferences, and needs to create more effective marketing and product strategies.",
        },
        {
          name: "Predictive Analytics",
          slug: "predictive-analytics",
          description:
            "Use AI to forecast trends, customer behavior, and business outcomes.",
          longDescription:
            "Our predictive analytics services use AI to forecast future trends, customer behavior, and business outcomes. We develop models that analyze historical data to make accurate predictions that inform strategic decision-making.",
        },
        {
          name: "AI-Based Market Research",
          slug: "ai-based-market-research",
          description:
            "Leverage AI to gather and analyze market data for better business decisions.",
          longDescription:
            "Our AI-based market research services help you gather and analyze market data more efficiently. We use artificial intelligence to process large datasets, identify trends, and extract actionable insights about your market and competitors.",
        },
      ],
    },
  ];
}

export function getServiceCategory(slug: string): ServiceCategory | undefined {
  return getServices().find((service) => service.slug === slug);
}

export function getSubServiceCategory(
  categorySlug: string,
  subCategorySlug: string
): SubServiceCategory | undefined {
  const category = getServiceCategory(categorySlug);
  if (!category || !category.subCategories) return undefined;
  return category.subCategories.find(
    (subCategory) => subCategory.slug === subCategorySlug
  );
}

export function getService(
  categorySlug: string,
  serviceSlug: string
): Service | undefined {
  const category = getServiceCategory(categorySlug);
  if (!category) return undefined;

  // Check in main services
  if (category.services) {
    const mainService = category.services.find(
      (service) => service.slug === serviceSlug
    );
    if (mainService) return mainService;
  }

  // Check in subcategories
  if (category.subCategories) {
    for (const subCategory of category.subCategories) {
      if (subCategory.services) {
        const service = subCategory.services.find(
          (service) => service.slug === serviceSlug
        );
        if (service) return service;
      }
    }
  }

  return undefined;
}

export function getAllServices(): { categorySlug: string; service: Service }[] {
  const allServices: { categorySlug: string; service: Service }[] = [];

  const services = getServices();

  services.forEach((category) => {
    // Add main services
    if (category.services) {
      category.services.forEach((service) => {
        allServices.push({ categorySlug: category.slug, service });
      });
    }

    // Add services from subcategories
    if (category.subCategories) {
      category.subCategories.forEach((subCategory) => {
        if (subCategory.services) {
          subCategory.services.forEach((service) => {
            allServices.push({ categorySlug: category.slug, service });
          });
        }
      });
    }
  });

  return allServices;
}
