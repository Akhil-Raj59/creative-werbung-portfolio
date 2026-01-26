"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
}

export function SectionHeader({
  badge,
  title,
  titleAccent,
  description,
}: SectionHeaderProps) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <span className="inline-block px-4 py-1.5 rounded-full glass-card text-sm font-medium border border-primary/20">
          {badge}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
      >
        {title}
        <br />
        <span className="text-gradient-primary">{titleAccent}</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-muted-foreground"
      >
        {description}
      </motion.p>
    </div>
  );
}