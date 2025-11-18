"use client"

import type React from "react"

import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900 mb-2">
            First name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-base"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-900 mb-2">
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-base"
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
          E-mail
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-base"
        />
      </div>

      {/* WhatsApp Field */}
      <div>
        <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-900 mb-2">
          WhatsApp Phone Number
        </label>
        <input
          type="text"
          id="whatsapp"
          name="whatsapp"
          placeholder="WhatsApp"
          value={formData.whatsapp}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none text-base"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Message"
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none bg-gray-50 resize-none"
        />
      </div>


      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="px-24 py-2 bg-green-700 text-white font-semibold text-base rounded-lg border-2 border-gray-400 hover:bg-gray-800 transition-colors"
        >
          Send message
        </button>
      </div>
    </form>
  )
}
