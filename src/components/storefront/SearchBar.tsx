"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp, History, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Mock Data for Autocomplete
const MOCK_SUGGESTIONS = ["nike t-shirt", "nike running shoes", "nike air max"];
const MOCK_CATEGORIES = [
  { name: "Men's T-Shirts", count: 23 },
  { name: "Sports Shoes", count: 45 }
];
const MOCK_BRANDS = [
  { name: "Nike", count: 156 }
];
const MOCK_PRODUCTS = [
  { id: "1", name: "Air Max 270", brand: "Nike", price: "₹12,995", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=100" },
  { id: "2", name: "Dri-FIT Training Tee", brand: "Nike", price: "₹2,495", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=100" },
  { id: "3", name: "Pro Elite Shorts", brand: "Nike", price: "₹3,295", image: "https://images.unsplash.com/photo-1591557306403-ed5ebcede64a?auto=format&fit=crop&q=80&w=100" },
];
const POPULAR_SEARCHES = ["luxury shirts under 2000", "export surplus zara", "summer dresses", "leather totes"];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce logic simulation
  useEffect(() => {
    if (!query) {
      setIsTyping(false);
      return;
    }
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      // Here you would fetch actual search results based on query
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard Navigation: Cmd+K to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, MOCK_SUGGESTIONS.length + MOCK_PRODUCTS.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? <span key={i} className="font-bold text-black dark:text-white">{part}</span> : <span key={i}>{part}</span>
        )}
      </span>
    );
  };

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
        <Input 
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for products, brands..." 
          className="w-full h-14 pl-12 pr-24 rounded-2xl bg-gray-50 dark:bg-zinc-900 border-transparent focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:bg-white dark:focus-visible:bg-black text-[15px] font-medium shadow-sm transition-all placeholder:text-gray-400"
        />
        
        {/* Right side controls */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {query ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearSearch}
              className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <X className="w-4 h-4" />
            </Button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-gray-400 border border-gray-200 dark:border-zinc-800 rounded-md px-2 py-1 bg-white dark:bg-zinc-950 shadow-sm pointer-events-none">
              <span className="font-mono">⌘</span> K
            </div>
          )}
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 shadow-2xl rounded-3xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {query.length === 0 ? (
            // Empty State: Popular & Recent Searches
            <div className="p-6">
              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                <TrendingUp className="w-3 h-3" /> Popular Searches
              </h4>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term, i) => (
                  <button 
                    key={i}
                    onClick={() => { setQuery(term); inputRef.current?.focus(); }}
                    className="px-4 py-2 rounded-xl border border-gray-100 dark:border-zinc-800 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-900 hover:border-black dark:hover:border-white transition-all text-gray-600 dark:text-gray-300"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col max-h-[70vh] overflow-y-auto">
              {isTyping ? (
                 <div className="p-8 flex justify-center">
                    <div className="w-6 h-6 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
                 </div>
              ) : (
                <>
                  <div className="flex flex-col lg:flex-row">
                    {/* Left Column: Suggestions, Categories, Brands */}
                    <div className="w-full lg:w-1/3 p-4 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/50 flex flex-col gap-6">
                      
                      {/* Keyword Suggestions */}
                      {MOCK_SUGGESTIONS.length > 0 && (
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-2">Suggestions</h4>
                          <ul className="space-y-1">
                            {MOCK_SUGGESTIONS.map((sug, i) => (
                              <li key={i}>
                                <button className={cn(
                                  "w-full text-left px-3 py-2 rounded-xl text-sm transition-colors flex items-center gap-2",
                                  selectedIndex === i ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-white dark:hover:bg-zinc-950 text-gray-600 dark:text-gray-300"
                                )}>
                                  <Search className="w-3 h-3 shrink-0 opacity-50" />
                                  <span className="truncate">{highlightText(sug, query)}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Categories Match */}
                      {MOCK_CATEGORIES.length > 0 && (
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-2">Categories</h4>
                          <ul className="space-y-1">
                            {MOCK_CATEGORIES.map((cat, i) => (
                              <li key={i}>
                                <button className="w-full text-left px-3 py-2 rounded-xl text-sm transition-colors hover:bg-white dark:hover:bg-zinc-950 text-gray-600 dark:text-gray-300 flex justify-between items-center group">
                                  <span>in {highlightText(cat.name, query)}</span>
                                  <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-zinc-700">{cat.count}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Brands Match */}
                      {MOCK_BRANDS.length > 0 && (
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-2">Brands</h4>
                          <ul className="space-y-1">
                            {MOCK_BRANDS.map((brand, i) => (
                              <li key={i}>
                                <button className="w-full text-left px-3 py-2 rounded-xl text-sm transition-colors hover:bg-white dark:hover:bg-zinc-950 text-gray-600 dark:text-gray-300 flex items-center justify-between group">
                                  <span className="flex items-center gap-2 font-bold">{highlightText(brand.name, query)}</span>
                                  <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">{brand.count} products</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Top Product Results */}
                    <div className="w-full lg:w-2/3 p-4">
                      <div className="flex justify-between items-center px-4 mb-4">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Top Products</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                         {MOCK_PRODUCTS.map((prod, i) => {
                           const actualIndex = i + MOCK_SUGGESTIONS.length;
                           return (
                             <Link 
                               key={prod.id} 
                               href={`/products/${prod.id}`}
                               onClick={() => setIsOpen(false)}
                               className={cn(
                                 "flex items-center gap-4 p-3 rounded-2xl transition-all border border-transparent",
                                 selectedIndex === actualIndex ? "bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800" : "hover:bg-gray-50 dark:hover:bg-zinc-900 hover:border-gray-100 dark:hover:border-zinc-800"
                               )}
                             >
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-zinc-800">
                                   <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{prod.brand}</p>
                                   <p className="text-sm font-bold truncate mt-0.5">{highlightText(prod.name, query)}</p>
                                   <p className="text-sm font-bold text-gray-500 mt-1">{prod.price}</p>
                                </div>
                             </Link>
                           );
                         })}
                      </div>
                    </div>
                  </div>
                  
                  {/* View All Footer */}
                  <div className="p-4 border-t border-gray-100 dark:border-zinc-900 bg-gray-50 dark:bg-zinc-950">
                    <Button 
                      onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
                      className="w-full h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-lg flex items-center justify-center gap-2 group"
                    >
                      View all results for "{query}" <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
