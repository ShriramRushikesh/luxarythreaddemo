"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { Card } from "@/components/ui/card";
import { Clock, Zap } from "lucide-react";

const data = [
  { hour: "00", sales: 120 }, { hour: "02", sales: 80 }, { hour: "04", sales: 45 },
  { hour: "06", sales: 60 }, { hour: "08", sales: 150 }, { hour: "10", sales: 320 },
  { hour: "12", sales: 450 }, { hour: "14", sales: 580 }, { hour: "16", sales: 520 },
  { hour: "18", sales: 610 }, { hour: "20", sales: 480 }, { hour: "22", sales: 250 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-950 p-3 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{payload[0].payload.hour}:00 - {parseInt(payload[0].payload.hour) + 2}:00</p>
        <p className="text-sm font-bold text-black dark:text-white">₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export function HourlySales() {
  return (
    <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h3 className="text-xl font-playfair font-bold text-black dark:text-white">Sales by Time of Day</h3>
           <p className="text-xs text-gray-400 mt-1">Identifying peak transaction hours</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 px-3 py-1.5 rounded-xl border border-amber-100 dark:border-amber-900/30">
           <Zap className="w-3.5 h-3.5 fill-current" />
           <span className="text-[9px] font-bold uppercase tracking-widest">Peak: 6 PM - 8 PM</span>
        </div>
      </div>

      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
               dataKey="hour" 
               axisLine={false} 
               tickLine={false} 
               tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }}
               dy={10}
               tickFormatter={(val) => `${val}h`}
            />
            <YAxis 
               axisLine={false} 
               tickLine={false} 
               tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }}
               tickFormatter={(val) => `₹${val}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', opacity: 0.1 }} />
            <Bar 
               dataKey="sales" 
               radius={[6, 6, 0, 0]} 
               animationDuration={1500}
            >
               {data.map((entry, index) => (
                  <Cell 
                     key={`cell-${index}`} 
                     fill={entry.sales > 500 ? "#000000" : "#cbd5e1"} 
                     className="transition-all duration-300"
                  />
               ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 flex items-center gap-4">
         <div className="p-2 rounded-xl bg-white dark:bg-zinc-950 shadow-sm shrink-0">
            <Clock className="w-4 h-4 text-gray-400" />
         </div>
         <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest font-bold">
            Data suggests scheduling promotional SMS and Emails between <span className="text-black dark:text-white">2 PM and 4 PM</span> to maximize conversion for the evening peak.
         </p>
      </div>
    </Card>
  );
}
