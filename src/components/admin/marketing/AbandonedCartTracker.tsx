"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Mail, 
  Clock, 
  ArrowRight, 
  Settings, 
  TrendingUp, 
  User,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const abandonedCarts = [
  { id: "1", customer: "Alex V.", email: "alex@v.com", value: "₹45,000", items: 3, time: "2h ago", status: "Emails Sent (2)" },
  { id: "2", customer: "Sarah M.", email: "sarah@m.fr", value: "₹12,500", items: 1, time: "5h ago", status: "Pending Recovery" },
  { id: "3", customer: "Unknown", email: "guest_77@gmail.com", value: "₹82,000", items: 5, time: "12h ago", status: "Recovered" },
  { id: "4", customer: "Julia K.", email: "julia@k.io", value: "₹28,900", items: 2, time: "1d ago", status: "Abandoned" },
];

export function AbandonedCartTracker() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h3 className="text-3xl font-playfair font-bold text-black dark:text-white">Abandoned Cart Recovery</h3>
           <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Track lost sales and automate recovery sequences</p>
        </div>
        <Button className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl flex items-center gap-3">
          <Settings className="w-4 h-4" /> Recovery Settings
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: "Abandoned Carts", value: "1,234", sub: "Last 30 days", icon: ShoppingBag, color: "text-amber-500" },
           { label: "Recovery Rate", value: "12.5%", sub: "Industry avg: 10%", icon: TrendingUp, color: "text-emerald-500" },
           { label: "Recovered Revenue", value: "₹8.5L", sub: "+₹1.2L this week", icon: Mail, color: "text-blue-500" },
         ].map((stat, i) => (
           <Card key={i} className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-4">
              <div className="p-2.5 rounded-2xl bg-gray-50 dark:bg-zinc-900 w-fit">
                 <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
                 <h4 className="text-3xl font-playfair font-bold text-black dark:text-white mt-1">{stat.value}</h4>
                 <p className="text-[9px] text-gray-400 mt-2 font-bold uppercase tracking-widest">{stat.sub}</p>
              </div>
           </Card>
         ))}
      </div>

      {/* List */}
      <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-[3rem] shadow-sm overflow-hidden p-2">
         <div className="p-6 border-b border-gray-50 dark:border-zinc-900 flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-widest">Recent Abandoned Carts</h4>
            <div className="flex items-center gap-2">
               <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
               <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">48 Carts require attention</span>
            </div>
         </div>
         <Table>
            <TableHeader>
               <TableRow className="hover:bg-transparent border-gray-50 dark:border-zinc-900">
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6 pl-6">Customer / Session</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Cart Value</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Items</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Last Activity</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Status</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6 text-right pr-6">Action</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {abandonedCarts.map((cart) => (
                  <TableRow key={cart.id} className="group border-gray-50 dark:border-zinc-900 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-all">
                     <TableCell className="py-6 pl-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                              <User className="w-5 h-5 text-gray-400" />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-sm font-bold text-black dark:text-white">{cart.customer}</span>
                              <span className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{cart.email}</span>
                           </div>
                        </div>
                     </TableCell>
                     <TableCell>
                        <span className="text-sm font-bold text-black dark:text-white">{cart.value}</span>
                     </TableCell>
                     <TableCell>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{cart.items} items</span>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-2 text-gray-400">
                           <Clock className="w-3.5 h-3.5" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">{cart.time}</span>
                        </div>
                     </TableCell>
                     <TableCell>
                        <Badge className={cn(
                           "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border-none",
                           cart.status === "Recovered" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500" :
                           cart.status.includes("Sent") ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" :
                           "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500"
                        )}>
                           {cart.status}
                        </Badge>
                     </TableCell>
                     <TableCell className="text-right pr-6">
                        <Button className="h-9 px-4 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[8px] flex items-center gap-2 shadow-sm">
                           Send Mail <ArrowRight className="w-3 h-3" />
                        </Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         <div className="p-6 bg-gray-50/50 dark:bg-zinc-900/50 border-t border-gray-100 dark:border-zinc-800 text-center">
            <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black dark:hover:text-white transition-all">View All Abandoned Carts</button>
         </div>
      </div>
    </div>
  );
}
