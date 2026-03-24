"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Mail, 
  Zap, 
  Ticket,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Layout,
  MousePointer2,
  Bell,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const marketingStats = [
  { label: "Active Coupons", value: "12", sub: "3 expiring soon", icon: Ticket, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  { label: "Email Subscribers", value: "4.5k", sub: "+125 this week", icon: Users, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  { label: "Flash Sales Live", value: "2", sub: "1 scheduled", icon: Zap, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  { label: "Avg. Engagement", value: "18.2%", sub: "+2.4% vs last mo", icon: TrendingUp, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
];

const quickActions = [
  { title: "Create Coupon", desc: "Release new discount code", href: "/admin/marketing/coupons/new", icon: Ticket },
  { title: "Start Campaign", desc: "Design & send newsletter", href: "/admin/marketing/newsletter/new", icon: Mail },
  { title: "New Flash Sale", desc: "Plan a time-limited event", href: "/admin/marketing/flash-sales", icon: Zap },
  { title: "Update Banners", desc: "Revise store visuals", href: "/admin/marketing/banners", icon: Layout },
];

export function MarketingOverview() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h3 className="text-4xl font-playfair font-bold text-black dark:text-white">Marketing Command Center</h3>
           <p className="text-xs text-gray-400 mt-2 uppercase tracking-[0.2em] font-black italic underline decoration-gray-200 decoration-2 underline-offset-8">Unified Promotional Intelligence</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest gap-2 bg-white dark:bg-zinc-950">
             <Bell className="w-4 h-4 text-amber-500" /> Notifications <Badge className="ml-1 bg-amber-500 text-white rounded-full h-5 w-5 flex items-center justify-center p-0 text-[10px]">3</Badge>
           </Button>
           <Button className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-2xl flex items-center gap-2">
             <TrendingUp className="w-4 h-4" /> View Full Reports
           </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         {marketingStats.map((stat, i) => (
           <Card key={i} className="group p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[3rem] shadow-sm hover:shadow-xl transition-all relative overflow-hidden">
              <div className={cn("p-3 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110", stat.bg)}>
                 <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{stat.label}</p>
              <h4 className="text-4xl font-playfair font-bold text-black dark:text-white mt-2 italic">{stat.value}</h4>
              <div className="flex items-center gap-2 mt-4 text-[10px] font-black tracking-widest uppercase">
                 <span className={cn(stat.color)}>{stat.sub}</span>
                 {stat.sub.startsWith("+") ? <ArrowUpRight className={cn("w-3.5 h-3.5", stat.color)} /> : <ArrowDownRight className={cn("w-3.5 h-3.5", stat.color)} />}
              </div>
              {/* Background Glow */}
              <div className={cn("absolute -right-8 -bottom-8 w-24 h-24 rounded-full blur-[40px] opacity-10", stat.bg)} />
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 pt-4">
         {/* Main Channel Performance */}
         <div className="xl:col-span-2 space-y-10">
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 pl-4 border-l-4 border-black dark:border-white">Channel Performance</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Newsletter & Email */}
               <Card className="p-10 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[3.5rem] shadow-sm space-y-8 relative group cursor-pointer hover:border-black dark:hover:border-white transition-all">
                  <div className="flex items-center justify-between">
                     <div className="p-3 rounded-2xl bg-gray-50 dark:bg-zinc-900">
                        <Mail className="w-6 h-6 text-black dark:text-white" />
                     </div>
                     <Badge className="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500 border-none font-black text-[8px] px-3">OPTIMAL</Badge>
                  </div>
                  <div>
                     <h4 className="text-2xl font-playfair font-bold">Email Marketing</h4>
                     <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-black">28% Revenue Contribution</p>
                  </div>
                  <div className="space-y-4 pt-4">
                     <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-gray-400 italic">Open Rate</span>
                        <span className="text-black dark:text-white">24.5%</span>
                     </div>
                     <div className="h-1.5 w-full bg-gray-50 dark:bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }} />
                     </div>
                  </div>
                  <ArrowUpRight className="absolute bottom-10 right-10 w-6 h-6 text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors" />
               </Card>

               {/* Paid Advertising / Banners */}
               <Card className="p-10 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[3.5rem] shadow-sm space-y-8 relative group cursor-pointer hover:border-black dark:hover:border-white transition-all">
                  <div className="flex items-center justify-between">
                     <div className="p-3 rounded-2xl bg-gray-50 dark:bg-zinc-900">
                        <Layout className="w-6 h-6 text-black dark:text-white" />
                     </div>
                     <Badge className="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500 border-none font-black text-[8px] px-3">MONITOR</Badge>
                  </div>
                  <div>
                     <h4 className="text-2xl font-playfair font-bold">Store Promotions</h4>
                     <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-black">15% Conversion Influence</p>
                  </div>
                  <div className="space-y-4 pt-4">
                     <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-gray-400 italic">Click Through</span>
                        <span className="text-black dark:text-white">5.2%</span>
                     </div>
                     <div className="h-1.5 w-full bg-gray-50 dark:bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '42%' }} />
                     </div>
                  </div>
                  <ArrowUpRight className="absolute bottom-10 right-10 w-6 h-6 text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors" />
               </Card>
            </div>
         </div>

         {/* Sidebar: Quick Actions */}
         <div className="space-y-10">
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 pl-4 border-l-4 border-black dark:border-white">Direct Actions</h4>
            <div className="grid grid-cols-1 gap-4">
               {quickActions.map((action, i) => (
                  <Link key={i} href={action.href}>
                     <div className="p-6 rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 hover:border-black dark:hover:border-white hover:shadow-2xl transition-all group flex items-center justify-between">
                        <div className="flex items-center gap-6">
                           <div className="w-14 h-14 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                              <action.icon className="w-6 h-6" />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-black dark:text-white">{action.title}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{action.desc}</p>
                           </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:-translate-x-2 transition-transform" />
                     </div>
                  </Link>
               ))}
            </div>
            
            {/* Abandoned Cart Snapshot */}
            <Card className="p-8 bg-black text-white dark:bg-white dark:text-black rounded-[3rem] shadow-2xl relative overflow-hidden">
               <div className="flex justify-between items-start">
                  <div className="space-y-2">
                     <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Abandoned Recovery</p>
                     <h4 className="text-3xl font-playfair font-bold">₹2.4L</h4>
                     <p className="text-xs font-black uppercase tracking-widest mt-4">Potential Revenue at Risk</p>
                  </div>
                  <ShoppingBag className="w-12 h-12 opacity-20" />
               </div>
               <Link href="/admin/marketing/abandoned-carts">
                  <Button className="w-full mt-8 h-12 rounded-2xl bg-white text-black dark:bg-black dark:text-white border-none text-[9px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-transform">
                     Launch Recovery <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
               </Link>
            </Card>
         </div>
      </div>
    </div>
  );
}
