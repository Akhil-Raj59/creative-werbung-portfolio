"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Play, Cpu, Zap, Bot, Volume2, VolumeX } from "lucide-react";
import { useRef, useState, useEffect } from "react";

type AIVideoItem = {
  title: string;
  description: string;
  icon: any;
  thumbnail: string;
  videoUrl: string;
};

const aiData: AIVideoItem[] = [
  {
    title: "AI-Generated Product Demo",
    description: "Fully AI-crafted product visualization",
    icon: Cpu,
    thumbnail: "/assets/ai/thumbnails/thumbnail-1.jpg",
    videoUrl: "/assets/ai/ai-1.mp4",
  },
  {
    title: "Neural Style Transfer Art",
    description: "Artistic video transformation using AI",
    icon: Zap,
    thumbnail: "/assets/ai/thumbnails/thumbnail-reel.jpg",
    videoUrl: "/assets/ai/ai-reel.mp4",
  },
  {
    title: "AI Avatar Presentation",
    description: "Digital human spokesperson creation",
    icon: Bot,
    thumbnail: "/assets/ai/thumbnails/thumbnail-3.jpg",
    videoUrl: "/assets/ai/ai-3.mp4",
  },
  {
    title: "Generative Motion Design",
    description: "AI-driven abstract animations",
    icon: Cpu,
    thumbnail: "/assets/ai/thumbnails/thumbnail-2.jpg",
    videoUrl: "/assets/ai/ai-2.mp4",
  },
  {
    title: "Deep Learning VFX",
    description: "AI-enhanced visual effects",
    icon: Zap,
    thumbnail: "/assets/ai/thumbnails/thumbnail-4.jpg",
    videoUrl: "/assets/ai/ai-4.mp4",
  },
];

export default function AIVideosSection() {
  return (
    <section id="ai" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />

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

function AIVideoCard({
  item,
  index,
}: {
  item: AIVideoItem;
  index: number;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isReel = item.videoUrl.includes("reel");

  const playVideo = () => {
    videoRef.current?.play().catch(() => {});
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  
  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;
    setIsHovered(true);
    playVideo();
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    setIsHovered(false);
    pauseVideo();
  };

  
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth >= 768) return;
        entry.isIntersecting ? playVideo() : pauseVideo();
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
    onClick={toggleMute}
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative
        ${isReel ? "hidden md:block" : ""}
        ${index === 0 && !isReel ? "md:col-span-2 lg:col-span-2" : ""}
      `}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative rounded-2xl overflow-hidden cursor-pointer bg-black
          transition-all duration-500
          group-hover:scale-[1.05]
          group-hover:shadow-[0_0_40px_rgba(99,102,241,0.45)]
          ${
            isReel
              ? "aspect-[9/10]"
              : index === 0
              ? "aspect-[2/1]"
              : "aspect-[3/2]"
          }
        `}
      >
        
        {!isPlaying && (
          <motion.div
            className="absolute inset-0 bg-cover bg-center z-10"
            style={{ backgroundImage: `url(${item.thumbnail})` }}
          />
        )}

        
        <video
          ref={videoRef}
          src={item.videoUrl}
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />

        
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 text-white backdrop-blur"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-30">
          <div />
          <div>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        </div>

        
        <motion.div
          animate={{ opacity: isPlaying && isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center z-40"
        >
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-pulse-glow">
            <Play
              className="w-6 h-6 text-primary-foreground ml-1"
              fill="currentColor"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
