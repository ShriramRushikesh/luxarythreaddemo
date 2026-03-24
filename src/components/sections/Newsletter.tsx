"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  return (
    <section className="py-24 bg-muted/50 border-y border-border overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-playfair tracking-normal leading-tight">
            Join Our Fashion Community
          </h2>
          <p className="text-gray-500 text-sm tracking-widest uppercase mb-10 max-w-lg mx-auto leading-loose italic">
            Be the first to know about new arrivals, exclusive events, and fashion insights.
          </p>
          
          <div className="bg-black text-white px-8 py-3 text-xs uppercase tracking-[0.4em] mb-12 inline-block">
            Get 10% off your first order
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto items-center">
            <Input 
              placeholder="Enter your email address" 
              className="rounded-none border-b-2 border-x-0 border-t-0 border-black bg-transparent focus-visible:ring-0 px-0 h-12 text-sm placeholder:text-gray-400 placeholder:uppercase placeholder:tracking-widest"
            />
            <Button size="lg" className="rounded-none bg-black text-white uppercase tracking-[0.2em] px-10 h-12 hover:bg-black/80 transition-all font-bold">
              Subscribe
            </Button>
          </div>

          <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
            By subscribing, you agree to our Terms of Use and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
