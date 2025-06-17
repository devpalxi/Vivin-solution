"use client";

import type React from "react";
import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/contact";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const { success, error } = await subscribeToNewsletter(email);

      if (success) {
        setIsSuccess(true);
        setEmail("");
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(
          error ||
            "There was an error subscribing to the newsletter. Please try again."
        );
      }
    } catch (err) {
      setError(
        "There was an error subscribing to the newsletter. Please try again."
      );
      console.error("Error subscribing to newsletter:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Subscribe to our Newsletter
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            className="border rounded px-4 py-2"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
          />
          <button
            type="submit"
            className="bg-accent2 text-white rounded px-4 py-2 font-medium hover:bg-accent2/80 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
          {isSuccess && (
            <div className="text-green-600 text-center">
              Thank you for subscribing!
            </div>
          )}
          {error && <div className="text-red-600 text-center">{error}</div>}
        </form>
      </div>
    </section>
  );
}
