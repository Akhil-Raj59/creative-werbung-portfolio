"use client";

import { SectionHeader } from "../SectionHeader";
import { VideoCard } from "./ReelCard";

const reelsData = [
  {
    title: "Summer Vibes Fashion Edit",
    category: "Fashion",
    views: "1.2M",
    likes: "89K",
    thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=700&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", 
  },
  {
    title: "Street Food Documentary",
    category: "Food",
    views: "856K",
    likes: "62K",
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=700&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", 
  },
  {
    title: "Urban Dance Challenge",
    category: "Dance",
    views: "2.1M",
    likes: "145K",
    thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=700&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", 
  },
  {
    title: "Skincare Routine Reveal",
    category: "Beauty",
    views: "678K",
    likes: "45K",
    thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=700&fit=crop",
  },
  {
    title: "Fitness Transformation",
    category: "Lifestyle",
    views: "934K",
    likes: "71K",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=700&fit=crop",
  },
  {
    title: "Travel Vlog: Tokyo Nights",
    category: "Travel",
    views: "1.5M",
    likes: "112K",
    thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=700&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    title: "Coffee Art Mastery",
    category: "Food",
    views: "567K",
    likes: "38K",
    thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=700&fit=crop",
  },
  {
    title: "Sneaker Unboxing Hype",
    category: "Fashion",
    views: "789K",
    likes: "54K",
    thumbnail: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=700&fit=crop",
  },
  {
    title: "Yoga Flow Morning",
    category: "Wellness",
    views: "423K",
    likes: "29K",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=700&fit=crop",
  },
  {
    title: "Tech Review: Latest Gadgets",
    category: "Tech",
    views: "1.8M",
    likes: "98K",
    thumbnail: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=700&fit=crop",
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