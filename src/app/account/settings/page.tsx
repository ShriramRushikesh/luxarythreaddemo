"use client";

import React, { useState } from "react";
import { ShieldCheck, Mail, MessageSquare, Bell, Smartphone, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

const SettingsPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="space-y-16 max-w-4xl">
      {/* Header */}
      <div className="pb-8 border-b border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-playfair tracking-tight">Account Settings</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Control your preferences and data privacy</p>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="space-y-10">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
               <Bell className="w-4 h-4" />
            </div>
            <div className="space-y-1">
               <h2 className="text-lg font-playfair uppercase tracking-widest">Notification Channels</h2>
               <p className="text-[10px] text-gray-400 uppercase tracking-widest">Where should we reach you?</p>
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Mail, label: "Email", sub: "john.doe@example.com", checked: true },
              { icon: Smartphone, label: "SMS", sub: "+91 ••• ••• 210", checked: false },
              { icon: MessageSquare, label: "WhatsApp", sub: "Updates & Receipts", checked: true }
            ].map((channel) => (
              <div key={channel.label} className="p-6 border border-gray-100 bg-white shadow-sm flex flex-col gap-4 group hover:border-black transition-all">
                 <div className="flex justify-between items-center">
                    <channel.icon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                    <Checkbox checked={channel.checked} className="rounded-none data-[state=checked]:bg-black data-[state=checked]:border-black" />
                 </div>
                 <div className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]">{channel.label}</h4>
                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">{channel.sub}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Email Preferences */}
      <div className="space-y-10 pt-10 border-t border-gray-100">
         <div className="space-y-2">
            <h2 className="text-lg font-playfair uppercase tracking-widest">Email Preferences</h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Tailor your inbox experience</p>
         </div>

         <div className="space-y-6 max-w-2xl">
            {[
              "Order statuses, invoices & receipts",
              "Exclusive promotional offers & discounts",
              "New arrivals and seasonal collections",
              "Personalized style recommendations"
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-gray-50/50 border border-transparent hover:border-gray-100 transition-all group">
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-black transition-colors">{item}</span>
                 <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer flex items-center p-1 data-[active=true]:bg-black transition-colors" data-active={i < 2}>
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm data-[active=true]:translate-x-6 transition-transform" data-active={i < 2} />
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-16 border-t border-red-50 space-y-8">
         <div className="p-8 bg-red-50/30 border border-red-50 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
               </div>
               <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-red-900">Delete Account Permanently</h3>
                  <p className="text-[9px] text-red-500/70 uppercase tracking-widest">This action is irreversible. All your data will be cleared.</p>
               </div>
            </div>
            <Button onClick={() => setIsDeleteModalOpen(true)} className="bg-red-600 text-white hover:bg-red-700 px-8 py-6 rounded-none text-[9px] font-bold uppercase tracking-[0.3em] active:scale-95 transition-all shadow-xl">
               Delete My Account
            </Button>
         </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white p-12 max-w-lg w-full relative z-[110] shadow-2xl border border-gray-100 text-center space-y-8"
            >
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <AlertTriangle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                 <h2 className="text-2xl font-playfair uppercase tracking-widest">Are you absolutely sure?</h2>
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                   Deleting your account will remove all order history, saved addresses, and loyalty points. This cannot be undone.
                 </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                 <Button onClick={() => setIsDeleteModalOpen(false)} variant="outline" className="flex-1 py-8 border-gray-200 text-gray-500 uppercase tracking-widest font-bold text-[10px] rounded-none hover:border-black hover:text-black">Cancel</Button>
                 <Button className="flex-1 py-8 bg-red-600 text-white uppercase tracking-widest font-bold text-[10px] rounded-none shadow-xl hover:bg-red-700">Yes, Delete Account</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsPage;
