"use client";

import React from "react";
import InventoryDashboard from "@/components/admin/products/InventoryDashboard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AdminInventoryPage() {
  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
           <Link href="/admin/dashboard" className="hover:text-black dark:hover:text-white transition-colors">Admin</Link>
           <ChevronRight className="w-2.5 h-2.5" />
           <Link href="/admin/products" className="hover:text-black dark:hover:text-white transition-colors">Products</Link>
           <ChevronRight className="w-2.5 h-2.5" />
           <span className="text-black dark:text-white">Inventory</span>
        </div>
        <h1 className="text-4xl font-playfair font-bold tracking-tight mt-2">Inventory Intelligence</h1>
      </div>

      <InventoryDashboard />
    </div>
  );
}
