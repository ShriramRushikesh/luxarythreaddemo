"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Clock, 
  ShoppingBag, 
  TrendingUp, 
  Timer,
  Plus,
  ArrowUpRight,
  Package,
  XCircle,
  MoreVertical,
  Play,
  BarChart2,
  Edit
} from "lucide-react";
import { cn } from "@/lib/utils";

const sales = [
  {
    id: "1",
    name: "Midnight Luxury Flash Sale",
    status: "Active",
    timeLeft: "02h 45m 12s",
    products: 12,
    totalSold: 450,
    inventoryCap: 500,
    revenue: "₹1,25,000",
    growth: "+22%"
  },
  {
    id: "2",
    name: "Weekend Classics Promo",
    status: "Scheduled",
    timeLeft: "Starts in 1d 04h",
    products: 45,
    totalSold: 0,
    inventoryCap: 2000,
    revenue: "-",
    growth: "-"
  }
];

export function FlashSaleDashboard() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h3 className="text-2xl font-playfair font-bold text-black dark:text-white">Flash Sales & Limited Offers</h3>
           <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Real-time performance tracking for time-sensitive events</p>
        </div>
        
        <Button className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-black/20 dark:shadow-white/10 flex items-center gap-3">
          <Plus className="w-4 h-4" /> Create Flash Sale
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {sales.map((sale) => (
            <Card key={sale.id} className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[3rem] shadow-sm space-y-8 relative overflow-hidden group">
               {/* Status & Timer */}
               <div className="flex items-center justify-between">
                  <Badge className={cn(
                    "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-none",
                    sale.status === "Active" ? "bg-emerald-500 text-white animate-pulse" : "bg-blue-500 text-white"
                  )}>
                    {sale.status}
                  </Badge>
                  
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                     <Timer className="w-4 h-4 text-black dark:text-white" />
                     <span className="text-xs font-black tracking-widest text-black dark:text-white">{sale.timeLeft}</span>
                  </div>
               </div>

               {/* Sale Info */}
               <div>
                  <h4 className="text-2xl font-playfair font-bold text-black dark:text-white">{sale.name}</h4>
                  <div className="flex items-center gap-6 mt-4">
                     <div className="flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{sale.products} Products Included</span>
                     </div>
                  </div>
               </div>

               {/* Progress & Metrics */}
               {sale.status === "Active" && (
                  <div className="space-y-6">
                     <div className="space-y-3">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                           <span className="text-gray-400">Inventory Exhaustion</span>
                           <span className="text-black dark:text-white">{Math.round((sale.totalSold / sale.inventoryCap) * 100)}%</span>
                        </div>
                        <Progress value={(sale.totalSold / sale.inventoryCap) * 100} className="h-2 rounded-full bg-gray-50 dark:bg-zinc-900 overflow-hidden">
                           <div className="h-full bg-black dark:bg-white rounded-full transition-all duration-1000" style={{ width: `${(sale.totalSold / sale.inventoryCap) * 100}%` }} />
                        </Progress>
                     </div>

                     <div className="grid grid-cols-2 gap-8 pt-4">
                        <div className="p-5 rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-gray-100 dark:hover:border-zinc-800 transition-all">
                           <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Live Revenue</p>
                           <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-black dark:text-white">{sale.revenue}</span>
                              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                           </div>
                        </div>
                        <div className="p-5 rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-gray-100 dark:hover:border-zinc-800 transition-all">
                           <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Conversion Growth</p>
                           <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-black dark:text-white">{sale.growth}</span>
                              <TrendingUp className="w-4 h-4 text-emerald-500" />
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {sale.status === "Scheduled" && (
                  <div className="h-44 rounded-3xl bg-gray-50/50 dark:bg-zinc-900/50 border border-dashed border-gray-100 dark:border-zinc-800 flex flex-col items-center justify-center gap-4 text-center">
                     <Play className="w-8 h-8 text-gray-300" />
                     <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sale will go live automatically at scheduled time</p>
                     <Button variant="outline" className="h-8 px-4 rounded-xl border-gray-100 dark:border-zinc-800 text-[8px] font-black uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                        Go Live Now
                     </Button>
                  </div>
               )}

               {/* Actions */}
               <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-zinc-900">
                  <div className="flex items-center gap-4">
                     <button className="text-[9px] font-black uppercase tracking-widest text-black dark:text-white flex items-center gap-2 hover:underline">
                        <BarChart2 className="w-3.5 h-3.5" /> Full Stats
                     </button>
                  </div>
                  <div className="flex items-center gap-2">
                     <Button variant="ghost" size="icon" className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-zinc-900">
                        <Edit className="w-4 h-4 text-gray-400" />
                     </Button>
                     <Button variant="ghost" size="icon" className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-zinc-900">
                        <XCircle className="w-4 h-4 text-rose-500" />
                     </Button>
                  </div>
               </div>

               {/* Decorative background icon */}
               <Zap className="absolute -right-8 -top-8 w-32 h-32 text-black/5 dark:text-white/5 -rotate-12 pointer-events-none" />
            </Card>
         ))}

         {/* Add Sale Placeholder */}
         <button className="h-[460px] rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-zinc-800 flex flex-col items-center justify-center gap-4 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all group lg:col-span-1">
            <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
               <Plus className="w-8 h-8 text-gray-300" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Plan New Flash Sale Event</span>
         </button>
      </div>
    </div>
  );
}
