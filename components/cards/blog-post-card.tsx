"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock } from "lucide-react"
import type { BlogPost } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
        whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-48">
          <Image
            src={post.coverImage || "/placeholder.svg?height=400&width=600"}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-3">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{post.category}</span>
          </div>
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
          <div className="flex items-center text-gray-500 text-sm gap-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
