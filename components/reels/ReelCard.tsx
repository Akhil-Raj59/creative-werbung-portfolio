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
    if (videoRef.current && videoUrl) {
      if (isHovered) {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isHovered, videoUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${aspectClass} rounded-2xl overflow-hidden group cursor-pointer bg-black`}
    >
      
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${thumbnail})` }}
      />

      
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover z-10 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />

      
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
            <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>
      )}

      
      {/* <div className="absolute bottom-0 left-0 right-0 p-5 z-40">
        <span className="text-xs uppercase tracking-widest text-primary font-bold mb-1 block">
          {category}
        </span>
        <h3 className="text-lg font-bold text-white line-clamp-2">
          {title}
        </h3>
        
        {(views || likes) && (
          <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
            {views && <span className="flex items-center gap-1"><Eye size={14} /> {views}</span>}
            {likes && <span className="flex items-center gap-1"><Heart size={14} /> {likes}</span>}
          </div>
        )}
      </div> */}
    </motion.div>
  );
}