import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Services"
          description="Manage service categories, subcategories, and services"
          link="/admin/services"
        />

        <DashboardCard
          title="Case Studies"
          description="Manage case studies and their related content"
          link="/admin/case-studies"
        />

        <DashboardCard
          title="Blog"
          description="Manage blog posts and authors"
          link="/admin/blog"
        />

        <DashboardCard
          title="Team"
          description="Manage team members"
          link="/admin/team"
        />

        <DashboardCard
          title="Testimonials"
          description="Manage client testimonials"
          link="/admin/testimonials"
        />

        <DashboardCard
          title="Clients"
          description="Manage client logos"
          link="/admin/clients"
        />

        <DashboardCard
          title="Resources"
          description="Manage downloadable resources"
          link="/admin/resources"
        />

        <DashboardCard
          title="Contact Submissions"
          description="View contact form submissions"
          link="/admin/contact-submissions"
        />

        <DashboardCard
          title="Newsletter Subscribers"
          description="View newsletter subscribers"
          link="/admin/newsletter-subscribers"
        />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link href={link} className="block">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-text-light mb-4">{description}</p>
        <div className="text-accent1 font-medium">Manage →</div>
      </div>
    </Link>
  );
}
