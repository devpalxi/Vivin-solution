"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getServiceCategories() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("service_categories")
    .select("*")
    .order("title");

  if (error) {
    console.error("Error fetching service categories:", error);
    return [];
  }

  return data;
}

export async function getServiceCategory(slug: string) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("service_categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching service category ${slug}:`, error);
    return null;
  }

  return data;
}

export async function getSubcategories(categoryId: string) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("subcategories")
    .select("*")
    .eq("category_id", categoryId)
    .order("title");

  if (error) {
    console.error(
      `Error fetching subcategories for category ${categoryId}:`,
      error
    );
    return [];
  }

  return data;
}

export async function getSubcategory(
  categorySlug: string,
  subcategorySlug: string
) {
  const supabase = createServerSupabaseClient();

  // First get the category ID
  const { data: category, error: categoryError } = await supabase
    .from("service_categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  if (categoryError || !category) {
    console.error(`Error fetching category ${categorySlug}:`, categoryError);
    return null;
  }

  // Then get the subcategory
  const { data, error } = await supabase
    .from("subcategories")
    .select("*")
    .eq("category_id", category.id)
    .eq("slug", subcategorySlug)
    .single();

  if (error) {
    console.error(`Error fetching subcategory ${subcategorySlug}:`, error);
    return null;
  }

  return data;
}

export async function getServices(
  categoryId: string,
  subcategoryId?: string,
  allForCategory?: boolean
) {
  const supabase = createServerSupabaseClient();

  let query = supabase
    .from("services")
    .select("*")
    .eq("category_id", categoryId)
    .order("name");

  if (subcategoryId) {
    query = query.eq("subcategory_id", subcategoryId);
  } else if (!allForCategory) {
    query = query.is("subcategory_id", null);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Error fetching services for category ${categoryId}:`, error);
    return [];
  }

  return data;
}

export async function getService(categorySlug: string, serviceSlug: string) {
  const supabase = createServerSupabaseClient();

  // First get the category ID
  const { data: category, error: categoryError } = await supabase
    .from("service_categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  if (categoryError || !category) {
    console.error(`Error fetching category ${categorySlug}:`, categoryError);
    return null;
  }

  // Then get the service
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("category_id", category.id)
    .eq("slug", serviceSlug)
    .single();

  if (error) {
    console.error(`Error fetching service ${serviceSlug}:`, error);
    return null;
  }

  return data;
}

export async function createServiceCategory(category: {
  title: string;
  slug: string;
  description: string;
  // icon: string;
}) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("service_categories")
    .insert([category])
    .select();

  if (error) {
    console.error("Error creating service category:", error);
    return { success: false, error };
  }

  revalidatePath("/services");
  return { success: true, data };
}

export async function updateServiceCategory(
  id: string,
  updates: {
    title?: string;
    slug?: string;
    description?: string;
    // icon?: string;
  }
) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("service_categories")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select();

  if (error) {
    console.error(`Error updating service category ${id}:`, error);
    return { success: false, error };
  }

  revalidatePath("/services");
  return { success: true, data };
}

export async function deleteServiceCategory(id: string) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from("service_categories")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting service category ${id}:`, error);
    return { success: false, error };
  }

  revalidatePath("/services");
  return { success: true };
}

export async function createService(service: {
  name: string;
  slug: string;
  description?: string;
  tagline?: string | null;
  paragraph1?: string | null;
  paragraph2?: string | null;
  paragraph3?: string | null;
  approaches?: string[] | null;
  category_id: string;
  subcategory_id?: string | null;
  image_url?: string | null; // <-- Add this line
}) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("services")
    .insert([service])
    .select();

  if (error) {
    console.error("Error creating service:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function updateService(
  id: string,
  updates: {
    name?: string;
    slug?: string;
    description?: string;
    tagline?: string | null;
    paragraph1?: string | null;
    paragraph2?: string | null;
    paragraph3?: string | null;
    approaches?: string[] | null;
    subcategory_id?: string | null;
    image_url?: string | null; // <-- add this
  }
) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("services")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating service:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function deleteService(id: string) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting service ${id}:`, error);
    return { success: false, error };
  }

  return { success: true };
}

export async function deleteSubcategory(id: string) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.from("subcategories").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting subcategory ${id}:`, error);
    return { success: false, error };
  }

  return { success: true };
}

export async function createSubcategory(subcategory: {
  title: string;
  slug: string;
  description?: string;
  category_id: string;
}) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("subcategories")
    .insert([subcategory])
    .select();

  if (error) {
    console.error("Error creating subcategory:", error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function getServiceCategoriesWithCounts() {
  const supabase = createServerSupabaseClient();

  // Get all categories
  const { data: categories, error } = await supabase
    .from("service_categories")
    .select("*, subcategories(id), services(id, slug)")
    .order("title");

  if (error) {
    console.error("Error fetching service categories:", error);
    return [];
  }

  // Map to include counts and first service slug
  return categories.map((cat: any) => ({
    ...cat,
    subcategoriesCount: cat.subcategories?.length || 0,
    servicesCount: cat.services?.length || 0,
    firstServiceSlug: cat.services?.[0]?.slug || null,
  }));
}
