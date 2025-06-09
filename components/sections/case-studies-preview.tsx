"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { getCaseStudies } from "@/lib/case-studies";

export default function CaseStudiesPreview() {
  const caseStudies = getCaseStudies().slice(0, 3); // Get only the first 3 case studies

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Case Studies
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            See how we've helped businesses like yours achieve remarkable
            results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <CaseStudyCard caseStudy={caseStudy} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-blue-600 font-medium hover:underline"
          >
            View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
