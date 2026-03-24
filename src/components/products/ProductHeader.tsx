"use client";

import React from "react";
import { ChevronRight, ChevronDown, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useProductFilters } from "@/hooks/use-product-filters";
import { cn } from "@/lib/utils";

const ProductHeader = ({ count, view, setView }: { count: number, view: 'grid' | 'list', setView: (v: 'grid' | 'list') => void }) => {
  const { filters, updateFilters } = useProductFilters();

  const sortOptions = [
    { label: "Popularity", value: "popularity" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Newest First", value: "newest" },
  ];

  const currentSort = sortOptions.find(opt => opt.value === filters.sort) || sortOptions[0];

  return (
    <div className="space-y-8 mb-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/products" className="hover:text-black transition-colors">Men's Clothing</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black font-bold">T-Shirts</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-playfair mb-2">Men's Premium T-Shirts</h1>
          <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">
            Showing 1-{Math.min(count, 24)} of {count} products
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Filter Toggle Trigger (could be added later if needed) */}
          <Button variant="outline" size="sm" className="lg:hidden rounded-none h-10 px-4 border-gray-200">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="flex h-10 min-w-[180px] items-center justify-between rounded-none border border-gray-200 px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
                Sort By: {currentSort.label}
                <ChevronDown className="w-4 h-4 ml-4 opacity-50" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-none min-w-[180px]">
              {sortOptions.map((opt) => (
                <DropdownMenuItem 
                  key={opt.value}
                  onClick={() => updateFilters({ sort: opt.value })}
                  className="text-[11px] uppercase tracking-widest font-medium py-3 cursor-pointer"
                >
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Toggles */}
          <div className="hidden sm:flex items-center border border-gray-200">
            <button 
              onClick={() => setView('grid')}
              className={cn(
                "p-2.5 transition-colors",
                view === 'grid' ? "bg-black text-white" : "bg-white text-gray-400 hover:text-black"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn(
                "p-2.5 transition-colors border-l border-gray-200",
                view === 'list' ? "bg-black text-white" : "bg-white text-gray-400 hover:text-black"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
