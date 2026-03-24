"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, ShieldCheck, MapPin, Truck, RotateCcw, Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

interface ProductInfoProps {
  product: {
    name: string;
    brand: string;
    price: number;
    salePrice: number;
    rating: number;
    reviewsCount: number;
    sku: string;
    images: string[];
    variants: { size: string; stock: number }[];
  };
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const { addItem, onOpen } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    addItem({
      id: `${product.sku}-${selectedSize}`,
      productId: product.sku,
      variantId: selectedSize,
      name: product.name,
      brand: product.brand,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity
    });
    
    onOpen();
  };

  const savings = product.price - product.salePrice;
  const savingsPercent = Math.round((savings / product.price) * 100);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
      {/* Brand & Title */}
      <div className="space-y-4">
        <Link href={`/brands/${product.brand.toLowerCase()}`} className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors">
          {product.brand}
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair tracking-tight text-gray-900 leading-tight">
          {product.name}
        </h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn("w-4 h-4", i < 4.5 ? "fill-yellow-500" : "fill-none")} />
              ))}
            </div>
            <span className="text-xs font-bold tracking-widest">{product.rating}/5</span>
          </div>
          <Link href="#reviews" className="text-xs text-gray-400 hover:text-black underline underline-offset-4 tracking-widest uppercase font-medium">
            ({product.reviewsCount} reviews)
          </Link>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-100" />

      {/* Pricing & Availability */}
      <div className="space-y-4">
        <div className="flex items-baseline gap-4">
          <span className="text-4xl font-mono font-bold tracking-tighter text-black">₹{product.salePrice.toLocaleString()}</span>
          <span className="text-xl text-gray-400 line-through font-mono">₹{product.price.toLocaleString()}</span>
          <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 uppercase tracking-widest">
            {savingsPercent}% OFF
          </span>
        </div>
        <p className="text-xs text-green-600 font-bold tracking-[0.2em] uppercase">
          ✓ You save ₹{savings.toLocaleString()}
        </p>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">Inclusive of all taxes</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Only 3 items left!</span>
        </div>
      </div>

      {/* Authenticity Badge */}
      <div className="bg-gray-50 border border-gray-100 p-4 flex items-center gap-4">
        <div className="p-3 bg-white rounded-full">
          <ShieldCheck className="w-6 h-6 text-black" />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest">100% Authentic Export Surplus</h4>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.1em] mt-1">Verified by Luxury Threads Quality Control</p>
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Select Size</h4>
          <button className="text-[10px] uppercase tracking-widest font-bold border-b border-black pb-0.5">Size Guide</button>
        </div>
        <div className="flex gap-4">
          {product.variants.map((v) => (
            <button
              key={v.size}
              onClick={() => setSelectedSize(v.size)}
              disabled={v.stock === 0}
              className={cn(
                "relative min-w-[64px] h-12 border transition-all flex items-center justify-center text-xs font-bold uppercase tracking-[0.2em]",
                selectedSize === v.size ? "bg-black text-white border-black" : "border-gray-100 bg-white text-gray-400 hover:border-black",
                v.stock === 0 && "opacity-30 cursor-not-allowed strike-through"
              )}
            >
              {v.size}
              {v.stock < 10 && v.stock > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex gap-4 h-14">
          <div className="flex items-center border border-gray-200 h-full">
            <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-12 h-full flex items-center justify-center hover:bg-gray-50">-</button>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-12 h-full text-center focus:outline-none font-bold font-mono"
            />
            <button onClick={() => setQuantity(q => q+1)} className="w-12 h-full flex items-center justify-center hover:bg-gray-50">+</button>
          </div>
          <Button 
            onClick={handleAddToCart}
            className="flex-1 h-full rounded-none bg-black text-white uppercase tracking-[0.3em] font-bold text-xs hover:bg-black/90 active:scale-95 transition-all"
            disabled={!selectedSize}
          >
            <ShoppingBag className="w-4 h-4 mr-3" />
            Add to Bag
          </Button>
        </div>
        <div className="flex gap-4 h-14">
          <Button 
            className="flex-1 h-full rounded-none bg-white text-black border border-black uppercase tracking-[0.3em] font-bold text-xs hover:bg-black hover:text-white transition-all shadow-xl"
            disabled={!selectedSize}
          >
            Buy Now
          </Button>
          <Button variant="outline" className="h-full w-20 rounded-none border-gray-200 hover:border-red-500 hover:text-red-500 transition-all group">
            <Heart className="w-5 h-5 group-hover:fill-red-500" />
          </Button>
        </div>
      </div>

      {/* Delivery Checker */}
      <div className="space-y-4 pt-6">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Check Delivery availability</h4>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Enter Pincode" 
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs border border-gray-100 rounded-none focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <Button variant="link" className="text-black uppercase tracking-widest text-[10px] font-bold">Check</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <Truck className="w-4 h-4" />
            <span className="font-medium tracking-wide">Fast Delivery (2-4 Days)</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <RotateCcw className="w-4 h-4" />
            <span className="font-medium tracking-wide">7 Days Return</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
