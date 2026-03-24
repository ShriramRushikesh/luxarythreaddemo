"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Men's Collection",
    image: "https://images.unsplash.com/photo-1617137968427-839f26ce17ad?q=80&w=1974&auto=format&fit=crop",
    href: "/men",
    gridClass: "col-span-1 md:col-span-2 row-span-1 h-[400px]",
  },
  {
    title: "Women's Collection",
    image: "https://images.unsplash.com/photo-1539109132314-3477524c859c?q=80&w=1974&auto=format&fit=crop",
    href: "/women",
    gridClass: "col-span-1 md:col-span-1 row-span-2 h-full min-h-[400px]",
  },
  {
    title: "Luxury Accessories",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop",
    href: "/accessories",
    gridClass: "col-span-1 md:col-span-2 row-span-1 h-[400px]",
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className={cat.gridClass}
          >
            <Link href={cat.href} className="group relative block w-full h-full overflow-hidden">
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-700 z-10" />
              
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />
              
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl text-white font-playfair mb-4 lowercase italic tracking-wide">
                    {cat.title}
                  </h3>
                  <span className="text-white text-xs uppercase tracking-[0.3em] font-medium border-b border-white pb-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    Explore More
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
