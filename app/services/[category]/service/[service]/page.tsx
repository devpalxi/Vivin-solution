import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import PageHeader from "@/components/ui/page-header";
import { getService, getServiceCategory } from "@/app/actions/services";

export async function generateMetadata({
  params,
}: {
  params: { category: string; service: string };
}): Promise<Metadata> {
  const service = await getService(params.category, params.service);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.name,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: { category: string; service: string };
}) {
  const serviceData = await getService(params.category, params.service);
  const category = await getServiceCategory(params.category);

  if (!serviceData || !category) {
    return (
      <div className="container mx-auto px-4 py-12">Service not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/services"
        className="inline-flex items-center text-blue-600 mb-8 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Services
      </Link>

      <PageHeader title={serviceData.name} subtitle={serviceData.description} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <div>
          <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-xl mb-6">
            <Image
              src={
                serviceData.image_url ||
                `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(
                  serviceData.name
                )}`
              }
              alt={serviceData.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <p className="text-lg mb-6">{serviceData.paragraph1}</p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get a Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div>
          <p className="text-lg mb-5">{serviceData.paragraph2}</p>
          <p className="text-lg mb-8">{serviceData.paragraph3}</p>

          <div className="bg-gray-50 p-8 rounded-2xl ">
            <h2 className="text-2xl font-bold mb-6">Our Approach</h2>
            <ul className="space-y-4">
              {Array.isArray(serviceData.approaches) &&
              serviceData.approaches.length > 0 ? (
                serviceData.approaches.map((approach: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <p>{approach}</p>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">
                  No approaches listed for this service.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">
              How long does it take to see results?
            </h3>
            <p>
              While some improvements can be seen within weeks, significant
              results typically take 3-6 months depending on your industry,
              competition, and starting point.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">
              Do you offer customized packages?
            </h3>
            <p>
              Yes, all our services are tailored to your specific business needs
              and goals. We don't believe in one-size-fits-all solutions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">
              How do you measure success?
            </h3>
            <p>
              We establish clear KPIs at the beginning of our engagement and
              provide regular reports showing progress against these metrics.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">
              What makes you different from other agencies?
            </h3>
            <p>
              Our focus on measurable results, transparent communication, and
              long-term partnerships sets us apart from agencies that prioritize
              vanity metrics.
            </p>
          </div>
        </div>
      </div> */}

      <div className="mt-16 bg-blue-50 p-8 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Ready to get started with {serviceData.name}?
            </h2>
            <p className="text-lg">
              Schedule a free consultation with our experts.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
