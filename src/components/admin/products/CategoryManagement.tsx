"use client";

import React, { useState } from "react";
import { Plus, X, Trash2, Folder, ChevronRight, ChevronDown, Edit, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  children?: Category[];
}

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Men",
    slug: "men",
    count: 156,
    children: [
      { id: "1-1", name: "T-Shirts", slug: "men-tshirts", count: 45 },
      { id: "1-2", name: "Shirts", slug: "men-shirts", count: 32 },
      { id: "1-3", name: "Jeans", slug: "men-jeans", count: 28 },
    ]
  },
  {
    id: "2",
    name: "Women",
    slug: "women",
    count: 245,
    children: [
      { id: "2-1", name: "Dresses", slug: "women-dresses", count: 89 },
      { id: "2-2", name: "Handbags", slug: "women-bags", count: 56 },
    ]
  },
  {
    id: "3",
    name: "Accessories",
    slug: "accessories",
    count: 89,
    children: [
      { id: "3-1", name: "Watches", slug: "watches", count: 24 },
      { id: "3-2", name: "Belts", slug: "belts", count: 18 },
    ]
  }
];

const CategoryTreeItem = ({ item, level = 0 }: { item: Category, level?: number }) => {
  const [isOpen, setIsOpen] = useState(level === 0);

  return (
    <div className="space-y-1">
      <div className={cn(
        "flex items-center justify-between p-4 bg-white dark:bg-zinc-950 border border-gray-50 dark:border-zinc-900 rounded-2xl hover:border-black dark:hover:border-white transition-all group",
        level > 0 && "ml-8"
      )}>
        <div className="flex items-center gap-4">
           {item.children && (
             <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg transition-colors">
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
             </button>
           )}
           <div className="w-10 h-10 bg-gray-50 dark:bg-zinc-900 rounded-xl flex items-center justify-center font-bold text-gray-400">
              <Folder className="w-4 h-4" />
           </div>
           <div className="flex flex-col">
              <span className="text-[11px] font-bold">{item.name}</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest leading-none">{item.slug}</span>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <Badge variant="outline" className="rounded-full text-[8px] font-bold uppercase tracking-widest px-2 opacity-60">
              {item.count} Products
           </Badge>
           <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-gray-100 dark:border-zinc-800"><Edit className="w-3.5 h-3.5" /></Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-gray-100 dark:border-zinc-800 text-red-500 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></Button>
           </div>
        </div>
      </div>
      
      {isOpen && item.children && (
        <div className="space-y-1 animate-in fade-in slide-in-from-top-2">
          {item.children.map(child => <CategoryTreeItem key={child.id} item={child} level={level + 1} />)}
        </div>
      )}
    </div>
  );
};

const CategoryManagement = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Category Form */}
      <div className="lg:col-span-1 space-y-6">
         <div className="space-y-1">
            <h3 className="text-xl font-playfair font-bold">Add New Category</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Define your store hierarchy</p>
         </div>
         
         <div className="bg-white dark:bg-zinc-950 p-8 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-6">
            <div className="space-y-2">
               <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Category Name</Label>
               <Input placeholder="e.g. Leather Goods" className="rounded-xl h-11 border-gray-100 dark:border-zinc-800 focus:border-black transition-all" />
            </div>
            <div className="space-y-2">
               <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">URL Slug</Label>
               <Input placeholder="leather-goods" className="rounded-xl h-11 border-gray-100 dark:border-zinc-800 focus:border-black transition-all" />
            </div>
            <div className="space-y-2">
               <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Parent Category</Label>
               <Select>
                  <SelectTrigger className="rounded-xl h-11 border-gray-100 dark:border-zinc-800">
                     <SelectValue placeholder="None (Top Level)" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="none">None</SelectItem>
                     <SelectItem value="men">Men</SelectItem>
                     <SelectItem value="women">Women</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <div className="space-y-2">
               <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Description</Label>
               <Textarea placeholder="Brief summary..." className="rounded-xl min-h-[100px] border-gray-100 dark:border-zinc-800" />
            </div>
            <Button className="w-full h-11 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[9px] shadow-xl hover:-translate-y-1 transition-all">
               Save Category
            </Button>
         </div>
      </div>

      {/* Category Tree */}
      <div className="lg:col-span-2 space-y-6">
         <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h3 className="text-xl font-playfair font-bold">Category Hierarchy</h3>
               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Drag to reorder hierarchy</p>
            </div>
            <div className="relative w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
               <Input placeholder="Search categories..." className="pl-9 h-9 rounded-full border-gray-100 dark:border-zinc-800 text-[9px] font-bold uppercase tracking-widest" />
            </div>
         </div>

         <div className="space-y-2">
            {initialCategories.map(cat => (
              <CategoryTreeItem key={cat.id} item={cat} />
            ))}
         </div>
      </div>
    </div>
  );
};

export default CategoryManagement;

