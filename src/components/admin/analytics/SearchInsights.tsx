"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target,
  MousePointerClick,
  MonitorOff,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const topSearches = [
  { term: "nike shoes", count: 1245, trend: "+12%", conversion: "4.5%", results: 45 },
  { term: "leather tote", count: 980, trend: "+5%", conversion: "6.2%", results: 12 },
  { term: "summer dresses", count: 850, trend: "+24%", conversion: "8.1%", results: 89 },
  { term: "gucci belt", count: 720, trend: "-2%", conversion: "2.1%", results: 4 },
  { term: "zara surplus", count: 650, trend: "+8%", conversion: "12.5%", results: 156 },
];

const deadEndSearches = [
  { term: "yeezy boost 350", count: 145, lastSearched: "2 hours ago" },
  { term: "louis vuitton bags", count: 98, lastSearched: "5 hours ago" },
  { term: "rolex daytona", count: 67, lastSearched: "1 day ago" },
  { term: "supreme hoodie", count: 42, lastSearched: "2 days ago" }
];

export function SearchInsights() {
  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h3 className="text-4xl font-playfair font-bold text-black dark:text-white">Search Analytics</h3>
           <p className="text-xs text-gray-400 mt-2 uppercase tracking-[0.2em] font-black italic">Customer Intent & Keyword Performance</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-zinc-950 p-1.5 rounded-2xl border border-gray-100 dark:border-zinc-800">
           {['Today', '7D', '30D', '1Y'].map(range => (
             <button key={range} className={cn(
               "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
               range === '30D' ? "bg-black text-white dark:bg-white dark:text-black shadow-md" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900"
             )}>
               {range}
             </button>
           ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Total Searches", value: "45,231", trend: "+12.5%", icon: Search, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
           { label: "Search to Cart", value: "8.4%", trend: "+1.2%", icon: Target, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
           { label: "Zero-Result Rate", value: "4.2%", trend: "-0.8%", icon: MonitorOff, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
           { label: "Avg. Click Position", value: "2.4", trend: "+0.3", icon: MousePointerClick, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
         ].map((stat, i) => (
           <Card key={i} className="p-6 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl flex items-center justify-between group cursor-default hover:border-black dark:hover:border-white transition-colors">
              <div>
                 <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
                 <div className="flex items-end gap-3 mt-1">
                    <h4 className="text-3xl font-playfair font-bold">{stat.value}</h4>
                    <span className={cn("text-[10px] font-black tracking-widest mb-1", stat.trend.startsWith('+') ? "text-emerald-500" : "text-rose-500")}>
                       {stat.trend}
                    </span>
                 </div>
              </div>
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg)}>
                 <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         {/* Top keywords */}
         <Card className="xl:col-span-2 p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-6"><TrendingUp className="w-4 h-4" /> Top 20 Searched Keywords</h4>
            
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-gray-50 dark:border-zinc-900">
                        <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4">Search Term</th>
                        <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4">Volume</th>
                        <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4">Conv. Rate</th>
                        <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4">Avg Results</th>
                     </tr>
                  </thead>
                  <tbody>
                     {topSearches.map((item, i) => (
                        <tr key={i} className="border-b border-gray-50 dark:border-zinc-900/50 last:border-0 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                           <td className="py-4 px-4 font-medium text-sm">"{item.term}"</td>
                           <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                 <span className="font-bold">{item.count}</span>
                                 <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full", item.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10" : "bg-rose-50 text-rose-600 dark:bg-rose-500/10")}>{item.trend}</span>
                              </div>
                           </td>
                           <td className="py-4 px-4">
                              <div className="flex items-center gap-3 w-32">
                                 <Progress value={parseFloat(item.conversion) * 4} className="h-1.5 bg-gray-100 dark:bg-zinc-800" />
                                 <span className="text-xs font-bold">{item.conversion}</span>
                              </div>
                           </td>
                           <td className="py-4 px-4">
                              <Badge variant="outline" className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border-gray-200 dark:border-zinc-800">{item.results}</Badge>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>

         {/* Dead Ends */}
         <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm flex flex-col">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-6"><AlertTriangle className="w-4 h-4 text-amber-500" /> High-Intent "0 Results"</h4>
            <p className="text-xs text-gray-500 mb-6 font-medium leading-relaxed">These keywords returned absolutely no products. Consider stocking these items or adding synonym redirects to similar products.</p>
            
            <div className="space-y-4 flex-1">
               {deadEndSearches.map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-rose-100 dark:border-rose-900/30 bg-rose-50/50 dark:bg-rose-500/5 flex items-center justify-between">
                     <div>
                        <p className="font-bold text-sm text-rose-950 dark:text-rose-200">"{item.term}"</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mt-1">Last: {item.lastSearched}</p>
                     </div>
                     <Badge className="bg-white dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shadow-sm text-[10px] font-black px-2 py-0.5">
                        {item.count} Vol
                     </Badge>
                  </div>
               ))}
            </div>
         </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="p-8 bg-black dark:bg-white text-white dark:text-black border-none rounded-[2.5rem] shadow-xl space-y-4">
            <h4 className="text-2xl font-playfair font-bold">Synonym Management</h4>
            <p className="text-sm opacity-70 leading-relaxed font-medium">Map failed search queries to existing products automatically using AI-powered synonym linking.</p>
            <div className="pt-4 space-y-3">
               <div className="flex items-center gap-3 p-4 bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-black/20">
                  <span className="font-bold text-sm">"sneakers"</span>
                  <ArrowRight className="w-4 h-4 opacity-50 mx-2" />
                  <span className="font-bold text-sm">"sports shoes"</span>
               </div>
               <div className="flex items-center gap-3 p-4 bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-black/20">
                  <span className="font-bold text-sm">"pullover"</span>
                  <ArrowRight className="w-4 h-4 opacity-50 mx-2" />
                  <span className="font-bold text-sm">"sweater", "hoodie"</span>
               </div>
            </div>
         </Card>
         
         <Card className="p-8 bg-gray-50 dark:bg-zinc-900 border-none rounded-[2.5rem] shadow-inner flex flex-col items-center justify-center text-center space-y-4">
            <Search className="w-12 h-12 text-gray-300 dark:text-gray-700" />
            <h4 className="text-xl font-bold">Search Algorithm Weights</h4>
            <p className="text-sm text-gray-500 font-medium">Currently optimized for Exact Match (50%), Starts With (30%), Contains (20%).</p>
         </Card>
      </div>
    </div>
  );
}
