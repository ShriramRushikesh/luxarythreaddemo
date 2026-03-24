"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/storefront/SearchBar";
import { AdvancedSearchModal } from "@/components/storefront/AdvancedSearchModal";
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown, Frown } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

// Simulated search backend data
const ALL_PRODUCTS = [
  { id: "1", name: "Classic Leather Tote", brand: "Prada", price: "₹1,45,000", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400", category: "Accessories", isNew: true },
  { id: "2", name: "Silk Evening Dress", brand: "Gucci", price: "₹85,000", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=400", category: "Women's Wear", isNew: false },
  { id: "3", name: "Oxford Brogues - Brown", brand: "Gucci", price: "₹45,000", image: "https://images.unsplash.com/photo-1614252339464-47f154be8b2b?auto=format&fit=crop&q=80&w=400", category: "Footwear", isNew: true },
  { id: "4", name: "Air Max 270", brand: "Nike", price: "₹12,995", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400", category: "Footwear", isNew: false },
  { id: "5", name: "Dri-FIT Training Tee", brand: "Nike", price: "₹2,495", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400", category: "Men's Wear", isNew: true },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const brand = searchParams.get("brand") || "";
  
  // Basic filtering algorithm applied purely for demonstration
  const filteredProducts = ALL_PRODUCTS.filter(prod => {
    let match = true;
    if (query) {
       match = prod.name.toLowerCase().includes(query.toLowerCase()) || prod.brand.toLowerCase().includes(query.toLowerCase());
    }
    if (brand && match) {
       match = brand.split(',').includes(prod.brand);
    }
    return match;
  });

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? <span key={i} className="bg-yellow-200 dark:bg-yellow-500/30 text-black dark:text-white px-1 rounded-sm">{part}</span> : <span key={i}>{part}</span>
        )}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-20">
      
      {/* Header featuring the Search Bar */}
      <div className="border-b border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-950/50 pt-32 pb-8 px-4">
         <div className="max-w-7xl mx-auto space-y-6">
            <SearchBar />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div>
                  <h1 className="text-2xl font-playfair font-bold">
                    {query ? <span>Search results for <span className="italic">"{query}"</span></span> : "All Products"}
                  </h1>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">
                    {filteredProducts.length} items found
                  </p>
               </div>
               
               {/* Controls */}
               <div className="flex items-center gap-3">
                  <AdvancedSearchModal />
                  <Button variant="outline" className="h-10 px-4 rounded-xl border-gray-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest gap-2 bg-white dark:bg-zinc-950">
                     Sort By: Relevance <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
               </div>
            </div>

            {/* Chips for Related Searches */}
            {query && (
               <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 shrink-0">Related:</span>
                  {["export surplus " + query, query + " for men", "luxury " + query].map((rel, i) => (
                     <button key={i} className="shrink-0 px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:border-black dark:hover:border-white transition-colors">
                        {rel}
                     </button>
                  ))}
               </div>
            )}
         </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
         {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               {filteredProducts.map(product => (
                  <div key={product.id} className="group cursor-pointer">
                     <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 dark:bg-zinc-900 mb-4">
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        {product.isNew && (
                           <div className="absolute top-4 left-4 bg-white text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">New</div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{product.brand}</p>
                        <h3 className="font-bold text-lg dark:text-gray-200">{highlightText(product.name, query)}</h3>
                        <p className="font-playfair font-bold text-gray-600 dark:text-gray-400">{product.price}</p>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            // No Results State
            <div className="flex flex-col items-center justify-center p-20 text-center space-y-6">
               <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-zinc-800">
                  <Frown className="w-10 h-10 text-gray-300" />
               </div>
               <div>
                  <h3 className="text-2xl font-playfair font-bold">No products found</h3>
                  <p className="text-sm text-gray-500 max-w-sm mt-3 leading-relaxed">We couldn't find anything matching "{query}". Try adjusting your keywords or using less specific filters.</p>
               </div>
               <div className="flex gap-4">
                  <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest" onClick={() => window.history.back()}>
                     Go Back
                  </Button>
                  <Button className="h-12 px-6 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-widest shadow-xl">
                     Clear Filters
                  </Button>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
       <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
       </div>
    }>
       <SearchResults />
    </Suspense>
  );
}
