import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/cards/service-card";
import { getServiceCategoriesWithCounts } from "@/app/actions/services";

// Define IconName type or import it if exported
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

export default async function ServicesPreview() {
  // Fetch categories with counts and first service slug
  const categories = await getServiceCategoriesWithCounts();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Comprehensive solutions tailored to help your business grow and
            succeed in the digital landscape
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
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

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center text-blue-600 font-medium hover:underline"
          >
            View All Services <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
