"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const data = [
  { name: "Men's Wear", value: 45000, color: "#000000" },
  { name: "Women's Wear", value: 35000, color: "#475569" },
  { name: "Accessories", value: 20000, color: "#94a3b8" },
  { name: "Footwear", value: 15000, color: "#cbd5e1" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-950 p-4 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{payload[0].name}</p>
        <p className="text-sm font-bold text-black dark:text-white">₹{payload[0].value.toLocaleString()}</p>
        <p className="text-[9px] text-emerald-500 font-bold mt-1">
           {((payload[0].value / 115000) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

export function CategorySales() {
  return (
    <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm h-full flex flex-col">
      <div className="mb-8">
         <h3 className="text-xl font-playfair font-bold text-black dark:text-white">Sales by Category</h3>
         <p className="text-xs text-gray-400 mt-1">Revenue distribution across collections</p>
      </div>

      <div className="flex-1 min-h-[300px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Total Sales</span>
           <span className="text-2xl font-playfair font-bold text-black dark:text-white">₹1.15L</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
         {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-transparent hover:border-gray-100 dark:hover:border-zinc-800 transition-all cursor-pointer group">
               <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
               <div className="flex flex-col overflow-hidden">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors truncate">{item.name}</span>
                  <span className="text-xs font-bold text-black dark:text-white">₹{(item.value / 1000).toFixed(0)}k</span>
               </div>
            </div>
         ))}
      </div>
    </Card>
  );
}
