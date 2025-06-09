"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function submitContactForm(formData: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("contact_submissions").insert([formData]).select()

  if (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function subscribeToNewsletter(email: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("newsletter_subscribers").insert([{ email }]).select()

  if (error) {
    // Check if it's a unique constraint violation (email already exists)
    if (error.code === "23505") {
      return { success: false, error: "This email is already subscribed to our newsletter." }
    }

    console.error("Error subscribing to newsletter:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
