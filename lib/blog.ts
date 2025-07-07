import type { BlogPost } from "./types";

export function getAllPosts(): BlogPost[] {
  return [
    {
      title: "10 SEO Strategies That Actually Work in 2023",
      slug: "seo-strategies-2023",
      excerpt:
        "Discover the most effective SEO strategies that are driving real results in 2023, backed by data and case studies.",
      content: "<p>This is the full content of the blog post...</p>",
      date: "2023-05-15",
      coverImage: "/placeholder.svg?height=600&width=1200",
      category: "seo",
      readingTime: 8,
      author: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "SEO Specialist with 10+ years of experience in digital marketing.",
      },
    },
    {
      title: "The Complete Guide to Content Marketing for B2B Companies",
      slug: "b2b-content-marketing-guide",
      excerpt:
        "Learn how to create a content marketing strategy that generates leads and builds authority for your B2B business.",
      content: "<p>This is the full content of the blog post...</p>",
      date: "2023-04-22",
      coverImage: "/placeholder.svg?height=600&width=1200",
      category: "content",
      readingTime: 12,
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Content Marketing Director and founder of Vivin Digital.",
      },
    },
    {
      title: "How AI is Transforming Digital Marketing in 2023",
      slug: "ai-digital-marketing-2023",
      excerpt:
        "Explore how artificial intelligence is revolutionizing digital marketing and how businesses can leverage it for better results.",
      content: "<p>This is the full content of the blog post...</p>",
      date: "2023-03-10",
      coverImage: "/placeholder.svg?height=600&width=1200",
      category: "ai",
      readingTime: 10,
      author: {
        name: "James Wilson",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Technical Director specializing in AI and machine learning applications.",
      },
    },
    {
      title: "Social Media Trends to Watch in 2023",
      slug: "social-media-trends-2023",
      excerpt:
        "Stay ahead of the curve with these emerging social media trends that are shaping the digital landscape in 2023.",
      content: "<p>This is the full content of the blog post...</p>",
      date: "2023-02-18",
      coverImage: "/placeholder.svg?height=600&width=1200",
      category: "social",
      readingTime: 7,
      author: {
        name: "Priya Patel",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Head of Digital Strategy with expertise in social media marketing.",
      },
    },
    {
      title: "E-commerce Optimization: Boosting Your Conversion Rate",
      slug: "ecommerce-conversion-optimization",
      excerpt:
        "Practical tips and strategies to optimize your e-commerce store and increase your conversion rate.",
      content: "<p>This is the full content of the blog post...</p>",
      date: "2023-01-25",
      coverImage: "/placeholder.svg?height=600&width=1200",
      category: "ecommerce",
      readingTime: 9,
      author: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "SEO Specialist with 10+ years of experience in digital marketing.",
      },
    },
    {
      title: "The Future of Web Development: Trends to Watch",
      slug: "future-web-development-trends",
      excerpt:
        "Explore the emerging technologies and methodologies that are shaping the future of web development.",
      content: "<p>This is the full content of the blog post...</p>",
      date: "2022-12-12",
      coverImage: "/placeholder.svg?height=600&width=1200",
      category: "development",
      readingTime: 11,
      author: {
        name: "James Wilson",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Technical Director specializing in AI and machine learning applications.",
      },
    },
  ];
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
