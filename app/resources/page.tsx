import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/page-header";
import { ResourceCard } from "@/components/cards/resource-card";
import { getResources } from "@/lib/resources";
import NewsletterSignup from "@/components/sections/newsletter-signup";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Download free guides, templates, and resources to help grow your business.",
};

export default function ResourcesPage() {
  const resources = getResources();

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Free Resources"
        subtitle="Download free guides, templates, and resources to help grow your business"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {resources.map((resource, index) => (
          <ResourceCard key={index} resource={resource} />
        ))}
      </div>

      <div className="mt-20 bg-gray-50 p-8 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get Exclusive Resources</h2>
            <p className="text-lg mb-4">
              Subscribe to our newsletter to receive exclusive resources, tips,
              and insights directly to your inbox.
            </p>
            <NewsletterSignup />
          </div>
          <div className="relative h-[300px]">
            <Image
              src="/images/resources/Newsletter_resources.jpg"
              alt="Newsletter resources"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
