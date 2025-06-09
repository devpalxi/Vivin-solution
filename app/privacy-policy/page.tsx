import type { Metadata } from "next"
import PageHeader from "@/components/ui/page-header"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn about how Vivin Solutions collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader title="Privacy Policy" subtitle="Last updated: May 19, 2023" />

      <div className="prose prose-lg max-w-4xl mx-auto">
        <h2>Introduction</h2>
        <p>
          At Vivin Solutions, we respect your privacy and are committed to protecting your personal data. This privacy
          policy will inform you about how we look after your personal data when you visit our website and tell you
          about your privacy rights and how the law protects you.
        </p>

        <h2>The Data We Collect About You</h2>
        <p>
          Personal data, or personal information, means any information about an individual from which that person can
          be identified. We may collect, use, store and transfer different kinds of personal data about you which we
          have grouped together as follows:
        </p>
        <ul>
          <li>
            <strong>Identity Data</strong> includes first name, last name, username or similar identifier.
          </li>
          <li>
            <strong>Contact Data</strong> includes email address, telephone numbers, and physical address.
          </li>
          <li>
            <strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone
            setting and location, browser plug-in types and versions, operating system and platform, and other
            technology on the devices you use to access this website.
          </li>
          <li>
            <strong>Usage Data</strong> includes information about how you use our website, products, and services.
          </li>
          <li>
            <strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us
            and our third parties and your communication preferences.
          </li>
        </ul>

        <h2>How We Use Your Personal Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
          in the following circumstances:
        </p>
        <ul>
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>
            Where it is necessary for our legitimate interests (or those of a third party) and your interests and
            fundamental rights do not override those interests.
          </li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with
          a good experience when you browse our website and also allows us to improve our site.
        </p>

        <h2>Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
          used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal
          data to those employees, agents, contractors and other third parties who have a business need to know.
        </p>

        <h2>Your Legal Rights</h2>
        <p>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data,
          including the right to:
        </p>
        <ul>
          <li>Request access to your personal data.</li>
          <li>Request correction of your personal data.</li>
          <li>Request erasure of your personal data.</li>
          <li>Object to processing of your personal data.</li>
          <li>Request restriction of processing your personal data.</li>
          <li>Request transfer of your personal data.</li>
          <li>Right to withdraw consent.</li>
        </ul>

        <h2>Contact Us</h2>
        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
        <p>
          Email: privacy@vivinsolutions.com
          <br />
          Phone: +1 (555) 123-4567
          <br />
          Address: 123 Marketing Street, Suite 456, San Francisco, CA 94103
        </p>
      </div>
    </div>
  )
}
