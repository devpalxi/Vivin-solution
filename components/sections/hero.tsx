"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-blue-600 font-semibold mb-3 text-lg">
              Marketing That Moves the Needle
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">{subtitle}</p>

            <div
              className="p-4 rounded-[10px] shadow-md mb-8"
              style={{ background: "aliceblue" }}
            >
              <p>
                Vivin Digital is a top-tier digital marketing company in Canada,
                specializing in SEO, PPC, content marketing, social media
                management, and web development. We craft innovative digital
                strategies that drive growth, enhance visibility, and deliver
                measurable results. Our tailored solutions are designed to meet
                your unique business goals, ensuring optimal online performance
                and ROI.
              </p>
              {/* <h2 className="text-lg font-semibold mb-2">Perfect For:</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-blue-600 rounded-full mr-2"></span>
                  Startups and small businesses
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-blue-600 rounded-full mr-2"></span>
                  Local businesses looking to expand online
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-blue-600 rounded-full mr-2"></span>
                  Coaches/consultants/service-based entrepreneurs
                </li>
                
              </ul> */}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={ctaLink}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/hero-main.jpeg"
              alt="Hero image"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
