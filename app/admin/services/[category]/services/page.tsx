import Link from "next/link";
import {
  getServiceCategory,
  getServices,
  getSubcategories,
} from "@/app/actions/services";
import { ServiceActions } from "./ServiceActions";

export default async function ManageServicesPage({
  params,
}: {
  params: { category: string };
}) {
  const category = await getServiceCategory(params.category);
  if (!category) {
    return <div className="p-8 text-red-600">Category not found.</div>;
  }

  const subcategories = await getSubcategories(category.id);
  const hasSubcategories = subcategories.length > 0;
  const services = await getServices(category.id, undefined, true);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Services in <span className="text-blue-700">{category.title}</span>
        </h1>
        <Link
          href={`/admin/services/${params.category}/services/new`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add New Service
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              {hasSubcategories && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subcategory
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => {
              const subcat = subcategories.find(
                (s) => s.id === service.subcategory_id
              );
              return (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-wrap">{service.name}</td>
                  <td className="px-6 py-4 whitespace-wrap">{service.slug}</td>
                  {hasSubcategories && (
                    <td className="px-6 py-4 whitespace-wrap">
                      {subcat ? subcat.title : "—"}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <ServiceActions
                      serviceId={service.id}
                      categorySlug={params.category}
                      serviceSlug={service.slug}
                    />
                  </td>
                </tr>
              );
            })}
            {services.length === 0 && (
              <tr>
                <td
                  colSpan={hasSubcategories ? 4 : 3}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No services found for this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <Link href="/admin/services" className="text-blue-600 hover:underline">
          ← Back to Categories
        </Link>
      </div>
    </div>
  );
}
