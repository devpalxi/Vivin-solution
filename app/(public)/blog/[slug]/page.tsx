import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { getBlogPost } from "@/app/actions/blog";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Map DB fields to camelCase for metadata
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author?.name ?? ""],
      images: [
        {
          url: post.cover_image || "/images/blog-default.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover_image || "/images/blog-default.jpg"],
    },
  };
}

export async function generateStaticParams() {
  // You can use getBlogPosts here if you want to statically generate all posts
  // const posts = await getBlogPosts()
  // return posts.map((post) => ({ slug: post.slug }))
  return [];
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return <div className="container mx-auto px-4 py-12">Post not found</div>;
  }

  // Map DB fields to camelCase for rendering
  const camelPost = {
    ...post,
    coverImage: post.cover_image,
    readingTime: post.reading_time,
    author: post.author
      ? {
          name: post.author.name,
          avatar: post.author.avatar,
          bio: post.author.bio,
        }
      : { name: "", avatar: "", bio: "" },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center text-accent1 mb-8 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
      </Link>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{camelPost.title}</h1>
          <p className="text-xl text-text-light mb-6">{camelPost.excerpt}</p>

          <div className="flex flex-wrap items-center text-text-light gap-6 mb-8">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>{camelPost.author.name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{formatDate(camelPost.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{camelPost.readingTime} min read</span>
            </div>
          </div>

          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={
                camelPost.coverImage || "/placeholder.svg?height=800&width=1600"
              }
              alt={camelPost.title}
              fill
              className="object-cover"
            />
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: camelPost.content }} />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
              <Image
                src={
                  camelPost.author.avatar ||
                  "/placeholder.svg?height=100&width=100"
                }
                alt={camelPost.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{camelPost.author.name}</h3>
              <p className="text-text-light">{camelPost.author.bio}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
