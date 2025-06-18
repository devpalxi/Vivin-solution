"use client";
import { useState } from "react";

export default function ClientForm({
  onSubmit,
  initialData = {},
  submitText = "Save",
}: {
  onSubmit: (formData: FormData) => void;
  initialData?: any;
  submitText?: string;
}) {
  const [logoPreview, setLogoPreview] = useState(initialData.logo || "");

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
    else setLogoPreview(initialData.logo || "");
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
        <label className="block font-medium mb-1">Logo (optional)</label>
        <input
          type="file"
          name="logo"
          accept="image/*"
          className="w-full border px-3 py-2 rounded"
          onChange={handleLogoChange}
        />
        {logoPreview && (
          <img
            src={logoPreview}
            alt="Logo Preview"
            className="mt-2 max-h-20 rounded bg-gray-100"
          />
        )}
        {initialData.logo && (
          <input type="hidden" name="existing_logo" value={initialData.logo} />
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
