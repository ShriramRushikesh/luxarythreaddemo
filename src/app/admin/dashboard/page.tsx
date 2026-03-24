"use client";

import React, { useState, useEffect } from "react";
import StatsCards from "@/components/admin/dashboard/StatsCards";
import DashboardCharts from "@/components/admin/dashboard/DashboardCharts";
import RecentOrdersTable from "@/components/admin/dashboard/RecentOrdersTable";
import DashboardLists from "@/components/admin/dashboard/DashboardLists";
import { Button } from "@/components/ui/button";
import { Download, Calendar, RefreshCcw } from "lucide-react";

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-gray-100 dark:bg-zinc-800 rounded-lg mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-100 dark:bg-zinc-800 rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[400px] bg-gray-100 dark:bg-zinc-800 rounded-xl" />
          <div className="h-[400px] bg-gray-100 dark:bg-zinc-800 rounded-xl" />
        </div>
        <div className="h-[500px] bg-gray-100 dark:bg-zinc-800 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-playfair font-bold tracking-tight">Executive Overview</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Real-time metrics for Luxury Threads Pune</p>
        </div>
        
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-full h-12 px-6 border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest gap-3 shadow-sm hover:shadow-md transition-all">
              <Calendar className="w-4 h-4" /> Last 30 Days
           </Button>
           <Button className="rounded-full h-12 px-8 bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase tracking-widest gap-3 shadow-xl active:scale-95 transition-all">
              <Download className="w-4 h-4" /> Export Report
           </Button>
        </div>
      </div>

      {/* Stats Section */}
      <StatsCards />

      {/* Analytics Section */}
      <DashboardCharts />

      {/* Recent Activity */}
      <RecentOrdersTable />

      {/* Lists Section */}
      <DashboardLists />
    </div>
  );
};

export default AdminDashboardPage;
