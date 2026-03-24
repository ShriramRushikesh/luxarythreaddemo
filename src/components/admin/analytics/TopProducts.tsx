"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const products = [
  {
    id: "1",
    name: "Midnight Silk Tuxedo",
    sku: "LT-2024-001",
    category: "Men's Wear",
    sold: 145,
    revenue: 125000,
    profit: 45,
    status: "Trending"
  },
  {
    id: "2",
    name: "Embroidered Evening Gown",
    sku: "LT-2024-005",
    category: "Women's Wear",
    sold: 98,
    revenue: 185000,
    profit: 52,
    status: "Best Seller"
  },
  {
    id: "3",
    name: "Gold-Plated Cufflinks",
    sku: "LT-2024-012",
    category: "Accessories",
    sold: 210,
    revenue: 42000,
    profit: 38,
    status: "Steady"
  },
  {
    id: "4",
    name: "Leather Chelsea Boots",
    sku: "LT-2024-022",
    category: "Footwear",
    sold: 112,
    revenue: 89000,
    profit: 42,
    status: "Normal"
  },
  {
    id: "5",
    name: "Cashmere Oversized Sweater",
    sku: "LT-2024-034",
    category: "Unisex",
    sold: 156,
    revenue: 78000,
    profit: 48,
    status: "Trending"
  }
];

export function TopProducts() {
  return (
    <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h3 className="text-xl font-playfair font-bold text-black dark:text-white">Top Performing Products</h3>
           <p className="text-xs text-gray-400 mt-1">Ranking by revenue and sales velocity</p>
        </div>
        <Link href="/admin/products" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 group">
           Full Inventory <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-50 dark:border-zinc-900">
              <TableHead className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Product</TableHead>
              <TableHead className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Category</TableHead>
              <TableHead className="text-[9px] font-bold uppercase tracking-widest text-gray-400 text-right">Units Sold</TableHead>
              <TableHead className="text-[9px] font-bold uppercase tracking-widest text-gray-400 text-right">Revenue</TableHead>
              <TableHead className="text-[9px] font-bold uppercase tracking-widest text-gray-400 text-right">Margin</TableHead>
              <TableHead className="text-[9px] font-bold uppercase tracking-widest text-gray-400 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id} className="group hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 border-gray-50 dark:border-zinc-900 transition-colors cursor-pointer">
                <TableCell className="py-4">
                   <div className="flex flex-col">
                      <span className="text-sm font-bold text-black dark:text-white group-hover:underline underline-offset-4">{p.name}</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{p.sku}</span>
                   </div>
                </TableCell>
                <TableCell>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{p.category}</span>
                </TableCell>
                <TableCell className="text-right font-medium">{p.sold}</TableCell>
                <TableCell className="text-right font-bold">₹{p.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                   <span className="text-xs font-bold text-emerald-500">{p.profit}%</span>
                </TableCell>
                <TableCell className="text-right">
                   <Badge className={cn(
                      "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border-none shadow-none",
                      p.status === "Best Seller" ? "bg-black text-white dark:bg-white dark:text-black" :
                      p.status === "Trending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500" :
                      "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-400"
                   )}>
                      {p.status}
                   </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Button variant="outline" className="w-full mt-6 h-11 rounded-xl bg-gray-50 dark:bg-zinc-900 border-none text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-all">
         Download Detailed Performance Report
      </Button>
    </Card>
  );
}
