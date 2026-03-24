"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useCart, CartItem as CartItemType } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CartItem = ({ item }: { item: CartItemType }) => {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="flex gap-4 py-6 border-b border-border group">
      <div className="relative aspect-[3/4] w-24 bg-muted overflow-hidden shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.2] transition-all group-hover:grayscale-0" />
      </div>
      
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.brand}</p>
            <h4 className="text-xs font-bold uppercase tracking-widest leading-tight pr-4">{item.name}</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Size: {item.size} {item.color && `| Color: ${item.color}`}</p>
          </div>
          <button 
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-auto flex justify-between items-end">
          <div className="flex items-center border border-border bg-background">
            <button 
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="px-2 py-1.5 hover:bg-gray-50 disabled:opacity-30"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-[10px] font-mono font-bold">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1.5 hover:bg-muted"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="text-right">
            {item.salePrice ? (
              <div className="space-y-0.5">
                <p className="text-xs font-bold font-mono">₹{(item.salePrice * item.quantity).toLocaleString()}</p>
                <p className="text-[10px] text-gray-400 line-through font-mono">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ) : (
              <p className="text-xs font-bold font-mono">₹{(item.price * item.quantity).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSidebar = () => {
  const { items, isOpen, onClose, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");

  const subtotal = items.reduce((acc, item) => acc + (item.salePrice || item.price) * item.quantity, 0);
  const totalSavings = items.reduce((acc, item) => acc + (item.salePrice ? (item.price - item.salePrice) * item.quantity : 0), 0);
  const isFreeShipping = subtotal > 999;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[480px] bg-background z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-border">
              <div className="flex items-center gap-4">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-sm font-bold uppercase tracking-[0.3em]">Shopping Bag ({items.length})</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 transition-all rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 py-4 scrollbar-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-xs uppercase font-bold tracking-widest">Your bag is empty</h3>
                  <Button onClick={onClose} variant="outline" className="rounded-none border-black uppercase tracking-widest text-[10px] font-bold py-6 px-10">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Summary */}
            {items.length > 0 && (
              <div className="p-8 bg-muted/50 border-t border-border space-y-6">
                {/* Coupon */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="Enter Coupon Code" 
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="flex-1 bg-background border border-border p-3 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-primary transition-colors"
                    />
                    <Button variant="outline" className="rounded-none border-black py-4 px-6 text-[10px] font-bold uppercase tracking-widest">Apply</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-mono text-black">₹{subtotal.toLocaleString()}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-green-600">
                      <span>Bag Discount</span>
                      <span className="font-mono">-₹{totalSavings.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    <span>Shipping</span>
                    <span className="font-mono text-black">{isFreeShipping ? "FREE" : "₹99"}</span>
                  </div>
                  <div className="h-[1px] w-full bg-border" />
                  <div className="flex justify-between text-sm font-bold uppercase tracking-[0.3em]">
                    <span>Total Amount</span>
                    <span className="font-mono">₹{(subtotal + (isFreeShipping ? 0 : 99)).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <Link href="/checkout">
                    <Button className="w-full rounded-none py-8 bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-[0.4em] font-bold text-xs shadow-xl active:scale-95 transition-all">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <div className="flex items-center justify-center gap-6 mt-6">
                    <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-gray-400" />
                      <span className="text-[8px] uppercase font-bold text-gray-400 tracking-widest">Secure</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Truck className="w-4 h-4 text-gray-400" />
                      <span className="text-[8px] uppercase font-bold text-gray-400 tracking-widest">Fast Delivery</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <RotateCcw className="w-4 h-4 text-gray-400" />
                      <span className="text-[8px] uppercase font-bold text-gray-400 tracking-widest">7 Day Return</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
