"use client";

import React from "react";
import { 
  ArrowLeft, 
  Printer, 
  Truck, 
  Mail, 
  CreditCard, 
  MapPin, 
  User, 
  ChevronRight,
  Copy,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Package
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import OrderTimeline from "./OrderTimeline";
import OrderActivityLog from "./OrderActivityLog";
import UpdateStatusModal from "./UpdateStatusModal";
import RefundModal from "./RefundModal";
import OrderInvoice from "./OrderInvoice";
import { cn } from "@/lib/utils";

const OrderDetailsView = ({ id }: { id: string }) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = React.useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = React.useState(false);
  const [showInvoice, setShowInvoice] = React.useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  if (showInvoice) {
    return (
      <div className="p-8 space-y-8 animate-in fade-in duration-500">
         <div className="flex justify-between items-center max-w-[800px] mx-auto no-print">
            <Button variant="ghost" onClick={() => setShowInvoice(false)} className="rounded-full text-[10px] font-bold uppercase tracking-widest gap-2">
               <ArrowLeft className="w-4 h-4" /> Return to Order
            </Button>
            <div className="flex gap-3">
               <Button variant="outline" onClick={() => window.print()} className="rounded-full h-11 px-6 text-[10px] font-bold uppercase tracking-widest gap-2">
                  <Printer className="w-4 h-4" /> Print
               </Button>
               <Button className="rounded-full h-11 px-8 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px]">
                  Download PDF
               </Button>
            </div>
         </div>
         <OrderInvoice id={id} />
      </div>
    );
  }

  return (
    <div className="p-8 pb-32 space-y-10 max-w-[1400px] mx-auto animate-in fade-in duration-700">
      <UpdateStatusModal 
        isOpen={isStatusModalOpen} 
        onClose={() => setIsStatusModalOpen(false)} 
        currentStatus="Pending" 
        orderId={id} 
      />
      <RefundModal 
        isOpen={isRefundModalOpen} 
        onClose={() => setIsRefundModalOpen(false)} 
        orderTotal={265999} 
        orderId={id} 
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-4">
           <Link href="/admin/orders" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Back to Orders
           </Link>
           <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-4xl font-playfair font-bold">Order #{id}</h1>
              <Badge className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border-none">Pending</Badge>
           </div>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Placed on 24 Jan 2024 at 10:30 AM • 3 Items</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
           <Button variant="outline" onClick={() => setShowInvoice(true)} className="h-12 px-6 rounded-full border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest gap-3 shadow-sm hover:bg-gray-50">
              <Printer className="w-4 h-4" /> Print Invoice
           </Button>
           <Button onClick={() => setIsStatusModalOpen(true)} className="h-12 px-8 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] gap-3 shadow-xl hover:-translate-y-1 transition-all">
              Update Status
           </Button>
        </div>
      </div>

      <OrderTimeline />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Main Order Content */}
         <div className="lg:col-span-2 space-y-10">
            {/* Order Items */}
            <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
               <div className="p-8 border-b border-gray-50 dark:border-zinc-900 flex items-center justify-between">
                  <h3 className="text-xl font-playfair font-bold flex items-center gap-3">
                     <Package className="w-5 h-5 text-gray-400" /> Order Items
                  </h3>
                  <Badge variant="secondary" className="rounded-full bg-gray-50 dark:bg-zinc-900 text-[9px] font-bold uppercase tracking-widest px-3 border-gray-100 dark:border-zinc-800">3 Items</Badge>
               </div>
               
               <div className="overflow-x-auto">
                  <table className="w-full">
                     <thead className="bg-gray-50/50 dark:bg-zinc-900/50">
                        <tr className="border-b border-gray-50 dark:border-zinc-900 text-left">
                           <th className="py-4 pl-8 text-[9px] font-bold uppercase tracking-widest text-gray-400">Product</th>
                           <th className="py-4 px-4 text-[9px] font-bold uppercase tracking-widest text-gray-400">SKU</th>
                           <th className="py-4 px-4 text-[9px] font-bold uppercase tracking-widest text-gray-400">Quantity</th>
                           <th className="py-4 px-4 text-[9px] font-bold uppercase tracking-widest text-gray-400">Price</th>
                           <th className="py-4 pr-8 text-[9px] font-bold uppercase tracking-widest text-gray-400 text-right">Subtotal</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50 dark:divide-zinc-900">
                        {[
                          { name: "Gucci Double G Belt", sku: "GC-BELT-BLK-01", qty: 1, price: 35000, color: "Black", size: "M" },
                          { name: "Prada Nylon Tote Bag", sku: "PR-TOTE-NY-M", qty: 2, price: 95000, color: "Navy", size: "OS" },
                        ].map((item, i) => (
                          <tr key={i} className="hover:bg-gray-50/30 dark:hover:bg-zinc-900/20 transition-colors">
                             <td className="py-6 pl-8">
                                <div className="flex items-center gap-4">
                                   <div className="w-16 h-20 bg-gray-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center font-bold text-[9px] text-gray-400">IMG</div>
                                   <div className="space-y-1">
                                      <p className="text-[11px] font-bold uppercase tracking-tight">{item.name}</p>
                                      <div className="flex items-center gap-3 overflow-hidden">
                                         <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest border-r pr-3 border-gray-200 dark:border-zinc-800">{item.size}</span>
                                         <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.color}</span>
                                      </div>
                                   </div>
                                </div>
                             </td>
                             <td className="py-6 px-4">
                                <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">{item.sku}</span>
                             </td>
                             <td className="py-6 px-4">
                                <span className="text-[11px] font-bold">x{item.qty}</span>
                             </td>
                             <td className="py-6 px-4">
                                <span className="text-[11px] font-bold">₹{item.price.toLocaleString()}</span>
                             </td>
                             <td className="py-6 pr-8 text-right">
                                <span className="text-[12px] font-bold">₹{(item.price * item.qty).toLocaleString()}</span>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               <div className="p-10 bg-gray-50/50 dark:bg-zinc-900/50 flex flex-col items-end gap-3">
                  <div className="grid grid-cols-2 gap-x-12 gap-y-2 max-w-sm w-full">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Subtotal</span>
                     <span className="text-[11px] font-bold text-right">₹2,25,000</span>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Shipping (Express)</span>
                     <span className="text-[11px] font-bold text-right">₹499</span>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Tax (GST 18%)</span>
                     <span className="text-[11px] font-bold text-right">₹40,500</span>
                     <div className="col-span-2 my-4 h-px bg-gray-200 dark:bg-zinc-800" />
                     <span className="text-[12px] font-bold uppercase tracking-[0.2em]">Total</span>
                     <span className="text-2xl font-playfair font-bold text-right">₹2,65,999</span>
                  </div>
               </div>
            </div>

            <OrderActivityLog />
         </div>

         {/* Sidebar Content */}
         <div className="space-y-10">
            {/* Customer Information */}
            <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 shadow-sm space-y-8">
               <h3 className="text-xl font-playfair font-bold flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" /> Customer
               </h3>
               
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center font-playfair font-bold text-xl ring-4 ring-gray-100 dark:ring-zinc-900 shadow-xl">AS</div>
                  <div className="space-y-1">
                     <h4 className="text-sm font-bold uppercase tracking-tight">Aarav Sharma</h4>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer since Oct 2023</p>
                  </div>
               </div>

               <div className="space-y-6 pt-6 border-t border-gray-50 dark:border-zinc-900">
                  <div className="space-y-2">
                     <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Email Address</Label>
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold">aarav@example.com</span>
                        <button onClick={() => copyToClipboard("aarav@example.com", "Email")} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition-all"><Copy className="w-3.5 h-3.5" /></button>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Phone Number</Label>
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold">+91 98765 43210</span>
                        <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition-all"><ExternalLink className="w-3.5 h-3.5" /></button>
                     </div>
                  </div>
                  <Button variant="ghost" className="w-full text-[9px] font-bold uppercase tracking-[0.2em] border border-gray-100 dark:border-zinc-800 rounded-xl h-11 gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                     View Customer Profile
                  </Button>
               </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 shadow-sm space-y-8">
               <h3 className="text-xl font-playfair font-bold flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" /> Delivery
               </h3>
               
               <div className="space-y-6">
                  <div className="space-y-2">
                     <div className="flex items-center justify-between">
                        <Label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Shipping Address</Label>
                        <button onClick={() => copyToClipboard("123 Luxury Villa, Pune - 411001", "Address")} className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">Copy</button>
                     </div>
                     <p className="text-[10px] font-bold uppercase leading-relaxed tracking-widest">
                        Aarav Sharma<br />
                        123 Luxury Villa, Flat 402<br />
                        Bund Garden Road, Pune<br />
                        Maharashtra - 411001
                     </p>
                  </div>

                  <div className="p-6 bg-gray-50/50 dark:bg-zinc-900/50 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <Truck className="w-4 h-4 text-gray-400" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">Delhivery Express</span>
                        </div>
                        <Badge className="bg-white text-black text-[7px] font-bold uppercase px-2 shadow-sm">Standard</Badge>
                     </div>
                     <div className="space-y-1">
                        <Label className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Tracking Number</Label>
                        <p className="text-[9px] font-mono font-bold uppercase tracking-widest">PENDING GENERATION</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-black text-white dark:bg-white dark:text-black rounded-3xl p-8 shadow-2xl space-y-8">
               <h3 className="text-xl font-playfair font-bold flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-white/40 dark:text-black/40" /> Payment
               </h3>
               
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="space-y-1">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 dark:text-black/50">Method</p>
                        <p className="text-[11px] font-bold uppercase tracking-tight">Razorpay UPI</p>
                     </div>
                     <Badge className="bg-green-500/20 text-green-400 dark:text-green-600 px-3 py-1 font-bold text-[8px] uppercase tracking-widest">Paid</Badge>
                  </div>
                  
                  <div className="space-y-1">
                     <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 dark:text-black/50">Transaction ID</p>
                     <p className="text-[10px] font-mono font-bold uppercase tracking-widest">RZP_TXN_123456789</p>
                  </div>

                  <Button onClick={() => setIsRefundModalOpen(true)} variant="outline" className="w-full h-11 rounded-xl border-white/20 dark:border-black/20 text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all">
                     Process Refund
                  </Button>
               </div>
            </div>
         </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1240px] px-8">
         <div className="bg-white dark:bg-zinc-950 p-4 border border-gray-100 dark:border-zinc-800 rounded-full shadow-2xl flex items-center justify-between backdrop-blur-md bg-white/90">
            <div className="flex items-center gap-6 pl-6">
               <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Order Action Hub</span>
               </div>
               <div className="w-px h-6 bg-gray-100 dark:bg-zinc-900" />
               <p className="text-[10px] font-bold uppercase tracking-widest">3 Items Selected for Action</p>
            </div>
            
            <div className="flex items-center gap-3">
               <Button variant="ghost" className="rounded-full h-12 px-6 text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-gray-50 dark:hover:bg-zinc-900">
                  <Mail className="w-4 h-4" /> Notify Customer
               </Button>
               <Button variant="ghost" className="rounded-full h-12 px-6 text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-gray-50 dark:hover:bg-zinc-900">
                  <ShieldCheck className="w-4 h-4" /> Internal Note
               </Button>
               <Button className="rounded-full h-12 px-10 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl hover:-translate-y-1 transition-all">
                  Confirm Fulfillment
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default OrderDetailsView;

import { Label } from "@/components/ui/label";
