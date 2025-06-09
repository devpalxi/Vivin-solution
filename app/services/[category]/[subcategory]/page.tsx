import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/page-header";
import {
  getServiceCategory,
  getSubcategories,
  getServices,
} from "@/app/actions/services";

export async function generateMetadata({
  params,
}: {
  params: { category: string; subcategory: string };
}): Promise<Metadata> {
  const category = await getServiceCategory(params.category);
  if (!category) {
    return { title: "Subcategory Not Found" };
  }
  const subcategories = await getSubcategories(category.id);
  const subCategory = subcategories.find(
    (sub: any) => sub.slug === params.subcategory
  );
  if (!subCategory) {
    return { title: "Subcategory Not Found" };
  }
  return {
    title: subCategory.title,
    description:
      subCategory.description ||
      `Explore our ${subCategory.title.toLowerCase()} services and solutions.`,
  };
}

export default async function SubCategoryPage({
  params,
}: {
  params: { category: string; subcategory: string };
}) {
  const category = await getServiceCategory(params.category);
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12">Subcategory not found</div>
    );
  }
  const subcategories = await getSubcategories(category.id);
  const subCategory = subcategories.find(
    (sub: any) => sub.slug === params.subcategory
  );
  if (!subCategory) {
    return (
      <div className="container mx-auto px-4 py-12">Subcategory not found</div>
    );
  }

  // Fetch services for this subcategory
  const services = await getServices(category.id, subCategory.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href={`/services/${params.category}`}
        className="inline-flex items-center text-blue-600 mb-8 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to {category.title}
      </Link>

      <PageHeader
        title={subCategory.title}
        subtitle={
          subCategory.description ||
          `Explore our comprehensive ${subCategory.title.toLowerCase()} services and solutions.`
        }
      />

      <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-xl mb-12">
        <Image
          src={`/placeholder.svg?height=600&width=1200&text=${encodeURIComponent(
            subCategory.title
          )}`}
          alt={subCategory.title}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />
      </div>

      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0 ? (
            services.map((service: any) => (
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
            ))
          ) : (
            <div className="text-gray-500 col-span-full text-center">
              No services found for this subcategory.
            </div>
          )}
        </div>
      </div>

      <div className="mt-20 bg-blue-50 p-8 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Ready to get started with {subCategory.title}?
            </h2>
            <p className="text-lg">
              Schedule a free consultation with our experts.
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
