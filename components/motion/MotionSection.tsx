"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../reels/SectionHeader";
import { Play, Sparkles } from "lucide-react";

const motionData = [
  {
    title: "Brand Identity Animation",
    client: "TechFlow Inc.",
    thumbnail: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=600&h=400&fit=crop",
    videoUrl: "", // Senior se URL milega
  },
  {
    title: "Explainer Video Graphics",
    client: "HealthPlus App",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    videoUrl: "",
  },
  {
    title: "Logo Reveal Sequence",
    client: "Luxe Fashion",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
    videoUrl: "",
  },
];

export default function MotionSection() {
  return (
    <section id="motion" className="section-padding bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Animated background text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-5 pointer-events-none">
        <motion.span
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="font-heading text-[20rem] font-bold whitespace-nowrap"
        >
          MOTION • GRAPHICS • ANIMATION • MOTION • GRAPHICS • ANIMATION •
        </motion.span>
      </div>

      <div className="container mx-auto relative z-10">
        <SectionHeader
          badge="🎨 Motion Graphics"
          title="Kinetic"
          titleAccent="Visual Design"
          description="Dynamic animations and motion graphics that bring brands to life. From logo reveals to full explainer videos."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {motionData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              {/* Card */}
              <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-6 hover-glow cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.thumbnail})` }}
                />
                
                {/* Overlay with animated shapes */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                
                {/* Animated circles decoration */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-4 right-4 w-12 h-12 border border-primary/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute top-6 right-6 w-8 h-8 border border-primary/50 rounded-full"
                />

                {/* Play button */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center glow-primary">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Animated scan line */}
                <motion.div
                  animate={{ y: ["100%", "-100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Content */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {item.client}
                  </p>
                </div>
                <motion.div
                  whileHover={{ rotate: 45 }}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center cursor-pointer"
                >
                  <span className="text-lg">→</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}