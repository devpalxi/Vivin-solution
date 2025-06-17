"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import type { Resource } from "@/lib/types";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");

      // Simulate download
      window.open(resource.fileUrl || "#", "_blank");
    }, 1500);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48">
        <Image
          src={resource.image || "/placeholder.svg?height=400&width=600"}
          alt={resource.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            {resource.type}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
        <p className="text-text-light mb-4 flex-grow">{resource.description}</p>

        {isSuccess ? (
          <div className="text-green-600 font-medium">
            Thank you! Your download should begin shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to download"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-4 py-2 bg-accent2 text-white font-medium rounded-lg hover:bg-accent2/80 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" /> Download Now
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
