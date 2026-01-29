"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const longformData = [
  {
    title: "Behind The Brand: Journey of Innovation",
    description:
      "A cinematic documentary exploring the creative process behind a leading tech startup's journey from garage to global.",
    duration: "12:45",
    date: "2024",
    thumbnail: "/assets/long/thumbnails/long-2.jpg",
    videoUrl: "/assets/long/long-1.mp4",
    aspectRatio: "16:9",
  },
  {
    title: "The Art of Sustainable Fashion",
    description:
      "Exploring how modern fashion brands are revolutionizing the industry with eco-conscious production methods.",
    duration: "18:30",
    date: "2024",
    thumbnail: "/assets/long/thumbnails/long-1.jpg",
    videoUrl: "/assets/long/long-2.mp4",
    aspectRatio: "16:9",
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

        <div className="space-y-10">
          {longformData.map((video, index) => (
            <LongFormCard key={video.title} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LongFormCard({ video, index }: { video: any; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  
  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
    setIsPlaying(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    setIsHovered(false);
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth >= 768) return;

        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          if (!videoRef.current) return;
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const getAspectRatioClass = (ratio: string) => {
    const map: Record<string, string> = {
      "16:9": "aspect-video",
      "21:9": "aspect-[21/9]",
      "4:3": "aspect-[4/3]",
      "9:16": "aspect-[9/16]",
      "1:1": "aspect-square",
    };
    return map[ratio] || "aspect-video";
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${
        index % 2 === 1 ? "md:flex-row-reverse" : ""
      }`}
    >
      
      <div className={`group ${index % 2 === 1 ? "md:order-2" : ""}`}>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`
            relative cursor-pointer
            transition-all duration-500 ease-out
            group-hover:scale-[1.05]
            group-hover:shadow-[0_0_70px_rgba(99,102,241,0.55)]
          `}
        >
          
          <div
            className={`relative ${getAspectRatioClass(
              video.aspectRatio
            )} rounded-2xl overflow-hidden bg-black`}
          >
            
            {!isPlaying && (
              <div
                className="absolute inset-0 z-10 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${video.thumbnail})` }}
              />
            )}

            
            <video
              ref={videoRef}
              src={video.videoUrl}
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? "scale-105" : "scale-100"
              }`}
            />

            
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-20" />

            
            <motion.div
              animate={{ opacity: isPlaying && isHovered ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-30 flex items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full glass-card bg-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Play
                  className="w-8 h-8 text-primary-foreground ml-1"
                  fill="currentColor"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      
      <div
        className={`space-y-4 ${
          index % 2 === 1 ? "md:order-1 md:text-right" : ""
        }`}
      >
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          {video.title}
        </h3>

        <p className="text-muted-foreground leading-relaxed">
          {video.description}
        </p>
      </div>
    </motion.div>
  );
}
