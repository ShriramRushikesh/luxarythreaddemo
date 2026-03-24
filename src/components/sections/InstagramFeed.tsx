"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageSquare } from "lucide-react";

const instagramPosts = [
  { id: 1, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop", likes: "1.2k", comments: "45" },
  { id: 2, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop", likes: "850", comments: "28" },
  { id: 3, image: "https://images.unsplash.com/photo-1539109132314-3477524c859c?q=80&w=1974&auto=format&fit=crop", likes: "2.5k", comments: "112" },
  { id: 4, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop", likes: "1.7k", comments: "67" },
  { id: 5, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop", likes: "920", comments: "31" },
  { id: 6, image: "https://images.unsplash.com/photo-1627384113743-6bd5a4b9fcfe?q=80&w=2070&auto=format&fit=crop", likes: "1.1k", comments: "40" },
];

const InstagramFeed = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center mb-16 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Instagram className="w-5 h-5" />
            <span className="text-sm uppercase tracking-[0.3em] font-bold">Instagram</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-playfair lowercase tracking-wide text-center">
            Follow Us @luxurythreadspune
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {instagramPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative aspect-square group overflow-hidden"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white z-10">
                <div className="flex items-center gap-2 font-mono text-sm tracking-tighter">
                  <Heart className="w-4 h-4 fill-white" />
                  {post.likes}
                </div>
                <div className="flex items-center gap-2 font-mono text-sm tracking-tighter">
                  <MessageSquare className="w-4 h-4 fill-white" />
                  {post.comments}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
