"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { id: 1, name: "Luxury Silk Shirt", brand: "Zara Premium", price: 4999, salePrice: 3999, image: "https://images.unsplash.com/photo-1596755094514-f87034a26cc1?q=80&w=1974&auto=format&fit=crop" },
  { id: 2, name: "Refined Wool Blazer", brand: "H&M Studio", price: 8999, image: "https://images.unsplash.com/photo-1594932224011-37d402b43b67?q=80&w=1964&auto=format&fit=crop" },
  { id: 3, name: "Classic Leather Loafers", brand: "Aldo Luxury", price: 7500, salePrice: 6000, image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=2070&auto=format&fit=crop" },
  { id: 4, name: "Evening Gown", brand: "Gucci Inspired", price: 15999, image: "https://images.unsplash.com/photo-1518767761162-452f36d7bc43?q=80&w=1974&auto=format&fit=crop" },
  { id: 5, name: "Denim Jacket", brand: "Levi's Premium", price: 5500, salePrice: 4500, image: "https://images.unsplash.com/photo-1576905341939-42b8129d33b3?q=80&w=1935&auto=format&fit=crop" },
  { id: 6, name: "Cashmere Sweater", brand: "Uniqlo U", price: 3500, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop" },
  { id: 7, name: "Floral Summer Dress", brand: "Forever 21 Luxe", price: 2999, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop" },
  { id: 8, name: "Statement Watch", brand: "Fossil Limited", price: 12000, salePrice: 9999, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999&auto=format&fit=crop" },
];

const FeaturedProducts = () => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-playfair lowercase tracking-wide">
            New Arrivals
          </h2>
          <div className="h-[1px] w-24 bg-black/20" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6 rounded-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Sale Badge */}
                {product.salePrice && (
                  <div className="absolute top-4 left-4 bg-black text-white text-[10px] uppercase font-bold px-3 py-1 z-10 tracking-widest">
                    Sale
                  </div>
                )}

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-10 translate-y-4 group-hover:translate-y-0 duration-300">
                  <Button size="icon" variant="secondary" className="rounded-full shadow-lg border-none hover:bg-black hover:text-white transition-all duration-300">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full shadow-lg border-none hover:bg-black hover:text-white transition-all duration-300">
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full shadow-lg border-none hover:bg-red-500 hover:text-white transition-all duration-300">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">{product.brand}</p>
                <h3 className="text-sm font-medium tracking-wide group-hover:underline cursor-pointer">{product.name}</h3>
                <div className="flex items-center gap-2 pt-1 font-mono text-sm tracking-tighter">
                  {product.salePrice ? (
                    <>
                      <span className="text-black font-bold">₹{product.salePrice.toLocaleString()}</span>
                      <span className="text-gray-400 line-through">₹{product.price.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="text-black font-bold">₹{product.price.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Button variant="link" className="text-black uppercase tracking-[0.3em] font-medium border-b border-black pb-1 hover:no-underline hover:text-gray-500 transition-colors">
            View All Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
