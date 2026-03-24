"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Check, Minus, ShoppingCart, Printer, Share2, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

// Mock Data
const MOCK_COMPARE = [
  { 
     id: "1", 
     name: "Classic Leather Tote", 
     brand: "Prada", 
     price: "₹1,45,000", 
     image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400",
     rating: 4.8,
     reviews: 124,
     inStock: true,
     details: {
        Material: "Saffiano Leather",
        Dimensions: "35 x 25 x 15 cm",
        Hardware: "Gold-tone",
        Closure: "Zip top",
        Origin: "Made in Italy",
        Warranty: "2 Years"
     },
     features: ["Dust bag included", "Detachable strap", "Internal pockets", "Water resistant"]
  },
  { 
     id: "2", 
     name: "Suede Weekend Bag", 
     brand: "Gucci", 
     price: "₹1,85,000", 
     image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400",
     rating: 4.9,
     reviews: 89,
     inStock: true,
     details: {
        Material: "Premium Calf Suede",
        Dimensions: "45 x 30 x 20 cm",
        Hardware: "Antiqued Brass",
        Closure: "Double Zip",
        Origin: "Made in Italy",
        Warranty: "1 Year"
     },
     features: ["Luggage tag included", "Detachable strap", "Internal pockets", "Cabin size approved"]
  },
];

const ALL_FEATURES = ["Dust bag included", "Detachable strap", "Internal pockets", "Water resistant", "Cabin size approved", "Luggage tag included"];
const ALL_DETAIL_KEYS = ["Material", "Dimensions", "Hardware", "Closure", "Origin", "Warranty"];

