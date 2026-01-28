"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Play, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MotionItem = {
  title: string;
  client: string;
  thumbnail: string;
  videoUrl: string;
};

const motionData: MotionItem[] = [
  {
    title: "Brand Identity Animation",
    client: "TechFlow Inc.",
    thumbnail: "/assets/motion/thumbnails/motion-1.jpg",
    videoUrl: "/assets/motion/motion-1.mp4",
  },
  {
    title: "Explainer Video Graphics",
    client: "HealthPlus App",
    thumbnail: "/assets/motion/thumbnails/motion-2.jpg",
    videoUrl: "/assets/motion/motion-2.mp4",
  },
  {
    title: "Logo Reveal Sequence",
    client: "Luxe Fashion",
    thumbnail: "/assets/motion/thumbnails/motion-3.jpg",
    videoUrl: "/assets/motion/motion-3.mp4",
  },
  
];

export default function MotionSection() {
  return (
    <section
      id="motion"
      className="section-padding bg-gradient-to-b from-muted/30 to-background"
    >
      <div className="container mx-auto">
        <SectionHeader
          badge="🎨 Motion Graphics"
          title="Kinetic"
          titleAccent="Visual Design"
          description="Dynamic animations and motion graphics that bring brands to life. From logo reveals to full explainer videos."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {motionData.map((item, index) => (
            <MotionCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MotionCard({ item, index }: { item: MotionItem; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const playVideo = () => {
    videoRef.current?.play().catch(() => {});
    setIsPlaying(true);
  };

  const resetVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  // Desktop hover
  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;
    setIsHovered(true);
    playVideo();
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    setIsHovered(false);
    resetVideo();
  };

  // Mobile scroll autoplay
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth >= 768) return;

        entry.isIntersecting ? playVideo() : resetVideo();
      },
      { threshold: 0.6 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group"
    >
      {/* 9:16 CARD */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[9/13] rounded-2xl overflow-hidden bg-black cursor-pointer hover-glow mb-5"
      >
        {/* Thumbnail */}
        {!isPlaying && (
          <div
            className="absolute inset-0 z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.thumbnail})` }}
          />
        )}

        {/* Video */}
        <video
          ref={videoRef}
          src={item.videoUrl}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        {/* Play button */}
        <motion.div
          animate={{ opacity: isPlaying ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 z-30 flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center glow-primary">
            <Play
              className="w-6 h-6 text-primary-foreground ml-1"
              fill="currentColor"
            />
          </div>
        </motion.div>

        {/* Scan line */}
        <motion.div
          animate={{ y: ["100%", "-100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-1/3 z-20 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent opacity-0 group-hover:opacity-100"
        />
      </div>

      {/* Text */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold mb-1 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {item.client}
          </p>
        </div>

        <motion.div
          whileHover={{ rotate: 45 }}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
        >
          →
        </motion.div>
      </div>
    </motion.div>
  );
}
