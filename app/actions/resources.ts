"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getResources() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("resources").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching resources:", error)
    return []
  }

  return data
}

export async function createResource(resource: {
  title: string
  description: string
  type: string
  image?: string
  file_url?: string
}) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("resources").insert([resource]).select()

  if (error) {
    console.error("Error creating resource:", error)
    return { success: false, error }
  }

  revalidatePath("/resources")
  return { success: true, data }
}

export async function updateResource(
  id: string,
  updates: {
    title?: string
    description?: string
    type?: string
    image?: string
    file_url?: string
  },
) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("resources")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  if (error) {
    console.error(`Error updating resource ${id}:`, error)
    return { success: false, error }
  }

  revalidatePath("/resources")
  return { success: true, data }
}

export async function deleteResource(id: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("resources").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting resource ${id}:`, error)
    return { success: false, error }
  }

  revalidatePath("/resources")
  return { success: true }
}
