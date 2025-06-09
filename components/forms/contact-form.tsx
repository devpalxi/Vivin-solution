"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { submitContactForm } from "@/app/actions/contact"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to our privacy policy",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [serverError, setServerError] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consent: false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setServerError("")

    try {
      const { success, error } = await submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      })

      if (success) {
        setIsSuccess(true)
        reset()

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false)
        }, 5000)
      } else {
        setServerError(error || "There was an error submitting your message. Please try again.")
      }
    } catch (error) {
      setServerError("There was an error submitting your message. Please try again.")
      console.error("Error submitting contact form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
        {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
        {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone (optional)
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
        {errors.subject && <p className="mt-1 text-red-500 text-sm">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
        {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>}
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="consent"
            type="checkbox"
            {...register("consent")}
            className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="consent" className="font-medium text-gray-700">
            I agree to the{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              privacy policy
            </a>{" "}
            and consent to having my data processed as described. <span className="text-red-500">*</span>
          </label>
          {errors.consent && <p className="mt-1 text-red-500 text-sm">{errors.consent.message}</p>}
        </div>
      </div>

      {serverError && <div className="p-4 bg-red-50 text-red-500 rounded-lg">{serverError}</div>}

      {isSuccess && (
        <div className="p-4 bg-green-50 text-green-600 rounded-lg">
          Your message has been sent successfully! We'll get back to you soon.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}
