"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createServiceCategory } from "@/app/actions/services";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

export default function AddCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);
    setSlug(generateSlug(value));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const description = formData.get("description") as string;
    // const icon = formData.get("icon") as string;

    const result = await createServiceCategory({
      title,
      slug,
      description,
      // icon,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error.message || "Failed to create category.");
    } else {
      router.push("/admin/services");
      router.refresh();
    }
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Add New Service Category</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Category Title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            name="slug"
            required
            className="w-full border px-3 py-2 rounded bg-gray-100"
            placeholder="category_slug"
            value={slug}
            readOnly
            tabIndex={-1}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            className="w-full border px-3 py-2 rounded"
            placeholder="Short description"
          />
        </div>
        {/* <div>
          <label className="block font-medium mb-1">Icon (URL or emoji)</label>
          <input
            name="icon"
            className="w-full border px-3 py-2 rounded"
            placeholder="🛠️ or https://..."
          />
        </div> */}
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}
