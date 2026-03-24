"use client";

import React from "react";
import ProductCard from "../ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCarouselProps {
  title: string;
  products: any[];
}

const ProductCarousel = ({ title, products }: ProductCarouselProps) => {
  return (
    <section className="py-24 space-y-12">
      <div className="flex flex-col items-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-playfair lowercase tracking-wide text-center">
          {title}
        </h2>
        <div className="h-[1px] w-24 bg-black/10" />
      </div>

      <div className="relative group">
        <div className="flex gap-6 overflow-x-auto pb-10 scroll-smooth snap-x snap-mandatory scrollbar-hide">
          {products.map((product) => (
            <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button className="absolute -left-6 top-1/2 -translate-y-1/2 p-4 bg-white shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white rounded-full lg:flex items-center justify-center hidden">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="absolute -right-6 top-1/2 -translate-y-1/2 p-4 bg-white shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white rounded-full lg:flex items-center justify-center hidden">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default ProductCarousel;
