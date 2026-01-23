"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";

const projectTypes = [
  { value: "reels", label: "Reels & Short Content" },
  { value: "longform", label: "Long-form Videos" },
  { value: "motion", label: "Motion Graphics" },
  { value: "ai-video", label: "AI Video" },
  { value: "featured", label: "Featured Projects" },
];

export default function CTAForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectType: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Google Sheets Web App URL - Senior se milega
      const GOOGLE_SHEET_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors", // Important for Google Sheets
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      // Show success message
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        projectType: "",
        description: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);

    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
          
          {/* Left Side - Headline & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Let's Work
                <br />
                <span className="text-gradient-primary">Together</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Tell us about your project — we'll craft visuals that elevate your 
                brand and captivate your audience.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pt-4">
  {/* Fix: href aur className ko <a> ke andar daal diya */}
  <a
    href="mailto:hello@kreativewerbunglabs.com"
    className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
  >
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
      <Mail className="w-5 h-5 text-primary" />
    </div>
    <span>hello@kreativewerbunglabs.com</span>
  </a>

  <a
    href="tel:+919876543210"
    className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
  >
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
      <Phone className="w-5 h-5 text-primary" />
    </div>
    <span>+91 98765 43210</span>
  </a>

  <div className="flex items-center gap-4 text-foreground">
    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
      <MapPin className="w-5 h-5 text-secondary" />
    </div>
    <span>Delhi, India</span>
  </div>
</div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side - Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-16 left-0 right-0 p-4 rounded-xl bg-primary text-primary-foreground text-center font-heading"
              >
                Message Sent! 🎬 We'll get back to you within 24 hours.
              </motion.div>
            )}

            {/* Glowing border effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/40 via-transparent to-secondary/30 rounded-2xl blur-sm" />
            
            <form
              onSubmit={handleSubmit}
              className="relative glass-card rounded-2xl p-8 space-y-6"
            >
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium text-muted-foreground">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="w-full h-12 bg-transparent border-0 border-b border-border/50 rounded-none px-0 focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground/40"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full h-12 bg-transparent border-0 border-b border-border/50 rounded-none px-0 focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground/40"
                />
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleChange("projectType", e.target.value)}
                  required
                  className="w-full h-12 bg-transparent border-0 border-b border-border/50 rounded-none px-0 focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="" disabled>Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type.value} value={type.value} className="bg-background">
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Brief */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-muted-foreground">
                  Project Brief
                </label>
                <textarea
                  id="description"
                  required
                  placeholder="Tell us about your project..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full min-h-[100px] bg-transparent border-0 border-b border-border/50 rounded-none px-0 focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground/40 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-full bg-foreground text-background font-heading text-base font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all duration-300 hover:bg-foreground/90"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Project Request
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-border mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-2">
            <span className="font-heading text-xl font-bold">
              <span className="text-gradient-primary">KREATIVE</span>
              <span className="text-foreground"> WERBUNG</span>
            </span>
            <span className="text-muted-foreground">LABS</span>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2024 Kreative Werbung Labs. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}