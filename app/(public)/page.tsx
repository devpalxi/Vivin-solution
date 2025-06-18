import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import ValueProposition from "@/components/sections/value-proposition";
import ServicesPreview from "@/components/sections/services-preview";
import TestimonialsSliderServer from "@/components/sections/testimonials-slider-server";
import ClientLogosServer from "@/components/sections/client-logos-server";
import CaseStudiesPreview from "@/components/sections/case-studies-preview";
import NewsletterSignup from "@/components/sections/newsletter-signup";

export const metadata: Metadata = {
  title: "Premium Marketing Agency | Digital Solutions for Growth",
  description:
    "Vivin Solutions helps businesses grow through strategic digital marketing, development, and business consulting services.",
};

export default function HomePage() {
  return (
    <>
      <Hero
        title="Transform Your Digital Presence"
        subtitle="Build a powerful digital presence with one of the Best Digital Marketing Agencies in Canada."
        ctaText="Get Your Free Strategy"
        ctaLink="/contact"
        secondaryCtaText="View Our Work"
        secondaryCtaLink="/portfolio"
      />
      <ValueProposition />
      <ServicesPreview />
      <TestimonialsSliderServer />
      <ClientLogosServer />
      <CaseStudiesPreview />
      <NewsletterSignup />
    </>
  );
}
