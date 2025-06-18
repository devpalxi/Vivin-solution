"use client";
import { useState } from "react";

export default function TeamMemberForm({
  onSubmit,
  initialData = {},
  submitText = "Save",
}: {
  onSubmit: (formData: FormData) => void;
  initialData?: any;
  submitText?: string;
}) {
  const [name, setName] = useState(initialData.name || "");
  const [role, setRole] = useState(initialData.role || "");
  const [bio, setBio] = useState(initialData.bio || "");
  const [imagePreview, setImagePreview] = useState(initialData.image || "");
  const [error, setError] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(initialData.image || "");
  }

  return (
    <form
      action={onSubmit}
      className="space-y-4 bg-white p-6 rounded shadow max-w-xl mx-auto"
    >
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Role</label>
        <input
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Bio (optional)</label>
        <textarea
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Image (optional)</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full border px-3 py-2 rounded"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 max-h-32 rounded"
          />
        )}
        {/* Keep the existing image URL for edit */}
        {initialData.image && (
          <input
            type="hidden"
            name="existing_image"
            value={initialData.image}
          />
        )}
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        className="px-4 py-2 bg-accent1 text-white rounded hover:bg-accent1/90"
      >
        {submitText}
      </button>
    </form>
  );
}
