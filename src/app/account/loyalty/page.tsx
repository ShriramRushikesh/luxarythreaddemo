"use client";

import React from "react";
import { TrendingUp, Gift, Award, ArrowUpRight, History } from "lucide-react";
import { Button } from "@/components/ui/button";

const LoyaltyPage = () => {
  const loyaltyData = {
    currentPoints: 1250,
    tier: "Gold",
    nextTierPoints: 2000,
    history: [
      { id: 1, action: "Order #LT-1024", points: "+250", date: "Oct 24, 2023" },
      { id: 2, action: "Referral Bonus", points: "+500", date: "Oct 15, 2023" },
      { id: 3, action: "Review Reward", points: "+50", date: "Oct 10, 2023" },
      { id: 4, action: "Birthday Bonus", points: "+450", date: "Sep 20, 2023" },
    ],
  };

  const progress = (loyaltyData.currentPoints / loyaltyData.nextTierPoints) * 100;

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-playfair font-bold">Loyalty Points</h1>
        <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Manage your rewards and tier status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Points Card */}
        <div className="md:col-span-2 bg-black text-white p-10 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <Award className="w-48 h-48" />
          </div>
          
          <div className="relative z-10 flex flex-col gap-8">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Current Balance</span>
                 <div className="text-6xl font-playfair">{loyaltyData.currentPoints}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20">
                 <span className="text-[10px] font-bold uppercase tracking-widest">{loyaltyData.tier} Tier</span>
              </div>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Progress to Platinum</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{loyaltyData.currentPoints} / {loyaltyData.nextTierPoints}</span>
               </div>
               <div className="h-1 bg-white/10 w-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-1000 ease-out" 
                    style={{ width: `${progress}%` }}
                  />
               </div>
            </div>
          </div>
        </div>

        {/* Benefits Card */}
        <div className="bg-white border border-gray-100 p-8 flex flex-col gap-8">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50">
                 <Gift className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest font-playfair">Your Benefits</h3>
           </div>
           
           <ul className="space-y-4">
              {[
                "Free Express Shipping",
                "Early Access to Sales",
                "Birthday Special Discount",
                "Dedicated Stylist"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                   <div className="w-1 h-1 bg-black rounded-full" />
                   {benefit}
                </li>
              ))}
           </ul>

           <Button className="w-full mt-auto bg-black hover:bg-black/90 text-white rounded-none py-6 h-auto text-[10px] uppercase tracking-widest font-bold">
              View All Benefits
           </Button>
        </div>
      </div>

      <div className="space-y-8">
         <div className="flex items-center gap-4">
            <History className="w-5 h-5" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Points History</h2>
         </div>

         <div className="bg-white border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-gray-50">
                     <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Activity</th>
                     <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Points</th>
                     <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {loyaltyData.history.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                       <td className="p-6 text-[11px] font-bold uppercase tracking-widest">{item.action}</td>
                       <td className="p-6 text-[11px] font-bold uppercase tracking-widest text-green-600 font-mono">{item.points}</td>
                       <td className="p-6 text-[11px] font-bold uppercase tracking-widest text-gray-400">{item.date}</td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default LoyaltyPage;
