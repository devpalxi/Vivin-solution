"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getResources() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching resources:", error);
    return [];
  }

  return data;
}

export async function createResource(resource: {
  title: string;
  description: string;
  type: string;
  image?: string | null;
  file_url?: string | null;
}) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("resources")
    .insert([resource])
    .select();

  if (error) {
    console.error("Error creating resource:", error);
    return { success: false, error };
  }

  revalidatePath("/resources");
  return { success: true, data };
}

export async function updateResource(
  id: string,
  updates: {
    title?: string;
    description?: string;
    type?: string;
    image?: string | null;
    file_url?: string | null;
  }
) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("resources")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select();

  if (error) {
    console.error(`Error updating resource ${id}:`, error);
    return { success: false, error };
  }

  revalidatePath("/resources");
  return { success: true, data };
}

export async function deleteResource(id: string) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.from("resources").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting resource ${id}:`, error);
    return { success: false, error };
  }

  revalidatePath("/resources");
  return { success: true };
}

export async function uploadResourceImage(file: File): Promise<string | null> {
  const supabase = createServerSupabaseClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `resource-image-${Date.now()}.${fileExt}`;
  const { error } = await supabase.storage
    .from("resource-images")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }
  const { data: urlData } = supabase.storage
    .from("resource-images")
    .getPublicUrl(fileName);
  return urlData?.publicUrl || null;
}

export async function uploadResourceFile(file: File): Promise<string | null> {
  try {
    const supabase = createServerSupabaseClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `resource-file-${Date.now()}.${fileExt}`;

    // Check file size before upload
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 8) {
      // Adjust limit as needed
      console.error(`File too large: ${fileSizeInMB.toFixed(2)}MB`);
      return null;
    }

    const { error } = await supabase.storage
      .from("resource-files")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) {
      console.error("Error uploading file:", error);
      return null;
    }
    const { data: urlData } = supabase.storage
      .from("resource-files")
      .getPublicUrl(fileName);
    return urlData?.publicUrl || null;
  } catch (error) {
    console.error("Exception during file upload:", error);
    return null;
  }
}
