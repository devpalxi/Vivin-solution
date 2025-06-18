"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="px-4 py-2 bg-accent1 text-white rounded hover:bg-accent1/90"
      disabled={pending}
    >
      {pending ? "Uploading..." : text}
    </button>
  );
}

export default function ResourceForm({
  onSubmit,
  initialData = {},
  submitText = "Save",
}: {
  onSubmit: (formData: FormData) => void;
  initialData?: any;
  submitText?: string;
}) {
  const [imagePreview, setImagePreview] = useState(initialData.image || "");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState(""); // Add this new state variable

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(initialData.image || "");
  }

  // Replace your existing function with this version
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 8) {
        setFileError("File too large (max 8MB)");
        e.target.value = "";
        return;
      }
      setFileName(file.name);
      setFileError("");
    } else {
      setFileName("");
    }
  }

  return (
    <form
      action={onSubmit}
      className="space-y-4 bg-white p-6 rounded shadow max-w-xl mx-auto"
    >
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          name="title"
          defaultValue={initialData.title || ""}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          defaultValue={initialData.description || ""}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Type</label>
        <input
          name="type"
          defaultValue={initialData.type || ""}
          required
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
        {initialData.image && (
          <input
            type="hidden"
            name="existing_image"
            value={initialData.image}
          />
        )}
      </div>
      <div>
        <label className="block font-medium mb-1">File (PDF, etc.)</label>
        <input
          type="file"
          name="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.jpg,.png"
          className="w-full border px-3 py-2 rounded"
          onChange={handleFileChange}
        />
        {fileError && (
          <div className="mt-1 text-red-500 text-sm">{fileError}</div>
        )}
        {fileName && <div className="mt-2 text-sm">{fileName}</div>}
        {initialData.file_url && (
          <input
            type="hidden"
            name="existing_file_url"
            value={initialData.file_url}
          />
        )}
      </div>

      <SubmitButton text={submitText} />
    </form>
  );
}
