"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getBlogPosts() {
  const supabase = createServerSupabaseClient();

  const { data: posts, error: postsError } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      authors (*)
    `
    )
    .order("date", { ascending: false });

  if (postsError) {
    console.error("Error fetching blog posts:", postsError);
    return [];
  }

  return posts.map((post) => ({
    ...post,
    author: post.authors,
  }));
}

export async function getBlogPost(slug: string) {
  const supabase = createServerSupabaseClient();

  const { data: post, error: postError } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      authors (*)
    `
    )
    .eq("slug", slug)
    .single();

  if (postError) {
    console.error(`Error fetching blog post ${slug}:`, postError);
    return null;
  }

  return {
    ...post,
    author: post.authors,
  };
}

export async function createBlogPost(post: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date?: string;
  cover_image?: string | null;
  category: string;
  reading_time?: number | null;
  author_id?: string | null;
}) {
  const supabase = createServerSupabaseClient();

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("blog_posts")
    .insert([
      {
        ...post,
        date: post.date || now,
        cover_image: post.cover_image ?? null,
        reading_time: post.reading_time ?? null,
        author_id: post.author_id ?? null,
        created_at: now,
        updated_at: now,
      },
    ])
    .select();

  if (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }

  revalidatePath("/blog");
  return { success: true, data };
}

export async function updateBlogPost(
  id: string,
  updates: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    date?: string;
    cover_image?: string | null;
    category?: string;
    reading_time?: number | null;
    author_id?: string | null;
  }
) {
  const supabase = createServerSupabaseClient();

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      ...updates,
      cover_image: updates.cover_image ?? null,
      reading_time: updates.reading_time ?? null,
      author_id: updates.author_id ?? null,
      updated_at: now,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error(`Error updating blog post ${id}:`, error);
    return { success: false, error };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${updates.slug || ""}`);
  return { success: true, data };
}

export async function deleteBlogPost(id: string) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting blog post ${id}:`, error);
    return { success: false, error };
  }

  revalidatePath("/blog");
  return { success: true };
}

export async function getAuthors() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching authors:", error);
    return [];
  }

  return data;
}

export async function createAuthor(author: {
  name: string;
  avatar?: string | null;
  bio?: string;
}) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("authors")
    .insert([author])
    .select();

  if (error) {
    console.error("Error creating author:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function deleteAuthor(id: string) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.from("authors").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting author ${id}:`, error);
    return { success: false, error };
  }

  // Optionally revalidate any relevant paths
  revalidatePath("/admin/blog/authors");
  return { success: true };
}

export async function getAuthor(id: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching author:", error);
    return null;
  }
  return data;
}

export async function updateAuthor(
  id: string,
  updates: { name?: string; avatar?: string | null; bio?: string }
) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("authors")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) {
    console.error("Error updating author:", error);
    return { success: false, error };
  }
  return { success: true, data };
}
