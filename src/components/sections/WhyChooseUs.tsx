"use client";

import React from "react";
import { ShieldCheck, Truck, CreditCard, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: ShieldCheck, title: "100% Authentic", desc: "Top tier authentic products" },
  { icon: Truck, title: "World Shipping", desc: "Global delivery support" },
  { icon: CreditCard, title: "Secure Payment", desc: "100% encrypted checkout" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7 days return policy" },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-6 lg:px-12 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="flex items-center gap-6"
          >
            <div className="p-4 bg-white/10 rounded-full group hover:bg-white transition-colors duration-500">
              <feature.icon className="w-6 h-6 group-hover:text-black transition-colors" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest">{feature.title}</h4>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
