import { getResources } from "@/app/actions/resources";
import { ResourceCard } from "@/components/cards/resource-card";

export default async function ResourcesList() {
  const resources = await getResources();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {resources.map((resource, index) => (
        <ResourceCard
          key={resource.id || index}
          resource={{
            ...resource,
            fileUrl: resource.file_url, // Map DB field to prop expected by ResourceCard
          }}
        />
      ))}
    </div>
  );
}
