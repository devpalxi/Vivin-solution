import Link from "next/link";
import { getResources, deleteResource } from "@/app/actions/resources";

export default async function AdminResourcesPage() {
  const resources = await getResources();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Resources</h1>
        <Link
          href="/admin/resources/new"
          className="bg-accent1 text-white px-4 py-2 rounded hover:bg-accent1/90"
        >
          + Add Resource
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">File</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id}>
                <td className="px-6 py-4">{resource.title}</td>
                <td className="px-6 py-4">{resource.type}</td>
                <td className="px-6 py-4">
                  {resource.file_url ? (
                    <a
                      href={resource.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent1 underline"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="text-gray-400">No file</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/resources/${resource.id}/edit`}
                    className="text-accent1 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteResource(resource.id);
                    }}
                    style={{ display: "inline" }}
                  >
                    <button
                      type="submit"
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {resources.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No resources found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <Link href="/admin" className="text-accent1 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
