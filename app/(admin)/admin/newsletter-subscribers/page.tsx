import { getNewsletterSubscribers } from "@/app/actions/contact";
import Link from "next/link";

export default async function NewsletterSubscribersPage() {
  const subscribers = await getNewsletterSubscribers();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Newsletter Subscribers</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Date Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.id}>
                <td className="px-6 py-4">{s.email}</td>
                <td className="px-6 py-4">
                  {new Date(s.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                  No subscribers found.
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
