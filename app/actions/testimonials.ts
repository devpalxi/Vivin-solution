"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getTestimonials() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }

  return data
}

export async function createTestimonial(testimonial: {
  name: string
  role?: string
  company?: string
  quote: string
  avatar?: string
}) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("testimonials").insert([testimonial]).select()

  if (error) {
    console.error("Error creating testimonial:", error)
    return { success: false, error }
  }

  revalidatePath("/")
  return { success: true, data }
}

export async function updateTestimonial(
  id: string,
  updates: {
    name?: string
    role?: string
    company?: string
    quote?: string
    avatar?: string
  },
) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("testimonials")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  if (error) {
    console.error(`Error updating testimonial ${id}:`, error)
    return { success: false, error }
  }

  revalidatePath("/")
  return { success: true, data }
}

export async function deleteTestimonial(id: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("testimonials").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting testimonial ${id}:`, error)
    return { success: false, error }
  }

  revalidatePath("/")
  return { success: true }
}
