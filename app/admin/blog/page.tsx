import Link from "next/link";
import { getBlogPosts, deleteBlogPost } from "@/app/actions/blog";

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await deleteBlogPost(id);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        <div className="flex gap-4">
          <Link
            href="/admin/blog/authors"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Authors
          </Link>
          <Link
            href="/admin/blog/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Post
          </Link>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: any) => (
              <tr key={post.id}>
                <td className="px-6 py-4">{post.title}</td>
                <td className="px-6 py-4">{post.category}</td>
                <td className="px-6 py-4">{post.date?.slice(0, 10)}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/blog/${post.slug}/edit`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <form action={handleDelete} style={{ display: "inline" }}>
                    <input type="hidden" name="id" value={post.id} />
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
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No blog posts found.
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
