"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Target, TrendingUp, Search, Clock, Box } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TOP_WISHLISTED = [
  { rank: 1, name: "Classic Leather Tote", brand: "Prada", wishlists: 894, conversion: "12%", status: "Active" },
  { rank: 2, name: "Silk Evening Dress", brand: "Gucci", wishlists: 652, conversion: "4%", status: "Active" },
  { rank: 3, name: "Air Max 270", brand: "Nike", wishlists: 512, conversion: "28%", status: "Active" },
  { rank: 4, name: "Cashmere Sweater", brand: "Loro Piana", wishlists: 410, conversion: "0.5%", status: "Price Risk" },
  { rank: 5, name: "Leather Watch Strap", brand: "Hermès", wishlists: 320, conversion: "15%", status: "Low Stock" },
];

export default function WishlistAnalyticsPage() {
  return (
    <div className="space-y-12 pb-20">
      
      <div>
         <h2 className="text-3xl font-playfair font-bold text-black dark:text-white">Wishlist Analytics</h2>
         <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">Track saved items, high-intent products, and purchase conversions.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Total Saved Items", value: "24,892", trend: "+125 today", icon: Target, c: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
           { label: "Wishlist Conversion", value: "8.4%", trend: "+1.2% all-time", icon: TrendingUp, c: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
           { label: "Avg Time to Purchase", value: "14 Days", trend: "-2 days vs last month", icon: Clock, c: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
           { label: "Lost Interest Items", value: "3,210", trend: "0 conversions > 90d", icon: Search, c: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
         ].map((stat, i) => (
           <Card key={i} className="p-6 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl flex items-center justify-between group">
              <div>
                 <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-2">{stat.label}</p>
                 <h4 className="text-3xl font-playfair font-bold">{stat.value}</h4>
                 <p className="text-[10px] font-bold tracking-widest text-gray-400 mt-1">{stat.trend}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${stat.bg} ${stat.c}`}>
                 <stat.icon className="w-5 h-5" />
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         {/* Table */}
         <Card className="xl:col-span-2 p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm">
            <h3 className="text-xl font-playfair font-bold mb-6">Most Wishlisted Products</h3>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-gray-50 dark:border-zinc-900">
                        <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4"># / Product</th>
                        <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4">Wishlists</th>
                        <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4">Conv. Rate</th>
                        <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4 text-right">Insight Flag</th>
                     </tr>
                  </thead>
                  <tbody>
                     {TOP_WISHLISTED.map((row) => (
                        <tr key={row.rank} className="border-b border-gray-50 dark:border-zinc-900/50 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                           <td className="py-4 px-4 font-medium text-sm flex items-center gap-3">
                              <span className="text-gray-400 font-bold">{row.rank}.</span>
                              <div className="flex flex-col">
                                 <span className="text-[10px] font-black uppercase text-gray-400">{row.brand}</span>
                                 <span className="font-bold">{row.name}</span>
                              </div>
                           </td>
                           <td className="py-4 px-4 font-bold">{row.wishlists}</td>
                           <td className="py-4 px-4 font-bold">{row.conversion}</td>
                           <td className="py-4 px-4 text-right">
                              <Badge variant="outline" className={`text-[9px] uppercase tracking-widest font-black px-2 py-0.5 border
                                 ${row.status === 'Active' ? 'text-emerald-500 border-emerald-200 bg-emerald-50 dark:bg-emerald-500/10' : ''}
                                 ${row.status === 'Price Risk' ? 'text-rose-500 border-rose-200 bg-rose-50 dark:bg-rose-500/10' : ''}
                                 ${row.status === 'Low Stock' ? 'text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-500/10' : ''}
                              `}>
                                 {row.status}
                              </Badge>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>

         {/* AI Insights Panel */}
         <Card className="p-8 bg-gray-50 dark:bg-zinc-900/50 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm flex flex-col space-y-6">
            <h3 className="text-xl font-playfair font-bold">Actionable Insights</h3>
            
            <div className="space-y-4">
               <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-rose-500"></div>
                  <h4 className="font-bold text-sm mb-2 text-rose-600 dark:text-rose-400">High Intent, Zero Purchase</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">"Cashmere Sweater" has been wishlisted 410 times but only converted 0.5%. We recommend triggering a targeted -10% flash discount email to this cohort.</p>
               </div>

               <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-amber-500"></div>
                  <h4 className="font-bold text-sm mb-2 text-amber-600 dark:text-amber-400">Stock Urgency Risk</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">"Leather Watch Strap" is wishlisted by 320 users, but only 14 items remain in stock. Consider sending a "Low Stock Alert" to drive immediate conversion.</p>
               </div>

               <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
                  <h4 className="font-bold text-sm mb-2 text-blue-600 dark:text-blue-400">Related Comparisons Focus</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">Users who compare "Classic Leather Tote" and "Suede Weekend Bag" typically buy the Suede Bag. Enhance Tote features layout.</p>
               </div>
            </div>
         </Card>
      </div>

    </div>
  );
}
