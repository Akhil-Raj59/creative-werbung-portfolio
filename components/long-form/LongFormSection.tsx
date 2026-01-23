"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../reels/SectionHeader";
import { Play, Clock, Calendar } from "lucide-react";

const longformData = [
  {
    title: "Behind The Brand: Journey of Innovation",
    description: "A cinematic documentary exploring the creative process behind a leading tech startup's journey from garage to global.",
    duration: "12:45",
    date: "2024",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop",
    videoUrl: "", // Senior se video URL milega
  },
  {
    title: "The Art of Sustainable Fashion",
    description: "Exploring how modern fashion brands are revolutionizing the industry with eco-conscious production methods.",
    duration: "18:30",
    date: "2024",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop",
    videoUrl: "",
  },
  {
    title: "Urban Stories: City at Night",
    description: "A visual poem capturing the essence of metropolitan life after dark, featuring stunning cinematography.",
    duration: "8:20",
    date: "2023",
    thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=450&fit=crop",
    videoUrl: "",
  },
  {
    title: "Culinary Masters Documentary",
    description: "Following three Michelin-starred chefs as they prepare for the most important night of their careers.",
    duration: "22:15",
    date: "2024",
    thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=450&fit=crop",
    videoUrl: "",
  },
];

export default function LongFormSection() {
  return (
    <section id="longform" className="section-padding">
      <div className="container mx-auto">
        <SectionHeader
          badge="🎥 Long-form Content"
          title="Cinematic"
          titleAccent="Brand Films"
          description="Story-driven videos that build emotional connections. From documentaries to brand films, we create narratives that resonate."
        />

        <div className="space-y-8">
          {longformData.map((video, index) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Video thumbnail */}
              <div className={`relative group ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="aspect-video rounded-2xl overflow-hidden hover-glow cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  
                  {/* Play button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Play className="w-8 h-8 text-foreground ml-1" fill="currentColor" />
                    </div>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
              </div>

              {/* Content */}
              <div className={`space-y-4 ${index % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
                <div className={`flex items-center gap-4 text-sm text-muted-foreground ${
                  index % 2 === 1 ? "md:justify-end" : ""
                }`}>
                  {/* <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {video.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {video.date}
                  </span> */}
                </div>

                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  {video.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {video.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-full glass-card font-heading font-medium hover:bg-secondary/20 transition-colors border border-secondary/20"
                >
                  Watch Full Video
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}