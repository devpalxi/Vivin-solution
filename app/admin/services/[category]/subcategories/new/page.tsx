"use client";

import { useState, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { getServiceCategory, createSubcategory } from "@/app/actions/services";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

export default function AddSubcategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categorySlug = params.category as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);
    setSlug(generateSlug(value));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Fetch category to get its ID
    const category = await getServiceCategory(categorySlug);
    if (!category) {
      setError("Category not found.");
      setLoading(false);
      return;
    }

    const result = await createSubcategory({
      title,
      slug,
      description,
      category_id: category.id,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error.message || "Failed to create subcategory.");
    } else {
      router.push(`/admin/services/${categorySlug}/subcategories`);
      router.refresh();
    }
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Add New Subcategory</h1>
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
            placeholder="Subcategory Title"
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
            placeholder="subcategory_slug"
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Subcategory"}
        </button>
      </form>
    </div>
  );
}
