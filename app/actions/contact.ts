"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { sendContactToHubSpot, sendNewsletterToHubSpot } from "./hubspot";

export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("contact_submissions")
    .insert([formData])
    .select();

  if (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: error.message };
  }

  // Send to HubSpot
  await sendContactToHubSpot(formData);

  return { success: true, data };
}

export async function subscribeToNewsletter(email: string) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert([{ email }])
    .select();

  if (error) {
    // Check if it's a unique constraint violation (email already exists)
    if (error.code === "23505") {
      return {
        success: false,
        error: "This email is already subscribed to our newsletter.",
      };
    }

    console.error("Error subscribing to newsletter:", error);
    return { success: false, error: error.message };
  }

  // Send to HubSpot
  await sendNewsletterToHubSpot(email);

  return { success: true, data };
}

export async function getContactSubmissions() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contact submissions:", error);
    return [];
  }
  return data;
}

export async function getNewsletterSubscribers() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return [];
  }
  return data;
}
