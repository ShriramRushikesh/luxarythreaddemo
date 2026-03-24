"use client";

import React, { useState } from "react";
import { Heart, X, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

interface WishlistDropdownProps {
  trigger?: React.ReactNode;
}

// Mock Data
const MOCK_WISHLIST = [
  { id: "1", name: "Classic Leather Tote", brand: "Prada", price: "₹1,45,000", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=200" },
  { id: "2", name: "Silk Evening Dress", brand: "Gucci", price: "₹85,000", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=200" },
];

export function WishlistDropdown({ trigger }: WishlistDropdownProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(MOCK_WISHLIST);

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast.success("Removed from wishlist");
  };

  const moveToCart = (id: string) => {
    removeItem(id);
    toast.success("Moved to cart", { icon: <ShoppingCart className="w-4 h-4" /> });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger 
        render={
          trigger ? (
            <div className="inline-block cursor-pointer">{trigger}</div>
          ) : (
            <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
               <Heart className="w-6 h-6" />
               {items.length > 0 && (
                 <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950 shadow-sm">
                   {items.length}
                 </span>
               )}
            </button>
          )
        }
      />
      
      <SheetContent className="w-full sm:max-w-md bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 p-0 flex flex-col shadow-2xl">
        <SheetHeader className="p-6 border-b border-gray-50 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/50 text-left">
          <SheetTitle className="text-xl font-playfair font-bold flex items-center gap-2">
             <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
             My Wishlist ({items.length} items)
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
           {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
                 <Heart className="w-16 h-16 text-gray-200 dark:text-zinc-800" strokeWidth={1} />
                 <h3 className="text-xl font-playfair font-bold">Your wishlist is empty</h3>
                 <p className="text-xs font-medium text-gray-500 max-w-[200px]">Save items you love and buy them later.</p>
                 <Button onClick={() => setOpen(false)} className="mt-4 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black h-10 px-8">
                    Discover Products
                 </Button>
              </div>
           ) : (
              items.map(item => (
                 <div key={item.id} className="group relative flex gap-4 p-4 bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border border-transparent hover:border-gray-100 dark:hover:border-zinc-800 transition-colors">
                    <div className="w-20 h-24 relative rounded-xl overflow-hidden shrink-0 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800">
                       <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                       <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{item.brand}</p>
                          <Link href={`/products/${item.id}`} onClick={() => setOpen(false)} className="font-bold text-sm hover:underline line-clamp-2">
                             {item.name}
                          </Link>
                       </div>
                       <div className="flex items-center justify-between">
                          <p className="font-playfair font-bold text-sm text-gray-500">{item.price}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-3 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                            onClick={() => moveToCart(item.id)}
                          >
                             Move to Cart
                          </Button>
                       </div>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-full flex items-center justify-center text-gray-400 hover:text-rose-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                       <X className="w-3 h-3" />
                    </button>
                 </div>
              ))
           )}
        </div>

        {items.length > 0 && (
           <div className="p-6 border-t border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
              <Link 
                href="/wishlist" 
                onClick={() => setOpen(false)}
                className="w-full h-14 bg-gray-50 dark:bg-zinc-900 flex items-center justify-between px-6 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group"
              >
                 View Full Wishlist
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
