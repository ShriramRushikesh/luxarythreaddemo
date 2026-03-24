"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Printer, 
  Search, 
  FileText, 
  Download, 
  Send, 
  CheckCircle2, 
  RefreshCw,
  Box,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const readyForFulfillment = [
  { id: "#LT2024090", customer: "Emma W.", items: 3, weight: "2.5 kg", destination: "London, UK", status: "Ready", carrier: "DHL Express" },
  { id: "#LT2024091", customer: "James H.", items: 1, weight: "0.8 kg", destination: "Paris, FR", status: "Ready", carrier: "FedEx" },
  { id: "#LT2024092", customer: "Aanya S.", items: 4, weight: "4.2 kg", destination: "Mumbai, IN", status: "Processing", carrier: "Blue Dart" },
  { id: "#LT2024093", customer: "Oliver C.", items: 2, weight: "1.5 kg", destination: "Sydney, AU", status: "Ready", carrier: "DHL Express" },
];

export function LabelGeneration() {
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);

  const handleGenerateLabel = (id: string) => {
    setGeneratingFor(id);
    setTimeout(() => {
      setGeneratingFor(null);
      toast.success("Shipping label generated!", {
        description: `AWB and label for order ${id} are now ready for printing.`
      });
    }, 2000);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h3 className="text-4xl font-playfair font-bold text-black dark:text-white">Label & Dispatch</h3>
           <p className="text-xs text-gray-400 mt-2 uppercase tracking-[0.2em] font-black italic">Automated Waybill Generation</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest gap-2 bg-white dark:bg-zinc-950">
             <RefreshCw className="w-4 h-4 text-gray-400" /> Sync Orders
           </Button>
           <Button className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl flex items-center gap-2">
             <Printer className="w-4 h-4" /> Print Pending (3)
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Queue */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-[3rem] shadow-sm overflow-hidden p-2">
               <div className="p-6 border-b border-gray-50 dark:border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                     <Box className="w-5 h-5" /> Fulfillment Queue
                  </h4>
                  <div className="relative flex-1 md:max-w-xs">
                     <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                     <Input placeholder="Search Order ID..." className="pl-10 h-10 rounded-xl border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest bg-gray-50 dark:bg-zinc-900" />
                  </div>
               </div>
               
               <div className="p-2 space-y-2">
                  {readyForFulfillment.map((order) => (
                     <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-zinc-800">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5" />
                           </div>
                           <div>
                              <div className="flex items-center gap-3">
                                 <span className="text-sm font-bold text-black dark:text-white">{order.id}</span>
                                 <Badge variant="outline" className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-white dark:bg-zinc-950">
                                    {order.carrier}
                                 </Badge>
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-[10px] uppercase font-bold tracking-widest">
                                 <span className="text-gray-500">{order.customer}</span>
                                 <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                 <span className="text-gray-500">{order.items} Items</span>
                                 <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                 <span className="text-gray-400 truncate max-w-[150px]">{order.destination}</span>
                                 <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                 <span className="text-gray-400">{order.weight}</span>
                              </div>
                           </div>
                        </div>
                        <div className="mt-4 md:mt-0 pl-[72px] md:pl-0 flex flex-col md:items-end gap-2">
                           <Button 
                             onClick={() => handleGenerateLabel(order.id)}
                             disabled={generatingFor === order.id || order.status !== "Ready"}
                             className={cn(
                               "h-10 px-6 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all",
                               order.status === "Ready" ? "bg-black text-white dark:bg-white dark:text-black hover:scale-105" : "bg-gray-100 text-gray-400 dark:bg-zinc-800"
                             )}
                           >
                              {generatingFor === order.id ? (
                                 <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                              ) : order.status === "Ready" ? (
                                 "Generate Label"
                              ) : (
                                 "Box Open"
                              )}
                           </Button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Right Sidebar */}
         <div className="space-y-8">
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 pl-4 border-l-4 border-black dark:border-white">Manifest Generator</h4>
            <Card className="p-8 bg-black dark:bg-white text-white dark:text-black rounded-[3rem] shadow-2xl relative overflow-hidden">
               <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full border-[16px] border-white/10 dark:border-black/10" />
               <div className="absolute right-8 top-8 opacity-20">
                  <Truck className="w-16 h-16" />
               </div>
               <div className="relative z-10 space-y-4">
                  <h4 className="text-2xl font-playfair font-bold">End of Day Manifest</h4>
                  <p className="text-xs opacity-70 leading-relaxed font-bold tracking-wide">
                     Generate the closing manifest for carrier pickup. This validates all scanned parcels for the day.
                  </p>
                  <div className="pt-6">
                     <p className="text-[10px] uppercase tracking-widest font-black opacity-50 mb-2">Pending Carrier Scan</p>
                     <h5 className="text-3xl font-playfair italic">18 Parcels</h5>
                  </div>
                  <Button className="w-full mt-4 h-12 rounded-2xl bg-white text-black dark:bg-black dark:text-white border-none text-[9px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                     <FileText className="w-4 h-4" /> Download PDF Manifest
                  </Button>
               </div>
            </Card>

            <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[3rem] shadow-sm space-y-4">
               <h5 className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Recent Generations
               </h5>
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
                        <div>
                           <p className="text-sm font-bold">AWB-77291{i}</p>
                           <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Order #LT20240{i+4}</p>
                        </div>
                        <div className="flex gap-2">
                           <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-white dark:hover:bg-zinc-800 shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-zinc-700">
                              <Download className="w-4 h-4 text-gray-500" />
                           </Button>
                        </div>
                     </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
