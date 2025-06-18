import ResourceForm from "@/components/forms/resource-form";
import {
  getResources,
  updateResource,
  uploadResourceImage,
  uploadResourceFile,
} from "@/app/actions/resources";
import { redirect } from "next/navigation";

export default async function EditResourcePage({
  params,
}: {
  params: { id: string };
}) {
  const resources = await getResources();
  const resource = resources.find((r) => r.id === params.id);

  async function handleSubmit(formData: FormData) {
    "use server";
    let imageUrl: string | null = resource?.image || null;
    let fileUrl: string | null = resource?.file_url || null;

    const imageFile = formData.get("image");
    if (imageFile && typeof imageFile !== "string") {
      imageUrl = await uploadResourceImage(imageFile as File);
    }

    const file = formData.get("file");
    if (file && typeof file !== "string") {
      fileUrl = await uploadResourceFile(file as File);
    }

    await updateResource(params.id, {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      image: imageUrl,
      file_url: fileUrl,
    });
    redirect("/admin/resources");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Resource</h1>
      <ResourceForm
        onSubmit={handleSubmit}
        initialData={resource}
        submitText="Save Changes"
      />
    </div>
  );
}
