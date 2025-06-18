import TeamMemberForm from "@/components/forms/team-member-form";
import {
  getTeamMembers,
  updateTeamMember,
  uploadTeamImage,
} from "@/app/actions/team";
import { redirect } from "next/navigation";

export default async function EditTeamMemberPage({
  params,
}: {
  params: { id: string };
}) {
  const members = await getTeamMembers();
  const member = members.find((m) => m.id === params.id);

  async function handleSubmit(formData: FormData) {
    "use server";
    let imageUrl: string | null = member?.image || null;
    const imageFile = formData.get("image");
    if (imageFile && typeof imageFile !== "string") {
      imageUrl = await uploadTeamImage(imageFile as File);
    }
    await updateTeamMember(params.id, {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      bio: formData.get("bio") as string,
      image: imageUrl,
    });
    redirect("/admin/team");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Team Member</h1>
      <TeamMemberForm
        onSubmit={handleSubmit}
        initialData={member}
        submitText="Save Changes"
      />
    </div>
  );
}
