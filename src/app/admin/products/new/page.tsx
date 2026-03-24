"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/admin/products/ProductForm";

const NewProductPage = () => {
  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link 
            href="/admin/products" 
            className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black dark:hover:text-white transition-colors group"
          >
             <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
             Back to Products
          </Link>
          <h1 className="text-4xl font-playfair font-bold tracking-tight mt-2">Create New Product</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Add a new luxury item to your inventory</p>
        </div>
      </div>

      {/* Main Form */}
      <ProductForm />
    </div>
  );
};

export default NewProductPage;
