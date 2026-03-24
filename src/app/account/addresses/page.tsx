"use client";

import React, { useState } from "react";
import { MapPin, Plus, MoreVertical, Edit2, Trash2, Home, Briefcase, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const initialAddresses = [
  {
    id: 1,
    name: "John Doe",
    phone: "+91 98765 43210",
    line1: "Flat 402, Luxury Heights",
    line2: "Koregaon Park",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    type: "Home",
    isDefault: true
  },
  {
    id: 2,
    name: "John Doe",
    phone: "+91 98765 43210",
    line1: "Whitecode HQ, Sector 5",
    line2: "Aundh",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411007",
    type: "Work",
    isDefault: false
  }
];

const AddressesPage = () => {
  const [addresses, setAddresses] = useState(initialAddresses);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="pb-8 border-b border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-playfair tracking-tight">Saved Addresses</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Manage your shipping and billing destinations</p>
        </div>
        <Button className="bg-black text-white px-8 py-8 rounded-none uppercase tracking-[0.3em] font-bold text-[10px] shadow-2xl group active:scale-95 transition-all">
           <Plus className="w-4 h-4 mr-3 group-hover:rotate-90 transition-transform" />
           Add New Address
        </Button>
      </div>

      {/* Address Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {addresses.map((address, i) => (
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             key={address.id}
             className={cn(
               "bg-white border p-8 shadow-sm relative group hover:shadow-xl transition-all duration-300",
               address.isDefault ? "border-black" : "border-gray-100"
             )}
           >
              {address.isDefault && (
                <div className="absolute -top-3 left-8 bg-black text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1 shadow-lg">
                   Default Destination
                </div>
              )}
              
              <div className="flex justify-between mb-8">
                 <div className="flex items-center gap-3">
                    {address.type === 'Home' && <Home className="w-4 h-4 text-gray-400" />}
                    {address.type === 'Work' && <Briefcase className="w-4 h-4 text-gray-400" />}
                    {!['Home', 'Work'].includes(address.type) && <Globe className="w-4 h-4 text-gray-400" />}
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{address.type}</span>
                 </div>
                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-gray-50 rounded-full transition-all text-gray-400 hover:text-black"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button className="p-2 hover:bg-red-50 rounded-full transition-all text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest">{address.name}</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{address.phone}</p>
                 </div>
                 <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                    {address.line1}<br />
                    {address.line2}<br />
                    {address.city}, {address.state} - {address.pincode}
                 </p>
              </div>

              {!address.isDefault && (
                <button className="mt-8 text-[9px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors underline underline-offset-4">
                   Set as default
                </button>
              )}
           </motion.div>
         ))}

         {/* Add New Placeholder/Card */}
         <button className="border-2 border-dashed border-gray-100 p-8 flex flex-col items-center justify-center gap-4 hover:border-black hover:bg-gray-50/50 transition-all duration-500 group min-h-[250px]">
            <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform">
               <Plus className="w-5 h-5 text-gray-300 group-hover:text-black" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-black">Add a new destination</span>
         </button>
      </div>
    </div>
  );
};

export default AddressesPage;
