"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Copy, 
  Edit, 
  Trash2, 
  BarChart2,
  Calendar,
  Ticket
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

const coupons = [
  {
    id: "1",
    code: "SAVE20",
    description: "20% off on all orders above ₹5000",
    type: "Percentage",
    value: "20%",
    usage: "145 / 500",
    validTill: "2024-12-31",
    status: "Active"
  },
  {
    id: "2",
    code: "WELCOME100",
    description: "Flat ₹100 off for new customers",
    type: "Fixed Amount",
    value: "₹100",
    usage: "892 / Unlimited",
    validTill: "2025-06-30",
    status: "Active"
  },
  {
    id: "3",
    code: "FESTIVE500",
    description: "Special Diwali discount",
    type: "Fixed Amount",
    value: "₹500",
    usage: "200 / 200",
    validTill: "2023-11-15",
    status: "Expired"
  },
  {
    id: "4",
    code: "WINTER24",
    description: "Winter collection pre-sale early access",
    type: "Percentage",
    value: "15%",
    usage: "0 / 100",
    validTill: "2024-12-01",
    status: "Scheduled"
  },
  {
    id: "5",
    code: "FREESHIP",
    description: "Free shipping for elite members",
    type: "Free Shipping",
    value: "100%",
    usage: "45 / Unlimited",
    validTill: "No Expiry",
    status: "Active"
  }
];

export function CouponList() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          coupon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || coupon.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied to clipboard!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-playfair font-bold text-black dark:text-white">Coupons ({coupons.length})</h1>
           <p className="text-xs text-gray-400 mt-2 uppercase tracking-[0.2em] font-black">Manage discount codes and promotional offers</p>
        </div>
        
        <Link href="/admin/marketing/coupons/new">
          <Button className="h-14 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-black/20 dark:shadow-white/10 hover:scale-105 transition-transform flex items-center gap-3">
            <Plus className="w-4 h-4" /> Create New Coupon
          </Button>
        </Link>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <Tabs defaultValue="all" className="w-full lg:w-auto" onValueChange={setActiveTab}>
          <TabsList className="bg-gray-100 dark:bg-zinc-900 p-1 rounded-2xl h-12">
            {["All", "Active", "Scheduled", "Expired"].map((tab) => (
              <TabsTrigger 
                key={tab} 
                value={tab.toLowerCase()}
                className="rounded-xl px-6 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm transition-all h-10"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
          <Input 
            placeholder="Search by code or description..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-2xl border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-0 focus:border-black dark:focus:border-white transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden p-2">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-50 dark:border-zinc-900">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6 pl-6">Code & Info</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Type</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Value</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Usage</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Valid Till</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6 text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoupons.length > 0 ? (
              filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id} className="group border-gray-50 dark:border-zinc-900 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-all">
                  <TableCell className="py-6 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                         <Ticket className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                           <span className="text-sm font-bold text-black dark:text-white uppercase tracking-wider">{coupon.code}</span>
                           <button 
                             onClick={() => copyCode(coupon.code)}
                             className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
                             title="Copy Code"
                           >
                             <Copy className="w-3 h-3 text-gray-400" />
                           </button>
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium line-clamp-1">{coupon.description}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                     <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{coupon.type}</span>
                  </TableCell>
                  <TableCell>
                     <span className="text-sm font-bold text-black dark:text-white">{coupon.value}</span>
                  </TableCell>
                  <TableCell>
                     <div className="flex flex-col gap-1.5 w-32">
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{coupon.usage}</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                           <div 
                              className={cn(
                                 "h-full rounded-full transition-all duration-1000",
                                 coupon.usage.includes("Unlimited") ? "bg-black dark:bg-white w-[5%]" : 
                                 parseInt(coupon.usage.split(" / ")[0]) >= parseInt(coupon.usage.split(" / ")[1]) ? "bg-rose-500 w-full" : "bg-black dark:bg-white"
                              )}
                              style={{ 
                                 width: !coupon.usage.includes("Unlimited") 
                                    ? `${(parseInt(coupon.usage.split(" / ")[0]) / parseInt(coupon.usage.split(" / ")[1])) * 100}%` 
                                    : "5%" 
                              }}
                           />
                        </div>
                     </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{coupon.validTill}</span>
                     </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border-none pointer-events-none",
                      coupon.status === "Active" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500" :
                      coupon.status === "Expired" ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-500" :
                      "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                    )}>
                      {coupon.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" className="h-8 w-8 p-0 rounded-xl border-gray-100 dark:border-zinc-800">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 border-gray-100 dark:border-zinc-800 shadow-xl">
                        <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white cursor-pointer gap-3">
                           <Edit className="w-4 h-4" /> Edit Coupon
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white cursor-pointer gap-3">
                           <BarChart2 className="w-4 h-4" /> Usage Analytics
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-50 dark:bg-zinc-900 my-1" />
                        <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 cursor-pointer gap-3">
                           <Trash2 className="w-4 h-4" /> Delete Coupon
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
               <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center">
                     <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center">
                           <Search className="w-8 h-8 text-gray-300" />
                        </div>
                        <div className="space-y-1">
                           <p className="text-sm font-bold text-black dark:text-white">No coupons found</p>
                           <p className="text-xs text-gray-400">Try adjusting your filters or search query</p>
                        </div>
                     </div>
                  </TableCell>
               </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Placeholder */}
      <div className="flex items-center justify-between pt-4">
         <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 italic">Showing {filteredCoupons.length} of {coupons.length} coupons</p>
         <div className="flex items-center gap-2">
            <Button variant="outline" className="h-10 px-4 rounded-xl border-gray-100 dark:border-zinc-800 text-[9px] font-bold uppercase tracking-widest disabled:opacity-50" disabled>Previous</Button>
            <Button variant="outline" className="h-10 px-4 rounded-xl border-gray-100 dark:border-zinc-800 text-[9px] font-bold uppercase tracking-widest shadow-sm">Next</Button>
         </div>
      </div>
    </div>
  );
}
