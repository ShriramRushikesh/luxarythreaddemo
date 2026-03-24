"use client";

import React from "react";
import { motion } from "framer-motion";

const brands = [
  { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  { name: "Zara", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg" },
  { name: "H&M", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" },
  { name: "Tommy Hilfiger", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Tommy_Hilfiger_logo.svg" },
  { name: "Calvin Klein", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Calvin_klein_logo.svg" },
  { name: "Levi's", logo: "https://upload.wikimedia.org/wikipedia/commons/0/03/Levis_logo.svg" },
  { name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_complete_logo.svg" },
];

const BrandShowcase = () => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col items-center mb-16 space-y-4">
          <h2 className="text-2xl uppercase tracking-[0.4em] font-light text-gray-500">
            Featured Brands
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 items-center">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex justify-center group"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 md:h-12 w-auto grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
