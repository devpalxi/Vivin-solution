"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export function TeamMember({ name, role, bio, image }: TeamMemberProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-64">
        <Image
          src={image || "/placeholder.svg?height=400&width=400"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-accent1 mb-4">{role}</p>
        <p className="text-text-light">{bio}</p>
      </div>
    </motion.div>
  );
}
