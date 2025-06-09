"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Code,
  BarChart,
  TrendingUp,
  ImageIcon,
  Briefcase,
  Cpu,
  TableOfContents,
  Megaphone,
  Search,
  Share2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Define the possible icon names for type safety
type IconName =
  | "Code"
  | "BarChart"
  | "TrendingUp"
  | "ImageIcon"
  | "Share2"
  | "Cpu"
  | "TableOfContents"
  | "Megaphone"
  | "Search"
  | "Briefcase";

// Map icon names to their corresponding LucideIcon components
const iconMap: Record<IconName, LucideIcon> = {
  Code,
  BarChart,
  TrendingUp,
  ImageIcon,
  Share2,
  Cpu,
  TableOfContents,
  Megaphone,
  Search,
  Briefcase,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string | null; // Update to match database type
  href: string;
}

export function ServiceCard({
  title,
  description,
  icon = "Briefcase",
  href,
}: ServiceCardProps) {
  // Normalize icon string to match IconName (capitalize first letter, rest lowercase)
  const normalizeIcon = (iconName: string | null | undefined): IconName => {
    if (!iconName) return "Briefcase";
    const formatted =
      iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase();
    // Special case for multi-word icons
    if (formatted === "Barchart") return "BarChart";
    if (formatted === "Imageicon") return "ImageIcon";
    if (formatted === "Trendingup") return "TrendingUp";
    return (
      iconMap[formatted as IconName] ? formatted : "Briefcase"
    ) as IconName;
  };

  const iconKey = normalizeIcon(icon);
  const IconComponent = iconMap[iconKey];

  return (
    <Link href={href}>
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg h-full flex flex-col"
        whileHover={{
          y: -5,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-blue-100 text-blue-600 p-3 rounded-xl w-fit mb-6">
          <IconComponent className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <div className="flex items-center text-blue-600 font-medium">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </motion.div>
    </Link>
  );
}
