"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAuthor, updateAuthor } from "@/app/actions/blog";
import { supabaseClient } from "@/lib/supabaseClient";

export default function EditAuthorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState(""); // For preview and URL
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAuthor() {
      setLoading(true);
      const author = await getAuthor(id);
      if (author) {
        setName(author.name);
        setAvatar(author.avatar || "");
        setBio(author.bio || "");
      }
      setLoading(false);
    }
    fetchAuthor();
  }, [id]);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  async function uploadAvatar(file: File): Promise<string | null> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error } = await supabaseClient.storage
      .from("author-avatars")
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

    const result = await updateAuthor(id, {
      name,
      avatar: avatarUrl || null,
      bio,
    });
    if (result?.error) {
      setError(result.error.message || "Failed to update author.");
    } else {
      router.push("/admin/blog/authors");
      router.refresh();
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Author</h1>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}
