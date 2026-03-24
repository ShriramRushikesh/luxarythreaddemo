"use client";

import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  AreaChart,
  Area
} from "recharts";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Maximize2, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const data = [
  { date: "Oct 01", revenue: 45000, orders: 120, aov: 375, prevRevenue: 42000 },
  { date: "Oct 05", revenue: 52000, orders: 145, aov: 358, prevRevenue: 48000 },
  { date: "Oct 10", revenue: 48000, orders: 130, aov: 369, prevRevenue: 51000 },
  { date: "Oct 15", revenue: 61000, orders: 168, aov: 363, prevRevenue: 49000 },
  { date: "Oct 20", revenue: 55000, orders: 152, aov: 361, prevRevenue: 53000 },
  { date: "Oct 25", revenue: 67000, orders: 185, aov: 362, prevRevenue: 56000 },
  { date: "Oct 30", revenue: 72000, orders: 198, aov: 363, prevRevenue: 59000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-950 p-4 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{label}</p>
        <div className="space-y-1">
           {payload.map((p: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3 justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{p.name}:</span>
                 </div>
                 <span className="text-sm font-bold text-black dark:text-white">
                    {p.name.includes("Revenue") ? `₹${p.value.toLocaleString()}` : p.value}
                 </span>
              </div>
           ))}
        </div>
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  const [metric, setMetric] = useState<"revenue" | "orders" | "aov">("revenue");

  return (
    <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
           <h3 className="text-2xl font-playfair font-bold text-black dark:text-white">Trend Analysis</h3>
           <p className="text-xs text-gray-400 mt-1">Daily performance overview for the selected period</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
           <Tabs value={metric} onValueChange={(v: any) => setMetric(v)} className="bg-gray-50 dark:bg-zinc-900 p-1 rounded-xl">
              <TabsList className="bg-transparent border-none">
                 <TabsTrigger 
                    value="revenue" 
                    className="rounded-lg text-[9px] font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
                 >
                    Revenue
                 </TabsTrigger>
                 <TabsTrigger 
                    value="orders" 
                    className="rounded-lg text-[9px] font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
                 >
                    Orders
                 </TabsTrigger>
                 <TabsTrigger 
                    value="aov" 
                    className="rounded-lg text-[9px] font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
                 >
                    AOV
                 </TabsTrigger>
              </TabsList>
           </Tabs>
           
           <div className="flex items-center gap-1 ml-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900">
                 <Download className="w-4 h-4 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900">
                 <Maximize2 className="w-4 h-4 text-gray-400" />
              </Button>
           </div>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#000000" stopOpacity={0.05} />
                <stop offset="95%" stopColor="#000000" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.05} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
              tickFormatter={(val) => metric === "revenue" ? `₹${val/1000}k` : val}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey={metric} 
              name={metric.charAt(0).toUpperCase() + metric.slice(1)}
              stroke="#000000" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorMetric)" 
              animationDuration={2000}
            />
            <Area 
              type="monotone" 
              dataKey={metric === "revenue" ? "prevRevenue" : ""} 
              name="Previous Period"
              stroke="#94a3b8" 
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={1} 
              fill="url(#colorPrev)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 flex items-center justify-center gap-8">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-black shadow-lg shadow-black/20" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Current Period</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-dashed border-slate-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Previous Period</span>
         </div>
      </div>
    </Card>
  );
}
