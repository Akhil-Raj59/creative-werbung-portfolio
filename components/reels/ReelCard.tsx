"use client";

import Image from "next/image";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface VideoCardProps {
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  delay?: number;
}

export function VideoCard({
  title,
  category,
  thumbnail,
  videoUrl,
  delay = 0,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;
    videoRef.current?.play().catch(() => {});
    setIsPlaying(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
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
      { threshold: 0.6 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); 
    if (!videoRef.current) return;
    
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <motion.div
      onClick={() => toggleMute()} 
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black cursor-pointer group"
    >
      
      {!isPlaying && (
        <Image
          src={thumbnail}
          alt={title}
          fill
          priority={false}
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      <video
        ref={videoRef}
        src={videoUrl}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

      {!isPlaying && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
            <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
          </div>
        </div>
      )}

      {isPlaying && (
        <button
          onClick={(e) => toggleMute(e)} 
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <span className="text-[11px] uppercase tracking-widest text-primary">
          {category}
        </span>
        <h3 className="text-sm font-bold text-white mt-1 line-clamp-2">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}