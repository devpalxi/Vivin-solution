import Link from "next/link";
import { getClients, deleteClient } from "@/app/actions/clients";

export default async function AdminClientsPage() {
  const clients = await getClients();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Clients</h1>
        <Link
          href="/admin/clients/new"
          className="bg-accent1 text-white px-4 py-2 rounded hover:bg-accent1/90"
        >
          + Add Client
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Logo</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4">
                  {client.logo && (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-10 w-auto rounded bg-gray-100"
                    />
                  )}
                </td>
                <td className="px-6 py-4">{client.name}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/clients/${client.id}/edit`}
                    className="text-accent1 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteClient(client.id);
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
            {clients.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No clients found.
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
