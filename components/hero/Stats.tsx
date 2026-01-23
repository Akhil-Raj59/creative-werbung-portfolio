"use client";

import { motion } from "framer-motion";

const statsData = [
  { value: "25+", label: "Projects Delivered" },
  { value: "5M+", label: "Views Generated" },
  { value: "50+", label: "Happy Clients" },
  { value: "3+", label: "Years Experience" },
];

export function Stats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
    >
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + index * 0.1 }}
          className="text-center p-6 glass-card rounded-2xl"
        >
          <div className="font-heading text-3xl md:text-4xl font-bold text-gradient-primary">
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}