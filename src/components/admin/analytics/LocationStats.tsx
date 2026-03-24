"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Globe, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const locations = [
  { state: "Maharashtra", orders: 450, revenue: 125000, trend: 12.5 },
  { state: "Delhi", orders: 380, revenue: 98000, trend: 8.2 },
  { state: "Karnataka", orders: 310, revenue: 85000, trend: 15.4 },
  { state: "Tamil Nadu", orders: 280, revenue: 72000, trend: -2.1 },
  { state: "West Bengal", orders: 240, revenue: 65000, trend: 5.8 },
];

const topCities = [
  { name: "Mumbai", share: 35 },
  { name: "New Delhi", share: 28 },
  { name: "Bangalore", share: 22 },
  { name: "Pune", share: 8 },
  { name: "Chennai", share: 7 },
];

export function LocationStats() {
  return (
    <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm h-full font-sans">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h3 className="text-xl font-playfair font-bold text-black dark:text-white">Sales by Location</h3>
           <p className="text-xs text-gray-400 mt-1">Regional distribution and market reach</p>
        </div>
        <div className="p-2.5 rounded-2xl bg-gray-50 dark:bg-zinc-900">
           <Globe className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         {/* State Table */}
         <div className="flex-[2]">
            <Table>
               <TableHeader>
                  <TableRow className="hover:bg-transparent border-gray-50 dark:border-zinc-900">
                     <TableHead className="text-[9px] font-bold uppercase tracking-widest text-gray-400 pl-0">State / Region</TableHead>
                     <TableHead className="text-[9px] font-bold uppercase tracking-widest text-gray-400 text-right">Orders</TableHead>
                     <TableHead className="text-[9px] font-bold uppercase tracking-widest text-gray-400 text-right">Revenue</TableHead>
                     <TableHead className="text-[9px] font-bold uppercase tracking-widest text-gray-400 text-right">Growth</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {locations.map((loc) => (
                     <TableRow key={loc.state} className="group hover:bg-gray-50 dark:hover:bg-zinc-900 border-gray-50 dark:border-zinc-900 transition-colors">
                        <TableCell className="py-4 pl-0">
                           <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="text-[11px] font-bold text-black dark:text-white">{loc.state}</span>
                           </div>
                        </TableCell>
                        <TableCell className="text-right text-[11px] font-medium">{loc.orders}</TableCell>
                        <TableCell className="text-right text-[11px] font-bold">₹{loc.revenue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                           <span className={cn(
                              "text-[10px] font-bold",
                              loc.trend >= 0 ? "text-emerald-500" : "text-rose-500"
                           )}>
                              {loc.trend > 0 ? "+" : ""}{loc.trend}%
                           </span>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>

         {/* City Breakdown */}
         <div className="flex-1 space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Top Contributing Cities</h4>
            <div className="space-y-5">
               {topCities.map((city) => (
                  <div key={city.name} className="space-y-2">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">{city.name}</span>
                        <span className="text-[10px] font-bold text-black dark:text-white">{city.share}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-gray-50 dark:bg-zinc-900 rounded-full overflow-hidden">
                        <div 
                           className="h-full bg-black dark:bg-white rounded-full transition-all duration-1000" 
                           style={{ width: `${city.share}%` }} 
                        />
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="mt-8 p-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/10 flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500">Fastest Growing</span>
                  <span className="text-xs font-bold mt-1">Bangalore</span>
               </div>
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
               </div>
            </div>
         </div>
      </div>
    </Card>
  );
}
