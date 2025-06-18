import TestimonialForm from "@/components/forms/testimonial-form";
import {
  createTestimonial,
  uploadTestimonialAvatar,
} from "@/app/actions/testimonials";
import { redirect } from "next/navigation";

export default function NewTestimonialPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    let avatarUrl: string | null = null;
    const avatarFile = formData.get("avatar");
    if (avatarFile && typeof avatarFile !== "string") {
      avatarUrl = await uploadTestimonialAvatar(avatarFile as File);
    }
    await createTestimonial({
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      company: formData.get("company") as string,
      quote: formData.get("quote") as string,
      avatar: avatarUrl,
    });
    redirect("/admin/testimonials");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Add New Testimonial</h1>
      <TestimonialForm onSubmit={handleSubmit} submitText="Add Testimonial" />
    </div>
  );
}
