"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  Download, 
  Upload, 
  Mail, 
  UserCheck, 
  UserPlus, 
  UserMinus,
  Filter,
  MoreVertical,
  MailWarning
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const subscribers = [
  { id: "1", email: "alex.v@luxury.com", subscribedDate: "2024-03-15", status: "Active", source: "Homepage Popup" },
  { id: "2", email: "sarah.m@vogue.fr", subscribedDate: "2024-03-12", status: "Active", source: "Checkout" },
  { id: "3", email: "j.doe@minimalist.io", subscribedDate: "2024-02-28", status: "Unsubscribed", source: "Footer" },
  { id: "4", email: "luxury_fan_99@gmail.com", subscribedDate: "2024-02-20", status: "Active", source: "Flash Sale" },
  { id: "5", email: "marketing@brand.co", subscribedDate: "2024-01-15", status: "Active", source: "Homepage Popup" },
];

export function SubscriberList() {
  const [searchQuery, setSearchQuery] = useState("");

  const exportToCSV = () => {
    toast.success("Subscribers list exported as CSV");
  };

  const importFromCSV = () => {
    toast.info("Import process started", {
      description: "Select a CSV file to begin importing subscribers."
    });
  };

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Total Subscribers", value: "12,456", delta: "+15% this month", icon: Mail, color: "text-black dark:text-white" },
           { label: "Active", value: "11,890", delta: "95.4% rate", icon: UserCheck, color: "text-emerald-500" },
           { label: "Unsubscribed", value: "566", delta: "4.5% rate", icon: MailWarning, color: "text-rose-500" },
         ].map((stat, i) => (
           <Card key={i} className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                 <div className="p-2.5 rounded-2xl bg-gray-50 dark:bg-zinc-900">
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.delta}</span>
              </div>
              <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
                 <h4 className="text-3xl font-playfair font-bold text-black dark:text-white mt-1">{stat.value}</h4>
              </div>
           </Card>
         ))}
      </div>

      {/* Actions & Filters */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
         <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
            <Input 
               placeholder="Search subscribers by email..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-12 h-12 rounded-2xl border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:border-black dark:focus:border-white transition-all shadow-sm"
            />
         </div>

         <div className="flex items-center gap-3 w-full lg:w-auto">
            <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 dark:border-zinc-800 h-12 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-zinc-900">
               <Filter className="w-3.5 h-3.5" /> Filters
            </Button>
            <Button 
               onClick={importFromCSV}
               variant="outline" 
               className="h-12 px-6 rounded-2xl border-gray-100 dark:border-zinc-800 h-12 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-zinc-900"
            >
               <Upload className="w-3.5 h-3.5" /> Import
            </Button>
            <Button 
               onClick={exportToCSV}
               variant="outline" 
               className="h-12 px-6 rounded-2xl border-gray-100 dark:border-zinc-800 h-12 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-zinc-900"
            >
               <Download className="w-3.5 h-3.5" /> Export
            </Button>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden p-2">
         <Table>
            <TableHeader>
               <TableRow className="hover:bg-transparent border-gray-50 dark:border-zinc-900">
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6 pl-6">Email Address</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Date Subscribed</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Status</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Source</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6 text-right pr-6">Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {subscribers.map((sub) => (
                  <TableRow key={sub.id} className="group border-gray-50 dark:border-zinc-900 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-all">
                     <TableCell className="py-6 pl-6">
                        <span className="text-sm font-bold text-black dark:text-white">{sub.email}</span>
                     </TableCell>
                     <TableCell>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{sub.subscribedDate}</span>
                     </TableCell>
                     <TableCell>
                        <Badge className={cn(
                           "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border-none pointer-events-none",
                           sub.status === "Active" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500" : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-500"
                        )}>
                           {sub.status}
                        </Badge>
                     </TableCell>
                     <TableCell>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{sub.source}</span>
                     </TableCell>
                     <TableCell className="text-right pr-6">
                        <DropdownMenu>
                           <DropdownMenuTrigger>
                              <Button variant="ghost" className="h-8 w-8 p-0 rounded-xl">
                                 <MoreVertical className="w-4 h-4 text-gray-400" />
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 border-gray-100 dark:border-zinc-800 shadow-xl">
                              <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white cursor-pointer gap-3">
                                 View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 cursor-pointer gap-3">
                                 Unsubscribe
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
    </div>
  );
}
