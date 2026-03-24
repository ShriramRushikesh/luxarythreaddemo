"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Settings2, 
  MapPin, 
  Globe, 
  Truck, 
  ShieldCheck,
  AlertCircle,
  Link2,
  KeyRound,
  Save,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const carriersList = [
  {
    id: "bluedart",
    name: "Blue Dart",
    type: "Domestic Premium",
    icon: Truck,
    description: "Expedited shipping for high-value domestic luxury items.",
    status: "connected",
    features: ["Next Day Delivery", "Insurance", "Signature Required"],
    color: "blue"
  },
  {
    id: "dhl",
    name: "DHL Express",
    type: "International",
    icon: Globe,
    description: "Worldwide shipping with customs clearance support.",
    status: "connected",
    features: ["Global Reach", "Customs Prep", "Live Tracking"],
    color: "amber"
  },
  {
    id: "delhivery",
    name: "Delhivery Surface",
    type: "Domestic Standard",
    icon: MapPin,
    description: "Cost-effective shipping for standard deliveries across India.",
    status: "disconnected",
    features: ["Wide Coverage", "Reverse Logistics", "Cash on Delivery"],
    color: "emerald"
  }
];

export function CarrierSettings() {
  const [activeTab, setActiveTab] = useState<"connections" | "zones">("connections");
  const [savingId, setSavingId] = useState<string | null>(null);

  const handleSaveConfig = (id: string) => {
    setSavingId(id);
    setTimeout(() => {
      setSavingId(null);
      toast.success("Carrier settings updated", {
        description: `API keys for ${id} have been securely saved.`
      });
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h3 className="text-4xl font-playfair font-bold text-black dark:text-white">Carrier Integrations</h3>
           <p className="text-xs text-gray-400 mt-2 uppercase tracking-[0.2em] font-black italic">Manage API Keys & Shipping Zones</p>
        </div>
        <div className="flex bg-gray-50 dark:bg-zinc-900 p-1.5 rounded-2xl border border-gray-100 dark:border-zinc-800">
           <button 
             onClick={() => setActiveTab("connections")}
             className={cn("px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all", activeTab === "connections" ? "bg-white dark:bg-zinc-800 shadow-sm text-black dark:text-white" : "text-gray-400")}
           >
             API Connections
           </button>
           <button 
             onClick={() => setActiveTab("zones")}
             className={cn("px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all", activeTab === "zones" ? "bg-white dark:bg-zinc-800 shadow-sm text-black dark:text-white" : "text-gray-400")}
           >
             Shipping Zones
           </button>
        </div>
      </div>

      {activeTab === "connections" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
           <div className="xl:col-span-2 space-y-8">
              {carriersList.map((carrier) => (
                 <Card key={carrier.id} className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm overflow-hidden relative">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8 relative z-10">
                       <div className="flex items-center gap-6">
                          <div className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center",
                            carrier.color === "blue" ? "bg-blue-50 text-blue-500 dark:bg-blue-500/10" :
                            carrier.color === "amber" ? "bg-amber-50 text-amber-500 dark:bg-amber-500/10" :
                            "bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10"
                          )}>
                             <carrier.icon className="w-8 h-8" />
                          </div>
                          <div>
                             <h4 className="text-2xl font-playfair font-bold flex items-center gap-3">
                               {carrier.name} 
                               {carrier.status === "connected" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                             </h4>
                             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{carrier.type}</p>
                          </div>
                       </div>
                       <Switch checked={carrier.status === "connected"} className="data-[state=checked]:bg-black dark:data-[state=checked]:bg-white" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                       <div className="space-y-6">
                          <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">{carrier.description}</p>
                          <div className="space-y-3">
                             <h5 className="text-[9px] font-black uppercase tracking-widest text-gray-400">Supported Features</h5>
                             <div className="flex flex-wrap gap-2">
                                {carrier.features.map(f => (
                                   <Badge key={f} variant="outline" className="rounded-full bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 text-[9px] font-bold uppercase tracking-wider text-gray-500">
                                      {f}
                                   </Badge>
                                ))}
                             </div>
                          </div>
                       </div>

                       {/* API Configuration */}
                       <div className="space-y-5 p-6 bg-gray-50 dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800">
                          <h5 className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <KeyRound className="w-4 h-4 text-gray-400" /> API Configuration
                          </h5>
                          
                          <div className="space-y-4">
                             <div className="space-y-2">
                                <Label className="text-[9px] uppercase tracking-widest font-bold text-gray-500">Account ID</Label>
                                <Input 
                                  defaultValue={carrier.status === "connected" ? "ACCT_882910" : ""} 
                                  placeholder="Enter Account ID" 
                                  className="h-10 rounded-xl bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800 text-xs" 
                                />
                             </div>
                             <div className="space-y-2">
                                <Label className="text-[9px] uppercase tracking-widest font-bold text-gray-500">Production API Key</Label>
                                <Input 
                                  type="password"
                                  defaultValue={carrier.status === "connected" ? "sk_prod_xxxxxxxxxxxxx" : ""} 
                                  placeholder="sk_prod_..." 
                                  className="h-10 rounded-xl bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800 text-xs font-mono" 
                                />
                             </div>
                             
                             <Button 
                               onClick={() => handleSaveConfig(carrier.id)}
                               disabled={savingId === carrier.id}
                               className="w-full h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[9px] flex items-center justify-center"
                             >
                               {savingId === carrier.id ? (
                                  <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                               ) : (
                                  <>Save Configuration</>
                               )}
                             </Button>
                          </div>
                       </div>
                    </div>
                 </Card>
              ))}
           </div>
           
           <div className="space-y-8">
              <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 pl-4 border-l-4 border-black dark:border-white">Integration Health</h4>
              
              <Card className="p-8 bg-emerald-50 dark:bg-emerald-500/10 border-none rounded-[3rem] shadow-sm">
                 <div className="flex items-center gap-4 mb-4">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    <h5 className="text-lg font-playfair font-bold text-emerald-950 dark:text-emerald-400">All Systems Normal</h5>
                 </div>
                 <p className="text-xs text-emerald-700/70 dark:text-emerald-400/70 leading-relaxed mb-6">
                    API connections are healthy with a 99.9% uptime over the last 30 days. Active webhooks are processing tracking updates correctly.
                 </p>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
                       <span>API Response Time</span>
                       <span>124ms</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
                       <span>Webhook Delivery Rate</span>
                       <span>100%</span>
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      )}

      {activeTab === "zones" && (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 dark:bg-zinc-950 rounded-[3rem] border border-gray-100 dark:border-zinc-900 shadow-sm text-center px-6">
           <MapPin className="w-16 h-16 text-gray-300 mb-6" />
           <h4 className="text-2xl font-playfair font-bold mb-2">Shipping Zones Setup</h4>
           <p className="text-sm text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
              Define geographical zones, set flat rates, or configure real-time carrier calculations based on weight and dimensions.
           </p>
           <Button className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl">
             Create New Zone
           </Button>
        </div>
      )}
    </div>
  );
}
