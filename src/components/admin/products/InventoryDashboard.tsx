"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Package, 
  ChevronRight, 
  RefreshCcw, 
  AlertCircle,
  ArrowUpRight,
  TrendingDown,
  History,
  Download,
  Upload,
  Search
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const inventoryItems = [
  { id: "1", name: "Gucci Belt", sku: "GC-BELT-01", stock: 12, minStock: 5, price: 35000, status: "In Stock" },
  { id: "2", name: "Prada Bag", sku: "PR-BAG-42", stock: 2, minStock: 5, price: 95000, status: "Low Stock" },
  { id: "3", name: "LV Keepall", sku: "LV-KP-55", stock: 0, minStock: 2, price: 145000, status: "Out of Stock" },
  { id: "4", name: "Dior Silk Scarf", sku: "DR-SCRF-11", stock: 24, minStock: 10, price: 18000, status: "In Stock" },
];

const stockHistory = [
  { id: "H1", date: "2 hours ago", product: "Gucci Belt", type: "Stock In", amount: "+10", reason: "Restock", user: "AD" },
  { id: "H2", date: "5 hours ago", product: "Prada Bag", type: "Sale", amount: "-1", reason: "Order #LT-5021", user: "SYS" },
  { id: "H3", date: "Yesterday", product: "LV Keepall", type: "Return", amount: "+1", reason: "Order #LT-4992", user: "AD" },
];

const InventoryDashboard = () => {
  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Total Inventory Value", value: "₹45.2M", icon: Package, color: "text-black dark:text-white" },
           { label: "Low Stock Items", value: "12", icon: AlertCircle, color: "text-orange-500" },
           { label: "Out of Stock", value: "4", icon: TrendingDown, color: "text-red-500" },
           { label: "Active SKUs", value: "456", icon: RefreshCcw, color: "text-blue-500" }
         ].map((stat, i) => (
           <Card key={i} className="border-none shadow-sm dark:bg-zinc-900/50">
              <CardContent className="p-6">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</span>
                    <stat.icon className={cn("w-4 h-4", stat.color)} />
                 </div>
                 <div className="text-2xl font-playfair font-bold">{stat.value}</div>
              </CardContent>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        {/* Inventory List */}
        <div className="xl:col-span-3 space-y-6">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                 <h3 className="text-xl font-playfair font-bold">Stock Control</h3>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total 456 SKUs in system</p>
              </div>
              <div className="flex items-center gap-3">
                 <Button variant="outline" className="rounded-full h-10 px-6 border-gray-100 dark:border-zinc-800 text-[9px] font-bold uppercase tracking-widest gap-2">
                    <Upload className="w-3.5 h-3.5" /> CSV Update
                 </Button>
                 <Button variant="outline" className="rounded-full h-10 px-6 border-gray-100 dark:border-zinc-800 text-[9px] font-bold uppercase tracking-widest gap-2">
                    <Download className="w-3.5 h-3.5" /> Export
                 </Button>
              </div>
           </div>

           <div className="bg-white dark:bg-zinc-950 p-6 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                 <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                    <Input placeholder="Search SKU or Name..." className="pl-10 h-11 bg-gray-50/50 dark:bg-zinc-900/50 border-none rounded-2xl text-[10px] uppercase font-bold tracking-widest" />
                 </div>
                 <Select>
                    <SelectTrigger className="w-48 h-11 rounded-2xl border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest">
                       <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="all">All Status</SelectItem>
                       <SelectItem value="low">Low Stock</SelectItem>
                       <SelectItem value="out">Out of Stock</SelectItem>
                    </SelectContent>
                 </Select>
              </div>

              <Table>
                 <TableHeader className="bg-gray-50/50 dark:bg-zinc-900/50">
                    <TableRow className="border-gray-50 dark:border-zinc-900">
                       <TableHead className="text-[9px] font-bold uppercase tracking-widest pl-4">Product & SKU</TableHead>
                       <TableHead className="text-[9px] font-bold uppercase tracking-widest text-center">In Stock</TableHead>
                       <TableHead className="text-[9px] font-bold uppercase tracking-widest text-center">Threshold</TableHead>
                       <TableHead className="text-[9px] font-bold uppercase tracking-widest">Pricing</TableHead>
                       <TableHead className="text-[9px] font-bold uppercase tracking-widest">Status</TableHead>
                       <TableHead className="text-[9px] font-bold uppercase tracking-widest text-right pr-4">Adjustment</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {inventoryItems.map(item => (
                      <TableRow key={item.id} className="border-gray-50 dark:border-zinc-900 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                         <TableCell className="py-5 pl-4">
                            <div className="flex flex-col">
                               <span className="text-[11px] font-bold">{item.name}</span>
                               <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold font-mono">{item.sku}</span>
                            </div>
                         </TableCell>
                         <TableCell className="text-center font-bold text-sm py-5">{item.stock}</TableCell>
                         <TableCell className="text-center text-[10px] font-bold text-gray-400 py-5">{item.minStock}</TableCell>
                         <TableCell className="text-[11px] font-bold py-5">₹{item.price.toLocaleString()}</TableCell>
                         <TableCell className="py-5">
                            <Badge variant="outline" className={cn(
                              "rounded-none text-[8px] font-bold uppercase tracking-widest border-none px-2",
                              item.status === "In Stock" ? "bg-green-50 text-green-600" :
                              item.status === "Low Stock" ? "bg-orange-50 text-orange-600" : "bg-red-50 text-red-600"
                            )}>
                               {item.status}
                            </Badge>
                         </TableCell>
                         <TableCell className="text-right pr-4 py-5">
                            <div className="flex items-center justify-end gap-2">
                               <Input type="number" className="w-16 h-8 text-[10px] font-bold text-center border-gray-100" defaultValue="0" />
                               <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg bg-black text-white hover:bg-black/90"><Plus className="w-3 h-3" /></Button>
                            </div>
                         </TableCell>
                      </TableRow>
                    ))}
                 </TableBody>
              </Table>
           </div>
        </div>

        {/* Stock History */}
        <div className="xl:col-span-1 space-y-6">
           <div className="space-y-1">
              <h3 className="text-xl font-playfair font-bold">Stock History</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Recent adjustments log</p>
           </div>

           <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6">
              {stockHistory.map(log => (
                <div key={log.id} className="relative pl-6 pb-6 border-l border-gray-100 dark:border-zinc-900 last:pb-0">
                   <div className="absolute top-0 -left-1 w-2 h-2 rounded-full bg-black dark:bg-white" />
                   <div className="space-y-1">
                      <div className="flex items-center justify-between">
                         <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">{log.date}</span>
                         <span className={cn(
                           "text-[9px] font-bold uppercase",
                           log.type === "Stock In" ? "text-green-600" : log.type === "Sale" ? "text-red-500" : "text-blue-500"
                         )}>{log.amount}</span>
                      </div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest">{log.product}</h4>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{log.reason} • By {log.user}</p>
                   </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 gap-2">
                 <History className="w-3.5 h-3.5" /> View Full Log
              </Button>
           </div>

           {/* Quick Actions */}
           <div className="bg-black text-white dark:bg-white dark:text-black rounded-3xl p-8 space-y-6 shadow-xl">
              <div className="space-y-1">
                 <h4 className="text-lg font-playfair font-bold">Fast Restock</h4>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 dark:text-black/50">One-click low stock replenishment</p>
              </div>
              <Button className="w-full h-12 rounded-full bg-white text-black dark:bg-black dark:text-white font-bold uppercase tracking-widest text-[10px] gap-3">
                 Restock All Low <ArrowUpRight className="w-4 h-4" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
