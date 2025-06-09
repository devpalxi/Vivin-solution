"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getServiceCategory,
  getSubcategories,
  createService,
} from "@/app/actions/services";
import { supabaseClient } from "@/lib/supabaseClient";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

async function uploadServiceImage(file: File): Promise<string | null> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const { error } = await supabaseClient.storage
    .from("service-images")
    .upload(fileName, file);

  if (error) {
    return null;
  }
  const { data: urlData } = supabaseClient.storage
    .from("service-images")
    .getPublicUrl(fileName);
  return urlData?.publicUrl || null;
}

export default function AddServicePage() {
  const router = useRouter();
  const params = useParams();
  const categorySlug = params.category as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [tagline, setTagline] = useState("");
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [paragraph3, setParagraph3] = useState("");
  const [approaches, setApproaches] = useState<string[]>([""]);
  const [subcategories, setSubcategories] = useState<
    { id: string; title: string }[]
  >([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchSubcategories() {
      const category = await getServiceCategory(categorySlug);
      if (!category) return;
      const subs = await getSubcategories(category.id);
      setSubcategories(subs || []);
      if (subs && subs.length > 0) setSelectedSubcategory(subs[0].id);
    }
    fetchSubcategories();
  }, [categorySlug]);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setName(value);
    setSlug(generateSlug(value));
  }

  function handleApproachChange(index: number, value: string) {
    setApproaches((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }

  function handleAddApproach() {
    setApproaches((prev) => [...prev, ""]);
  }

  function handleRemoveApproach(index: number) {
    setApproaches((prev) => prev.filter((_, i) => i !== index));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const category = await getServiceCategory(categorySlug);
    if (!category) {
      setError("Category not found.");
      setLoading(false);
      return;
    }

    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadServiceImage(imageFile);
      if (!imageUrl) {
        setLoading(false);
        return;
      }
    }

    const result = await createService({
      name,
      slug,
      description,
      tagline,
      paragraph1,
      paragraph2,
      paragraph3,
      approaches: approaches.filter((a) => a.trim() !== ""),
      category_id: category.id,
      subcategory_id: subcategories.length > 0 ? selectedSubcategory : null,
      image_url: imageUrl, // <-- add this
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error.message || "Failed to create service.");
    } else {
      router.push(`/admin/services/${categorySlug}/services`);
      router.refresh();
    }
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Add New Service</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        {subcategories.length > 0 && (
          <div>
            <label className="block font-medium mb-1">Subcategory</label>
            <select
              name="subcategory"
              className="w-full border px-3 py-2 rounded"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              required
            >
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.title}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            name="name"
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Service Name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            name="slug"
            required
            className="w-full border px-3 py-2 rounded bg-gray-100"
            placeholder="service_slug"
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
        <div>
          <label className="block font-medium mb-1">Tagline</label>
          <input
            name="tagline"
            className="w-full border px-3 py-2 rounded"
            placeholder="Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">1st Paragraph</label>
          <textarea
            name="paragraph1"
            className="w-full border px-3 py-2 rounded"
            placeholder="First paragraph"
            value={paragraph1}
            onChange={(e) => setParagraph1(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">2nd Paragraph</label>
          <textarea
            name="paragraph2"
            className="w-full border px-3 py-2 rounded"
            placeholder="Second paragraph"
            value={paragraph2}
            onChange={(e) => setParagraph2(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">3rd Paragraph</label>
          <textarea
            name="paragraph3"
            className="w-full border px-3 py-2 rounded"
            placeholder="Third paragraph"
            value={paragraph3}
            onChange={(e) => setParagraph3(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Approaches</label>
          {approaches.map((approach, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                placeholder={`Approach ${idx + 1}`}
                value={approach}
                onChange={(e) => handleApproachChange(idx, e.target.value)}
              />
              <button
                type="button"
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleRemoveApproach(idx)}
                disabled={approaches.length === 1}
                tabIndex={-1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            onClick={handleAddApproach}
          >
            Add Approach
          </button>
        </div>
        <div>
          <label className="block font-medium mb-1">Service Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border px-3 py-2 rounded"
            onChange={handleImageChange}
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>
    </div>
  );
}
