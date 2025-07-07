import type { Metadata } from "next";
import PageHeader from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Vivin Digital collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Privacy Policy"
        subtitle="Last updated: July 7, 2025"
      />

      <div className="prose prose-lg max-w-4xl mx-auto">
        <h2>Introduction</h2>
        <p>
          Welcome to Vivin Digital. We respect your privacy and are committed to
          protecting your personal data. This privacy policy explains how we
          collect, use, and safeguard your information when you visit our
          website, use our services, or interact with us.
        </p>

        <h2>The Data We Collect About You</h2>
        <p>
          We collect information that you voluntarily provide to us and data
          that is automatically collected when you use our website.
        </p>
        <ul>
          <li>
            <strong>Contact Information:</strong> When you fill out our contact
            form or subscribe to our newsletter, we collect your name and email
            address. You may also voluntarily provide your phone number.
          </li>
          <li>
            <strong>Communication Data:</strong> We keep a record of our
            correspondence when you contact us, including the subject and
            content of your message.
          </li>
          <li>
            <strong>Technical & Usage Data:</strong> We automatically collect
            data such as your IP address, browser type, device information, and
            how you navigate our website. This helps us improve our site and
            services.
          </li>
        </ul>

        <h2>How We Use Your Personal Data</h2>
        <p>
          We use your data for the following purposes, always with a legal basis
          for doing so:
        </p>
        <ul>
          <li>
            <strong>To Respond to Inquiries:</strong> To reply to messages you
            send us through our contact form.
          </li>
          <li>
            <strong>To Send Marketing Communications:</strong> To send you our
            newsletter, tips, and information about our services if you have
            subscribed. You can unsubscribe at any time.
          </li>
          <li>
            <strong>To Improve Our Website:</strong> To analyze usage data to
            enhance user experience and optimize our content and service
            offerings.
          </li>
          <li>
            <strong>To Comply with Legal Obligations:</strong> To meet any legal
            or regulatory requirements.
          </li>
        </ul>

        <h2>Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your
          experience on our website and to analyze site traffic. Cookies are
          small data files stored on your device.
        </p>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> These are necessary for the
            website to function properly.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> We use third-party services like
            Google Analytics to understand how you interact with our website.
            This helps us improve our services and user experience. The data
            collected is aggregated and does not personally identify you.
          </li>
        </ul>
        <p>
          You can control and manage cookies in various ways. Please keep in
          mind that removing or blocking cookies can negatively impact your user
          experience and parts of our website may no longer be fully accessible.
        </p>

        <h2>Sharing of Information</h2>
        <p>
          We do not sell or rent your personal data. We may share your data with
          trusted third-party service providers who assist us in operating our
          website (e.g., hosting, analytics), but only when they agree to keep
          this information confidential. We may also disclose your information
          if required by law.
        </p>

        <h2>Data Security</h2>
        <p>
          We have implemented appropriate security measures to prevent your
          personal data from being accidentally lost, used, or accessed in an
          unauthorized way. We limit access to your personal data to employees
          and third parties who have a business need to know.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Our website may contain links to other websites. We are not
          responsible for their content or privacy practices. We encourage you
          to read the privacy policies of any third-party sites you visit.
        </p>

        <h2>Your Legal Rights</h2>
        <p>
          You have rights under data protection laws regarding your personal
          data, including the right to access, correct, or request the erasure
          of your personal information.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Any changes will
          be posted on this page with an updated revision date. We encourage you
          to review this policy periodically.
        </p>

        {/* <h2>Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our privacy
          practices, please contact us at:
        </p>
        <p>
          Email: privacy@vivinsolutions.com
          <br />
          Phone: +1 (555) 123-4567
          <br />
          Address: 123 Marketing Street, Suite 456, San Francisco, CA 94103
        </p> */}
      </div>
    </div>
  );
}
