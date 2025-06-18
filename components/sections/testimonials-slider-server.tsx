import { getTestimonials } from "@/app/actions/testimonials";
import TestimonialsSlider from "./testimonials-slider";

export default async function TestimonialsSliderServer() {
  const testimonials = await getTestimonials();
  return <TestimonialsSlider testimonials={testimonials} />;
}
