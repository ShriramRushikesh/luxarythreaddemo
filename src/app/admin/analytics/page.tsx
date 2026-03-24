"use client";

import React from "react";
import { DateRangePicker } from "@/components/admin/analytics/DateRangePicker";
import { KpiCards } from "@/components/admin/analytics/KpiCards";
import { RevenueChart } from "@/components/admin/analytics/RevenueChart";
import { CategorySales } from "@/components/admin/analytics/CategorySales";
import { TopProducts } from "@/components/admin/analytics/TopProducts";
import { TrafficDonut } from "@/components/admin/analytics/TrafficDonut";
import { HourlySales } from "@/components/admin/analytics/HourlySales";
import { AIInsights } from "@/components/admin/analytics/AIInsights";
import { LocationStats } from "@/components/admin/analytics/LocationStats";
import { Button } from "@/components/ui/button";
import { Download, Share2, Printer, Sparkles } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-10 pb-10 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
           <h1 className="text-4xl font-playfair font-bold text-black dark:text-white tracking-tight">Business Intelligence</h1>
           <p className="text-xs text-gray-400 mt-2 uppercase tracking-[0.2em] font-black">Luxury Threads Performance Dashboard</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
           <Button variant="outline" className="h-12 px-5 rounded-2xl border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all shadow-sm">
              <Share2 className="w-4 h-4 mr-2" /> Share View
           </Button>
           <Button variant="outline" className="h-12 px-5 rounded-2xl border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all shadow-sm">
              <Printer className="w-4 h-4 mr-2" /> Print PDF
           </Button>
           <Button className="h-12 px-6 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-black/20 dark:shadow-white/10 hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 mr-2 fill-current" /> Live Pulse
           </Button>
        </div>
      </div>

      {/* Primary Filters */}
      <DateRangePicker />

      {/* KPI Section */}
      <KpiCards />

      {/* Secondary Row: Revenue Trend & Category Distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         <div className="xl:col-span-2">
            <RevenueChart />
         </div>
         <div className="xl:col-span-1">
            <CategorySales />
         </div>
      </div>

      {/* Tertiary Row: Top Products & Location Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <TopProducts />
         <LocationStats />
      </div>

      {/* Fourth Row: Hourly Sales, Traffic & AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
         <div className="xl:col-span-1">
            <TrafficDonut />
         </div>
         <div className="xl:col-span-1">
            <HourlySales />
         </div>
         <div className="xl:col-span-1">
            <AIInsights />
         </div>
      </div>
    </div>
  );
}
