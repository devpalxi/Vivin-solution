import ResourceForm from "@/components/forms/resource-form";
import {
  createResource,
  uploadResourceImage,
  uploadResourceFile,
} from "@/app/actions/resources";
import { redirect } from "next/navigation";

export default function NewResourcePage() {
  async function handleSubmit(formData: FormData) {
    "use server";

    // Prepare both uploads in parallel
    const imageFile = formData.get("image");
    const resourceFile = formData.get("file");

    // Run both uploads concurrently with Promise.all
    const [imageUrl, fileUrl] = await Promise.all([
      imageFile && typeof imageFile !== "string"
        ? uploadResourceImage(imageFile as File)
        : Promise.resolve(null),
      resourceFile && typeof resourceFile !== "string"
        ? uploadResourceFile(resourceFile as File)
        : Promise.resolve(null),
    ]);

    await createResource({
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
      <h1 className="text-2xl font-bold mb-6">Add New Resource</h1>
      <ResourceForm onSubmit={handleSubmit} submitText="Add Resource" />
    </div>
  );
}
