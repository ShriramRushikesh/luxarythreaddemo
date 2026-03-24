"use client";

import React from "react";
import { Printer, Download, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderInvoice = ({ id }: { id: string }) => {
  return (
    <div className="bg-white p-12 max-w-[800px] mx-auto shadow-2xl rounded-sm border border-gray-100 text-black invoice-container">
      {/* Invoice Header */}
      <div className="flex justify-between items-start mb-16">
        <div className="space-y-4">
           <div className="text-3xl font-playfair font-black tracking-tighter uppercase italic">Luxury Threads</div>
           <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Pune, Maharashtra, India</div>
        </div>
        <div className="text-right space-y-2">
           <h1 className="text-5xl font-playfair font-bold text-gray-100 select-none">INVOICE</h1>
           <p className="text-[10px] font-bold uppercase tracking-widest">#INV-2024-{id.split('-').pop()}</p>
        </div>
      </div>

      {/* Bill To / Date */}
      <div className="grid grid-cols-2 gap-20 mb-16">
        <div className="space-y-4">
           <h3 className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-300">Bill & Ship To</h3>
           <div className="text-[11px] font-bold uppercase leading-relaxed tracking-widest">
              Aarav Sharma<br />
              123 Luxury Villa, Flat 402<br />
              Bund Garden Road, Pune<br />
              Maharashtra - 411001
           </div>
        </div>
        <div className="text-right space-y-4">
           <div className="grid grid-cols-2 gap-4">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-300">Issue Date</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">24 JAN 2024</span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-300">Due Date</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">DUE ON RECEIPT</span>
           </div>
        </div>
      </div>

      {/* Item Table */}
      <table className="w-full mb-16">
         <thead>
            <tr className="border-b-2 border-black text-left">
               <th className="py-4 text-[9px] font-black uppercase tracking-[0.4em] text-gray-300">Description</th>
               <th className="py-4 text-[9px] font-black uppercase tracking-[0.4em] text-gray-300 text-center">Qty</th>
               <th className="py-4 text-[9px] font-black uppercase tracking-[0.4em] text-gray-300 text-center">Unit Price</th>
               <th className="py-4 text-[9px] font-black uppercase tracking-[0.4em] text-gray-300 text-right">Total</th>
            </tr>
         </thead>
         <tbody className="divide-y divide-gray-100">
            {[
              { desc: "Gucci Double G Belt - Black / M", qty: 1, price: 35000 },
              { desc: "Prada Nylon Tote Bag - Navy / OS", qty: 2, price: 95000 },
            ].map((item, i) => (
              <tr key={i}>
                 <td className="py-6 text-[10px] font-bold uppercase tracking-widest">{item.desc}</td>
                 <td className="py-6 text-[10px] font-bold uppercase tracking-widest text-center">{item.qty}</td>
                 <td className="py-6 text-[10px] font-bold uppercase tracking-widest text-center">₹{item.price.toLocaleString()}</td>
                 <td className="py-6 text-[10px] font-bold uppercase tracking-widest text-right">₹{(item.qty * item.price).toLocaleString()}</td>
              </tr>
            ))}
         </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-24">
         <div className="w-64 space-y-4">
            <div className="flex justify-between">
               <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Subtotal</span>
               <span className="text-[10px] font-bold">₹2,25,000.00</span>
            </div>
            <div className="flex justify-between">
               <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Taxes (18%)</span>
               <span className="text-[10px] font-bold">₹40,500.00</span>
            </div>
            <div className="flex justify-between">
               <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Shipping</span>
               <span className="text-[10px] font-bold">₹499.00</span>
            </div>
            <div className="pt-4 border-t-2 border-black flex justify-between items-baseline">
               <span className="text-[11px] font-black uppercase tracking-[0.4em]">Total</span>
               <span className="text-3xl font-playfair font-bold">₹2,65,999</span>
            </div>
         </div>
      </div>

      {/* Footer */}
      <div className="pt-16 border-t border-gray-100 text-center space-y-4">
         <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-gray-400">Thank you for choosing luxury threads pune</p>
         <div className="flex justify-center gap-6">
            <span className="text-[7px] font-bold uppercase tracking-widest">www.luxurythreads.in</span>
            <span className="text-[7px] font-bold uppercase tracking-widest">contact@luxurythreads.in</span>
         </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .invoice-container, .invoice-container * {
            visibility: visible;
          }
          .invoice-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderInvoice;
