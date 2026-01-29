"use client";

import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface VideoCardProps {
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
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
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const play = () => {
    if (!videoRef.current) return;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  const pause = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth >= 768) return;

        if (entry.isIntersecting) {
          play();
        } else {
          pause();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  
  const toggleSound = () => {
    if (!videoRef.current) return;

    setHasUserInteracted(true);
    const newMuted = !isMuted;

    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    play();
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      onMouseEnter={() => window.innerWidth >= 768 && play()}
      onMouseLeave={() => window.innerWidth >= 768 && pause()}
      onClick={toggleSound}
      className="relative aspect-[9/16] group cursor-pointer
        transition-all duration-500
        hover:scale-[1.06]
        hover:shadow-[0_0_60px_rgba(99,102,241,0.55)]
      "
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden bg-black">

      
        {!isPlaying && (
          <div
            className="absolute inset-0 bg-cover bg-center z-10"
            style={{ backgroundImage: `url(${thumbnail})` }}
          />
        )}

        
        {videoUrl && (
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
        )}

        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />

        
        {!hasUserInteracted && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
            </div>
          </div>
        )}

      
        {isPlaying && (
          <div className="absolute top-3 right-3 z-20 bg-black/60 p-2 rounded-full">
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </div>
        )}

        
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <span className="text-[11px] uppercase tracking-widest text-primary font-semibold">
            {category}
          </span>
          <h3 className="text-sm font-bold text-white mt-1 line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
