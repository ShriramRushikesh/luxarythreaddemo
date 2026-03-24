"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  PackageSearch, 
  MapPin, 
  CheckCircle2, 
  ScanLine,
  Box,
  LayoutGrid,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const pickingQueue = [
  { 
    id: "PICK-001", order: "#LT2024090", priority: "High", assignedTo: "Dave C.", status: "In Progress", progress: 66,
    items: [
      { sku: "BAG-L-BLK", name: "Classic Leather Tote", bin: "A1-04", quantity: 1, picked: true },
      { sku: "ACC-W-SLV", name: "Silver Link Watch", bin: "C3-12", quantity: 1, picked: true },
      { sku: "PER-S-100", name: "Signature Perfume 100ml", bin: "F2-08", quantity: 1, picked: false }
    ]
  },
  { 
    id: "PICK-002", order: "#LT2024091", priority: "Medium", assignedTo: "Unassigned", status: "Pending", progress: 0,
    items: [
      { sku: "SHO-M-BRN-42", name: "Oxford Brogues - Brown", bin: "B4-19", quantity: 1, picked: false }
    ]
  },
  { 
    id: "PICK-003", order: "#LT2024092", priority: "High", assignedTo: "Sarah M.", status: "In Progress", progress: 25,
    items: [
      { sku: "CLO-W-DRS-S", name: "Silk Evening Dress", bin: "D1-02", quantity: 1, picked: true },
      { sku: "ACC-W-GLD", name: "Gold Choker", bin: "C3-15", quantity: 1, picked: false },
      { sku: "BAG-S-RED", name: "Mini Clutch - Red", bin: "A2-09", quantity: 1, picked: false },
      { sku: "SHO-W-HLS-38", name: "Stiletto Heels - Black", bin: "B2-11", quantity: 1, picked: false }
    ]
  }
];

