"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "description", title: "Description" },
  { id: "size-fit", title: "Size & Fit" },
  { id: "reviews", title: "Reviews (124)" },
];

const ProductTabs = ({ children }: { children: Record<string, React.ReactNode> }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-100 mb-12 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-10 py-6 text-xs font-bold uppercase tracking-[0.3em] transition-all relative",
              activeTab === tab.id ? "text-black" : "text-gray-400 hover:text-black"
            )}
          >
            {tab.title}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-black"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {children[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductTabs;
