"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/lib/types";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Link href={`/portfolio/${caseStudy.slug}`}>
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
        whileHover={{
          y: -5,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-48">
          <Image
            src={caseStudy.image_url || "/placeholder.svg?height=400&width=600"}
            alt={caseStudy.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex flex-wrap gap-2 mb-3">
            {caseStudy.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold mb-2">{caseStudy.title}</h3>
          <p className="text-gray-600 mb-4 flex-grow">{caseStudy.summary}</p>
          <div className="flex items-center text-blue-600 font-medium">
            View Case Study <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
