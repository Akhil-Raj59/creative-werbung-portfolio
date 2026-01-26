"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Play, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const motionData = [
  {
    title: "Brand Identity Animation",
    client: "TechFlow Inc.",
    thumbnail: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=600&h=400&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    title: "Explainer Video Graphics",
    client: "HealthPlus App",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    title: "Logo Reveal Sequence",
    client: "Luxe Fashion",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
];

export default function MotionSection() {
  return (
    <section id="motion" className="section-padding bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <SectionHeader
          badge="🎨 Motion Graphics"
          title="Kinetic"
          titleAccent="Visual Design"
          description="Dynamic animations and motion graphics that bring brands to life. From logo reveals to full explainer videos."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {motionData.map((item, index) => (
            <MotionCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MotionCard({ item, index }: { item: any; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && item.videoUrl) {
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
    if (!item.videoUrl) return;

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
  }, [item.videoUrl]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      {/* Card */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-6 hover-glow cursor-pointer bg-black"
      >
        {/* Thumbnail (Show when not playing) */}
        {!isPlaying && (
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-cover bg-center z-10"
            style={{ backgroundImage: `url(${item.thumbnail})` }}
          />
        )}

        {/* Video Element */}
        {item.videoUrl && (
          <video
            ref={videoRef}
            src={item.videoUrl}
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
        )}
        
        {/* Overlay with animated shapes */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
        
        

        {/* Play button (Hide on hover when playing) */}
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
            className="w-16 h-16 rounded-full bg-primary flex items-center justify-center glow-primary"
          >
            <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Animated scan line */}
        <motion.div
          animate={{ y: ["100%", "-100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20"
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
  );
}