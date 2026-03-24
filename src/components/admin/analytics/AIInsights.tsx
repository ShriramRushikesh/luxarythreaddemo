"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, TrendingUp, AlertCircle, ShoppingBag, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const insights = [
  {
    title: "High Growth Category",
    description: "Women's collection grew 25% this month compared to the previous period.",
    type: "positive",
    icon: TrendingUp,
    action: "Consider increasing ad spend on Women's essentials."
  },
  {
    title: "Low Stock Alert",
    description: "Midnight Silk Tuxedo is selling 40% faster than average. Stock predicted to last 4 days.",
    type: "warning",
    icon: AlertCircle,
    action: "Restock immediately to avoid loss of revenue."
  },
  {
    title: "Conversion Opportunity",
    description: "Checkout drop-off rate increased by 3% among mobile users.",
    type: "neutral",
    icon: Target,
    action: "Review mobile checkout UI for potential friction points."
  },
  {
    title: "Customer Retention",
    description: "Repeat purchase rate is at 38%, which is 5% above industry average.",
    type: "positive",
    icon: ShoppingBag,
    action: "Launch a loyalty program to further capitalize on high retention."
  }
];

export function AIInsights() {
  return (
    <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-black/20 dark:shadow-white/10">
           <Sparkles className="w-4 h-4 fill-current" />
        </div>
        <div>
           <h3 className="text-xl font-playfair font-bold text-black dark:text-white">AI-Powered Insights</h3>
           <p className="text-xs text-gray-400 mt-0.5">Automated recommendations for business optimization</p>
        </div>
      </div>

      <div className="space-y-6">
         {insights.map((insight, idx) => (
            <div key={idx} className="group relative pl-10">
               <div className={cn(
                  "absolute left-0 top-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all group-hover:scale-110",
                  insight.type === "positive" ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500" :
                  insight.type === "warning" ? "bg-rose-50 dark:bg-rose-500/10 text-rose-500" :
                  "bg-blue-50 dark:bg-blue-500/10 text-blue-500"
               )}>
                  <insight.icon className="w-4 h-4" />
               </div>
               
               <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">{insight.title}</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                     {insight.description}
                  </p>
               </div>

               <div className="mt-3 p-3 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-transparent group-hover:border-gray-100 dark:group-hover:border-zinc-800 transition-all flex items-center justify-between gap-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 italic">
                     Recommendation: <span className="text-black dark:text-white not-italic">{insight.action}</span>
                  </p>
                  <button className="text-[8px] font-black uppercase tracking-[0.2em] text-black dark:text-white px-2 py-1 rounded-lg border border-gray-200 dark:border-zinc-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shrink-0">
                     Apply
                  </button>
               </div>
               
               {idx !== insights.length - 1 && (
                  <div className="absolute left-[15px] top-10 bottom-[-24px] w-[1px] bg-gray-100 dark:bg-zinc-800 group-last:hidden" />
               )}
            </div>
         ))}
      </div>
    </Card>
  );
}
