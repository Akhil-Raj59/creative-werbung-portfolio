"use client";

import { SectionHeader } from "../SectionHeader";
import { VideoCard } from "./ReelCard";

const reelsData = [
  {
    title: "Summer Vibes Fashion Edit",
    category: "Fashion",
    views: "1.2M",
    likes: "89K",
    thumbnail: "/assets/reels/thumbnails/Reel%201.jpg",
    videoUrl: "/assets/reels/reel-1.mp4", 
  },
  {
    title: "Street Food Documentary",
    category: "Food",
    views: "856K",
    likes: "62K",
    thumbnail: "/assets/reels/thumbnails/reel%202.jpg",
    videoUrl: "/assets/reels/reel-2.mp4", 
  },
  {
    title: "Urban Dance Challenge",
    category: "Dance",
    views: "2.1M",
    likes: "145K",
    thumbnail: "/assets/reels/thumbnails/reel%203.jpg",
    videoUrl: "/assets/reels/reel-3.mp4", 
  },
  {
    title: "Skincare Routine Reveal",
    category: "Beauty",
    views: "678K",
    likes: "45K",
    thumbnail: "/assets/reels/thumbnails/reel%204.jpg",
    videoUrl: "/assets/reels/reel-4.mp4"
    
  },
  {
    title: "Fitness Transformation",
    category: "Lifestyle",
    views: "934K",
    likes: "71K",
    thumbnail: "/assets/reels/thumbnails/reel%205.jpg",
    videoUrl: "/assets/reels/reel-10.mp4"
  },
  {
    title: "Travel Vlog: Tokyo Nights",
    category: "Travel",
    views: "1.5M",
    likes: "112K",
    thumbnail: "/assets/reels/thumbnails/reel%206.jpg",
    videoUrl: "/assets/reels/reel-6.mp4"
  },
  {
    title: "Coffee Art Mastery",
    category: "Food",
    views: "567K",
    likes: "38K",
    thumbnail: "/assets/reels/thumbnails/reel%207.jpg",
    videoUrl: "/assets/reels/reel-7.mp4"
  },
  {
    title: "Sneaker Unboxing Hype",
    category: "Fashion",
    views: "789K",
    likes: "54K",
    thumbnail: "/assets/reels/thumbnails/reel%208.jpg",
    videoUrl: "/assets/reels/reel-8.mp4"
  },
  {
    title: "Yoga Flow Morning",
    category: "Wellness",
    views: "423K",
    likes: "29K",
    thumbnail: "/assets/reels/thumbnails/reel%208.jpg",
    videoUrl: "/assets/reels/reel-9.mp4"
  },
  {
    title: "Tech Review: Latest Gadgets",
    category: "Tech",
    views: "1.8M",
    likes: "98K",
    thumbnail: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=700&fit=crop",
    videoUrl: "/assets/reels/reel-11.mp4"
  },
  
  
];

export default function ReelsSection() {
  return (
    <section id="reels" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <SectionHeader
          badge="🎬 Reels & Short Content"
          title="Scroll-Stopping"
          titleAccent="Vertical Magic"
          description="Fast-paced edits designed for Instagram, TikTok, and YouTube Shorts. Crafted to capture attention in the first second."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {reelsData.map((reel, index) => (
            <VideoCard
              key={reel.title}
              title={reel.title}
              category={reel.category}
              thumbnail={reel.thumbnail}
              videoUrl={reel.videoUrl}
              views={reel.views}
              likes={reel.likes}
              variant="vertical"
              delay={index * 0.05}
            />
          ))}
        </div>

      
      </div>
    </section>
  );
}