export default function ComparePage() {
  const [items, setItems] = useState(MOCK_COMPARE);
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-white dark:bg-zinc-950">
      <div className="max-w-[1400px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100 dark:border-zinc-900">
           <div>
              <h1 className="text-4xl font-playfair font-bold">Product Comparison</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-4">Compare up to 4 items side-by-side to find the perfect fit.</p>
           </div>
           
           {items.length > 0 && (
             <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" className="h-10 px-4 rounded-xl border-gray-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest bg-gray-50 dark:bg-zinc-900" onClick={() => window.print()}>
                   <Printer className="w-4 h-4 mr-2" /> Print
                </Button>
                <Button variant="outline" className="h-10 px-4 rounded-xl border-gray-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest bg-gray-50 dark:bg-zinc-900" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); }}>
                   <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
                <label className="flex items-center gap-2 cursor-pointer ml-4">
                   <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input type="checkbox" name="toggle" id="toggle" checked={highlightDifferences} onChange={e => setHighlightDifferences(e.target.checked)} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 dark:border-zinc-700 checked:right-0 checked:border-green-500 z-10 top-0 left-0 transition-all" />
                      <div className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 dark:bg-zinc-800 cursor-pointer"></div>
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Highlight differences</span>
                </label>
             </div>
           )}
        </div>

        {items.length === 0 ? (
           <div className="py-20 text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center border border-gray-200 dark:border-zinc-800">
                 <SlidersHorizontal className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-playfair font-bold">No products to compare</h3>
              <p className="text-sm font-medium text-gray-500 max-w-sm mx-auto">Select "Compare" on product cards across the store to build your comparison matrix here.</p>
              <Link href="/products" className="inline-block">
                 <Button className="h-14 px-10 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[11px] mt-4 shadow-xl">
                    Browse Catalog
                 </Button>
              </Link>
           </div>
        ) : (
           <div className="overflow-x-auto pb-8">
              <table className="w-full text-left border-separate border-spacing-0 min-w-[800px]">
                 <tbody>
                    
                    {/* Header Row: Products */}
                    <tr>
                       <th className="p-6 bg-gray-50/50 dark:bg-zinc-950/50 sticky left-0 z-20 w-48 border-b border-gray-100 dark:border-zinc-900 border-r align-bottom">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Products</span>
                       </th>
                       {items.map(item => (
                          <td key={`header-${item.id}`} className="p-6 border-b border-gray-100 dark:border-zinc-900 relative align-top min-w-[280px]">
                             <button onClick={() => removeItem(item.id)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors z-10">
                                <X className="w-4 h-4" />
                             </button>
                             <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-50 dark:bg-zinc-900 mb-6">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                             </div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.brand}</p>
                             <h3 className="font-bold text-lg leading-tight mb-2">{item.name}</h3>
                             <p className="font-playfair font-bold text-2xl mb-4">{item.price}</p>
                             <Button className="w-full h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase tracking-widest shadow-lg flex items-center justify-center gap-2">
                                <ShoppingCart className="w-4 h-4" /> Add to Cart
                             </Button>
                          </td>
                       ))}
                       {/* Add Slot */}
                       {items.length < 4 && Array.from({ length: 4 - items.length }).map((_, i) => (
                          <td key={`empty-${i}`} className="p-6 border-b border-gray-100 dark:border-zinc-900 align-middle text-center border-l border-dashed border-gray-100 dark:border-zinc-800 bg-gray-50/30 dark:bg-zinc-900/10 min-w-[280px]">
                             <Link href="/products" className="inline-flex flex-col items-center justify-center gap-4 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                <div className="w-16 h-16 rounded-full bg-white dark:bg-zinc-950 border-2 border-dashed border-current flex items-center justify-center">
                                   <span className="text-2xl font-light">+</span>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Add Product</span>
                             </Link>
                          </td>
                       ))}
                    </tr>

                    {/* Basic Meta Row: Rating */}
                    <tr>
                       <th className="p-6 bg-gray-50/50 dark:bg-zinc-950/50 sticky left-0 z-20 border-b border-gray-100 dark:border-zinc-900 border-r align-middle">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Rating</span>
                       </th>
                       {items.map(item => (
                          <td key={`rating-${item.id}`} className="p-6 border-b border-gray-100 dark:border-zinc-900">
                             <div className="flex items-center gap-2">
                                <span className="font-bold text-sm">{item.rating}</span>
                                <span className="text-amber-400 text-lg">★</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-2">({item.reviews})</span>
                             </div>
                          </td>
                       ))}
                       {items.length < 4 && Array.from({ length: 4 - items.length }).map((_, i) => <td key={`empty-rating-${i}`} className="p-6 border-b border-l border-dashed border-gray-100 dark:border-zinc-900 min-w-[280px]"></td>)}
                    </tr>

                    {/* Dynamics Details Loop */}
                    {ALL_DETAIL_KEYS.map(key => {
                       // Highlight logic: if highlightDifferences is true, and the answers are different, keep opacity-100. If same, make opacity-30
                       const allValues = items.map(i => (i.details as any)[key]);
                       const isDifferent = new Set(allValues).size > 1;
                       const trClass = highlightDifferences && !isDifferent ? "opacity-30 transition-opacity" : "opacity-100 transition-opacity";

                       return (
                         <tr key={key} className={trClass}>
                            <th className="p-6 bg-gray-50/50 dark:bg-zinc-950/50 sticky left-0 z-20 border-b border-gray-100 dark:border-zinc-900 border-r align-middle">
                               <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">{key}</span>
                            </th>
                            {items.map(item => (
                               <td key={`${key}-${item.id}`} className="p-6 border-b border-gray-100 dark:border-zinc-900">
                                  <span className="text-sm font-medium">{((item.details as any)[key]) || "—"}</span>
                               </td>
                            ))}
                            {items.length < 4 && Array.from({ length: 4 - items.length }).map((_, i) => <td key={`empty-${key}-${i}`} className="p-6 border-b border-l border-dashed border-gray-100 dark:border-zinc-900"></td>)}
                         </tr>
                       );
                    })}

                    {/* Features Checklist */}
                    <tr>
                       <th className="p-6 bg-gray-50/50 dark:bg-zinc-950/50 sticky left-0 z-20 border-gray-100 dark:border-zinc-900 border-r align-top">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Key Features</span>
                       </th>
                       {items.map(item => (
                          <td key={`features-${item.id}`} className="p-6 border-gray-100 dark:border-zinc-900 align-top">
                             <ul className="space-y-4">
                                {ALL_FEATURES.map(feat => {
                                   const hasFeature = item.features.includes(feat);
                                   return (
                                     <li key={feat} className={cn("flex items-center gap-3 text-sm font-medium", !hasFeature && "text-gray-300 dark:text-gray-700")}>
                                        {hasFeature ? (
                                           <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                                              <Check className="w-3 h-3" />
                                           </div>
                                        ) : (
                                           <div className="w-5 h-5 rounded-full bg-gray-50 text-gray-300 dark:bg-zinc-900 dark:text-zinc-700 flex items-center justify-center shrink-0">
                                              <Minus className="w-3 h-3" />
                                           </div>
                                        )}
                                        {feat}
                                     </li>
                                   );
                                })}
                             </ul>
                          </td>
                       ))}
                       {items.length < 4 && Array.from({ length: 4 - items.length }).map((_, i) => <td key={`empty-features-${i}`} className="p-6 border-l border-dashed border-gray-100 dark:border-zinc-900"></td>)}
                    </tr>

                 </tbody>
              </table>
           </div>
        )}
      </div>
    </div>
  );
}
