"use client";

import { motion } from "framer-motion";
import { Play, Eye, Heart } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface VideoCardProps {
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string; // Video URL for autoplay
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

  // Autoplay on hover
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && videoUrl) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isHovered, videoUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${aspectClass} rounded-2xl overflow-hidden group cursor-pointer hover-glow`}
    >
      {/* Video or Thumbnail */}
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          poster={thumbnail}
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Play button (hide when video is playing) */}
      {!isPlaying && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center glow-primary">
            <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-2"
        >
          <span className="text-xs uppercase tracking-wider text-primary font-medium">
            {category}
          </span>
        </motion.div>

        <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-3 line-clamp-2">
          {title}
        </h3>

        {(views || likes) && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {views && (
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {views}
              </span>
            )}
            {likes && (
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" />
                {likes}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/30 transition-colors duration-300" />
    </motion.div>
  );
}