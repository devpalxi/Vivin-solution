import Link from "next/link";
import { getCaseStudies, deleteCaseStudy } from "@/app/actions/case-studies";

export default async function AdminCaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Case Studies</h1>
        <Link
          href="/admin/case-studies/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Case Study
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Summary</th>
              <th className="px-6 py-3 text-left">Created</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {caseStudies.map((cs: any) => (
              <tr key={cs.id}>
                <td className="px-6 py-4">{cs.title}</td>
                <td className="px-6 py-4">{cs.summary}</td>
                <td className="px-6 py-4">{cs.created_at?.slice(0, 10)}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/case-studies/${cs.slug}/edit`}
                    className="text-accent1 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <form
                    action={async (formData) => {
                      "use server";
                      await deleteCaseStudy(cs.id);
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
            {caseStudies.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No case studies found.
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
