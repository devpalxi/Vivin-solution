"use client";
import { useRef, useState } from "react";

export default function CaseStudyForm({
  onSubmit,
  initialData = {},
  submitText = "Save",
}: {
  onSubmit: (formData: FormData) => void;
  initialData?: any;
  submitText?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState(initialData.title || "");
  const [slug, setSlug] = useState(initialData.slug || "");
  const [imagePreview, setImagePreview] = useState(initialData.image_url || "");
  const [tags, setTags] = useState((initialData.tags || []).join(", "));
  const [services, setServices] = useState(
    initialData.services && initialData.services.length > 0
      ? initialData.services
      : [""]
  );
  const [results, setResults] = useState(
    initialData.results && initialData.results.length > 0
      ? initialData.results
      : [{ stat: "", description: "" }]
  );

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);
    setSlug(
      value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    );
  }

  function handleServiceChange(idx: number, value: string) {
    setServices((prev: string[]) => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });
  }
  function handleAddService() {
    setServices((prev: string[]) => [...prev, ""]);
  }
  function handleRemoveService(idx: number) {
    setServices((prev: string[]) => prev.filter((_, i) => i !== idx));
  }

  return (
    <form
      ref={formRef}
      action={onSubmit}
      className="space-y-4 bg-white p-6 rounded shadow max-w-xl mx-auto"
    >
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Slug</label>
        <input
          name="slug"
          value={slug}
          readOnly
          tabIndex={-1}
          className="w-full border px-3 py-2 rounded bg-gray-100"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Summary</label>
        <textarea
          name="summary"
          defaultValue={initialData.summary || ""}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Challenge</label>
        <textarea
          name="challenge"
          defaultValue={initialData.challenge || ""}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Approach</label>
        <textarea
          name="approach"
          defaultValue={initialData.approach || ""}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Solution</label>
        <textarea
          name="solution"
          defaultValue={initialData.solution || ""}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImagePreview(URL.createObjectURL(file));
          }}
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-xs rounded"
            />
          </div>
        )}
        {/* Keep the existing image URL for edit */}
        {initialData.image_url && (
          <input
            type="hidden"
            name="existing_image_url"
            value={initialData.image_url}
          />
        )}
      </div>
      <div>
        <label className="block font-medium mb-1">Tags</label>
        <input
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Comma separated, e.g. marketing, seo, web"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Services</label>
        {services.map((service: string, idx: number) => (
          <div key={idx} className="flex items-center mb-2">
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder={`Service ${idx + 1}`}
              value={service}
              onChange={(e) => handleServiceChange(idx, e.target.value)}
              name={`service_${idx}`}
            />
            <button
              type="button"
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => handleRemoveService(idx)}
              disabled={services.length === 1}
              tabIndex={-1}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          onClick={handleAddService}
        >
          Add Service
        </button>
        {/* Hidden field to serialize for server action */}
        <input
          type="hidden"
          name="services_serialized"
          value={JSON.stringify(
            services.filter((s: string) => s.trim() !== "")
          )}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Results</label>
        {results.map(
          (result: { stat: string; description: string }, idx: number) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Stat (e.g. 45%)"
                className="border px-2 py-1 rounded w-1/4"
                value={result.stat}
                onChange={(e) => {
                  const updated = [...results];
                  updated[idx].stat = e.target.value;
                  setResults(updated);
                }}
                name={`result_stat_${idx}`}
              />
              <input
                type="text"
                placeholder="Description"
                className="border px-2 py-1 rounded w-3/4"
                value={result.description}
                onChange={(e) => {
                  const updated = [...results];
                  updated[idx].description = e.target.value;
                  setResults(updated);
                }}
                name={`result_description_${idx}`}
              />
              <button
                type="button"
                onClick={() =>
                  setResults(
                    results.filter((_: unknown, i: number) => i !== idx)
                  )
                }
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                disabled={results.length === 1}
              >
                Remove
              </button>
            </div>
          )
        )}
        <button
          type="button"
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          onClick={() =>
            setResults([...results, { stat: "", description: "" }])
          }
        >
          Add Result
        </button>
      </div>
      <div>
        <label className="block font-medium mb-1">Testimonial Quote</label>
        <textarea
          name="testimonial_quote"
          defaultValue={initialData.testimonial?.quote || ""}
          className="w-full border px-3 py-2 rounded"
          placeholder="Testimonial quote"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Testimonial Author</label>
        <input
          name="testimonial_author"
          defaultValue={initialData.testimonial?.author || ""}
          className="w-full border px-3 py-2 rounded"
          placeholder="Author name"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Testimonial Role</label>
        <input
          name="testimonial_role"
          defaultValue={initialData.testimonial?.role || ""}
          className="w-full border px-3 py-2 rounded"
          placeholder="Author role"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Testimonial Company</label>
        <input
          name="testimonial_company"
          defaultValue={initialData.testimonial?.company || ""}
          className="w-full border px-3 py-2 rounded"
          placeholder="Author company"
        />
      </div>
      {/* Hidden fields to serialize results for server action */}
      <input type="hidden" name="services_serialized" value={services} />
      <input
        type="hidden"
        name="results_serialized"
        value={JSON.stringify(results)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
}
