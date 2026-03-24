"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "product-details",
    title: "Product Details",
    content: (
      <ul className="space-y-2 text-xs text-gray-500 leading-relaxed list-disc pl-4">
        <li>Premium 100% supima cotton fabric.</li>
        <li>Authentic export surplus from limited collection.</li>
        <li>Classic tailored fit for a timeless silhouette.</li>
        <li>Double-stitched seams for enhanced durability.</li>
        <li>Embroidered logo on the chest.</li>
      </ul>
    ),
  },
  {
    id: "material-care",
    title: "Material & Care",
    content: (
      <div className="space-y-4 text-xs text-gray-500 leading-relaxed uppercase tracking-widest">
        <div>
          <p className="font-bold text-black mb-1">Fabric:</p>
          <p>100% Pima Cotton, 180 GSM</p>
        </div>
        <div>
          <p className="font-bold text-black mb-1">Care:</p>
          <p>Machine wash cold, delicate cycle. Tumble dry low.</p>
        </div>
      </div>
    ),
  },
  {
    id: "shipping-returns",
    title: "Shipping & Returns",
    content: (
      <div className="space-y-4 text-xs text-gray-500 leading-relaxed uppercase tracking-tighter">
        <p>Free standard shipping on orders over ₹999.</p>
        <p>Estimated Delivery: 2-4 business days.</p>
        <p>7-day easy returns and exchanges available.</p>
      </div>
    ),
  },
];

const ProductFeatures = () => {
  const [openId, setOpenId] = useState<string | null>("product-details");

  return (
    <div className="border-y border-gray-100 divide-y divide-gray-100">
      {features.map((feature) => (
        <div key={feature.id} className="py-2">
          <button
            onClick={() => setOpenId(openId === feature.id ? null : feature.id)}
            className="w-full py-4 flex items-center justify-between text-left group"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] group-hover:text-black/60 transition-colors">
              {feature.title}
            </span>
            <ChevronDown className={cn(
              "w-4 h-4 text-gray-400 transition-transform duration-300",
              openId === feature.id && "rotate-180"
            )} />
          </button>
          <AnimatePresence>
            {openId === feature.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="pb-6 pt-2">
                  {feature.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default ProductFeatures;
