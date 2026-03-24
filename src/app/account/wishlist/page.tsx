"use client";

import React from "react";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";
import Link from "next/link";

const initialWishlist = [
  {
    id: 1,
    name: "Classic Leather Jacket",
    brand: "Luxury Threads",
    price: 12999,
    salePrice: 8999,
    image: "https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=1920&auto=format&fit=crop",
    size: "L"
  },
  {
    id: 2,
    name: "Slim Fit Indigo Jeans",
    brand: "Denim Co.",
    price: 4999,
    salePrice: 3499,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1920&auto=format&fit=crop",
    size: "32"
  }
];

const WishlistPage = () => {
  const { addItem, onOpen } = useCart();

  const handleMoveToCart = (item: any) => {
    addItem({
      id: `${item.id}-${item.size}`,
      productId: item.id.toString(),
      variantId: item.size,
      name: item.name,
      brand: item.brand,
      price: item.price,
      salePrice: item.salePrice,
      image: item.image,
      size: item.size,
      quantity: 1
    });
    onOpen();
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="pb-8 border-b border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-playfair tracking-tight">Your Wishlist</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Items you've saved for later</p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">Total Items: {initialWishlist.length}</span>
      </div>

      {initialWishlist.length === 0 ? (
        <div className="py-24 text-center space-y-8 bg-white border border-dashed border-gray-200">
           <Heart className="w-12 h-12 text-gray-100 mx-auto" strokeWidth={1} />
           <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-widest">Your wishlist is empty</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Start adding items you love to your wishlist.</p>
           </div>
           <Link href="/products">
              <Button className="bg-black text-white px-12 py-8 rounded-none uppercase tracking-widest text-[10px]">Explore Catalog</Button>
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
           {initialWishlist.map((item, i) => (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               key={item.id} 
               className="bg-white border border-gray-100 shadow-sm overflow-hidden group hover:border-black transition-all"
             >
                <div className="aspect-[3/4] relative overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0" />
                   <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-black hover:text-white transition-all shadow-lg active:scale-95">
                      <Trash2 className="w-3.5 h-3.5" />
                   </button>
                   <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent">
                      <Button 
                        onClick={() => handleMoveToCart(item)}
                        className="w-full bg-white text-black rounded-none uppercase tracking-widest font-bold text-[9px] py-6 hover:bg-black hover:text-white transition-all active:scale-95 shadow-xl"
                      >
                         <ShoppingBag className="w-3.5 h-3.5 mr-2" />
                         Move to Bag
                      </Button>
                   </div>
                </div>
                <div className="p-6 space-y-2">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                         <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{item.brand}</p>
                         <h3 className="text-xs font-bold uppercase tracking-widest truncate max-w-[150px]">{item.name}</h3>
                      </div>
                      <div className="text-right">
                         <p className="text-xs font-mono font-bold">₹{item.salePrice.toLocaleString()}</p>
                         <p className="text-[9px] text-gray-400 font-mono line-through">₹{item.price.toLocaleString()}</p>
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
