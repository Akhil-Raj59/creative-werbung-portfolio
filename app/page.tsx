import AIVideosSection from "@/components/AIVideosSection";
import FeaturedSection from "@/components/FeaturedSection";
import Hero from "@/components/hero/Hero";
import LongFormSection from "@/components/LongFormSection";
import MotionSection from "@/components/MotionSection";
import ReelsSection from "@/components/reels/ReelsSection";
import CTAForm from "@/components/CTAForm";

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