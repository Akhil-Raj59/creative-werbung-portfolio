"use client";

import { Play, Eye, Heart } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface VideoCardProps {
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
  views?: string;
  likes?: string;
  variant?: "vertical" | "horizontal" | "featured";
  delay?: number;
}

export function VideoCard({
  title,
  category,
  thumbnail,
  videoUrl,
  views,
  likes,
  variant = "vertical",
  delay = 0,
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const aspectClass = {
    vertical: "aspect-[9/16]",
    horizontal: "aspect-video",
    featured: "aspect-[16/10]",
  }[variant];

  useEffect(() => {
    if (!videoRef.current || !videoUrl) return;

    if (isHovered && window.innerWidth >= 768) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isHovered, videoUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${aspectClass} group cursor-pointer
        transition-all duration-500 ease-out
        hover:scale-[1.06]
        hover:shadow-[0_0_60px_rgba(99,102,241,0.55)]
      `}
    >
      
      <div className="absolute inset-0 rounded-2xl overflow-hidden bg-black">

      
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-700
            ${isPlaying ? "opacity-0" : "opacity-100"}
            group-hover:scale-110
          `}
          style={{ backgroundImage: `url(${thumbnail})` }}
        />

      
        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
              ${isPlaying ? "opacity-100" : "opacity-0"}
            `}
          />
        )}

        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

      
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center
              shadow-lg shadow-primary/40 animate-pulse">
              <Play
                className="w-5 h-5 text-primary-foreground ml-0.5"
                fill="currentColor"
              />
            </div>
          </div>
        )}

        
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <span className="text-[11px] uppercase tracking-widest text-primary font-semibold">
            {category}
          </span>

          <h3 className="text-sm font-bold text-white mt-1 line-clamp-2">
            {title}
          </h3>

          {/* {(views || likes) && (
            <div className="flex items-center gap-3 mt-2 text-xs text-white/70">
              {views && (
                <span className="flex items-center gap-1">
                  <Eye size={12} /> {views}
                </span>
              )}
              {likes && (
                <span className="flex items-center gap-1">
                  <Heart size={12} /> {likes}
                </span>
              )}
            </div>
          )} */}
        </div>
      </div>
    </motion.div>
  );
}
