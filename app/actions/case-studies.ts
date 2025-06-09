"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getCaseStudies() {
  const supabase = createServerSupabaseClient()

  const { data: caseStudies, error: caseStudiesError } = await supabase
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false })

  if (caseStudiesError) {
    console.error("Error fetching case studies:", caseStudiesError)
    return []
  }

  // For each case study, get its tags, services, results, and testimonial
  const fullCaseStudies = await Promise.all(
    caseStudies.map(async (study) => {
      const { data: tags, error: tagsError } = await supabase
        .from("case_study_tags")
        .select("tag")
        .eq("case_study_id", study.id)

      const { data: services, error: servicesError } = await supabase
        .from("case_study_services")
        .select("service")
        .eq("case_study_id", study.id)

      const { data: results, error: resultsError } = await supabase
        .from("case_study_results")
        .select("stat, description")
        .eq("case_study_id", study.id)

      const { data: testimonial, error: testimonialError } = await supabase
        .from("case_study_testimonials")
        .select("*")
        .eq("case_study_id", study.id)
        .single()

      if (tagsError) console.error(`Error fetching tags for case study ${study.id}:`, tagsError)
      if (servicesError) console.error(`Error fetching services for case study ${study.id}:`, servicesError)
      if (resultsError) console.error(`Error fetching results for case study ${study.id}:`, resultsError)
      if (testimonialError && testimonialError.code !== "PGRST116") {
        // PGRST116 is the error code for "no rows returned", which is fine if there's no testimonial
        console.error(`Error fetching testimonial for case study ${study.id}:`, testimonialError)
      }

      return {
        ...study,
        tags: tags?.map((t) => t.tag) || [],
        services: services?.map((s) => s.service) || [],
        results: results || [],
        testimonial: testimonial || null,
      }
    }),
  )

  return fullCaseStudies
}

export async function getCaseStudy(slug: string) {
  const supabase = createServerSupabaseClient()

  const { data: study, error: studyError } = await supabase.from("case_studies").select("*").eq("slug", slug).single()

  if (studyError) {
    console.error(`Error fetching case study ${slug}:`, studyError)
    return null
  }

  const { data: tags, error: tagsError } = await supabase
    .from("case_study_tags")
    .select("tag")
    .eq("case_study_id", study.id)

  const { data: services, error: servicesError } = await supabase
    .from("case_study_services")
    .select("service")
    .eq("case_study_id", study.id)

  const { data: results, error: resultsError } = await supabase
    .from("case_study_results")
    .select("stat, description")
    .eq("case_study_id", study.id)

  const { data: testimonial, error: testimonialError } = await supabase
    .from("case_study_testimonials")
    .select("*")
    .eq("case_study_id", study.id)
    .single()

  if (tagsError) console.error(`Error fetching tags for case study ${study.id}:`, tagsError)
  if (servicesError) console.error(`Error fetching services for case study ${study.id}:`, servicesError)
  if (resultsError) console.error(`Error fetching results for case study ${study.id}:`, resultsError)
  if (testimonialError && testimonialError.code !== "PGRST116") {
    console.error(`Error fetching testimonial for case study ${study.id}:`, testimonialError)
  }

  return {
    ...study,
    tags: tags?.map((t) => t.tag) || [],
    services: services?.map((s) => s.service) || [],
    results: results || [],
    testimonial: testimonial || null,
  }
}

export async function createCaseStudy(caseStudy: {
  title: string
  slug: string
  summary: string
  challenge?: string
  approach?: string
  solution?: string
  image_url?: string
  tags: string[]
  services: string[]
  results: { stat: string; description: string }[]
  testimonial?: {
    quote: string
    author: string
    role?: string
    company?: string
  }
}) {
  const supabase = createServerSupabaseClient()

  // Start a transaction by using a single connection for all operations
  // First, insert the case study
  const { data: study, error: studyError } = await supabase
    .from("case_studies")
    .insert({
      title: caseStudy.title,
      slug: caseStudy.slug,
      summary: caseStudy.summary,
      challenge: caseStudy.challenge,
      approach: caseStudy.approach,
      solution: caseStudy.solution,
      image_url: caseStudy.image_url,
    })
    .select()
    .single()

  if (studyError) {
    console.error("Error creating case study:", studyError)
    return { success: false, error: studyError }
  }

  // Insert tags
  if (caseStudy.tags.length > 0) {
    const { error: tagsError } = await supabase.from("case_study_tags").insert(
      caseStudy.tags.map((tag) => ({
        case_study_id: study.id,
        tag,
      })),
    )

    if (tagsError) {
      console.error(`Error adding tags for case study ${study.id}:`, tagsError)
      return { success: false, error: tagsError }
    }
  }

  // Insert services
  if (caseStudy.services.length > 0) {
    const { error: servicesError } = await supabase.from("case_study_services").insert(
      caseStudy.services.map((service) => ({
        case_study_id: study.id,
        service,
      })),
    )

    if (servicesError) {
      console.error(`Error adding services for case study ${study.id}:`, servicesError)
      return { success: false, error: servicesError }
    }
  }

  // Insert results
  if (caseStudy.results.length > 0) {
    const { error: resultsError } = await supabase.from("case_study_results").insert(
      caseStudy.results.map((result) => ({
        case_study_id: study.id,
        stat: result.stat,
        description: result.description,
      })),
    )

    if (resultsError) {
      console.error(`Error adding results for case study ${study.id}:`, resultsError)
      return { success: false, error: resultsError }
    }
  }

  // Insert testimonial if provided
  if (caseStudy.testimonial) {
    const { error: testimonialError } = await supabase.from("case_study_testimonials").insert({
      case_study_id: study.id,
      quote: caseStudy.testimonial.quote,
      author: caseStudy.testimonial.author,
      role: caseStudy.testimonial.role,
      company: caseStudy.testimonial.company,
    })

    if (testimonialError) {
      console.error(`Error adding testimonial for case study ${study.id}:`, testimonialError)
      return { success: false, error: testimonialError }
    }
  }

  revalidatePath("/portfolio")
  return { success: true, data: study }
}
