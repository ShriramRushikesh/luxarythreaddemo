"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trash2, ShoppingCart, Share2, HeartCrack, ChevronDown, CheckCircle2, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Initial Mock State
const INITIAL_WISHLIST = [
  { id: "1", name: "Classic Leather Tote", brand: "Prada", price: "₹1,45,000", oldPrice: null, image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400", category: "Accessories", inStock: true, stockCount: 12 },
  { id: "2", name: "Silk Evening Dress", brand: "Gucci", price: "₹65,000", oldPrice: "₹85,000", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=400", category: "Women's Wear", inStock: true, stockCount: 3 },
  { id: "3", name: "Oxford Brogues - Brown", brand: "Gucci", price: "₹45,000", oldPrice: null, image: "https://images.unsplash.com/photo-1614252339464-47f154be8b2b?auto=format&fit=crop&q=80&w=400", category: "Footwear", inStock: false, stockCount: 0 },
];

export default function WishlistPage() {
  const [items, setItems] = useState(INITIAL_WISHLIST);
  const [sortBy, setSortBy] = useState("recent");

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    toast.success("Item removed from wishlist");
  };

  const moveAllToCart = () => {
    const inStockItems = items.filter(i => i.inStock);
    if (inStockItems.length === 0) {
      toast.error("No available items to add to cart");
      return;
    }
    setItems(prev => prev.filter(i => !i.inStock));
    toast.success(`Moved ${inStockItems.length} items to cart`);
  };

  const shareWishlist = () => {
    navigator.clipboard.writeText("https://luxurythreads.in/wishlist/share/abc-123");
    toast.success("Share link copied to clipboard");
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-gray-50/30 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100 dark:border-zinc-900">
           <div>
              <h1 className="text-4xl font-playfair font-bold flex items-center gap-4">
                 My Wishlist 
                 <Badge variant="outline" className="text-xs px-3 py-1 font-bold rounded-full border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    {items.length} Items
                 </Badge>
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-4">Save your favorite pieces for later.</p>
           </div>
           
           {items.length > 0 && (
             <div className="flex flex-wrap items-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={shareWishlist}
                  className="h-12 px-6 rounded-2xl border-gray-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest gap-2 bg-white dark:bg-zinc-950"
                >
                   <Share2 className="w-4 h-4" /> Share
                </Button>
                <div className="w-48 shrink-0">
                  <Select value={sortBy} onValueChange={(val) => val && setSortBy(val as string)}>
                    <SelectTrigger className="h-12 rounded-2xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-[10px] uppercase tracking-widest font-bold">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recently Added</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={moveAllToCart}
                  className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2"
                >
                   <ShoppingCart className="w-4 h-4" /> Add All Available
                </Button>
             </div>
           )}
        </div>

        {/* Content Grid */}
        {items.length === 0 ? (
           <div className="py-32 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-2">
                 <HeartCrack className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-playfair font-bold">Your wishlist is empty</h3>
              <p className="text-sm font-medium text-gray-500 max-w-sm">Looks like you haven't saved any items yet. Browse our collections and tap the heart icon to save items you love.</p>
              <Link href="/products" className="mt-4">
                 <Button className="h-14 px-10 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold uppercase tracking-widest shadow-xl">
                    Discover Products
                 </Button>
              </Link>
           </div>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {items.map(item => (
                 <div key={item.id} className="group relative bg-white dark:bg-zinc-950 rounded-[2.5rem] border border-gray-100 dark:border-zinc-900 p-4 hover:shadow-xl transition-all duration-300">
                    
                    {/* Remove Action */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:border-rose-200 shadow-sm opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100"
                    >
                       <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Image */}
                    <Link href={`/products/${item.id}`} className="block relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-50 dark:bg-zinc-900 mb-6">
                       <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                       
                       {/* Overlay Badges */}
                       <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {item.oldPrice && (
                             <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-transparent text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                                <TrendingDown className="w-3 h-3" /> Price Drop
                             </Badge>
                          )}
                          {!item.inStock && (
                             <Badge className="bg-rose-50 dark:bg-rose-500/10 text-rose-500 border-rose-200 dark:border-rose-800 text-[9px] font-black uppercase tracking-widest backdrop-blur-md">
                                Out of Stock
                             </Badge>
                          )}
                       </div>
                    </Link>

                    {/* Details */}
                    <div className="px-2 space-y-4">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.brand}</p>
                          <Link href={`/products/${item.id}`} className="font-bold text-lg hover:underline block leading-tight">{item.name}</Link>
                       </div>
                       
                       <div className="flex items-center gap-3">
                          <span className="font-playfair font-bold text-xl">{item.price}</span>
                          {item.oldPrice && <span className="text-sm font-bold text-gray-400 line-through decoration-2">{item.oldPrice}</span>}
                       </div>

                       {/* Stock & Add to Cart */}
                       <div className="pt-4 border-t border-gray-50 dark:border-zinc-900/50 flex flex-col gap-3">
                          {item.inStock ? (
                             <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 px-1">
                                <CheckCircle2 className="w-3 h-3" /> {item.stockCount} left in stock
                             </p>
                          ) : (
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                                Notify when available
                             </p>
                          )}
                          <Button 
                            disabled={!item.inStock}
                            onClick={() => {
                               removeItem(item.id);
                               toast.success("Added to cart");
                            }}
                            className="w-full h-12 rounded-2xl bg-gray-50 dark:bg-zinc-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-[10px] font-bold uppercase tracking-widest text-black dark:text-white transition-colors border border-gray-200 dark:border-zinc-800"
                          >
                             {item.inStock ? "Move to Cart" : "Out of Stock"}
                          </Button>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        )}

      </div>
    </div>
  );
}
