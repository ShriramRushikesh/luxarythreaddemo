"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart3, Star, ThumbsUp, ShieldAlert, Mail, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminReviewSettings() {
  const [saving, setSaving] = useState(false);
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved successfully.");
    }, 1000);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-3xl font-playfair font-bold text-black dark:text-white">Review Settings & Analytics</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">Configure moderation policies and view system KPIs</p>
         </div>
         <Button onClick={handleSave} disabled={saving} className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2">
            {saving ? <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div> : <Save className="w-4 h-4" />}
            Save Configuration
         </Button>
      </div>

      {/* Mini KPI Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Total Approved", value: "1,245", trend: "+45 this week", icon: ThumbsUp },
           { label: "Global Average", value: "4.7 / 5", trend: "+0.1 vs last month", icon: Star, color: "text-amber-500" },
           { label: "Needs Review", value: "12", trend: "-5 vs yesterday", icon: ShieldAlert, color: "text-emerald-500" },
           { label: "With Images", value: "32%", trend: "High Engagement", icon: BarChart3, color: "text-blue-500" },
         ].map((stat, i) => (
           <Card key={i} className="p-6 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl group cursor-default">
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-4">
                 <stat.icon className={`w-4 h-4 ${stat.color || "text-gray-400"}`} /> {stat.label}
              </p>
              <h4 className="text-3xl font-playfair font-bold mb-1">{stat.value}</h4>
              <p className="text-[10px] font-bold tracking-widest text-gray-400">{stat.trend}</p>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Moderation Policies */}
         <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem]">
            <h3 className="text-xl font-playfair font-bold mb-8">Moderation Engine</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                  <div className="space-y-1 pr-4">
                     <Label className="font-bold">Require Manual Moderation</Label>
                     <p className="text-[10px] font-medium tracking-widest text-gray-500 uppercase">Reviews wait in a queue for admin approval before going live.</p>
                  </div>
                  <Switch defaultChecked />
               </div>
               
               <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                  <div className="space-y-1 pr-4">
                     <Label className="font-bold">Profanity & Spam Filter [AI]</Label>
                     <p className="text-[10px] font-medium tracking-widest text-gray-500 uppercase">Automatically reject reviews containing flagged terminology or URLs.</p>
                  </div>
                  <Switch defaultChecked />
               </div>

               <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                  <div className="space-y-1 pr-4">
                     <Label className="font-bold">Allow Anonymous Reviews</Label>
                     <p className="text-[10px] font-medium tracking-widest text-gray-500 uppercase">Permit reviews without a verified purchase linked to account.</p>
                  </div>
                  <Switch checked={false} />
               </div>
               
               <div className="pt-4 space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-gray-500">Minimum Verified Purchases</Label>
                  <Input type="number" defaultValue="1" className="bg-gray-50 dark:bg-zinc-900 border-transparent rounded-xl h-12" />
               </div>
            </div>
         </Card>

         {/* Email Automations */}
         <Card className="p-8 bg-black text-white dark:bg-white dark:text-black border-none rounded-[2.5rem]">
            <h3 className="text-xl font-playfair font-bold mb-8 flex items-center gap-3"><Mail className="w-5 h-5" /> Automation Flows</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between p-4 bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-black/20">
                  <div className="space-y-1 pr-4">
                     <Label className="font-bold text-white dark:text-black">Request Review After Delivery</Label>
                     <p className="text-[10px] font-medium tracking-widest opacity-60 uppercase">Send "How was your experience?" CTA.</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-white dark:data-[state=checked]:bg-black" />
               </div>
               
               <div className="pl-4 border-l-2 border-white/20 dark:border-black/20 space-y-3">
                  <Label className="font-bold text-[10px] uppercase tracking-widest opacity-60">Delay (Days Post Delivery)</Label>
                  <Input type="number" defaultValue="7" className="bg-white/5 dark:bg-black/5 border-transparent text-white dark:text-black rounded-xl h-12 w-24 placeholder:text-white/30" />
               </div>

               <div className="flex items-center justify-between p-4 bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-black/20 mt-8">
                  <div className="space-y-1 pr-4">
                     <Label className="font-bold text-white dark:text-black">Notify on Approval</Label>
                     <p className="text-[10px] font-medium tracking-widest opacity-60 uppercase">Email customer when review goes live.</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-white dark:data-[state=checked]:bg-black" />
               </div>
               <div className="flex items-center justify-between p-4 bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-black/20">
                  <div className="space-y-1 pr-4">
                     <Label className="font-bold text-white dark:text-black">Notify on Store Response</Label>
                     <p className="text-[10px] font-medium tracking-widest opacity-60 uppercase">Alert customer when Admin replies.</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-white dark:data-[state=checked]:bg-black" />
               </div>
            </div>
         </Card>
      </div>

    </div>
  );
}
