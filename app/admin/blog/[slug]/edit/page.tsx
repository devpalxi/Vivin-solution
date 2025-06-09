"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBlogPost, updateBlogPost, getAuthors } from "@/app/actions/blog";
import { supabaseClient } from "@/lib/supabaseClient";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [readingTime, setReadingTime] = useState<number | "">("");
  const [authorId, setAuthorId] = useState<string>("");
  const [authors, setAuthors] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [postId, setPostId] = useState<string>("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const post = await getBlogPost(slug);
      const authorsList = await getAuthors();
      setAuthors(authorsList || []);
      if (post) {
        setPostId(post.id);
        setTitle(post.title);
        setCategory(post.category);
        setExcerpt(post.excerpt);
        setContent(post.content);
        setDate(post.date?.slice(0, 10) || "");
        setCoverImage(post.cover_image || "");
        setReadingTime(post.reading_time ?? "");
        setAuthorId(post.author_id || "");
      }
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  function handleCoverImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setCoverImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCoverImage("");
    }
  }

  async function uploadCoverImage(file: File): Promise<string | null> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabaseClient.storage
      .from("blog-covers")
      .upload(fileName, file);

    if (error) {
      setError("Image upload failed");
      return null;
    }
    const { data: urlData } = supabaseClient.storage
      .from("blog-covers")
      .getPublicUrl(fileName);

    return urlData?.publicUrl || null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let imageUrl = coverImage;

    if (coverImageFile) {
      const uploadedUrl = await uploadCoverImage(coverImageFile);
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const result = await updateBlogPost(postId, {
      title,
      category,
      excerpt,
      content,
      date,
      cover_image: imageUrl || null,
      reading_time: readingTime === "" ? null : Number(readingTime),
      author_id: authorId || null,
    });
    if (result?.error) {
      setError(result.error.message || "Failed to update post.");
    } else {
      router.push("/admin/blog");
      router.refresh();
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Excerpt</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Cover Image URL</label>
          <input
            type="url"
            className="w-full border px-3 py-2 rounded"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            Reading Time (minutes)
          </label>
          <input
            type="number"
            min={1}
            className="w-full border px-3 py-2 rounded"
            value={readingTime}
            onChange={(e) =>
              setReadingTime(e.target.value ? Number(e.target.value) : "")
            }
            placeholder="e.g. 5"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Author</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          >
            <option value="">Select author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border px-3 py-2 rounded"
            onChange={handleCoverImageChange}
          />
          {coverImage && (
            <img
              src={coverImage}
              alt="Cover Preview"
              className="mt-2 max-h-32"
            />
          )}
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
