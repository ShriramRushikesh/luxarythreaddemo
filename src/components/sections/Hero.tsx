"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    title: "Authentic Luxury, Affordable Prices",
    subtitle: "Spring/Summer Collection 2026",
    cta: "Shop Men's",
  },
  {
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop",
    title: "Timeless Elegance Defined",
    subtitle: "Discover Our Curated Handbags",
    cta: "Shop Women's",
  },
  {
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
    title: "The Ultimate Statement Pieces",
    subtitle: "New Footwear Arrivals",
    cta: "Shop Accessories",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0 h-full w-full"
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          <img
            src={slides[current].image}
            alt="Hero Background"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 h-full w-full flex flex-col items-center justify-center text-center text-white px-4">
        <motion.p
          key={`sub-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-sm uppercase tracking-[0.3em] font-medium mb-4"
        >
          {slides[current].subtitle}
        </motion.p>
        
        <motion.h1
          key={`title-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-playfair mb-10 leading-tight max-w-5xl"
        >
          {slides[current].title}
        </motion.h1>

        <motion.div
          key={`cta-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Button variant="outline" className="bg-transparent text-white border-white px-10 py-7 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-none h-auto">
            {slides[current].cta}
          </Button>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center items-center gap-12">
        <button onClick={prev} className="text-white/50 hover:text-white transition-colors">
          <MoveLeft className="w-8 h-8 font-thin" />
        </button>
        
        <div className="flex gap-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-[2px] w-12 transition-all duration-500",
                current === i ? "bg-white" : "bg-white/30"
              )}
            />
          ))}
        </div>

        <button onClick={next} className="text-white/50 hover:text-white transition-colors">
          <MoveRight className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
