"use client";

import { motion } from "framer-motion";
import { Play, ArrowDown } from "lucide-react";
import { Stats } from "./Stats";

export default function Hero() {
  return (
    <section className="relative mt-20 py-5 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Glow orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass-card text-sm font-medium text-primary border border-primary/20">
              Creative Video Production Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-3xl md:text-5xl lg:text-7xl font-bold leading-[0.9]  mb-8"
          >
            We Create
            <br />
            <span className="text-gradient-primary">Visual Stories</span>
            <br />
            That Move
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            From viral reels to cinematic brand films, we transform ideas into 
            compelling visual experiences that captivate audiences worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
  href="#reels" // Isse reels section par scroll hoga
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="group flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-heading font-semibold glow-primary cursor-pointer"
>
  <Play className="w-5 h-5" />
  Watch Showreel
  <motion.span
    className="inline-block"
    animate={{ x: [0, 4, 0] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    →
  </motion.span>
</motion.a>

            <motion.a
              href="#featured"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 rounded-full glass-card font-heading font-semibold hover:bg-muted/50 transition-colors"
            >
              View Featured Work
            </motion.a>
          </motion.div>
        </div>

        {/* Stats Component */}
        <Stats />
      </div>

      {/* Scroll indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div> */}
    </section>
  );
}