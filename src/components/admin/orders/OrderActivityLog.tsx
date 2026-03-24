"use client";

import React from "react";
import { History, User, Terminal, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const logs = [
  { id: 1, action: "Order status updated to Processing", user: "Admin (Siddharth)", time: "2 hours ago", note: "Inventory verified, items picked." },
  { id: 2, action: "Payment confirmed via Razorpay", user: "System", time: "3 hours ago", note: "TXN_ID: RZP_12345" },
  { id: 3, action: "Order Placed", user: "Customer (Aarav)", time: "3 hours ago", note: null },
];

const OrderActivityLog = () => {
  return (
    <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 shadow-sm space-y-8">
      <div className="flex items-center justify-between">
         <h3 className="text-xl font-playfair font-bold flex items-center gap-3">
            <History className="w-5 h-5 text-gray-400" /> Activity Log
         </h3>
         <button className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center gap-2">
            View Full Audit <ChevronRight className="w-3.5 h-3.5" />
         </button>
      </div>

      <div className="space-y-8">
         {logs.map((log) => (
           <div key={log.id} className="relative pl-10 pb-8 border-l border-gray-50 dark:border-zinc-900 last:pb-0">
              <div className={cn(
                "absolute top-0 -left-[17px] w-8 h-8 rounded-full flex items-center justify-center border-4 border-white dark:border-zinc-950 shadow-sm",
                log.user.includes("Admin") ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-100 dark:bg-zinc-900 text-gray-400"
              )}>
                 {log.user.includes("Admin") ? <User className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
              </div>
              
              <div className="space-y-1.5">
                 <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold tracking-tight">{log.action}</h4>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{log.time}</span>
                 </div>
                 <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                    <span className={cn(
                      log.user.includes("Admin") ? "text-black dark:text-white" : ""
                    )}>By {log.user}</span>
                 </div>
                 {log.note && (
                   <div className="mt-3 p-4 bg-gray-50/50 dark:bg-zinc-900/50 rounded-2xl border border-gray-100 dark:border-zinc-800">
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">"{log.note}"</p>
                   </div>
                 )}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default OrderActivityLog;
