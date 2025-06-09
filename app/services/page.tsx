import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/page-header";
import { getServiceCategoriesWithCounts } from "@/app/actions/services";
import { ServiceCard } from "@/components/cards/service-card";

// Define IconName type here or import it from service-card.tsx if exported
type IconName =
  | "Code"
  | "BarChart"
  | "TrendingUp"
  | "Megaphone"
  | "Briefcase"
  | "Cpu"
  | "TableOfContents"
  | "Search"
  | "Share2";

// Map category slugs to icons
const categoryIconMap: Record<string, IconName> = {
  marketing_solutions: "TableOfContents",
  web_development: "Code",
  content_marketing: "BarChart",
  payperclick_advertising: "Megaphone",
  seo_optimization_services: "Search",
  social_media_management: "Share2",
};

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore our comprehensive range of marketing, development, and business consulting services designed to help your business grow.",
};

export default async function ServicesPage() {
  // Use the new function
  const categories = await getServiceCategoriesWithCounts();

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our comprehensive range of services designed to meet your
          needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => {
          // If only one service and no subcategories, link directly to the service detail page
          const directToService =
            category.servicesCount === 1 &&
            category.subcategoriesCount === 0 &&
            category.firstServiceSlug;

          const href = directToService
            ? `/services/${category.slug}/service/${category.firstServiceSlug}`
            : `/services/${category.slug}`;

          return (
            <ServiceCard
              key={category.id}
              title={category.title}
              description={category.description || ""}
              icon={categoryIconMap[category.slug] || "Briefcase"}
              href={href}
            />
          );
        })}
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-6">How We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Discovery</h3>
            <p>
              We start by understanding your business, goals, and challenges to
              create a tailored strategy.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Strategy</h3>
            <p>
              Our team develops a comprehensive plan aligned with your business
              objectives.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Execution</h3>
            <p>
              We implement the strategy with precision, adapting as needed to
              maximize results.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 font-bold text-xl">4</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Optimization</h3>
            <p>
              We continuously monitor, analyze, and refine our approach to
              improve performance.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 bg-blue-50 p-8 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Ready to transform your business?
            </h2>
            <p className="text-lg">
              Schedule a free strategy session with our experts.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
