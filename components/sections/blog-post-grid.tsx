"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BlogPostCard } from "@/components/cards/blog-post-card";
import type { BlogPost } from "@/lib/types";

interface BlogPostGridProps {
  posts: BlogPost[];
}

export function BlogPostGrid({ posts }: BlogPostGridProps) {
  const [filter, setFilter] = useState("all");

  // Get unique categories from blog posts
  const categories = ["all", ...new Set(posts.map((post) => post.category))];

  // Filter blog posts based on selected category
  const filteredPosts =
    filter === "all" ? posts : posts.filter((post) => post.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            layout
          >
            <BlogPostCard post={post} />
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-text-light">
            No blog posts found for this category.
          </p>
        </div>
      )}
    </div>
  );
}
