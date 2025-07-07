import type { Metadata } from "next";
import PageHeader from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Read the terms and conditions for using the Vivin Digital website and services.",
};

export default function TermsAndConditionPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Terms and Conditions"
        subtitle="Effective Date: July 7, 2025"
      />

      <div className="prose prose-lg max-w-4xl mx-auto">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the Vivin Digital website (the "Site"), you
          accept and agree to be bound by the terms and provision of this
          agreement. If you do not agree to abide by these terms, please do not
          use this Site.
        </p>

        <h2>2. Use of the Website</h2>
        <p>
          You agree to use the Site for lawful purposes only. You are prohibited
          from using the Site to post or transmit any material that is unlawful,
          threatening, defamatory, obscene, or that infringes or violates the
          rights of others.
        </p>

        <h2>3. Intellectual Property</h2>
        <p>
          All content on this Site, including but not limited to text, graphics,
          logos, images, and software, is the property of Vivin Digital or its
          content suppliers and is protected by international copyright and
          trademark laws.
        </p>

        <h2>4. Our Services</h2>
        <p>
          Vivin Digital provides digital marketing services. The information on
          this Site is for general informational purposes only. Specific
          services provided to clients will be governed by a separate service
          agreement.
        </p>

        <h2>5. Disclaimers and Limitation of Liability</h2>
        <p>
          The Site and its content are provided on an "as is" basis without any
          warranties of any kind. Vivin Digital does not guarantee the accuracy,
          completeness, or usefulness of any information on the Site. In no
          event shall Vivin Digital be liable for any damages whatsoever arising
          out of the use or inability to use the Site.
        </p>

        <h2>6. Third-Party Links</h2>
        <p>
          Our Site may contain links to third-party websites. These links are
          provided solely as a convenience to you. We are not responsible for
          the content or privacy practices of these third-party sites.
        </p>

        <h2>7. Changes to These Terms</h2>
        <p>
          We reserve the right to modify these terms and conditions at any time.
          We will post the revised terms on the Site, and your continued use of
          the Site will signify your acceptance of the changes.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the
          laws of the jurisdiction in which Vivin Digital operates, without
          giving effect to any principles of conflicts of law.
        </p>

        {/* <h2>9. Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, please
          contact us at:
        </p>
        <p>
          Email: legal@vivinsolutions.com
          <br />
          Phone: +1 (555) 123-4567
        </p> */}
      </div>
    </div>
  );
}
