import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import PageHeader from "@/components/ui/page-header";
import ContactForm from "@/components/forms/contact-form";
import CalendlyEmbed from "@/components/booking/calendly-embed";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with our team to discuss your project or schedule a free consultation.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team to discuss your project or schedule a free consultation"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <ContactForm />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-accent1 mr-4 mt-1" />
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-text-light">info@vivinsolutions.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-accent1 mr-4 mt-1" />
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="text-text-light">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-accent1 mr-4 mt-1" />
                <div>
                  <h3 className="font-bold">Address</h3>
                  <p className="text-text-light">
                    123 Marketing Street
                    <br />
                    Suite 456
                    <br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-accent1 mr-4 mt-1" />
                <div>
                  <h3 className="font-bold">Business Hours</h3>
                  <p className="text-text-light">
                    Monday - Friday: 9:00 AM - 5:00 PM
                    <br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Schedule a Call</h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <p className="mb-4">
              Book a free 30-minute consultation with one of our experts to
              discuss your project.
            </p>
            <div className="aspect-video rounded-xl ">
              <CalendlyEmbed url="https://calendly.com/amilakelum44/30min" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Find Us</h2>
        <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-lg">
          {/* Google Maps iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0968870204824!2d-122.41941492392031!3d37.77492971456601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter!5e0!3m2!1sen!2sus!4v1653112605429!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
