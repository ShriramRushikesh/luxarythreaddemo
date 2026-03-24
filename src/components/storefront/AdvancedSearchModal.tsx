"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function AdvancedSearchModal({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  // State for complex filters
  const [filters, setFilters] = useState({
    keyword: "",
    brands: [] as string[],
    categories: [] as string[],
    minPrice: "",
    maxPrice: "",
    condition: "any"
  });

  const BRANDS = ["Nike", "Gucci", "Prada", "Adidas", "Zara"];
  const CATEGORIES = ["Men's Wear", "Women's Wear", "Accessories", "Footwear"];

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) return array.filter(i => i !== item);
    return [...array, item];
  };

  const handleSearch = () => {
    // Construct query parameters
    const params = new URLSearchParams();
    if (filters.keyword) params.append("q", filters.keyword);
    if (filters.brands.length) params.append("brand", filters.brands.join(","));
    if (filters.categories.length) params.append("category", filters.categories.join(","));
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.condition !== "any") params.append("condition", filters.condition);
    
    setOpen(false);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="outline-none">
        {trigger || (
          <div className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" /> Advanced Search
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden gap-0">
        <div className="p-8 border-b border-gray-50 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
           <div>
             <DialogTitle className="text-2xl font-playfair font-bold">Advanced Query</DialogTitle>
             <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-2">Filter the exact attributes you desire</p>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-950 shadow-sm flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
           </div>
        </div>
        
        <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
           {/* Keyword */}
           <div className="space-y-3">
              <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Keywords</Label>
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <Input 
                   value={filters.keyword}
                   onChange={e => setFilters({...filters, keyword: e.target.value})}
                   placeholder="Product name, description, SKU..." 
                   className="w-full h-12 pl-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-transparent font-medium"
                 />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Brands */}
              <div className="space-y-3">
                 <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Brands</Label>
                 <div className="flex flex-wrap gap-2">
                    {BRANDS.map(brand => (
                      <button 
                        key={brand}
                        onClick={() => setFilters({...filters, brands: toggleArrayItem(filters.brands, brand)})}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all border",
                          filters.brands.includes(brand) ? "bg-black text-white dark:bg-white dark:text-black border-transparent shadow-md" : "bg-white dark:bg-zinc-950 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-zinc-800 hover:border-gray-300"
                        )}
                      >
                         {brand}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                 <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Categories</Label>
                 <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setFilters({...filters, categories: toggleArrayItem(filters.categories, cat)})}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all border",
                          filters.categories.includes(cat) ? "bg-black text-white dark:bg-white dark:text-black border-transparent shadow-md" : "bg-white dark:bg-zinc-950 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-zinc-800 hover:border-gray-300"
                        )}
                      >
                         {cat}
                      </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Price Range */}
               <div className="space-y-3">
                 <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Price Range (₹)</Label>
                 <div className="flex items-center gap-4">
                    <Input 
                      type="number" 
                      placeholder="Min" 
                      value={filters.minPrice}
                      onChange={e => setFilters({...filters, minPrice: e.target.value})}
                      className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-transparent font-medium"
                    />
                    <span className="text-gray-400 font-bold">-</span>
                    <Input 
                      type="number" 
                      placeholder="Max" 
                      value={filters.maxPrice}
                      onChange={e => setFilters({...filters, maxPrice: e.target.value})}
                      className="h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border-transparent font-medium"
                    />
                 </div>
               </div>

               {/* Condition */}
               <div className="space-y-3">
                 <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Condition</Label>
                 <div className="flex p-1 rounded-xl bg-gray-50 dark:bg-zinc-900">
                    {["any", "new", "export_surplus"].map(cond => (
                       <button
                         key={cond}
                         onClick={() => setFilters({...filters, condition: cond})}
                         className={cn(
                           "flex-1 py-2.5 rounded-lg text-[10px] uppercase font-bold tracking-widest transition-all",
                           filters.condition === cond ? "bg-white dark:bg-black shadow-sm text-black dark:text-white" : "text-gray-400 hover:text-black dark:hover:text-white"
                         )}
                       >
                          {cond.replace('_', ' ')}
                       </button>
                    ))}
                 </div>
               </div>
           </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 dark:border-zinc-900 bg-gray-50 dark:bg-zinc-950 flex gap-4">
           <Button 
             variant="ghost" 
             className="flex-1 h-14 rounded-2xl text-[10px] uppercase font-bold tracking-widest hover:bg-gray-200 dark:hover:bg-zinc-800"
             onClick={() => setFilters({keyword: "", brands: [], categories: [], minPrice: "", maxPrice: "", condition: "any"})}
           >
              Clear All
           </Button>
           <Button 
             className="flex-1 h-14 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-[11px] uppercase font-bold tracking-widest shadow-xl flex items-center justify-center gap-2"
             onClick={handleSearch}
           >
              <Search className="w-4 h-4" /> Apply Filters
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
