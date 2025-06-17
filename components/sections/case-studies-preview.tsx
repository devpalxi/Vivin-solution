import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { getCaseStudies } from "@/app/actions/case-studies";
import { AnimatedCard, AnimatedHeading } from "./case-studies-preview-client";

export default async function CaseStudiesPreview() {
  // Fetch from database and limit to 3 items
  const caseStudies = await getCaseStudies();
  const featuredCaseStudies = caseStudies.slice(0, 3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedHeading>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Case Studies
          </h2>
          <p className="text-xl text-text-light max-w-4xl mx-auto">
            See how we've helped businesses like yours achieve remarkable
            results
          </p>
        </AnimatedHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCaseStudies.map((caseStudy, index) => (
            <AnimatedCard key={caseStudy.id} index={index}>
              <CaseStudyCard caseStudy={caseStudy} />
            </AnimatedCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-accent1 font-medium hover:underline"
          >
            View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
