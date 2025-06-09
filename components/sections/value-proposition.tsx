"use client";

import { motion } from "framer-motion";
import { BarChart, Clock, LineChart, Users } from "lucide-react";

export default function ValueProposition() {
  const valueProps = [
    {
      title: "Personalized, ROI-focused campaigns",
      description:
        "We create custom strategies tailored to your specific business goals and target audience.",
      icon: LineChart,
    },
    {
      title: "Transparent reporting & frequent check-ins",
      description:
        "Regular updates and clear reporting so you always know exactly how your campaigns are performing.",
      icon: BarChart,
    },
    {
      title: "Specialized in fast-paced growth",
      description:
        "Our strategies are designed to deliver quick wins while building long-term sustainable growth.",
      icon: Clock,
    },
    {
      title: "Fractional CMO or full-service support",
      description:
        "Flexible engagement models to match your business needs and budget.",
      icon: Users,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Vivin Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We deliver measurable results through our unique approach to digital
            marketing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl w-fit mb-6">
                <prop.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{prop.title}</h3>
              <p className="text-gray-600">{prop.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
