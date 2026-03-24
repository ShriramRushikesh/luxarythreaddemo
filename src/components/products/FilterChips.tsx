"use client";

import React from "react";
import { X } from "lucide-react";
import { useProductFilters } from "@/hooks/use-product-filters";

const FilterChips = () => {
  const { filters, updateFilters } = useProductFilters();

  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    if (key === 'sort') return false;
    if (Array.isArray(value)) return value.length > 0;
    return !!value;
  });

  if (activeFilters.length === 0) return null;

  const removeFilter = (key: string, value?: string) => {
    if (Array.isArray(filters[key])) {
      const updated = (filters[key] as string[]).filter(v => v !== value);
      updateFilters({ [key]: updated });
    } else {
      updateFilters({ [key]: null });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8 items-center">
      <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mr-2">Active Filters:</span>
      {activeFilters.map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map(v => (
            <div key={`${key}-${v}`} className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 hover:border-black transition-colors group cursor-default">
              <span className="text-[10px] uppercase font-bold tracking-wider">{v}</span>
              <button 
                onClick={() => v && removeFilter(key, v as string)}
                className="text-gray-400 group-hover:text-black transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ));
        }
        return (
          <div key={key} className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 hover:border-black transition-colors group cursor-default">
            <span className="text-[10px] uppercase font-bold tracking-wider">{value as string}</span>
            <button 
              onClick={() => removeFilter(key)}
              className="text-gray-400 group-hover:text-black transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FilterChips;
