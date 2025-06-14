import type { Metadata } from "next";
import PageHeader from "@/components/ui/page-header";
import { CaseStudyGrid } from "@/components/sections/case-study-grid";
import { getCaseStudies } from "@/app/actions/case-studies"; // <-- use the DB function

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our portfolio of successful client projects and case studies across various industries.",
};

export default async function PortfolioPage() {
  const caseStudies = await getCaseStudies(); // <-- await the async DB call

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Our Portfolio"
        subtitle="Explore our work and see how we've helped businesses achieve their goals"
      />

      <CaseStudyGrid caseStudies={caseStudies} />
    </div>
  );
}
