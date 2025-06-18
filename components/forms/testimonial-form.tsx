"use client";
import { useState } from "react";

export default function TestimonialForm({
  onSubmit,
  initialData = {},
  submitText = "Save",
}: {
  onSubmit: (formData: FormData) => void;
  initialData?: any;
  submitText?: string;
}) {
  const [avatarPreview, setAvatarPreview] = useState(initialData.avatar || "");

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
    else setAvatarPreview(initialData.avatar || "");
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
          defaultValue={initialData.name || ""}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Role</label>
        <input
          name="role"
          defaultValue={initialData.role || ""}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Company</label>
        <input
          name="company"
          defaultValue={initialData.company || ""}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Quote</label>
        <textarea
          name="quote"
          defaultValue={initialData.quote || ""}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Avatar (optional)</label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          className="w-full border px-3 py-2 rounded"
          onChange={handleAvatarChange}
        />
        {avatarPreview && (
          <img
            src={avatarPreview}
            alt="Avatar Preview"
            className="mt-2 max-h-32 rounded"
          />
        )}
        {initialData.avatar && (
          <input
            type="hidden"
            name="existing_avatar"
            value={initialData.avatar}
          />
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-accent1 text-white rounded hover:bg-accent1/90"
      >
        {submitText}
      </button>
    </form>
  );
}
