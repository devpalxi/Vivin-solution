import Link from "next/link";
import { getServiceCategories } from "@/app/actions/services";
import { CategoryActions } from "./CategoryActions";

type Category = {
  id: string;
  title: string;
  slug: string;
};

export default async function AdminServicesPage() {
  let categories: Category[] = [];
  try {
    categories = await getServiceCategories();
  } catch (error) {
    // You can handle error here if needed
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Services</h1>
        <Link
          href="/admin/services/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Category
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Services
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-wrap">
                  <div className="text-sm font-medium text-gray-900">
                    {category.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-wrap">
                  <div className="text-sm text-gray-500">{category.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-wrap">
                  <Link
                    href={`/admin/services/${category.slug}/subcategories`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Manage Subcategories
                  </Link>

                  {" | "}
                  <Link
                    href={`/admin/services/${category.slug}/services`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Manage Services
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-wrap text-sm font-medium">
                  <CategoryActions
                    categoryId={category.id}
                    categorySlug={category.slug}
                  />
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No service categories found. Create your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <Link href="/admin" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
