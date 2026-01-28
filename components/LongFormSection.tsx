"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Play, Clock, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const longformData = [
  {
    title: "Behind The Brand: Journey of Innovation",
    description: "A cinematic documentary exploring the creative process behind a leading tech startup's journey from garage to global.",
    duration: "12:45",
    date: "2024",
    thumbnail: "/assets/long/thumbnails/long-2.jpg",
    videoUrl: "assets/long/long-1.mp4",
    aspectRatio: "16:9",
  },
  {
    title: "The Art of Sustainable Fashion",
    description: "Exploring how modern fashion brands are revolutionizing the industry with eco-conscious production methods.",
    duration: "18:30",
    date: "2024",
    thumbnail: "/assets/long/thumbnails/long-1.jpg",
    videoUrl: "assets/long/long-2.mp4",
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

        <div className="space-y-8">
          {longformData.map((video, index) => (
            <LongFormCard key={video.title} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LongFormCard({ video, index }: { video: any; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && video.videoUrl) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  
  useEffect(() => {
    if (!video.videoUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.innerWidth < 768) {
            
            if (videoRef.current) {
              videoRef.current.play();
              setIsPlaying(true);
            }
          } else {
            if (videoRef.current && window.innerWidth < 768) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [video.videoUrl]);

  
  const getAspectRatioClass = (ratio: string) => {
    const ratioMap: { [key: string]: string } = {
      "16:9": "aspect-video",
      "21:9": "aspect-[21/9]",
      "4:3": "aspect-[4/3]",
      "9:16": "aspect-[9/16]",
      "1:1": "aspect-square",
    };
    return ratioMap[ratio] || "aspect-video";
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${
        index % 2 === 1 ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Video Player */}
      <div className={`relative group ${index % 2 === 1 ? "md:order-2" : ""}`}>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`relative ${getAspectRatioClass(video.aspectRatio)} rounded-2xl overflow-hidden hover-glow cursor-pointer bg-black`}
        >
          {/* Thumbnail (Show when not playing) */}
          {!isPlaying && (
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-cover bg-center z-10"
              style={{ backgroundImage: `url(${video.thumbnail})` }}
            />
          )}

          {/* Video Element */}
          {video.videoUrl && (
            <video
              ref={videoRef}
              src={video.videoUrl}
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? "scale-105" : "scale-100"
              }`}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-20" />

          {/* Play Button (Hide on hover when playing) */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: isPlaying && isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center z-30"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 rounded-full glass-card flex items-center justify-center group-hover:bg-primary/20 transition-colors"
            >
              <Play className="w-8 h-8 text-foreground ml-1" fill="currentColor" />
            </motion.div>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Content */}
      <div className={`space-y-4 ${index % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
        <div className={`flex items-center gap-4 text-sm text-muted-foreground ${
          index % 2 === 1 ? "md:justify-end" : ""
        }`}>
        </div>

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