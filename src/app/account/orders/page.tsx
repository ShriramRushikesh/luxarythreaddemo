"use client";

import React, { useState } from "react";
import { ShoppingBag, Search, ChevronRight, Package, Truck, Clock, CheckCircle2, XCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const orders = [
  {
    id: "#LT2024001",
    date: "March 15, 2024",
    status: "Delivered",
    total: 3499,
    items: [
      { name: "Premium Silk Shirt", image: "https://images.unsplash.com/photo-1598033129183-c4f50c717658?q=80&w=1920&auto=format&fit=crop" },
      { name: "Tailored Trousers", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1920&auto=format&fit=crop" }
    ]
  },
  {
    id: "#LT2024005",
    date: "March 20, 2024",
    status: "On the Way",
    total: 1299,
    items: [
      { name: "Essential Linen Tee", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1920&auto=format&fit=crop" }
    ]
  }
];

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All Orders");

  const tabs = ["All Orders", "Processing", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="pb-8 border-b border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-playfair tracking-tight">Order History</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Track and manage your luxury purchases</p>
        </div>
        <div className="relative w-full md:w-80">
           <input className="w-full p-4 pl-12 text-xs border border-gray-100 focus:border-black outline-none transition-all uppercase tracking-widest" placeholder="Search Order ID..." />
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-8 border-b border-gray-50 overflow-x-auto scrollbar-hide">
         {tabs.map((tab) => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={cn(
               "pb-6 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative whitespace-nowrap",
               activeTab === tab ? "text-black" : "text-gray-300 hover:text-black"
             )}
           >
             {tab}
             {activeTab === tab && (
               <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
             )}
           </button>
         ))}
      </div>

      {/* Order List */}
      <div className="space-y-8">
         {orders.length === 0 ? (
           <div className="py-24 text-center space-y-8 bg-white border border-dashed border-gray-200">
              <ShoppingBag className="w-12 h-12 text-gray-100 mx-auto" />
              <div className="space-y-1">
                 <h3 className="text-xs font-bold uppercase tracking-widest">No orders found</h3>
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest">You haven't placed any orders in this category yet.</p>
              </div>
              <Link href="/products" className="inline-block">
                 <Button className="bg-black text-white px-12 py-8 rounded-none uppercase tracking-widest text-[10px]">Start Shopping</Button>
              </Link>
           </div>
         ) : (
           orders.map((order, i) => (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               key={order.id} 
               className="bg-white border border-gray-100 p-8 shadow-sm group hover:border-black transition-all"
             >
               <div className="flex flex-col md:flex-row justify-between gap-8">
                  {/* Order Meta */}
                  <div className="space-y-6">
                     <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-black text-white">{order.status}</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{order.date}</span>
                     </div>
                     <div className="space-y-1">
                        <h3 className="text-sm font-bold uppercase tracking-widest">{order.id}</h3>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Total: <span className="text-black font-mono font-bold">₹{order.total.toLocaleString()}</span></p>
                     </div>
                  </div>

                  {/* Product Thumbnails */}
                  <div className="flex-1 flex gap-4">
                     {order.items.map((item, j) => (
                       <div key={j} className="w-20 h-24 bg-gray-50 overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" />
                       </div>
                     ))}
                     {order.items.length > 2 && (
                       <div className="w-20 h-24 bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-100">
                         +2 More
                       </div>
                     )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-4 shrink-0">
                     <Button className="bg-black text-white px-8 py-6 rounded-none text-[9px] font-bold uppercase tracking-[0.3em] active:scale-95 transition-all">Track Order</Button>
                     <Link href={`/account/orders/${order.id.replace('#', '')}`}>
                       <Button variant="outline" className="w-full border-gray-200 text-gray-500 px-8 py-6 rounded-none text-[9px] font-bold uppercase tracking-[0.3em] hover:border-black hover:text-black active:scale-95 transition-all">View Details</Button>
                     </Link>
                  </div>
               </div>
             </motion.div>
           ))
         )}
      </div>
    </div>
  );
};

export default OrdersPage;
