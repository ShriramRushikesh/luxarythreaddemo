"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeftRight, 
  RotateCcw, 
  Search, 
  Filter, 
  CheckCircle2, 
  XOctagon, 
  Box, 
  Camera,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

const returnsData = [
  { id: "RET-0881", order: "#LT2024050", customer: "Sophia L.", type: "Refund", reason: "Fit issues", status: "Pending Inspection", date: "Today, 10:30 AM", image: true },
  { id: "RET-0882", order: "#LT2024032", customer: "David B.", type: "Exchange", reason: "Damaged in transit", status: "Approved", date: "Yesterday, 4:15 PM", image: true },
  { id: "RET-0883", order: "#LT2024021", customer: "Elena R.", type: "Refund", reason: "Quality not as expected", status: "Rejected", date: "Oct 12, 2024", image: false },
  { id: "RET-0884", order: "#LT2024015", customer: "Liam K.", type: "Store Credit", reason: "Changed mind", status: "Processing Refund", date: "Oct 10, 2024", image: false }
];

export function ReturnsManagement() {
  const [activeReturnId, setActiveReturnId] = useState<string | null>("RET-0881");

  const activeReturn = returnsData.find(r => r.id === activeReturnId);

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h3 className="text-4xl font-playfair font-bold text-black dark:text-white">Returns & Exchanges</h3>
           <p className="text-xs text-gray-400 mt-2 uppercase tracking-[0.2em] font-black italic">Reverse Logistics Workflow</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest gap-2 bg-white dark:bg-zinc-950">
             Policy Settings
           </Button>
           <Button className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl flex items-center gap-2">
             Analytics Report
           </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {[
           { label: "Active Requests", value: "24", icon: RotateCcw },
           { label: "Pending Inspection", value: "8", icon: Box },
           { label: "Avg Resolution", value: "1.2 Days", icon: CheckCircle2 },
           { label: "Return Rate", value: "4.5%", icon: ArrowLeftRight },
         ].map((stat, i) => (
           <Card key={i} className="p-6 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl flex items-center justify-between">
              <div>
                 <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
                 <h4 className="text-2xl font-playfair font-bold mt-1">{stat.value}</h4>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center">
                 <stat.icon className="w-5 h-5 text-gray-400" />
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
         {/* Returns List */}
         <div className="xl:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-[3rem] shadow-sm overflow-hidden p-2">
               <div className="p-6 border-b border-gray-50 dark:border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest">Return Requests</h4>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                     <div className="relative flex-1 md:w-64">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input placeholder="Search returns..." className="pl-10 h-10 rounded-xl border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest bg-gray-50 dark:bg-zinc-900" />
                     </div>
                     <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-gray-100 dark:border-zinc-800 shrink-0">
                        <Filter className="w-4 h-4 text-gray-400" />
                     </Button>
                  </div>
               </div>
               
               <div className="p-2 space-y-2">
                  {returnsData.map((ret) => (
                     <div 
                        key={ret.id} 
                        onClick={() => setActiveReturnId(ret.id)}
                        className={cn(
                           "flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors border",
                           activeReturnId === ret.id ? "bg-gray-50 dark:bg-zinc-900 border-black dark:border-white" : "border-transparent hover:border-gray-100 dark:hover:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50"
                        )}
                     >
                        <div className="flex items-center gap-6">
                           <div className={cn(
                              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                              ret.type === "Refund" ? "bg-rose-50 text-rose-500" : 
                              ret.type === "Exchange" ? "bg-blue-50 text-blue-500" : "bg-emerald-50 text-emerald-500"
                           )}>
                              <RotateCcw className="w-5 h-5" />
                           </div>
                           <div>
                              <div className="flex items-center gap-3">
                                 <span className="text-sm font-bold text-black dark:text-white">{ret.id}</span>
                                 <Badge variant="outline" className={cn(
                                    "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border-none",
                                    ret.type === "Refund" ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400" : 
                                    ret.type === "Exchange" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                                 )}>
                                    {ret.type}
                                 </Badge>
                                 {ret.image && <Camera className="w-3 h-3 text-gray-400" />}
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-[10px] uppercase font-bold tracking-widest">
                                 <span className="text-gray-500">{ret.order}</span>
                                 <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                 <span className="text-gray-500">{ret.customer}</span>
                                 <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                 <span className="text-gray-400 truncate max-w-[150px]">{ret.reason}</span>
                              </div>
                           </div>
                        </div>
                        <div className="mt-4 md:mt-0 pl-[72px] md:pl-0 flex flex-col md:items-end gap-1">
                           <Badge className={cn(
                              "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border-none w-fit shadow-none",
                              ret.status === "Approved" ? "bg-emerald-500 text-white" :
                              ret.status === "Rejected" ? "bg-rose-500 text-white" :
                              "bg-amber-500 text-white"
                           )}>
                              {ret.status}
                           </Badge>
                           <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{ret.date}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Inspection Panel */}
         <div className="space-y-8">
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 pl-4 border-l-4 border-black dark:border-white">Inspection Panel</h4>
            
            {activeReturn ? (
               <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[3rem] shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                  <div className="space-y-6 flex-1">
                     <div className="flex justify-between items-start">
                        <div>
                           <h4 className="text-2xl font-playfair font-bold">{activeReturn.id}</h4>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Order {activeReturn.order}</p>
                        </div>
                        <Badge variant="outline" className="px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                           {activeReturn.type}
                        </Badge>
                     </div>

                     <div className="p-5 bg-gray-50 dark:bg-zinc-900 rounded-3xl space-y-4">
                        <div className="flex gap-4">
                           <div className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-zinc-800 shrink-0" />
                           <div>
                              <p className="text-sm font-bold">Classic Leather Tote - Black</p>
                              <p className="text-[10px] text-gray-500 tracking-widest uppercase mt-1">SKU: BAG-L-BLK</p>
                              <p className="text-xs font-bold mt-2">₹1,24,000</p>
                           </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200 dark:border-zinc-800">
                           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Customer Reason</p>
                           <p className="text-sm font-medium">"{activeReturn.reason}. It doesn't suit my style as expected."</p>
                        </div>
                     </div>

                     {activeReturn.image && (
                        <div>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Attached Images</p>
                           <div className="flex gap-2">
                              <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-400">
                                 <Camera className="w-6 h-6" />
                              </div>
                           </div>
                        </div>
                     )}
                  </div>

                  <div className="pt-8 mt-auto space-y-3">
                     <Button className="w-full h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold uppercase tracking-widest text-[10px] shadow-xl flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Approve {activeReturn.type}
                     </Button>
                     <div className="flex gap-3">
                        <Button className="flex-1 h-12 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 font-bold uppercase tracking-widest text-[10px]">
                           <XOctagon className="w-4 h-4 mr-2" /> Reject
                        </Button>
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl text-gray-500">
                           <MessageSquare className="w-4 h-4" />
                        </Button>
                     </div>
                  </div>
               </Card>
            ) : (
               <Card className="p-8 bg-gray-50 dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[3rem] shadow-sm flex flex-col items-center justify-center min-h-[500px] text-gray-400">
                  <RotateCcw className="w-16 h-16 opacity-20 mb-4" />
                  <p className="text-xs font-bold uppercase tracking-widest">Select a return request to inspect</p>
               </Card>
            )}
         </div>
      </div>
    </div>
  );
}
