import { getContactSubmissions } from "@/app/actions/contact";
import Link from "next/link";

export default async function ContactSubmissionsPage() {
  const submissions = await getContactSubmissions();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Contact Submissions</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Subject</th>
              <th className="px-6 py-3 text-left">Message</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id}>
                <td className="px-6 py-4">{s.name}</td>
                <td className="px-6 py-4">{s.email}</td>
                <td className="px-6 py-4">{s.phone}</td>
                <td className="px-6 py-4">{s.subject}</td>
                <td className="px-6 py-4">{s.message}</td>
                <td className="px-6 py-4">
                  {new Date(s.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No submissions found.
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
