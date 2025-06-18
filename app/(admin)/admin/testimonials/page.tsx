import Link from "next/link";
import { getTestimonials, deleteTestimonial } from "@/app/actions/testimonials";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="bg-accent1 text-white px-4 py-2 rounded hover:bg-accent1/90"
        >
          + Add Testimonial
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Company</th>
              <th className="px-6 py-3 text-left">Quote</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id}>
                <td className="px-6 py-4">{t.name}</td>
                <td className="px-6 py-4">{t.role}</td>
                <td className="px-6 py-4">{t.company}</td>
                <td className="px-6 py-4">{t.quote}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/testimonials/${t.id}/edit`}
                    className="text-accent1 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteTestimonial(t.id);
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
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No testimonials found.
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
