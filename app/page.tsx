import AIVideosSection from "@/components/ai-videos/AIVideosSection";
import FeaturedSection from "@/components/featured/FeaturedSection";
import Hero from "@/components/hero/Hero";
import LongFormSection from "@/components/long-form/LongFormSection";
import MotionSection from "@/components/motion/MotionSection";
import ReelsSection from "@/components/reels/ReelsSection";
import CTAForm from "@/components/cta/CTAForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <ReelsSection />
      <MotionSection />
      <LongFormSection />
      <AIVideosSection />
      <FeaturedSection />
      <CTAForm />
    </main>
  );
}