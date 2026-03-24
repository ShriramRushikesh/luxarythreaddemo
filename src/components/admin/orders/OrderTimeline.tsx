"use client";

import React from "react";
import { Check, Clock, Truck, Package, Home, CreditCard, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: "placed", label: "Order Placed", icon: Clock, status: "completed", date: "24 Jan 2024, 10:30 AM" },
  { id: "paid", label: "Payment Confirmed", icon: CreditCard, status: "completed", date: "24 Jan 2024, 10:32 AM" },
  { id: "processing", label: "Processing", icon: Package, status: "current", date: "24 Jan 2024, 11:00 AM" },
  { id: "shipped", label: "Shipped", icon: Truck, status: "upcoming", date: null },
  { id: "out", label: "Out for Delivery", icon: AlertCircle, status: "upcoming", date: null },
  { id: "delivered", label: "Delivered", icon: Home, status: "upcoming", date: null },
];

const OrderTimeline = () => {
  return (
    <div className="w-full py-12 px-6 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm overflow-x-auto">
      <div className="flex items-start justify-between min-w-[800px]">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="flex flex-col items-center flex-1 relative group">
              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div 
                  className={cn(
                    "absolute top-6 left-1/2 w-full h-1 -translate-y-1/2 z-0",
                    step.status === "completed" ? "bg-black dark:bg-white" : "bg-gray-100 dark:bg-zinc-900"
                  )} 
                />
              )}

              {/* Step Circle */}
              <div 
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-500 shadow-xl",
                  step.status === "completed" ? "bg-black text-white dark:bg-white dark:text-black scale-110" : 
                  step.status === "current" ? "bg-black text-white dark:bg-white dark:text-black ring-4 ring-gray-100 dark:ring-zinc-800 animate-pulse" :
                  "bg-white dark:bg-zinc-900 text-gray-400 border border-gray-100 dark:border-zinc-800"
                )}
              >
                {step.status === "completed" ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>

              {/* Labels */}
              <div className="mt-6 flex flex-col items-center text-center px-4">
                 <span className={cn(
                   "text-[10px] font-bold uppercase tracking-widest transition-colors",
                   step.status !== "upcoming" ? "text-black dark:text-white" : "text-gray-400"
                 )}>
                    {step.label}
                 </span>
                 <span className="text-[8px] font-bold text-gray-400 mt-1 uppercase tracking-widest h-4">
                    {step.date || "Pending"}
                 </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
