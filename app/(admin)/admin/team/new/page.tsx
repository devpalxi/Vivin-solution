import TeamMemberForm from "@/components/forms/team-member-form";
import { createTeamMember, uploadTeamImage } from "@/app/actions/team";
import { redirect } from "next/navigation";

export default function NewTeamMemberPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    let imageUrl: string | null = null;
    const imageFile = formData.get("image");
    if (imageFile && typeof imageFile !== "string") {
      imageUrl = await uploadTeamImage(imageFile as File);
    }
    await createTeamMember({
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      bio: formData.get("bio") as string,
      image: imageUrl,
    });
    redirect("/admin/team");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Add New Team Member</h1>
      <TeamMemberForm onSubmit={handleSubmit} submitText="Add Member" />
    </div>
  );
}
