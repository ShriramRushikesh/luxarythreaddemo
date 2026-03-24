"use client";

import React, { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

// Simulated Global State for Demo
const MOCK_COMPARE = [
  { id: "1", name: "Classic Leather Tote", brand: "Prada", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=200" },
  { id: "2", name: "Silk Evening Dress", brand: "Gucci", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=200" },
];

export function CompareBar() {
  const [items, setItems] = useState(MOCK_COMPARE);

  if (items.length === 0) return null;

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 duration-300 pointer-events-none flex justify-center">
       <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-2xl rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6 pointer-events-auto max-w-5xl w-full">
          
          <div className="flex items-center gap-4 flex-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full">
             {items.map((item) => (
               <div key={item.id} className="relative flex items-center gap-3 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-2 pr-8 shrink-0 group">
                  <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-white dark:bg-zinc-950">
                     <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                     <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">{item.brand}</p>
                     <p className="text-xs font-bold max-w-[120px] truncate">{item.name}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
                  >
                     <X className="w-4 h-4" />
                  </button>
               </div>
             ))}

             {/* Empty Slots */}
             {Array.from({ length: Math.max(0, 4 - items.length) }).map((_, i) => (
               <div key={i} className="hidden sm:flex shrink-0 w-[180px] h-14 rounded-xl border-2 border-dashed border-gray-100 dark:border-zinc-800 items-center justify-center text-[10px] font-bold uppercase tracking-widest text-gray-300 dark:text-zinc-700">
                  Add Item
               </div>
             ))}
          </div>

          <div className="flex md:flex-col lg:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
             <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-2 flex-1 md:flex-none text-right">
                {items.length} / 4 Selected
             </div>
             
             <div className="flex items-center gap-3">
               <Button 
                 variant="ghost" 
                 size="sm"
                 onClick={clearAll}
                 className="h-10 text-[10px] uppercase font-bold tracking-widest"
               >
                 Clear
               </Button>
               <Link href="/compare">
                 <Button className="h-10 px-6 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2">
                    <SlidersHorizontal className="w-3 h-3" /> Compare Now
                 </Button>
               </Link>
             </div>
          </div>

       </div>
    </div>
  );
}
