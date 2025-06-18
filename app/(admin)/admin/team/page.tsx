import Link from "next/link";
import { getTeamMembers, deleteTeamMember } from "@/app/actions/team";

export default async function AdminTeamPage() {
  const team = await getTeamMembers();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Team Members</h1>
        <Link
          href="/admin/team/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Member
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Bio</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4">{member.role}</td>
                <td className="px-6 py-4">{member.bio}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/team/${member.id}/edit`}
                    className="text-accent1 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteTeamMember(member.id);
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
            {team.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No team members found.
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
