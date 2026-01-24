"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../reels/SectionHeader";
import { Play, Award, ExternalLink, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const featuredData = [
  {
    title: "Nike: Run The Future",
    client: "Nike Athletics",
    description: "A groundbreaking campaign blending real athletes with AI-generated environments. This project pushed the boundaries of what's possible in sports advertising, creating an immersive experience that transported viewers into a futuristic running world.",
    awards: ["Cannes Lions Bronze", "D&AD Pencil"],
    services: ["Concept", "Direction", "Editing", "VFX", "Color Grading"],
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    stats: { views: "15M+", engagement: "8.2%", reach: "Global" },
  },
  {
    title: "Mercedes-Benz EQ: Electric Dreams",
    client: "Mercedes-Benz",
    description: "Cinematic launch film for the new EQ electric vehicle series. Combining stunning automotive photography with ethereal motion graphics, we created a visual language that speaks to the future of sustainable luxury mobility.",
    awards: ["Webby Award", "Red Dot Design"],
    services: ["Creative Direction", "Cinematography", "Motion Design", "Sound Design"],
    thumbnail: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    stats: { views: "22M+", engagement: "12.4%", reach: "45 Countries" },
  },
];

export default function FeaturedSection() {
  return (
    <section id="featured" className="section-padding bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto">
        <SectionHeader
          badge="⭐ Featured Work"
          title="Award-Winning"
          titleAccent="Projects"
          description="Our most celebrated work. Case studies of projects that defined brands and captivated audiences worldwide."
        />

        <div className="space-y-24">
          {featuredData.map((project, index) => (
            <FeaturedProject key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({ project, index }: { project: any; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Desktop: Play on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && project.videoUrl) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Open fullscreen video modal
  const handlePlayClick = () => {
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  // Mobile: Play on scroll into view
  useEffect(() => {
    if (!project.videoUrl) return;

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
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [project.videoUrl]);

  // Auto-play modal video when opened
  useEffect(() => {
    if (showModal && modalVideoRef.current) {
      modalVideoRef.current.play();
    }
  }, [showModal]);

  return (
    <>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Large hero image/video */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handlePlayClick}
          className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-10 group cursor-pointer bg-black"
        >
          {/* Thumbnail (Show when not playing) */}
          {!isPlaying && (
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center z-10"
              style={{ backgroundImage: `url(${project.thumbnail})` }}
            />
          )}

          {/* Video Element */}
          {project.videoUrl && (
            <video
              ref={videoRef}
              src={project.videoUrl}
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${
                isHovered ? "scale-105" : "scale-100"
              }`}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-20" />
          
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
              className="w-24 h-24 rounded-full glass-card flex items-center justify-center group-hover:bg-secondary/30 transition-colors glow-primary"
            >
              <Play className="w-10 h-10 text-foreground ml-1" fill="currentColor" />
            </motion.div>
          </motion.div>

         
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Main info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                {project.client}
              </span>
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
                {project.title}
              </h3>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>

          

            
          </div>

          {/* Stats */}
          <div className="space-y-6 text-secondary">
            <h4 className="font-heading text-lg font-semibold text-muted-foreground">
              Project Impact
            </h4>
            <div className="space-y-4">
              <div className="p-4 rounded-xl glass-card">
                <div className="text-3xl font-heading font-bold text-gradient-secondary">
                  {project.stats.views}
                </div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
              <div className="p-4 rounded-xl glass-card">
                <div className="text-3xl font-heading font-bold text-gradient-secondary">
                  {project.stats.engagement}
                </div>
                <div className="text-sm text-muted-foreground">Engagement Rate</div>
              </div>
              <div className="p-4 rounded-xl glass-card">
                <div className="text-3xl font-heading font-bold text-gradient-secondary">
                  {project.stats.reach}
                </div>
                <div className="text-sm text-muted-foreground">Campaign Reach</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Video Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={handleCloseModal}
        >
          {/* Close button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-6 right-6 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-muted/50 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video player */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              src={project.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}