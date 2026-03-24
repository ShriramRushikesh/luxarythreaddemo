"use client";

import React from "react";
import { Plus, X, Trash2, Globe, ExternalLink, Edit, Search, Shield, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const brands = [
  { id: "1", name: "Gucci", slug: "gucci", status: "Active", origin: "Italy", items: 45, logo: "GC" },
  { id: "2", name: "Prada", slug: "prada", status: "Active", origin: "Italy", items: 32, logo: "PR" },
  { id: "3", name: "Louis Vuitton", slug: "louis-vuitton", status: "Active", origin: "France", items: 56, logo: "LV" },
  { id: "4", name: "Dior", slug: "dior", status: "Active", origin: "France", items: 28, logo: "DR" },
  { id: "5", name: "Rolex", slug: "rolex", status: "Active", origin: "Switzerland", items: 12, logo: "RX" }
];

const BrandManagement = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
      {/* Brand Form */}
      <div className="lg:col-span-1 space-y-6">
         <div className="space-y-1">
            <h3 className="text-xl font-playfair font-bold">Register Brand</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Add luxury partners to your store</p>
         </div>
         
         <div className="bg-white dark:bg-zinc-950 p-8 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-6">
            <div className="flex flex-col items-center gap-4 py-4">
               <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-gray-100 dark:border-zinc-800 flex flex-col items-center justify-center gap-2 group hover:border-black dark:hover:border-white transition-all cursor-pointer">
                  <Plus className="w-5 h-5 text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
                  <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Logo</span>
               </div>
            </div>

            <div className="space-y-2">
               <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Brand Name</Label>
               <Input placeholder="e.g. Balenciaga" className="rounded-xl h-11 border-gray-100 dark:border-zinc-800 focus:border-black transition-all" />
            </div>
            <div className="space-y-2">
               <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Brand Origin</Label>
               <Input placeholder="e.g. France" className="rounded-xl h-11 border-gray-100 dark:border-zinc-800" />
            </div>
            <div className="space-y-2">
               <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Brand Story</Label>
               <Textarea placeholder="Brief history..." className="rounded-xl min-h-[100px] border-gray-100 dark:border-zinc-800" />
            </div>
            <Button className="w-full h-11 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[9px] shadow-xl hover:-translate-y-1 transition-all">
               Save Brand
            </Button>
         </div>
      </div>

      {/* Brand List */}
      <div className="lg:col-span-3 space-y-8">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
               {[
                 { label: "Active Brands", value: "24", icon: Shield },
                 { label: "Top Origin", value: "Italy", icon: Globe },
                 { label: "Total Items", value: "456", icon: Layers }
               ].map((stat, i) => (
                 <div key={i} className="bg-white dark:bg-zinc-950 p-4 border border-gray-50 dark:border-zinc-900 rounded-2xl flex flex-col gap-1">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</span>
                    <span className="text-sm font-bold">{stat.value}</span>
                 </div>
               ))}
            </div>
            <div className="relative w-full md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <Input placeholder="Search brands..." className="pl-10 h-11 rounded-full border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest" />
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {brands.map(brand => (
              <div key={brand.id} className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 dark:bg-zinc-900/50 rounded-bl-[100px] -mr-8 -mt-8 -z-10 transition-transform group-hover:scale-110" />
                 
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-black text-white dark:bg-white dark:text-black rounded-2xl flex items-center justify-center font-playfair font-bold text-xl shadow-lg ring-4 ring-gray-50/50 dark:ring-zinc-900/50">
                       {brand.logo}
                    </div>
                    <Badge variant="outline" className="rounded-full text-[8px] font-bold uppercase tracking-widest px-2 border-gray-200 dark:border-zinc-800">
                       {brand.items} Items
                    </Badge>
                 </div>

                 <div className="space-y-4">
                    <div className="space-y-1">
                       <h4 className="text-lg font-playfair font-bold">{brand.name}</h4>
                       <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                          <Globe className="w-3 h-3" /> {brand.origin}
                       </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-gray-50 dark:border-zinc-900">
                       <Button variant="outline" size="sm" className="flex-1 rounded-full border-gray-100 dark:border-zinc-800 text-[8px] font-bold uppercase tracking-widest gap-2">
                          <Edit className="w-3 h-3" /> Edit Profile
                       </Button>
                       <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full border border-gray-100 dark:border-zinc-800 text-red-500 hover:text-red-600">
                          <Trash2 className="w-3.5 h-3.5" />
                       </Button>
                    </div>
                 </div>
              </div>
            ))}

            <button className="bg-gray-50/50 dark:bg-zinc-900/30 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 group hover:border-black dark:hover:border-white transition-all">
               <div className="w-12 h-12 bg-white dark:bg-zinc-950 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5 text-gray-300 group-hover:text-black dark:group-hover:text-white" />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">Add Brand</span>
            </button>
         </div>
      </div>
    </div>
  );
};

export default BrandManagement;