export function WarehouseSystem() {
  const [activePickId, setActivePickId] = useState<string>("PICK-001");

  const activePick = pickingQueue.find(p => p.id === activePickId);

  const handleScanItem = (sku: string) => {
    toast.success("Item Picked", {
      description: `SKU ${sku} successfully scanned and added to bin.`
    });
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h3 className="text-4xl font-playfair font-bold text-black dark:text-white">Warehouse Operations</h3>
           <p className="text-xs text-gray-400 mt-2 uppercase tracking-[0.2em] font-black italic">Picking & Packing Queue</p>
        </div>
        <div className="flex items-center gap-3 border border-gray-100 dark:border-zinc-800 p-2 rounded-2xl bg-white dark:bg-zinc-950">
           <div className="flex items-center gap-2 px-4 border-r border-gray-100 dark:border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">Scanner Online</span>
           </div>
           <Button className="h-10 px-6 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[9px]">
             <ScanLine className="w-4 h-4 mr-2" /> Manual Scan
           </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {[
           { label: "Items to Pick", value: "142", icon: ClipboardList },
           { label: "Pick Accuracy", value: "99.8%", icon: CheckCircle2 },
           { label: "Active Pickers", value: "4", icon: PackageSearch },
           { label: "Loc. Accuracy", value: "100%", icon: MapPin },
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
         {/* Task List */}
         <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 pl-4 border-l-4 border-black dark:border-white">Active Batches</h4>
            
            <div className="space-y-4">
               {pickingQueue.map(task => (
                  <Card 
                     key={task.id} 
                     onClick={() => setActivePickId(task.id)}
                     className={cn(
                        "p-6 rounded-[2rem] border-2 cursor-pointer transition-all hover:shadow-xl",
                        activePickId === task.id ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-lg scale-[1.02]" : "border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-gray-200 dark:hover:border-zinc-700"
                     )}
                  >
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <div className="flex items-center gap-2">
                              <h5 className="font-bold">{task.id}</h5>
                              {task.priority === "High" && <Badge className={cn("px-2 py-0 text-[8px] uppercase font-black bg-rose-500 text-white border-none shrink-0")}>Urgent</Badge>}
                           </div>
                           <p className={cn("text-[10px] uppercase tracking-widest font-bold mt-1 opacity-60")}>Order: {task.order}</p>
                        </div>
                        <Badge variant="outline" className={cn("text-[8px] uppercase tracking-widest", activePickId === task.id ? "border-white/20 dark:border-black/20" : "")}>
                           {task.status}
                        </Badge>
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-80">
                           <span>Progress</span>
                           <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className={cn("h-1.5", activePickId === task.id ? "bg-white/20 dark:bg-black/20" : "")} />
                     </div>
                     <div className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold opacity-60">
                        <PackageSearch className="w-3 h-3" /> Assigned to: {task.assignedTo}
                     </div>
                  </Card>
               ))}
            </div>
         </div>

         {/* Digital Pick List */}
         <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 pl-4 border-l-4 border-black dark:border-white">Digital Pick List</h4>
               {activePick && (
                  <Badge className="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500 border-none font-black px-4 py-1.5 rounded-xl uppercase tracking-widest text-[10px]">
                     {activePick.items.filter(i => i.picked).length} / {activePick.items.length} Picked
                  </Badge>
               )}
            </div>

            {activePick ? (
               <Card className="p-2 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[3rem] shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-gray-50 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/50">
                     <h2 className="text-3xl font-playfair font-bold">{activePick.order}</h2>
                     <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2">Pick Batch: {activePick.id}</p>
                  </div>
                  
                  <div className="p-4 space-y-4">
                     {activePick.items.map((item, idx) => (
                        <div key={idx} className={cn(
                           "p-6 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6",
                           item.picked ? "bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-900/30" : "bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 shadow-sm"
                        )}>
                           <div className="flex items-center gap-6">
                              <div className={cn(
                                 "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border-2",
                                 item.picked ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" : "bg-gray-50 dark:bg-zinc-900 text-gray-400 border-dashed border-gray-200 dark:border-zinc-700"
                              )}>
                                 {item.picked ? <CheckCircle2 className="w-8 h-8" /> : <Box className="w-8 h-8" />}
                              </div>
                              <div className="space-y-1">
                                 <h5 className={cn("text-lg font-bold line-clamp-1", item.picked ? "text-emerald-950 dark:text-emerald-50" : "")}>{item.name}</h5>
                                 <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-gray-400 px-2 py-1 bg-gray-50 dark:bg-zinc-900 rounded-lg">SKU: {item.sku}</span>
                                    <span className="text-blue-500 px-2 py-1 bg-blue-50 dark:bg-blue-500/10 rounded-lg flex items-center gap-1"><MapPin className="w-3 h-3" /> Bin {item.bin}</span>
                                 </div>
                              </div>
                           </div>
                           
                           <div className="flex items-center gap-6 sm:pl-6 sm:border-l border-gray-100 dark:border-zinc-800">
                              <div className="text-center">
                                 <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Qty</p>
                                 <p className="text-2xl font-black">{item.quantity}</p>
                              </div>
                              {!item.picked && (
                                 <Button 
                                    onClick={() => handleScanItem(item.sku)}
                                    className="h-12 w-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black shadow-lg shrink-0 hover:scale-110 transition-transform"
                                 >
                                    <ScanLine className="w-5 h-5" />
                                 </Button>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="p-6 bg-gray-50 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
                     <Button 
                        disabled={activePick.progress < 100}
                        className="h-14 px-10 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white border-none font-bold uppercase tracking-widest text-[11px] shadow-xl transition-all disabled:opacity-50 disabled:hover:bg-emerald-500"
                     >
                        Complete Pick Batch
                     </Button>
                  </div>
               </Card>
            ) : (
               <div className="h-[400px] border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-[3rem] flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <LayoutGrid className="w-16 h-16 opacity-20" />
                  <p className="font-bold uppercase tracking-widest text-xs">Select a batch to begin picking</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
