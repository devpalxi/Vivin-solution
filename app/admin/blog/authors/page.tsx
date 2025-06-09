import Link from "next/link";
import { getAuthors, deleteAuthor } from "@/app/actions/blog";

export default async function AuthorsPage() {
  const authors = await getAuthors();

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await deleteAuthor(id);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Authors</h1>
        <div className="flex gap-4">
          {/* <Link
            href="/admin/blog"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            ← Back to Blog
          </Link> */}
          <Link
            href="/admin/blog/authors/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Author
          </Link>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Avatar</th>
              <th className="px-6 py-3 text-left">Bio</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author: any) => (
              <tr key={author.id}>
                <td className="px-6 py-4">{author.name}</td>
                <td className="px-6 py-4">
                  {author.avatar ? (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No avatar</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {author.bio || <span className="text-gray-400">No bio</span>}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/blog/authors/${author.id}/edit`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <form action={handleDelete} style={{ display: "inline" }}>
                    <input type="hidden" name="id" value={author.id} />
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
            {authors.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No authors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <Link
          href="/admin/blog"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
