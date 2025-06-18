import ClientForm from "@/components/forms/client-form";
import {
  getClients,
  updateClient,
  uploadClientLogo,
} from "@/app/actions/clients";
import { redirect } from "next/navigation";

export default async function EditClientPage({
  params,
}: {
  params: { id: string };
}) {
  const clients = await getClients();
  const client = clients.find((c) => c.id === params.id);

  async function handleSubmit(formData: FormData) {
    "use server";
    let logoUrl: string | null = client?.logo || null;
    const logoFile = formData.get("logo");
    if (logoFile && typeof logoFile !== "string") {
      logoUrl = await uploadClientLogo(logoFile as File);
    }
    await updateClient(params.id, {
      name: formData.get("name") as string,
      logo: logoUrl,
    });
    redirect("/admin/clients");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Client</h1>
      <ClientForm
        onSubmit={handleSubmit}
        initialData={client}
        submitText="Save Changes"
      />
    </div>
  );
}
