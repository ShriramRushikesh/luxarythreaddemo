"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Calendar as CalendarIcon, Filter, Layers, CheckCircle2, FileSpreadsheet, FileJson } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const reportTypes = [
  { id: "sales", name: "Sales Summary", description: "Aggregate revenue, orders, and taxes", icon: FileText },
  { id: "products", name: "Product Performance", description: "Detailed SKU and category velocity", icon: Layers },
  { id: "inventory", name: "Stock Valuation", description: "Current inventory value and low stock", icon: Layers },
  { id: "customers", name: "Customer Acquisition", description: "New vs returning customer trends", icon: FileText },
  { id: "financial", name: "Profit & Loss", description: "Net income and operational costs", icon: FileText },
];

export function ReportGenerator() {
  const [selectedType, setSelectedType] = useState("sales");
  const [format, setFormat] = useState("pdf");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Report generated successfully!", {
        description: `${reportTypes.find(t => t.id === selectedType)?.name} has been downloaded.`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-3xl font-playfair font-bold text-black dark:text-white">Reporting Engine</h2>
           <p className="text-xs text-gray-400 mt-1">Export comprehensive datasets and professional summaries</p>
        </div>
        
        <div className="flex items-center gap-3">
           <Button className="h-12 px-6 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-black/20 dark:shadow-white/10 hover:scale-105 transition-transform">
              Automate All Reports
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         {/* Config Section */}
         <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm xl:col-span-2">
            <h3 className="text-lg font-playfair font-bold text-black dark:text-white mb-8 border-b border-gray-50 dark:border-zinc-900 pb-4">Report Configuration</h3>
            
            <div className="space-y-8">
               {/* 1. Select Report Type */}
               <div className="space-y-4">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Select Report Type</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {reportTypes.map((type) => (
                        <button
                           key={type.id}
                           onClick={() => setSelectedType(type.id)}
                           className={cn(
                              "flex items-start gap-4 p-4 rounded-2xl border transition-all text-left group",
                              selectedType === type.id 
                                 ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-lg" 
                                 : "border-gray-100 bg-white hover:border-black dark:bg-zinc-950 dark:border-zinc-800 dark:hover:border-white"
                           )}
                        >
                           <type.icon className={cn(
                              "w-5 h-5 mt-0.5 transition-colors",
                              selectedType === type.id ? "text-white dark:text-black" : "text-gray-400 group-hover:text-black dark:group-hover:text-white"
                           )} />
                           <div>
                              <p className="text-xs font-bold uppercase tracking-widest">{type.name}</p>
                              <p className={cn(
                                 "text-[10px] mt-1 leading-relaxed",
                                 selectedType === type.id ? "text-gray-300 dark:text-zinc-600" : "text-gray-400"
                              )}>{type.description}</p>
                           </div>
                        </button>
                     ))}
                  </div>
               </div>

               {/* 2. Filters */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date Range</Label>
                     <Select defaultValue="30d">
                        <SelectTrigger className="h-12 rounded-2xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                           <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                           <SelectItem value="7d">Last 7 Days</SelectItem>
                           <SelectItem value="30d">Last 30 Days</SelectItem>
                           <SelectItem value="90d">Last 90 Days</SelectItem>
                           <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="space-y-4">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Export Format</Label>
                     <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-zinc-900 rounded-2xl">
                        {[
                          { id: "pdf", label: "PDF", icon: FileText },
                          { id: "excel", label: "Excel", icon: FileSpreadsheet },
                          { id: "csv", label: "CSV", icon: FileSpreadsheet },
                          { id: "json", label: "JSON", icon: FileJson },
                        ].map((f) => (
                           <button
                              key={f.id}
                              onClick={() => setFormat(f.id)}
                              className={cn(
                                 "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all",
                                 format === f.id 
                                    ? "bg-white text-black dark:bg-zinc-800 dark:text-white shadow-sm" 
                                    : "text-gray-400 hover:text-black dark:hover:text-white"
                              )}
                           >
                              <f.icon className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">{f.label}</span>
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
               
               <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full h-14 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-black/20 dark:shadow-white/10 hover:translate-y-[-2px] active:translate-y-[0] transition-all disabled:opacity-50"
               >
                  {isGenerating ? (
                    <span className="flex items-center gap-3">
                       <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                       Generating Report...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                       <Download className="w-4 h-4" />
                       Download {format.toUpperCase()} Report
                    </span>
                  )}
               </Button>
            </div>
         </Card>

         {/* Recent Reports / History Section */}
         <div className="space-y-8">
            <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm">
               <h3 className="text-lg font-playfair font-bold text-black dark:text-white mb-6">Recent Reports</h3>
               <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-transparent hover:border-gray-100 dark:hover:border-zinc-800 transition-all group">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-gray-400" />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white truncate">
                                 {i === 1 ? "Sales_Summary_Oct.pdf" : i === 2 ? "Inventory_Value_Q3.xlsx" : "Tax_Report_2024.pdf"}
                              </span>
                              <span className="text-[8px] text-gray-400 uppercase tracking-widest mt-1">Oct {20-i}, 2024 • {(1.2 * i).toFixed(1)} MB</span>
                           </div>
                        </div>
                        <button className="p-2 rounded-lg bg-white dark:bg-zinc-950 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Download className="w-4 h-4 text-gray-400 hover:text-black dark:hover:text-white" />
                        </button>
                     </div>
                  ))}
               </div>
               <Button variant="ghost" className="w-full mt-6 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black dark:hover:text-white">
                  View All Export History
               </Button>
            </Card>

            <Card className="p-8 bg-black dark:bg-white border-none rounded-3xl shadow-xl overflow-hidden relative">
               <div className="relative z-10">
                  <h3 className="text-lg font-playfair font-bold text-white dark:text-black mb-2">Need a Custom Report?</h3>
                  <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-widest font-bold">
                     Our report builder allows you to select custom dimensions and metrics.
                  </p>
                  <Button className="mt-6 w-full h-11 rounded-xl bg-white text-black dark:bg-black dark:text-white text-[9px] font-bold uppercase tracking-widest">
                     Launch Report Builder
                  </Button>
               </div>
               {/* Decorative background shape */}
               <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 dark:bg-black/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
            </Card>
         </div>
      </div>
    </div>
  );
}
