"use client";

import React from "react";
import { SearchBar } from "@/components/storefront/SearchBar";

export default function SearchDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pt-32 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
           <h1 className="text-4xl font-playfair font-bold">Global Search Demo</h1>
           <p className="text-gray-500 uppercase tracking-widest font-bold text-xs">Test the predictive autocomplete component</p>
        </div>
        
        {/* Render the core component for testing visually */}
        <SearchBar />
      </div>
    </div>
  );
}
