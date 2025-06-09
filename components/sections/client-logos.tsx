"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getClients } from "@/lib/clients";

export default function ClientLogos() {
  const clients = getClients();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Trusted by Leading Brands</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We've had the privilege of working with some amazing companies
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative h-12 w-32 opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src={
                    client.logo ||
                    `/placeholder.svg?height=100&width=200&text=${client.name}`
                  }
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
