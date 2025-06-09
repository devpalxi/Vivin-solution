import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/page-header";
import {
  getServiceCategory,
  getSubcategories,
  getServices,
} from "@/app/actions/services";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category = await getServiceCategory(params.category);

  if (!category) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = await getServiceCategory(params.category);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12">Service not found</div>
    );
  }

  const subCategories = await getSubcategories(category.id);
  let services: any[] = [];
  if (subCategories.length === 0) {
    services = await getServices(category.id);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader title={category.title} subtitle={category.description} />

      <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-xl mb-12">
        <Image
          src={`/placeholder.svg?height=600&width=1200&text=${encodeURIComponent(
            category.title
          )}`}
          alt={category.title}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />
      </div>

      {/* If there are subcategories, display them */}
      {subCategories.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Our {category.title} Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {subCategories.map((subCategory: any) => (
              <div
                key={subCategory.id}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="relative h-[150px] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=${encodeURIComponent(
                      subCategory.title
                    )}`}
                    alt={subCategory.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">{subCategory.title}</h3>
                <p className="text-gray-600 mb-4">
                  {subCategory.description ||
                    `Explore our ${subCategory.title.toLowerCase()} services and solutions.`}
                </p>
                <Link
                  href={`/services/${category.slug}/${subCategory.slug}`}
                  className="text-blue-600 hover:underline flex items-center"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : services.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">{category.title} Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="relative h-[150px] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=${encodeURIComponent(
                      service.name
                    )}`}
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  href={`/services/${category.slug}/service/${service.slug}`}
                  className="text-blue-600 hover:underline flex items-center"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-center mt-12">
          No subcategories or services found for this category.
        </div>
      )}

      <div className="mt-20 bg-blue-50 p-8 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
            <p className="text-lg">
              Schedule a free consultation with our{" "}
              {category.title.toLowerCase()} experts.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
