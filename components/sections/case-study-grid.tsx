"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CaseStudyCard } from "@/components/cards/case-study-card"
import type { CaseStudy } from "@/lib/types"

interface CaseStudyGridProps {
  caseStudies: CaseStudy[]
}

export function CaseStudyGrid({ caseStudies }: CaseStudyGridProps) {
  const [filter, setFilter] = useState("all")

  // Get unique categories from case studies
  const categories = ["all", ...new Set(caseStudies.flatMap((study) => study.tags))]

  // Filter case studies based on selected category
  const filteredStudies = filter === "all" ? caseStudies : caseStudies.filter((study) => study.tags.includes(filter))

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === category ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStudies.map((caseStudy, index) => (
          <motion.div
            key={caseStudy.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            layout
          >
            <CaseStudyCard caseStudy={caseStudy} />
          </motion.div>
        ))}
      </div>

      {filteredStudies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No case studies found for this category.</p>
        </div>
      )}
    </div>
  )
}
