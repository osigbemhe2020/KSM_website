'use client';

import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { Mail, Phone, User, MessageSquare } from "lucide-react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const validate = () => {
    const newErrors = { name: "", email: "", phone: "", subject: "", message: "" };
    let isValid = true;

    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }
    if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (formData.email.length > 255) {
      newErrors.email = "Email must be less than 255 characters";
      isValid = false;
    }

    if (formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
      isValid = false;
    }
    if (formData.phone.length > 20) {
      newErrors.phone = "Phone number must be less than 20 digits";
      isValid = false;
    }

    if (formData.subject.length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
      isValid = false;
    }
    if (formData.subject.length > 200) {
      newErrors.subject = "Subject must be less than 200 characters";
      isValid = false;
    }

    if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }
    if (formData.message.length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-10 py-6">
      <div className=" rounded-xl bg-gray-100 p-8 ">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold  mb-2">
           Contact Us
          </h2>
          <p className="text-muted-foreground">
            Fill out the form below and we'll get back to you shortly
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className=" mb-2 font-semibold text-[16px]">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="flex h-10 w-full rounded-md border border-black/40 bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
              />
            </div>
            {errors.name && <p className="text-sm font-medium text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="mb-2 font-semibold text-[16px]">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="flex h-10 w-full rounded-md border border-black/40 bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
              />
            </div>
            {errors.email && <p className="text-sm font-medium text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className=" mb-2 font-semibold text-[16px]">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="phone"
                type="tel"
                placeholder="0809 1348 200"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="flex h-10 w-full rounded-md border border-black/40 bg-ackground pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
              />
            </div>
            {errors.phone && <p className="text-sm font-medium text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="mb-2 font-semibold text-[16px]">
              Subject
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="subject"
                type="text"
                placeholder="How can we help you?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="flex h-10 w-full rounded-md border border-black/40 bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
              />
            </div>
            {errors.subject && <p className="text-sm font-medium text-destructive">{errors.subject}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className=" mb-2 font-semibold text-[16px]">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Tell us more about your inquiry..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="flex min-h-[150px] w-full rounded-md border border-black/40 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors resize-none"
            />
            {errors.message && <p className="text-sm font-medium text-destructive">{errors.message}</p>}
          </div>
         <div className="flex justify-center">
          <button
            type="submit"
            className="w-[80%]  bg-green-700 hover:opacity-90 text-white font-semibold py-4 rounded-lg mx-auto hover:shadow-medium"
          >
            Send Message
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};
