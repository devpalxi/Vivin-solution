import { getCaseStudy, updateCaseStudy } from "@/app/actions/case-studies";
import CaseStudyForm from "@/components/forms/case-study-form";
import { redirect } from "next/navigation";

export default async function EditCaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseStudy = await getCaseStudy(params.slug);

  async function handleSubmit(formData: FormData) {
    "use server";
    const { error } = await updateCaseStudy(caseStudy.id, formData);
    if (!error) redirect("/admin/case-studies");
    // Optionally show error
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Case Study</h1>
      <CaseStudyForm
        onSubmit={handleSubmit}
        initialData={caseStudy}
        submitText="Update"
      />
    </div>
  );
}
