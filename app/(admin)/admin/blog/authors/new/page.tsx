// filepath: c:\Users\Asus\Desktop\vivin solution\project\app\admin\blog\authors\new\page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAuthor } from "@/app/actions/blog";
import { supabaseClient } from "@/lib/supabaseClient";

export default function NewAuthorPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState(""); // For preview
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setAvatar("");
    }
  }

  async function uploadAvatar(file: File): Promise<string | null> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error } = await supabaseClient.storage
      .from("author-avatars") // or "blog-covers" for blog posts
      .upload(fileName, file);

    if (error) {
      setError("Image upload failed: " + error.message);
      return null;
    }
    const { data: urlData } = supabaseClient.storage
      .from("author-avatars")
      .getPublicUrl(fileName);
    return urlData?.publicUrl || null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let avatarUrl = avatar;

    if (avatarFile) {
      const uploadedUrl = await uploadAvatar(avatarFile);
      if (!uploadedUrl) return;
      avatarUrl = uploadedUrl;
    }

    // Use avatarUrl in your createAuthor or createBlogPost call
    const result = await createAuthor({
      name,
      avatar: avatarUrl || null,
      bio,
    });
    if (result?.error) {
      setError(result.error.message || "Failed to create author.");
    } else {
      router.push("/admin/blog/authors");
      router.refresh();
    }
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Add New Author</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {/* <div>
          <label className="block font-medium mb-1">
            Avatar URL (optional)
          </label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div> */}
        <div>
          <label className="block font-medium mb-1">Bio (optional)</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Avatar Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border px-3 py-2 rounded"
            onChange={handleAvatarChange}
          />
          {avatar && (
            <img src={avatar} alt="Avatar Preview" className="mt-2 max-h-32" />
          )}
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Author
        </button>
      </form>
    </div>
  );
}
