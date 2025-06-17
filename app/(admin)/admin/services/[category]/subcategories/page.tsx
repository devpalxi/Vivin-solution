import Link from "next/link";
import { getServiceCategory, getSubcategories } from "@/app/actions/services";
import { SubcategoryActions } from "./SubcategoryActions";

type Subcategory = {
  id: string;
  title: string;
  slug: string;
  description?: string;
};

export default async function ManageSubcategoriesPage({
  params,
}: {
  params: { category: string };
}) {
  const category = await getServiceCategory(params.category);
  if (!category) {
    return <div className="p-8 text-red-600">Category not found.</div>;
  }
  const subcategories: Subcategory[] = await getSubcategories(category.id);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Subcategories in{" "}
          <span className="text-accent1">{category.title}</span>
        </h1>
        <Link
          href={`/admin/services/${params.category}/subcategories/new`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add New Subcategory
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subcategories.map((subcategory) => (
              <tr key={subcategory.id}>
                <td className="px-6 py-4 whitespace-wrap">
                  {subcategory.title}
                </td>
                <td className="px-6 py-4 whitespace-wrap">
                  {subcategory.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <SubcategoryActions
                    subcategoryId={subcategory.id}
                    categorySlug={params.category}
                    subcategorySlug={subcategory.slug}
                  />
                </td>
              </tr>
            ))}
            {subcategories.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No subcategories found for this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <Link href={`/admin/services`} className="text-accent1 hover:underline">
          ← Back to Categories
        </Link>
      </div>
    </div>
  );
}
