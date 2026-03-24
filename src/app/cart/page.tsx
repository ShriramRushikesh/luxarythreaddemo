"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/hooks/use-cart";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCarousel from "@/components/products/detail/ProductCarousel";

const recommendedProducts = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 100,
  name: `Essential Accessory ${i + 1}`,
  brand: "Luxury Basic",
  price: 999 + (i * 200),
  salePrice: i % 2 === 0 ? 799 + (i * 200) : undefined,
  images: [`https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=1920&auto=format&fit=crop`],
  rating: 4.8,
  isNew: false
}));

const FullCartPage = () => {
  const { items, updateQuantity, removeItem } = useCart();
  const subtotal = items.reduce((acc, item) => acc + (item.salePrice || item.price) * item.quantity, 0);
  const savings = items.reduce((acc, item) => acc + (item.salePrice ? (item.price - item.salePrice) * item.quantity : 0), 0);
  const shipping = subtotal > 999 ? 0 : 99;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="mt-32 mb-24 flex-1">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col items-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-playfair lowercase tracking-tight">Shopping Bag</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Items ({items.length})</p>
          </div>

          {items.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center text-center space-y-8 bg-gray-50/50 border border-dashed border-gray-200">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <ShoppingBag className="w-8 h-8 text-gray-200" />
               </div>
               <div className="space-y-2">
                 <h2 className="text-xl font-bold uppercase tracking-widest">Your bag is currently empty</h2>
                 <p className="text-xs text-gray-400 uppercase tracking-widest">Looks like you haven't added anything to your cart yet.</p>
               </div>
               <Link href="/products">
                 <Button className="rounded-none bg-black text-white py-8 px-12 group">
                   Continue Shopping
                   <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* Items List */}
              <div className="lg:col-span-8 space-y-8">
                <div className="grid grid-cols-12 px-6 py-4 border-b border-gray-100 hidden md:flex text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                   <div className="col-span-6">Product</div>
                   <div className="col-span-2 text-center">Unit Price</div>
                   <div className="col-span-2 text-center">Quantity</div>
                   <div className="col-span-2 text-right">Subtotal</div>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center px-6 py-8 border border-gray-100 bg-white group hover:shadow-xl hover:border-black/5 transition-all">
                    <div className="col-span-12 md:col-span-6 flex gap-6">
                       <div className="w-24 aspect-[3/4] bg-gray-50 overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex flex-col justify-center space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.brand}</p>
                          <h3 className="text-sm font-bold uppercase tracking-widest">{item.name}</h3>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Size: {item.size}</p>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-[10px] font-bold uppercase tracking-widest text-red-500 mt-4 flex items-center gap-2 hover:opacity-70 transition-opacity"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                       </div>
                    </div>

                    <div className="col-span-6 md:col-span-2 flex flex-col items-center gap-1">
                       <p className="text-[10px] md:hidden font-bold uppercase tracking-widest text-gray-300">Unit Price</p>
                       <span className="text-xs font-mono font-bold">₹{(item.salePrice || item.price).toLocaleString()}</span>
                    </div>

                    <div className="col-span-6 md:col-span-2 flex flex-col items-center gap-1">
                       <p className="text-[10px] md:hidden font-bold uppercase tracking-widest text-gray-300">Quantity</p>
                       <div className="flex items-center border border-gray-100">
                          <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-2 hover:bg-gray-50"><Minus className="w-3 h-3" /></button>
                          <span className="w-8 text-center text-xs font-mono font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-50"><Plus className="w-3 h-3" /></button>
                       </div>
                    </div>

                    <div className="col-span-12 md:col-span-2 flex flex-col items-center md:items-end gap-1 border-t md:border-t-0 pt-4 md:pt-0">
                       <p className="text-[10px] md:hidden font-bold uppercase tracking-widest text-gray-300">Subtotal</p>
                       <span className="text-sm font-mono font-bold">₹{((item.salePrice || item.price) * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar Summary */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
                <div className="bg-white border border-gray-100 p-8 shadow-sm space-y-8">
                  <h2 className="text-xs font-bold uppercase tracking-[0.3em] border-b border-gray-50 pb-6">Payment Summary</h2>
                  
                  <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        <span>Cart Total</span>
                        <span className="font-mono text-black">₹{subtotal.toLocaleString()}</span>
                     </div>
                     {savings > 0 && (
                       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-green-600">
                          <span>Total Savings</span>
                          <span className="font-mono">-₹{savings.toLocaleString()}</span>
                       </div>
                     )}
                     <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        <span>Convenience Fee</span>
                        <span className="font-mono text-black">{shipping === 0 ? "FREE" : "₹99"}</span>
                     </div>
                  </div>

                  <div className="h-[1px] w-full bg-gray-100" />
                  
                  <div className="flex justify-between text-lg font-bold uppercase tracking-[0.3em]">
                     <span>Total Amount</span>
                     <span className="font-mono">₹{(subtotal + shipping).toLocaleString()}</span>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full py-8 bg-black hover:bg-black/90 text-white rounded-none uppercase tracking-[0.4em] font-bold text-xs shadow-2xl active:scale-95 transition-all">
                      Secure Checkout
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-2">
                   {[
                     { icon: ShieldCheck, text: "Secure" },
                     { icon: Truck, text: "Fast" },
                     { icon: RotateCcw, text: "Return" }
                   ].map((item, i) => (
                     <div key={i} className="bg-gray-50 p-6 flex flex-col items-center gap-3 border border-gray-100">
                        <item.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">{item.text}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-24">
             <ProductCarousel title="Complete the look" products={recommendedProducts} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FullCartPage;
