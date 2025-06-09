import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/page-header";
import { TeamMember } from "@/components/sections/team-section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Vivin Digital, our mission, values, and the team behind our premium marketing services.",
};

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "With over 15 years of experience in digital marketing, Sarah founded Vivin Solutions with a vision to help businesses achieve meaningful growth.",
    image: "/images/team/sarah-johnson.jpg",
  },
  {
    name: "Michael Chen",
    role: "Creative Director",
    bio: "Michael brings 10+ years of design expertise, crafting visual identities that resonate with audiences and drive brand recognition.",
    image: "/images/team/michael-chen.jpg",
  },
  {
    name: "Priya Patel",
    role: "Head of Digital Strategy",
    bio: "Priya specializes in creating data-driven marketing strategies that deliver measurable results for our clients.",
    image: "/images/team/priya-patel.jpg",
  },
  {
    name: "James Wilson",
    role: "Technical Director",
    bio: "James leads our development team, bringing technical excellence and innovation to every digital project.",
    image: "/images/team/james-wilson.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="About Vivin Digital"
        subtitle="A vision to transform digital marketing—where your story meets strategy and creativity."
      />

      {/* Our Story */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>

            <h3 className="text-2xl font-bold mb-2 text-blue-700">
              A Vision to Transform Digital Marketing
            </h3>
            <p className="text-lg mb-4">
              At Vivin Digital, we believe that every brand has its own story—an
              identity, a voice, a dream. Our mission? To make sure that story
              reaches the right audience in the most impactful way.
            </p>
            <p className="text-lg mb-4">
              It all started with a shared passion for creativity and
              innovation. We began as a small group of dreamers with big ideas,
              and now have turned into one of Canada’s leading digital marketing
              agencies. With just one simple belief from day one: businesses
              thrive when their stories are told authentically and strategically
              in the digital world, we’ve achieved remarkable milestones and are
              eager to accomplish even more.
            </p>

            <h3 className="text-2xl font-bold mb-2 text-blue-700">
              From Dream to Reality
            </h3>
            <p className="text-lg mb-4">
              Our journey has been far from ordinary. Along the way, we’ve
              collaborated with businesses of all shapes and sizes, helping them
              turn challenges into opportunities and ideas into reality.
            </p>
            <p className="text-lg mb-4">
              What makes Vivin Digital different? Our unwavering dedication to
              your success. We don’t just offer services; we craft tailored
              solutions. From SEO and PPC to content marketing, social media
              management, and web development, every strategy we design is built
              to meet you where you are—and take you where you want to go.
            </p>

            <h3 className="text-2xl font-bold mb-2 text-blue-700">
              Why We Do It
            </h3>
            <p className="text-lg">
              We’re not just a marketing agency; we’re your partners, your
              cheerleaders, and your biggest fans. Your success fuels our
              passion. When your brand reaches new heights, we celebrate with
              you.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/team/vivin-team.jpeg"
              alt="Vivin Digital team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Transparency</h3>
            <p>Clear and honest communication</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Innovation</h3>
            <p>Cutting-edge technologies and creative approaches</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Results-Driven</h3>
            <p>Measurable outcomes that align with your business goals</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Expert Team</h3>
            <p>
              Our professionals bring years of experience and a passion for
              digital excellence.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Customized Strategies</h3>
            <p>
              We develop personalized marketing plans that resonate with your
              target audience.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Proven Track Record</h3>
            <p>
              Our portfolio showcases successful campaigns across various
              industries.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Comprehensive Services</h3>
            <p>
              From strategy to execution, we offer end-to-end digital marketing
              solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section>
        <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
}
