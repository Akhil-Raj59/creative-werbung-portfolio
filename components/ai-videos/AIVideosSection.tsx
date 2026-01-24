"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../reels/SectionHeader";
import { Play, Cpu, Zap, Bot } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const aiData = [
  {
    title: "AI-Generated Product Demo",
    description: "Fully AI-crafted product visualization",
    icon: Cpu,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    title: "Neural Style Transfer Art",
    description: "Artistic video transformation using AI",
    icon: Zap,
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    title: "AI Avatar Presentation",
    description: "Digital human spokesperson creation",
    icon: Bot,
    thumbnail: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&h=400&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    title: "Generative Motion Design",
    description: "AI-driven abstract animations",
    icon: Cpu,
    thumbnail: "https://images.unsplash.com/photo-1614851099511-773084f6911d?w=600&h=400&fit=crop",
    videoUrl: "",
  },
  {
    title: "Deep Learning VFX",
    description: "AI-enhanced visual effects",
    icon: Zap,
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
    videoUrl: "",
  },
];

export default function AIVideosSection() {
  return (
    <section id="ai" className="section-padding relative overflow-hidden">
      {/* AI-themed background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      {/* Holographic grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--accent) / 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--accent) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[80px]"
      />
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
      />

      <div className="container mx-auto relative z-10">
        <SectionHeader
          badge="🤖 AI-Powered Videos"
          title="Future of"
          titleAccent="Video Creation"
          description="Pushing boundaries with AI-generated and enhanced video content. Experience the cutting edge of creative technology."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiData.map((item, index) => (
            <AIVideoCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AIVideoCard({ item, index }: { item: any; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Desktop: Play/Pause on hover (resume from where it stopped)
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
      videoRef.current.pause(); // Pause only, don't reset
      setIsPlaying(false);
    }
  };

  // Mobile: Play on scroll into view
  useEffect(() => {
    if (!item.videoUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.innerWidth < 768) {
            // Mobile view
            if (videoRef.current) {
              videoRef.current.play();
              setIsPlaying(true);
            }
          } else {
            if (videoRef.current && window.innerWidth < 768) {
              videoRef.current.pause(); // Pause only
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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative ${
        index === 0 ? "md:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative ${
          index === 0 ? "aspect-[2/1]" : "aspect-[3/2]"
        } rounded-2xl overflow-hidden cursor-pointer bg-black`}
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

        {/* Glitch overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-20" />
        
        {/* Scanlines effect */}
        <div className="absolute inset-0 scanline opacity-0 group-hover:opacity-100 transition-opacity z-20" />

        {/* Content overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-30">
          <div className="flex justify-between items-start">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-xl glass-card flex items-center justify-center"
            >
              <item.icon className="w-6 h-6 text-accent" />
            </motion.div>

            <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30">
              AI Enhanced
            </span>
          </div>

          <div>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        </div>

        {/* Center play button (Hide on hover when playing) */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: isPlaying && isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center z-40"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center animate-pulse-glow"
          >
            <Play className="w-6 h-6 text-foreground ml-1" fill="currentColor" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}