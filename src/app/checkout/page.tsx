"use client";

import React, { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Truck, CreditCard, MapPin, Package, ShoppingBag, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const steps = [
  { id: 1, name: "Shipping", icon: MapPin },
  { id: 2, name: "Method", icon: Truck },
  { id: 3, name: "Payment", icon: CreditCard },
  { id: 4, name: "Confirm", icon: Check },
];

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { items, clearCart } = useCart();

  const subtotal = items.reduce((acc, item) => acc + (item.salePrice || item.price) * item.quantity, 0);

  const handlePayment = async () => {
    // This would typically involve a call to your backend to create an order
    // and then opening the Razorpay checkout modal.
    
    // For now, we simulate success
    setCurrentStep(4);
    clearCart();
    toast.success("Order placed successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Header />
      
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <main className="mt-32 mb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        {/* Progress Indicator */}
        <div className="mb-16">
          <div className="flex items-center justify-center max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                    currentStep >= step.id ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-muted-foreground/30"
                  )}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest absolute -bottom-8 whitespace-nowrap",
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground/30"
                  )}>
                    {step.name}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-[2px] mx-4 bg-muted relative -top-3">
                    <motion.div 
                      className="absolute inset-0 bg-primary" 
                      initial={{ width: 0 }}
                      animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Main Checkout Content */}
          <div className="lg:col-span-8 bg-background border border-border p-8 sm:p-12 shadow-sm min-h-[600px]">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-playfair uppercase tracking-widest border-b border-border pb-6">Shipping Address</h2>
                  {/* Address Form Mockup */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                       <input className="w-full p-4 text-xs border border-gray-100 focus:border-black outline-none" placeholder="Enter Full Name" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                       <input className="w-full p-4 text-xs border border-gray-100 focus:border-black outline-none" placeholder="+91 XXX XXX XXXX" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Address Line 1</label>
                       <input className="w-full p-4 text-xs border border-gray-100 focus:border-black outline-none" placeholder="Flat / House No / Street" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">City</label>
                       <input className="w-full p-4 text-xs border border-gray-100 focus:border-black outline-none" placeholder="Mumbai / Pune" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pincode</label>
                       <input className="w-full p-4 text-xs border border-gray-100 focus:border-black outline-none" placeholder="400001" />
                    </div>
                  </div>
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    className="w-full md:w-auto px-12 py-8 bg-primary text-primary-foreground hover:opacity-90 transition-opacity uppercase tracking-[0.3em] font-bold text-xs"
                  >
                    Save & Continue
                  </Button>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-playfair uppercase tracking-widest border-b border-gray-50 pb-6">Shipping Method</h2>
                  <div className="space-y-4 pt-4">
                    {[
                      { id: 'std', name: 'Standard Delivery', time: '5-7 business days', price: '₹99' },
                      { id: 'exp', name: 'Express Delivery', time: '2-3 business days', price: '₹199' },
                      { id: 'over', name: 'Overnight Delivery', time: 'Next business day', price: '₹499' }
                    ].map((method) => (
                      <div key={method.id} className="p-6 border border-border flex items-center justify-between hover:border-primary cursor-pointer transition-all group">
                        <div className="flex items-center gap-6">
                           <div className="w-4 h-4 border-2 border-border rounded-full group-hover:border-primary" />
                           <div>
                             <h4 className="text-xs font-bold uppercase tracking-widest">{method.name}</h4>
                             <p className="text-[10px] text-gray-400 uppercase tracking-widest">{method.time}</p>
                           </div>
                        </div>
                        <span className="text-xs font-mono font-bold">{method.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="px-12 py-8 rounded-none border-primary uppercase tracking-[0.3em] font-bold text-xs">Back</Button>
                    <Button onClick={() => setCurrentStep(3)} className="flex-1 py-8 bg-primary text-primary-foreground uppercase tracking-[0.3em] font-bold text-xs">Continue to Payment</Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-playfair uppercase tracking-widest border-b border-gray-50 pb-6">Payment Method</h2>
                  <div className="space-y-4 pt-4">
                    {[
                      { id: 'razor', name: 'Razorpay / Cards / UPI', subtitle: 'Secure Checkout' },
                      { id: 'cod', name: 'Cash On Delivery', subtitle: '₹50 Extra convenience fee' }
                    ].map((method) => (
                      <div key={method.id} className="p-6 border border-gray-100 flex items-center justify-between hover:border-black cursor-pointer transition-all group">
                        <div className="flex items-center gap-6">
                           <div className="w-4 h-4 border-2 border-gray-200 rounded-full group-hover:border-black" />
                           <div>
                             <h4 className="text-xs font-bold uppercase tracking-widest">{method.name}</h4>
                             <p className="text-[10px] text-gray-400 uppercase tracking-widest">{method.subtitle}</p>
                           </div>
                        </div>
                        {method.id === 'razor' && <div className="flex gap-2">
                           <div className="w-8 h-5 bg-gray-100 rounded" />
                           <div className="w-8 h-5 bg-gray-100 rounded" />
                        </div>}
                      </div>
                    ))}
                  </div>
                  <Button onClick={handlePayment} className="w-full py-8 bg-black text-white uppercase tracking-[0.4em] font-bold text-xs shadow-2xl">
                    Place Order ({`₹${(subtotal + 99).toLocaleString()}`})
                  </Button>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-8"
                >
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center overflow-hidden relative">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="text-green-600"
                    >
                       <Check className="w-12 h-12" strokeWidth={3} />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-playfair tracking-tight">Purchase Successful!</h2>
                    <p className="text-sm text-gray-500 uppercase tracking-[0.2em] font-bold">Order ID: #LT2024001</p>
                  </div>
                  <p className="max-w-md text-xs text-gray-400 leading-relaxed uppercase tracking-widest">
                    Your order has been confirmed and will be shipped within 2 days. 
                    A confirmation email has been sent to your registered address.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full px-12">
                     <Button className="flex-1 py-8 bg-black uppercase tracking-widest font-bold text-xs rounded-none">Track Order</Button>
                     <Link href="/products" className="flex-1">
                       <Button variant="outline" className="w-full h-full py-8 border-black text-black uppercase tracking-widest font-bold text-xs rounded-none">Continue Shopping</Button>
                     </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sticky Order Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <div className="bg-background border border-border p-8 shadow-sm space-y-8">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-gray-50 pb-4">Order Summary</h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                     <div className="w-16 h-20 bg-gray-50 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.2]" />
                     </div>
                     <div className="flex-1 space-y-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest leading-tight">{item.name}</h4>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest">Qty: {item.quantity} | Size: {item.size}</p>
                        <p className="text-xs font-bold font-mono">₹{(item.salePrice || item.price).toLocaleString()}</p>
                     </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-gray-50 pt-6">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-mono text-black">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <span>Shipping</span>
                  <span className="font-mono text-black">₹99</span>
                </div>
                <div className="flex justify-between text-sm font-bold uppercase tracking-[0.3em] pt-4 border-t border-gray-50">
                  <span>Total</span>
                  <span className="font-mono">₹{(subtotal + 99).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-8 space-y-6">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                 <ShieldCheck className="w-4 h-4" />
                 Secure Checkout Guarantee
               </h4>
               <p className="text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed">
                 Your data is protected by industry-standard encryption and secure payment gateways.
               </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
