"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getTeamMembers() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching team members:", error);
    return [];
  }

  return data;
}

export async function createTeamMember(member: {
  name: string;
  role: string;
  bio?: string;
  image?: File | string | null;
}) {
  const supabase = createServerSupabaseClient();

  let imageUrl: string | null = null;
  if (member.image && typeof member.image !== "string") {
    imageUrl = await uploadTeamImage(member.image);
    if (!imageUrl) {
      return { success: false, error: { message: "Image upload failed" } };
    }
  } else if (typeof member.image === "string") {
    imageUrl = member.image;
  }

  const { data, error } = await supabase
    .from("team_members")
    .insert([{ ...member, image: imageUrl }])
    .select();

  if (error) {
    console.error("Error creating team member:", error);
    return { success: false, error };
  }

  revalidatePath("/about");
  return { success: true, data };
}

export async function updateTeamMember(
  id: string,
  updates: {
    name?: string;
    role?: string;
    bio?: string;
    image?: string | null; // Only allow string or null here!
  }
) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("team_members")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select();

  if (error) {
    console.error(`Error updating team member ${id}:`, error);
    return { success: false, error };
  }

  revalidatePath("/about");
  return { success: true, data };
}

export async function deleteTeamMember(id: string) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.from("team_members").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting team member ${id}:`, error);
    return { success: false, error };
  }

  revalidatePath("/about");
  return { success: true };
}

export async function uploadTeamImage(file: File): Promise<string | null> {
  const supabase = createServerSupabaseClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const { data, error } = await supabase.storage
    .from("team-images")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }
  const { data: urlData } = supabase.storage
    .from("team-images")
    .getPublicUrl(fileName);
  return urlData?.publicUrl || null;
}
