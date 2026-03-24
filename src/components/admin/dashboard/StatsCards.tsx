"use client";

import React from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Today's Sales",
    value: "₹45,230",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-950/20"
  },
  {
    title: "Total Orders",
    value: "23",
    subValue: "5 pending",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/20"
  },
  {
    title: "New Customers",
    value: "1,234",
    change: "+45 this week",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/20"
  },
  {
    title: "Active Products",
    value: "456",
    subValue: "12 low stock",
    change: "-2.4%",
    trend: "down",
    icon: Package,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950/20"
  }
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="border-none shadow-sm dark:bg-zinc-900 overflow-hidden group hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              {stat.title}
            </CardTitle>
            <div className={cn("p-2 rounded-lg transition-transform group-hover:scale-110 duration-300", stat.bg, stat.color)}>
              <stat.icon className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-playfair font-bold">{stat.value}</div>
              {stat.subValue && (
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{stat.subValue}</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
                stat.trend === "up" ? "text-green-600 bg-green-50 dark:bg-green-950/30" : "text-red-500 bg-red-50 dark:bg-red-950/30"
              )}>
                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">vs last period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
