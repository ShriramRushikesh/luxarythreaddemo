"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Rotate3d, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Main image */}
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-gray-50 border border-gray-100 group cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <motion.img
          key={selectedImage}
          src={images[selectedImage]}
          alt={`Product view ${selectedImage + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ 
            opacity: 1, 
            scale: isZoomed ? 1.5 : 1,
            transformOrigin: isZoomed ? `${mousePos.x}% ${mousePos.y}%` : "center"
          }}
          transition={{ duration: isZoomed ? 0.3 : 0.6, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />

        {/* Gallery Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition-all">
            <Maximize2 className="w-5 h-5" />
          </button>
          <button className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition-all">
            <Rotate3d className="w-5 h-5" />
          </button>
          <button className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition-all text-red-500">
            <PlayCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }}
            className="p-2 bg-white/80 rounded-full shadow pointer-events-auto hover:bg-black hover:text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }}
            className="p-2 bg-white/80 rounded-full shadow pointer-events-auto hover:bg-black hover:text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={cn(
              "relative shrink-0 w-24 aspect-[4/5] border-2 transition-all p-0.5",
              selectedImage === i ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
