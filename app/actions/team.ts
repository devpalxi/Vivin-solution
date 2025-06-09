"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getTeamMembers() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("team_members").select("*").order("name")

  if (error) {
    console.error("Error fetching team members:", error)
    return []
  }

  return data
}

export async function createTeamMember(member: {
  name: string
  role: string
  bio?: string
  image?: string
}) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("team_members").insert([member]).select()

  if (error) {
    console.error("Error creating team member:", error)
    return { success: false, error }
  }

  revalidatePath("/about")
  return { success: true, data }
}

export async function updateTeamMember(
  id: string,
  updates: {
    name?: string
    role?: string
    bio?: string
    image?: string
  },
) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("team_members")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  if (error) {
    console.error(`Error updating team member ${id}:`, error)
    return { success: false, error }
  }

  revalidatePath("/about")
  return { success: true, data }
}

export async function deleteTeamMember(id: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("team_members").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting team member ${id}:`, error)
    return { success: false, error }
  }

  revalidatePath("/about")
  return { success: true }
}
