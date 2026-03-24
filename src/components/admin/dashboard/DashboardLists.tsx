"use client";

import React from "react";
import { AlertCircle, ArrowUpRight, User, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const lowStockProducts = [
  { name: "Prada Nylon Bag", sku: "PRD-201", stock: 2, image: "/images/prada.jpg" },
  { name: "Gucci Leather Belt", sku: "GCI-45", stock: 1, image: "/images/gucci.jpg" },
  { name: "LV Keepall 45", sku: "LV-909", stock: 4, image: "/images/lv.jpg" },
  { name: "Dior B23 High Top", sku: "DR-56", stock: 3, image: "/images/dior.jpg" },
];

const topCustomers = [
  { name: "Siddharth Malhotra", orders: 12, value: "₹2,45,000", avatar: "SM" },
  { name: "Ananya Pandey", orders: 8, value: "₹1,85,000", avatar: "AP" },
  { name: "Ranbir Kapoor", orders: 15, value: "₹4,12,000", avatar: "RK" },
  { name: "Deepika Padukone", orders: 6, value: "₹3,20,000", avatar: "DP" },
];

const DashboardLists = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {/* Low Stock Alerts */}
      <Card className="border-none shadow-sm dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <div className="space-y-1">
            <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5" /> Low Stock Alerts
            </CardTitle>
            <div className="text-xl font-playfair font-bold">Inventory Risks</div>
          </div>
          <Button variant="ghost" size="sm" className="text-[9px] font-bold uppercase tracking-widest">
            Manage Inventory
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {lowStockProducts.map((product) => (
            <div key={product.sku} className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-zinc-800/30 rounded-xl group hover:bg-white dark:hover:bg-zinc-800 transition-all border border-transparent hover:border-gray-100 dark:hover:border-zinc-700">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-lg border border-gray-100 dark:border-zinc-800 flex items-center justify-center text-[10px] font-bold uppercase tracking-tighter">
                     {product.image ? (
                        <div className="w-full h-full bg-black/5 flex items-center justify-center">IMG</div>
                     ) : (
                        product.name.charAt(0)
                     )}
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[11px] font-bold">{product.name}</span>
                     <span className="text-[9px] text-gray-400 uppercase tracking-widest">{product.sku}</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                     <span className="text-xs font-bold text-red-600 font-mono">{product.stock} left</span>
                     <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold">In Stock</span>
                  </div>
                  <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-gray-200 dark:border-zinc-700 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                     <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
               </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Customers */}
      <Card className="border-none shadow-sm dark:bg-zinc-900">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <div className="space-y-1">
            <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Customer Loyalty</CardTitle>
            <div className="text-xl font-playfair font-bold">Top Customers</div>
          </div>
          <Button variant="ghost" size="sm" className="text-[9px] font-bold uppercase tracking-widest">
            View Leaderboard
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {topCustomers.map((customer) => (
            <div key={customer.name} className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-zinc-800/30 rounded-xl group hover:bg-white dark:hover:bg-zinc-800 transition-all border border-transparent hover:border-gray-100 dark:hover:border-zinc-700">
               <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10 border-2 border-white dark:border-zinc-900 group-hover:scale-110 transition-transform">
                     <AvatarFallback className="bg-black text-white text-[10px] font-bold">{customer.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                     <span className="text-[11px] font-bold">{customer.name}</span>
                     <div className="flex items-center gap-2 text-[8px] text-gray-400 uppercase font-bold tracking-[0.1em]">
                        <ShoppingBag className="w-2.5 h-2.5" /> {customer.orders} Orders
                     </div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                     <span className="text-sm font-bold font-playfair">{customer.value}</span>
                     <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold">Life Time Value</span>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 rounded-full border-gray-200 dark:border-zinc-700 group-hover:border-black dark:group-hover:border-white transition-all text-[9px] uppercase font-bold">
                     Details
                  </Button>
               </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardLists;
