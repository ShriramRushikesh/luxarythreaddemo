"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  MapPin, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  RefreshCw,
  Search,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const activeShipments = [
  { id: "AWB-772918", order: "#LT2024001", customer: "Alex V.", destination: "Navi Mumbai, MH", status: "In Transit", carrier: "Blue Dart", eta: "Today, 4:00 PM", delay: false },
  { id: "AWB-772919", order: "#LT2024045", customer: "Sarah K.", destination: "Bengaluru, KA", status: "Processing", carrier: "Delhivery", eta: "Tomorrow", delay: false },
  { id: "AWB-772920", order: "#LT2024088", customer: "Michael T.", destination: "New Delhi, DL", status: "Delayed", carrier: "FedEx", eta: "Unknown", delay: true },
  { id: "AWB-772921", order: "#LT2024102", customer: "Priya M.", destination: "Chennai, TN", status: "Delivered", carrier: "DHL", eta: "Delivered", delay: false },
];

export function ShippingDashboard() {
  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h3 className="text-4xl font-playfair font-bold text-black dark:text-white">Fulfillment & Logistics</h3>
           <p className="text-xs text-gray-400 mt-2 uppercase tracking-[0.2em] font-black italic">Real-time shipping intelligence</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest gap-2 bg-white dark:bg-zinc-950">
             <RefreshCw className="w-4 h-4 text-gray-400" /> Sync Carriers
           </Button>
           <Button className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl flex items-center gap-2">
             <Package className="w-4 h-4" /> Pick & Pack Queue
           </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         {[
           { label: "Pending Fulfillment", value: "42", sub: "Orders to pack", icon: Package, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
           { label: "In Transit", value: "128", sub: "Active shipments", icon: Truck, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
           { label: "Delivery Exceptions", value: "3", sub: "Requires attention", icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
           { label: "Avg Delivery Time", value: "2.4", sub: "Days this week", icon: Clock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
         ].map((stat, i) => (
           <Card key={i} className="group p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[3rem] shadow-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className={cn("p-3 rounded-2xl w-fit mb-6", stat.bg)}>
                 <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{stat.label}</p>
              <h4 className="text-4xl font-playfair font-bold text-black dark:text-white mt-2 italic">{stat.value}</h4>
              <p className="text-[10px] font-black tracking-widest uppercase mt-4 text-gray-400">{stat.sub}</p>
           </Card>
         ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 pt-4">
         {/* Tracking Map Mockup */}
         <div className="xl:col-span-2 space-y-8">
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 pl-4 border-l-4 border-black dark:border-white">Live Operations Map</h4>
            <div className="h-[400px] w-full bg-gray-50 dark:bg-zinc-900 rounded-[3.5rem] relative overflow-hidden flex items-center justify-center border border-gray-100 dark:border-zinc-800 shadow-inner">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 dark:opacity-5 mix-blend-overlay"></div>
               {/* Map Mockup Nodes */}
               <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
               <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-emerald-500 rounded-full animate-ping delay-150"></div>
               <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-rose-500 rounded-full animate-ping delay-300"></div>
               <div className="z-10 text-center space-y-4">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto" />
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 max-w-[200px]">Map visualization requires Google Maps API Key</p>
               </div>
            </div>

            {/* Shipments List */}
            <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-[3rem] shadow-sm overflow-hidden p-2">
               <div className="p-6 border-b border-gray-50 dark:border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest">Active Dispatches</h4>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                     <div className="relative flex-1 md:w-64">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input placeholder="Search AWB or Order..." className="pl-10 h-10 rounded-xl border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest bg-gray-50 dark:bg-zinc-900" />
                     </div>
                     <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-gray-100 dark:border-zinc-800 shrink-0">
                        <Filter className="w-4 h-4 text-gray-400" />
                     </Button>
                  </div>
               </div>
               <div className="p-2 space-y-2">
                  {activeShipments.map((shipment) => (
                     <div key={shipment.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-zinc-800 group">
                        <div className="flex items-center gap-6">
                           <div className={cn(
                             "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                             shipment.status === "Delivered" ? "bg-emerald-50 text-emerald-500" :
                             shipment.delay ? "bg-rose-50 text-rose-500" :
                             "bg-blue-50 text-blue-500"
                           )}>
                              {shipment.status === "Delivered" ? <CheckCircle2 className="w-5 h-5" /> :
                               shipment.delay ? <AlertTriangle className="w-5 h-5" /> : 
                               <Truck className="w-5 h-5" />}
                           </div>
                           <div>
                              <div className="flex items-center gap-3">
                                 <span className="text-sm font-bold text-black dark:text-white">{shipment.id}</span>
                                 <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{shipment.carrier}</span>
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-[10px] uppercase font-bold tracking-widest">
                                 <span className="text-gray-500">{shipment.order}</span>
                                 <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                 <span className="text-gray-500">{shipment.customer}</span>
                                 <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                 <span className="text-gray-400 truncate max-w-[120px]">{shipment.destination}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-8 mt-4 md:mt-0 pl-[72px] md:pl-0">
                           <div className="flex flex-col md:items-end">
                              <Badge className={cn(
                                 "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border-none shadow-sm mb-1 w-fit",
                                 shipment.status === "Delivered" ? "bg-emerald-500 text-white" :
                                 shipment.delay ? "bg-rose-500 text-white animate-pulse" :
                                 "bg-blue-500 text-white"
                              )}>
                                 {shipment.status}
                              </Badge>
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                 <Clock className="w-3 h-3" /> ETA: {shipment.eta}
                              </span>
                           </div>
                           <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white hover:scale-110">
                              <ArrowRight className="w-4 h-4" />
                           </Button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Sidebar Operations */}
         <div className="space-y-8">
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 pl-4 border-l-4 border-black dark:border-white">Operations Priority</h4>
            
            <Card className="p-8 bg-rose-50 dark:bg-rose-500/10 border-none rounded-[3rem] shadow-sm relative overflow-hidden">
               <div className="flex justify-between items-start">
                  <div className="space-y-2 relative z-10">
                     <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500 opacity-80">Requires Attention</p>
                     <h4 className="text-3xl font-playfair font-bold text-rose-950 dark:text-rose-400">3 Exceptions</h4>
                     <p className="text-[9px] font-black uppercase tracking-widest mt-4 text-rose-600/60 dark:text-rose-400/60 leading-relaxed">Failed delivery attempts or address issues reported by carriers.</p>
                  </div>
                  <AlertTriangle className="w-12 h-12 text-rose-500/20 absolute right-6 top-6" />
               </div>
               <Button className="w-full mt-8 h-12 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white border-none text-[9px] font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-rose-500/20 transition-all cursor-pointer relative z-10">
                  Resolve Issues
               </Button>
            </Card>

            <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[3rem] shadow-sm">
               <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                     <Truck className="w-5 h-5 text-gray-400" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-widest">Carrier Performance</h4>
               </div>
               
               <div className="space-y-6">
                  {[
                     { name: "Blue Dart", split: "60%", score: 98, color: "bg-blue-500" },
                     { name: "Delhivery", split: "25%", score: 92, color: "bg-emerald-500" },
                     { name: "FedEx", split: "15%", score: 85, color: "bg-amber-500" }
                  ].map(carrier => (
                     <div key={carrier.name} className="space-y-3">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                           <span>{carrier.name} <span className="opacity-50">({carrier.split})</span></span>
                           <span className={cn(
                              carrier.score >= 95 ? "text-emerald-500" : carrier.score >= 90 ? "text-blue-500" : "text-amber-500"
                           )}>{carrier.score}% SLA</span>
                        </div>
                        <div className="h-2 w-full bg-gray-50 dark:bg-zinc-900 rounded-full overflow-hidden">
                           <div className={cn("h-full rounded-full", carrier.color)} style={{ width: `${carrier.score}%` }} />
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
