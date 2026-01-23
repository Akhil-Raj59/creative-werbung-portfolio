"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../reels/SectionHeader";
import { Play, Award, ExternalLink } from "lucide-react";

const featuredData = [
  {
    title: "Nike: Run The Future",
    client: "Nike Athletics",
    description: "A groundbreaking campaign blending real athletes with AI-generated environments. This project pushed the boundaries of what's possible in sports advertising, creating an immersive experience that transported viewers into a futuristic running world.",
    awards: ["Cannes Lions Bronze", "D&AD Pencil"],
    services: ["Concept", "Direction", "Editing", "VFX", "Color Grading"],
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=600&fit=crop",
    videoUrl: "", // Senior se URL milega
    stats: { views: "15M+", engagement: "8.2%", reach: "Global" },
  },
  {
    title: "Mercedes-Benz EQ: Electric Dreams",
    client: "Mercedes-Benz",
    description: "Cinematic launch film for the new EQ electric vehicle series. Combining stunning automotive photography with ethereal motion graphics, we created a visual language that speaks to the future of sustainable luxury mobility.",
    awards: ["Webby Award", "Red Dot Design"],
    services: ["Creative Direction", "Cinematography", "Motion Design", "Sound Design"],
    thumbnail: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&h=600&fit=crop",
    videoUrl: "",
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
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Large hero image */}
              <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-10 group cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.thumbnail})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                
                {/* Play button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center group-hover:bg-secondary/30 transition-colors glow-primary">
                    <Play className="w-10 h-10 text-foreground ml-1" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Project number */}
                <div className="absolute top-8 left-8">
                  <span className="font-heading text-8xl font-bold text-foreground/10">
                    0{index + 1}
                  </span>
                </div>

                {/* Awards badges */}
                <div className="absolute top-8 right-8 flex flex-wrap gap-2 justify-end max-w-xs">
                  {project.awards.map((award) => (
                    <span
                      key={award}
                      className="px-3 py-1.5 rounded-full glass-card text-xs font-medium flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5 text-secondary" />
                      {award}
                    </span>
                  ))}
                </div>
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

                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="px-4 py-2 rounded-full glass-card text-sm font-medium"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-heading font-semibold"
                  >
                    View Case Study
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Stats */}
                <div className="space-y-6">
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
          ))}
        </div>
      </div>
    </section>
  );
}