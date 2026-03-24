"use client";

import React from "react";
import { Search, Calendar, Download, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "all", label: "All", count: 1234 },
  { id: "pending", label: "Pending", count: 23 },
  { id: "processing", label: "Processing", count: 45 },
  { id: "shipped", label: "Shipped", count: 89 },
  { id: "delivered", label: "Delivered", count: 1000 },
  { id: "cancelled", label: "Cancelled", count: 77 },
];

const OrderFilters = () => {
  const [activeTab, setActiveTab] = React.useState("all");

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-3",
              activeTab === tab.id 
                ? "bg-black text-white shadow-xl translate-y-[-2px]" 
                : "bg-gray-50/50 dark:bg-zinc-900/50 text-gray-400 hover:text-black dark:hover:text-white border border-gray-100 dark:border-zinc-800"
            )}
          >
            {tab.label}
            <span className={cn(
              "px-2 py-0.5 rounded-full text-[8px]",
              activeTab === tab.id ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-400"
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Actions */}
      <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto flex-1">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
            <Input 
              placeholder="Search Order #, Customer, Email..." 
              className="pl-12 h-12 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-2xl text-[10px] uppercase font-bold tracking-widest focus:ring-black"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
             <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 dark:border-zinc-800 text-[9px] font-bold uppercase tracking-widest gap-2 bg-white dark:bg-zinc-950 shadow-sm">
                <Calendar className="w-4 h-4" /> Date Range
             </Button>
             <Button variant="outline" className="h-12 w-12 p-0 rounded-2xl border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
                <Filter className="w-4 h-4" />
             </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full xl:w-auto justify-between md:justify-end">
           <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-2">Sort by:</span>
              <Button variant="ghost" className="h-10 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors">
                 Newest First <ChevronDown className="w-4 h-4" />
              </Button>
           </div>
           <Button className="h-12 px-8 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] gap-3 shadow-xl hover:-translate-y-1 transition-all">
              <Download className="w-4 h-4" /> Export Orders
           </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;
