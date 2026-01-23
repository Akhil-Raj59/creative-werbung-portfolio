"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Reels", href: "#reels" },
  { label: "Featured", href: "#featured" },
  { label: "Motion", href: "#motion" },
  { label: "AI Videos", href: "#ai" },
  { label: "Long Videos", href: "#longform" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-card py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#"
          className="font-heading text-xl font-bold tracking-tight"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-gradient-primary">KREATIVE</span>
          <span className="text-foreground"> WERBUNG</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`px-4 py-2 text-sm font-medium transition-colors relative group ${
                activeSection === item.href.slice(1)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${
                  activeSection === item.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </motion.a>
          ))}
        </div>

      <motion.a
        href="#contact" 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hidden md:block px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-sm glow-primary text-center"
        >
          Get in Touch
      </motion.a>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}