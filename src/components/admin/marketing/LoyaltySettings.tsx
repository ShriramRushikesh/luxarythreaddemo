"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Trophy, 
  Star, 
  Gift, 
  Users, 
  ChevronRight, 
  Plus,
  Coins,
  Settings,
  ShieldCheck,
  TrendingUp,
  Diamond
} from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  { name: "Bronze", range: "0 - 1,000 pts", discount: "5%", color: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-500" },
  { name: "Silver", range: "1,001 - 5,000 pts", discount: "10%", color: "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400" },
  { name: "Gold", range: "5,001+ pts", discount: "15%", color: "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500" },
];

export function LoyaltySettings() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h3 className="text-3xl font-playfair font-bold text-black dark:text-white">Loyalty & Rewards Program</h3>
           <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Incentivize repeat purchases and customer retention</p>
        </div>
        <div className="flex items-center gap-3 p-1.5 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
           <div className={cn("px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-white dark:bg-zinc-800 shadow-sm")}>Program Settings</div>
           <div className={cn("px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white cursor-pointer transition-all")}>Customer Points</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
         {/* Left Column: Earnings & Settings */}
         <div className="xl:col-span-2 space-y-10">
            {/* Earning Rules */}
            <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
               <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-2xl bg-black text-white dark:bg-white dark:text-black">
                     <Coins className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-playfair font-bold">Earning Rules</h4>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Points per ₹100 Spent</Label>
                     <Input defaultValue="10" className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-white transition-all font-bold" />
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Points for Account Creation</Label>
                     <Input defaultValue="100" className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-white transition-all font-bold" />
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Birthday Bonus Points</Label>
                     <Input defaultValue="500" className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-white transition-all font-bold" />
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Referral Success Points</Label>
                     <Input defaultValue="250" className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-white transition-all font-bold" />
                  </div>
               </div>
            </Card>

            {/* Redemption Rules */}
            <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
               <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-2xl bg-gray-50 dark:bg-zinc-900">
                     <ShieldCheck className="w-5 h-5 text-black dark:text-white" />
                  </div>
                  <h4 className="text-xl font-playfair font-bold">Redemption Value</h4>
               </div>

               <div className="flex items-center gap-8 p-6 rounded-[2rem] bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800">
                  <div className="flex-1 space-y-1">
                     <p className="text-xs font-bold text-black dark:text-white">Conversion Rate</p>
                     <p className="text-[10px] text-gray-400 uppercase tracking-widest">How much each point is worth in currency</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="text-right">
                        <span className="text-xl font-bold">100</span>
                        <span className="text-[10px] text-gray-400 font-bold ml-1 uppercase">Points</span>
                     </div>
                     <ChevronRight className="w-4 h-4 text-gray-300" />
                     <div className="text-left">
                        <span className="text-xl font-bold">₹10</span>
                        <span className="text-[10px] text-gray-400 font-bold ml-1 uppercase">Value</span>
                     </div>
                  </div>
                  <Button variant="outline" className="h-10 px-4 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] ml-4">Edit Rate</Button>
               </div>
            </Card>
         </div>

         {/* Right Column: Tiers & Quick Actions */}
         <div className="space-y-10">
            {/* Rewards Tiers */}
            <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm space-y-8">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Trophy className="w-4 h-4 text-black dark:text-white" />
                     <h4 className="text-sm font-bold uppercase tracking-widest">Membership Tiers</h4>
                  </div>
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-gray-100 dark:border-zinc-800">
                     <Plus className="w-4 h-4" />
                  </Button>
               </div>

               <div className="space-y-4">
                  {tiers.map((tier) => (
                     <div key={tier.name} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 dark:border-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all group">
                        <div className="flex items-center gap-4">
                           <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", tier.color)}>
                              <Star className="w-5 h-5 fill-current" />
                           </div>
                           <div>
                              <p className="text-xs font-bold text-black dark:text-white">{tier.name}</p>
                              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{tier.range}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black tracking-widest text-black dark:text-white">{tier.discount} OFF</p>
                           <p className="text-[8px] text-gray-400 font-bold uppercase mt-1">Benefit</p>
                        </div>
                     </div>
                  ))}
               </div>
            </Card>

            {/* Quick Analytics */}
            <Card className="p-8 bg-black text-white dark:bg-white dark:text-black rounded-[2.5rem] shadow-2xl space-y-6">
               <div className="flex items-center justify-between opacity-60">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Enrollment Stats</span>
                  <Users className="w-4 h-4" />
               </div>
               <div>
                  <h4 className="text-4xl font-playfair font-bold">4,560</h4>
                  <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-2">Active Members</p>
               </div>
               <div className="pt-6 border-t border-white/10 dark:border-black/10 flex items-center justify-between">
                  <div className="flex flex-col">
                     <span className="text-lg font-bold">₹4.5L</span>
                     <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Points Value Held</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 dark:bg-black/10 flex items-center justify-center">
                     <TrendingUp className="w-4 h-4" />
                  </div>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
