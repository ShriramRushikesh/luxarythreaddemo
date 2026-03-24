"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Send, 
  Eye, 
  BarChart2, 
  MoreVertical,
  Clock,
  CheckCircle2,
  Users
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

const campaigns = [
  {
    id: "1",
    name: "Spring Collection Launch",
    subject: "Discover Our New Spring Essentials 🌸",
    status: "Sent",
    recipients: "12,450",
    openRate: "24.5%",
    clickRate: "8.2%",
    date: "2024-03-10"
  },
  {
    id: "2",
    name: "Flash Sale Alert",
    subject: "48 Hours Only: 30% OFF Sitewide",
    status: "Sent",
    recipients: "15,800",
    openRate: "32.1%",
    clickRate: "12.5%",
    date: "2024-03-01"
  },
  {
    id: "3",
    name: "Weekly Newsletter - March W2",
    subject: "Style Guide: How to wear silk this season",
    status: "Scheduled",
    recipients: "12,500",
    openRate: "-",
    clickRate: "-",
    date: "2024-03-22"
  },
  {
    id: "4",
    name: "Abandoned Cart - Variant A",
    subject: "You left something beautiful behind...",
    status: "Active (Automation)",
    recipients: "Auto",
    openRate: "45.8%",
    clickRate: "18.2%",
    date: "Ongoing"
  }
];

export function CampaignList() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <h3 className="text-xl font-playfair font-bold text-black dark:text-white">Recent Campaigns</h3>
         <Link href="/admin/marketing/newsletter/new">
            <Button className="h-10 px-6 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
               <Plus className="w-3.5 h-3.5" /> New Campaign
            </Button>
         </Link>
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden p-2">
         <Table>
            <TableHeader>
               <TableRow className="hover:bg-transparent border-gray-50 dark:border-zinc-900">
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6 pl-6">Campaign Info</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Status</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Recipients</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Engagement</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6">Date</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-6 text-right pr-6">Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {campaigns.map((camp) => (
                  <TableRow key={camp.id} className="group border-gray-50 dark:border-zinc-900 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-all">
                     <TableCell className="py-6 pl-6">
                        <div className="flex flex-col">
                           <span className="text-sm font-bold text-black dark:text-white">{camp.name}</span>
                           <span className="text-[10px] text-gray-400 mt-0.5 line-clamp-1 italic">"{camp.subject}"</span>
                        </div>
                     </TableCell>
                     <TableCell>
                        <Badge className={cn(
                           "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border-none pointer-events-none",
                           camp.status === "Sent" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500" :
                           camp.status === "Scheduled" ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" :
                           "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500"
                        )}>
                           {camp.status}
                        </Badge>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-2">
                           <Users className="w-3.5 h-3.5 text-gray-400" />
                           <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">{camp.recipients}</span>
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex flex-col gap-1">
                           <div className="flex items-center justify-between w-24">
                              <span className="text-[9px] font-bold text-gray-400 uppercase">Open</span>
                              <span className="text-[9px] font-bold text-black dark:text-white">{camp.openRate}</span>
                           </div>
                           <div className="flex items-center justify-between w-24">
                              <span className="text-[9px] font-bold text-gray-400 uppercase">Click</span>
                              <span className="text-[9px] font-bold text-black dark:text-white">{camp.clickRate}</span>
                           </div>
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-2 text-gray-400">
                           <Clock className="w-3.5 h-3.5" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">{camp.date}</span>
                        </div>
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
                                 <BarChart2 className="w-4 h-4" /> View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white cursor-pointer gap-3">
                                 <Eye className="w-4 h-4" /> Preview Email
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white cursor-pointer gap-3">
                                 <Send className="w-4 h-4" /> Duplicate
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
