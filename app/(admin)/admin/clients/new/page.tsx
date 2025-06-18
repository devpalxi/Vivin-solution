import ClientForm from "@/components/forms/client-form";
import { createClient, uploadClientLogo } from "@/app/actions/clients";
import { redirect } from "next/navigation";

export default function NewClientPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    let logoUrl: string | null = null;
    const logoFile = formData.get("logo");
    if (logoFile && typeof logoFile !== "string") {
      logoUrl = await uploadClientLogo(logoFile as File);
    }
    await createClient({
      name: formData.get("name") as string,
      logo: logoUrl,
    });
    redirect("/admin/clients");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Add New Client</h1>
      <ClientForm onSubmit={handleSubmit} submitText="Add Client" />
    </div>
  );
}
