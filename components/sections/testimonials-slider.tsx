"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { getTestimonials } from "@/lib/testimonials";

export default function TestimonialsSlider() {
  const testimonials = getTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-text-light max-w-4xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say
            about working with us.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <Quote className="h-12 w-12 text-blue-100 absolute top-8 left-8" />

            <div className="relative z-10">
              <div className="min-h-[200px] flex items-center">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl md:text-2xl italic mb-8">
                    "{testimonials[currentIndex].quote}"
                  </p>

                  <div className="flex items-center">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={
                          testimonials[currentIndex].avatar ||
                          "/placeholder.svg?height=100&width=100"
                        }
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-text-light">
                        {testimonials[currentIndex].role},{" "}
                        {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
