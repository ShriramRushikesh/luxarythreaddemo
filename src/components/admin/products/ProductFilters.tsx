"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  X, 
  LayoutGrid, 
  List,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const ProductFilters = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>(["Brand: Gucci", "In Stock"]);

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="space-y-6 bg-white dark:bg-zinc-950 p-6 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
          <Input 
            placeholder="Search by name, SKU, brand..." 
            className="pl-10 h-10 bg-gray-50/50 dark:bg-zinc-900/50 border-transparent focus:bg-white dark:focus:bg-zinc-900 rounded-full text-[10px] font-bold uppercase tracking-widest w-full"
          />
        </div>

        <div className="flex items-center gap-3">
           <Select>
              <SelectTrigger className="h-10 w-40 rounded-full border-gray-100 dark:border-zinc-800 text-[9px] font-bold uppercase tracking-widest">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100">
                <SelectItem value="men" className="text-[9px] font-bold uppercase tracking-widest">Men's Collection</SelectItem>
                <SelectItem value="women" className="text-[9px] font-bold uppercase tracking-widest">Women's Collection</SelectItem>
                <SelectItem value="acc" className="text-[9px] font-bold uppercase tracking-widest">Accessories</SelectItem>
              </SelectContent>
           </Select>

           <Select>
              <SelectTrigger className="h-10 w-40 rounded-full border-gray-100 dark:border-zinc-800 text-[9px] font-bold uppercase tracking-widest">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100">
                <SelectItem value="active" className="text-[9px] font-bold uppercase tracking-widest">Active</SelectItem>
                <SelectItem value="inactive" className="text-[9px] font-bold uppercase tracking-widest">Inactive</SelectItem>
                <SelectItem value="out" className="text-[9px] font-bold uppercase tracking-widest">Out of Stock</SelectItem>
              </SelectContent>
           </Select>

           <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full border border-gray-100 dark:border-zinc-800">
              <RotateCcw className="w-4 h-4" />
           </Button>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
           <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mr-2">Applied:</span>
           {activeFilters.map(filter => (
             <Badge 
               key={filter} 
               variant="secondary" 
               className="rounded-full pl-3 pr-1 py-1 gap-2 bg-gray-50 dark:bg-zinc-900 text-[8px] font-bold uppercase tracking-widest border border-gray-100 dark:border-zinc-800 group"
             >
               {filter}
               <button onClick={() => removeFilter(filter)} className="p-1 hover:bg-white dark:hover:bg-zinc-800 rounded-full transition-colors">
                  <X className="w-2.5 h-2.5" />
               </button>
             </Badge>
           ))}
           <Button variant="link" className="text-[9px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 px-2" onClick={() => setActiveFilters([])}>
             Clear All
           </Button>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
