"use client";

import React from "react";
import { Bell, Check, Trash2, Package, Tag, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'Order Delivered!',
    message: 'Your order #LT2024001 has been successfully delivered to your doorstep. We hope you love your new luxury threads!',
    time: '2 hours ago',
    unread: true,
    icon: Package
  },
  {
    id: 2,
    type: 'promo',
    title: 'Exclusive Offer Just For You',
    message: 'Get an additional 15% off on our New Arrivals collection. Use code: PREMIUM15 at checkout.',
    time: 'Yesterday',
    unread: false,
    icon: Tag
  },
  {
    id: 3,
    type: 'info',
    title: 'Policy Update',
    message: 'We have updated our Returns & Exchange policy to make your shopping experience even smoother.',
    time: '3 days ago',
    unread: false,
    icon: Info
  }
];

const NotificationsPage = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="pb-8 border-b border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-playfair tracking-tight">Notifications</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Stay updated with your orders and exclusive offers</p>
        </div>
        <div className="flex gap-4">
           <button className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              Mark all as read
           </button>
           <button className="text-[9px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors flex items-center gap-2">
              <Trash2 className="w-3.5 h-3.5" />
              Clear all
           </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
         {notifications.length === 0 ? (
           <div className="py-24 text-center space-y-8 bg-white border border-dashed border-gray-200">
              <Bell className="w-12 h-12 text-gray-100 mx-auto" />
              <div className="space-y-1">
                 <h3 className="text-xs font-bold uppercase tracking-widest">No new notifications</h3>
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest">We'll let you know when something important happens.</p>
              </div>
           </div>
         ) : (
           notifications.map((notif, i) => (
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
               key={notif.id}
               className={cn(
                 "p-8 border bg-white flex flex-col sm:flex-row gap-8 items-start relative group transition-all duration-500",
                 notif.unread ? "border-black shadow-lg" : "border-gray-100 shadow-sm opacity-80 hover:opacity-100"
               )}
             >
                {notif.unread && (
                  <div className="absolute top-8 right-8 w-2 h-2 bg-black rounded-full" />
                )}
                
                <div className={cn(
                  "w-12 h-12 shrink-0 rounded-full flex items-center justify-center shadow-inner",
                  notif.unread ? "bg-black text-white" : "bg-gray-50 text-gray-400"
                )}>
                   <notif.icon className="w-5 h-5" />
                </div>

                <div className="flex-1 space-y-2">
                   <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold uppercase tracking-widest">{notif.title}</h4>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-gray-300">{notif.time}</span>
                   </div>
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                      {notif.message}
                   </p>
                   <div className="pt-4 flex gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-[8px] font-bold uppercase tracking-widest text-black hover:underline underline-offset-4">View Detail</button>
                      <button className="text-[8px] font-bold uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors">Delete Notification</button>
                   </div>
                </div>
             </motion.div>
           ))
         )}
      </div>
    </div>
  );
};

export default NotificationsPage;
