"use client"
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, Instagram, Linkedin, Youtube } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-background to-background" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              Let's Create
              <br />
              <span className="text-gradient-primary">Something Epic</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Ready to bring your vision to life? We're always excited to work on projects 
              that push creative boundaries.
            </p>

            <motion.a
              href="mailto:hello@kreativewerbung.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-primary-foreground font-display text-lg font-bold glow-primary animate-pulse-glow"
            >
              Start a Project
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Contact info grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            <a
              href="mailto:hello@kreativewerbung.com"
              className="p-6 rounded-2xl glass-card hover-glow group"
            >
              <Mail className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-lg font-semibold mb-1">Email Us</h3>
              <p className="text-muted-foreground">hello@kreativewerbung.com</p>
            </a>

            <a
              href="tel:+491234567890"
              className="p-6 rounded-2xl glass-card hover-glow group"
            >
              <Phone className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-lg font-semibold mb-1">Call Us</h3>
              <p className="text-muted-foreground">+49 123 456 7890</p>
            </a>

            <div className="p-6 rounded-2xl glass-card hover-glow group">
              <MapPin className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-lg font-semibold mb-1">Visit Us</h3>
              <p className="text-muted-foreground">Berlin, Germany</p>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border-t border-border pt-10 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold">
                <span className="text-gradient-primary">KREATIVE</span>
                <span className="text-foreground"> WERBUNG</span>
              </span>
              <span className="text-muted-foreground">LABS</span>
            </div>

            <div className="flex items-center gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2024 Kreative Werbung Labs. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
