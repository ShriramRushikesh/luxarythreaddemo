"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    brand: string;
    price: number;
    salePrice?: number;
    images: string[];
    rating: number;
    isNew?: boolean;
    isSurplus?: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = ["S", "M", "L", "XL"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4 rounded-none">
        {/* Images */}
        <AnimatePresence mode="wait">
          <motion.img
            key={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            initial={{ opacity: 0.8, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.8, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.salePrice && (
            <Badge className="bg-red-500 text-white border-none rounded-none text-[9px] font-bold uppercase tracking-widest px-2 py-1">
              Sale
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-black text-white border-none rounded-none text-[9px] font-bold uppercase tracking-widest px-2 py-1">
              New Arrival
            </Badge>
          )}
          {product.isSurplus && (
            <Badge className="bg-blue-600 text-white border-none rounded-none text-[9px] font-bold uppercase tracking-widest px-2 py-1">
              Export Surplus
            </Badge>
          )}
        </div>

        {/* Wishlist Icon */}
        <button className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white border border-border/50">
          <Heart className="w-4 h-4" />
        </button>

        {/* Hover Overlay: Size Selector */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm transform transition-all duration-500 z-20 border-t border-border",
          isHovered ? "translate-y-0" : "translate-y-full"
        )}>
          <p className="text-[10px] uppercase font-bold tracking-widest text-center mb-3">Select Size</p>
          <div className="flex justify-center gap-2 mb-4">
            {sizes.map(size => (
              <button
                key={size}
                onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                className={cn(
                  "w-8 h-8 border text-[10px] font-bold transition-all hover:border-primary",
                  selectedSize === size ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"
                )}
              >
                {size}
              </button>
            ))}
          </div>
          <Button className="w-full rounded-none h-10 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-90 transition-opacity">
            <ShoppingBag className="w-3.5 h-3.5 mr-2" />
            Add to Bag
          </Button>
        </div>

        {/* Quick View Trigger (Top right hover) */}
        <button className="absolute top-16 right-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-primary-foreground border border-border/50 delay-75">
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-start">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">{product.brand}</p>
          <div className="flex items-center text-[10px] font-bold">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
            {product.rating}
          </div>
        </div>
        <h3 className="text-sm font-medium tracking-tight truncate hover:underline cursor-pointer">{product.name}</h3>
        <div className="flex items-center gap-3 pt-1">
          {product.salePrice ? (
            <>
              <span className="text-sm font-bold tracking-tighter">₹{product.salePrice.toLocaleString()}</span>
              <span className="text-xs text-gray-400 line-through tracking-tighter">₹{product.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-sm font-bold tracking-tighter">₹{product.price.toLocaleString()}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
