"use client";

import React from "react";
import { TrendingUp, TrendingDown, IndianRupee, ShoppingBag, Users, MousePointer2 } from "lucide-react";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sparklineData = [
  { value: 400 }, { value: 300 }, { value: 600 }, { value: 800 },
  { value: 500 }, { value: 700 }, { value: 900 }, { value: 600 },
  { value: 400 }, { value: 800 }, { value: 700 }, { value: 950 },
];

interface MetricCardProps {
  title: string;
  value: string;
  trend: number;
  icon: React.ElementType;
  data: any[];
  color?: string;
}

const MetricCard = ({ title, value, trend, icon: Icon, data, color = "black" }: MetricCardProps) => {
  const isPositive = trend >= 0;

  return (
    <Card className="p-6 relative overflow-hidden bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm hover:shadow-xl transition-all group">
      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        <div className="flex items-center justify-between">
           <div className="p-2.5 rounded-2xl bg-gray-50 dark:bg-zinc-900 group-hover:scale-110 transition-transform">
              <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
           </div>
           <div className={cn(
              "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full",
              isPositive ? "text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10" : "text-rose-500 bg-rose-50/50 dark:bg-rose-500/10"
           )}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(trend)}%
           </div>
        </div>

        <div>
           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">{title}</p>
           <h3 className="text-3xl font-playfair font-bold text-black dark:text-white">{value}</h3>
        </div>

        <div className="h-12 w-full mt-2">
           <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                 <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={isPositive ? "#10b981" : "#f43f5e"} 
                    strokeWidth={2} 
                    dot={false}
                    animationDuration={1500}
                 />
              </LineChart>
           </ResponsiveContainer>
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50/50 dark:from-zinc-900/20 to-transparent rounded-bl-full pointer-events-none -mr-8 -mt-8" />
    </Card>
  );
};

export function KpiCards() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "₹4,56,789",
      trend: 15.2,
      icon: IndianRupee,
      data: sparklineData,
    },
    {
      title: "Total Orders",
      value: "1,234",
      trend: 8.5,
      icon: ShoppingBag,
      data: sparklineData.map(d => ({ value: d.value * 0.8 })),
    },
    {
      title: "Average Order Value",
      value: "₹3,702",
      trend: 6.3,
      icon: IndianRupee,
      data: sparklineData.map(d => ({ value: d.value * 1.2 })),
    },
    {
      title: "Conversion Rate",
      value: "2.8%",
      trend: -0.4,
      icon: MousePointer2,
      data: sparklineData.map(d => ({ value: d.value * 0.5 })),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((m, idx) => (
        <MetricCard key={idx} {...m} />
      ))}
    </div>
  );
}
