"use client";

import React from "react";
import { 
  Plus, 
  Upload, 
  Download, 
  Package, 
  ChevronRight,
  LayoutGrid,
  List
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductFilters from "@/components/admin/products/ProductFilters";
import ProductsTable from "@/components/admin/products/ProductsTable";

const AllProductsPage = () => {
  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
             <Link href="/admin/dashboard" className="hover:text-black dark:hover:text-white transition-colors">Admin</Link>
             <ChevronRight className="w-2.5 h-2.5" />
             <span className="text-black dark:text-white">Products</span>
          </div>
          <h1 className="text-4xl font-playfair font-bold tracking-tight">Products <span className="text-gray-400">(456)</span></h1>
        </div>
        
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-full h-12 px-6 border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest gap-3 shadow-sm hover:shadow-md transition-all">
              <Upload className="w-4 h-4" /> Bulk Upload
           </Button>
           <Button variant="outline" className="rounded-full h-12 px-6 border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest gap-3 shadow-sm hover:shadow-md transition-all">
              <Download className="w-4 h-4" /> Export CSV
           </Button>
           <Link href="/admin/products/new">
             <Button className="rounded-full h-12 px-8 bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase tracking-widest gap-3 shadow-xl active:scale-95 transition-all">
                <Plus className="w-4 h-4" /> Add Product
             </Button>
           </Link>
        </div>
      </div>

      {/* Stats Quick View (Optional) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Active", value: "389", color: "text-green-600" },
           { label: "Out of Stock", value: "24", color: "text-red-600" },
           { label: "Low Stock", value: "12", color: "text-orange-600" },
           { label: "Drafts", value: "31", color: "text-gray-400" }
         ].map((stat, i) => (
           <div key={i} className="bg-white dark:bg-zinc-950 p-6 border border-gray-100 dark:border-zinc-800 rounded-2xl flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</span>
              <span className={cn("text-xl font-playfair font-bold", stat.color)}>{stat.value}</span>
           </div>
         ))}
      </div>

      {/* Main Content Sections */}
      <div className="space-y-6">
        <ProductFilters />
        <ProductsTable />
      </div>
    </div>
  );
};

export default AllProductsPage;

import { cn } from "@/lib/utils";
