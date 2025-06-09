import type { Metadata } from "next";
import PageHeader from "@/components/ui/page-header";
import { BlogPostGrid } from "@/components/sections/blog-post-grid";
import { getBlogPosts } from "@/app/actions/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, tips, and industry news from our marketing and business experts.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  // Map DB fields to BlogPostGrid expected props
  const formattedPosts = posts.map((post: any) => ({
    ...post,
    coverImage: post.cover_image,
    readingTime: post.reading_time,
    author: post.author
      ? {
          name: post.author.name,
          avatar: post.author.avatar,
          bio: post.author.bio,
        }
      : null,
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Our Blog"
        subtitle="Insights, tips, and industry news from our marketing and business experts"
      />

      <BlogPostGrid posts={formattedPosts} />
    </div>
  );
}
