"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Play, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

function MotionCard({
  item,
  index,
}: {
  item: MotionItem;
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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


  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); 
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <motion.div
      onClick={() => toggleSound()} 
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="
          relative aspect-[9/13] cursor-pointer mb-5
          transition-all duration-500 ease-out
          group-hover:scale-[1.06]
          group-hover:shadow-[0_0_60px_rgba(99,102,241,0.55)]
        "
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden bg-black">
          {!isPlaying && (
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
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

          <div className="absolute inset-0 z-20 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          <motion.div
            animate={{ opacity: isPlaying ? 0 : 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
              <Play
                className="w-6 h-6 text-primary-foreground ml-1"
                fill="currentColor"
              />
            </div>
          </motion.div>

          {isPlaying && (
            <button
              onClick={(e) => toggleSound(e)} 
              className="absolute top-3 right-3 z-40 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>
          )}
        </div>
      </div>

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
      </div>
    </motion.div>
  );
}