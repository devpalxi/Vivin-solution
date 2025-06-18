"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getClients() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching clients:", error);
    return [];
  }

  return data;
}

export async function createClient(client: {
  name: string;
  logo?: string | null;
}) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("clients")
    .insert([client])
    .select();

  if (error) {
    console.error("Error creating client:", error);
    return { success: false, error };
  }

  revalidatePath("/");
  return { success: true, data };
}

export async function updateClient(
  id: string,
  updates: {
    name?: string;
    logo?: string | null;
  }
) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("clients")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select();

  if (error) {
    console.error(`Error updating client ${id}:`, error);
    return { success: false, error };
  }

  revalidatePath("/");
  return { success: true, data };
}

export async function deleteClient(id: string) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.from("clients").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting client ${id}:`, error);
    return { success: false, error };
  }

  revalidatePath("/");
  return { success: true };
}

export async function uploadClientLogo(file: File): Promise<string | null> {
  const supabase = createServerSupabaseClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `client-${Date.now()}.${fileExt}`;
  const { error } = await supabase.storage
    .from("client-logos")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) {
    console.error("Error uploading logo:", error);
    return null;
  }
  const { data: urlData } = supabase.storage
    .from("client-logos")
    .getPublicUrl(fileName);
  return urlData?.publicUrl || null;
}
