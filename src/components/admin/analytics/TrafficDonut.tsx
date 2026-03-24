"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";
import { Globe, Search, Share2, MousePointer2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const data = [
  { name: "Direct", value: 30, color: "#000000", icon: Globe },
  { name: "Organic Search", value: 25, color: "#1e293b", icon: Search },
  { name: "Social Media", value: 20, color: "#475569", icon: Share2 },
  { name: "Paid Ads", value: 15, color: "#94a3b8", icon: MousePointer2 },
  { name: "Email", value: 10, color: "#cbd5e1", icon: Mail },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-950 p-4 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{payload[0].name}</p>
        <p className="text-lg font-bold text-black dark:text-white">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export function TrafficDonut() {
  return (
    <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm">
      <div className="mb-8">
         <h3 className="text-xl font-playfair font-bold text-black dark:text-white">Traffic Sources</h3>
         <p className="text-xs text-gray-400 mt-1">Acquisition channels distribution</p>
      </div>

      <div className="flex flex-col xl:flex-row items-center gap-10">
        <div className="h-[250px] w-full xl:w-[250px] relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Visits</span>
             <span className="text-xl font-bold text-black dark:text-white">45.2k</span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 gap-4 w-full">
           {data.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl border border-gray-50 dark:border-zinc-900 bg-white/50 dark:bg-zinc-950/50 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-gray-50 dark:bg-zinc-900 group-hover:scale-110 transition-transform">
                       <item.icon className="w-4 h-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">{item.name}</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-24 h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden hidden sm:block">
                       <div 
                          className="h-full bg-black dark:bg-white transition-all duration-1000" 
                          style={{ width: `${item.value}%` }} 
                       />
                    </div>
                    <span className="text-xs font-bold text-black dark:text-white w-8 text-right">{item.value}%</span>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </Card>
  );
}
