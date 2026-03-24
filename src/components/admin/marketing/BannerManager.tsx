"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Image as ImageIcon, 
  Plus, 
  Calendar, 
  Target, 
  Layout,
  ExternalLink,
  MoreVertical,
  Trash2,
  Edit,
  Eye
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const banners = [
  {
    id: "1",
    title: "Summer Collection 2024",
    type: "Homepage Hero",
    status: "Active",
    schedule: "Mar 15 - Aug 31",
    priority: "High",
    image: "https://images.unsplash.com/photo-1523381235312-3a1647fa9917?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Diwali Special Offer",
    type: "Category Page",
    status: "Scheduled",
    schedule: "Oct 20 - Nov 15",
    priority: "Medium",
    image: "https://images.unsplash.com/photo-1511551203524-9a24350a5771?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Free Shipping Promo",
    type: "Top Bar",
    status: "Active",
    schedule: "Ongoing",
    priority: "Low",
    image: null
  }
];

export function BannerManager() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
         <div>
            <h3 className="text-xl font-playfair font-bold text-black dark:text-white">Promotional Banners</h3>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Visual assets and store-front promotions</p>
         </div>
         <Button className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-lg flex items-center gap-3">
            <Plus className="w-4 h-4" /> Create Banner
         </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {banners.map((banner) => (
            <Card key={banner.id} className="group overflow-hidden bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all h-[400px] flex flex-col relative">
               {/* Banner Preview Area */}
               <div className="h-48 bg-gray-50 dark:bg-zinc-900 relative">
                  {banner.image ? (
                     <img src={banner.image} alt={banner.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-200" />
                     </div>
                  )}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                     <Badge className={cn(
                        "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border-none shadow-sm",
                        banner.status === "Active" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"
                     )}>
                        {banner.status}
                     </Badge>
                     <DropdownMenu>
                        <DropdownMenuTrigger>
                           <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 hover:bg-white/40">
                              <MoreVertical className="w-4 h-4" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2">
                           <DropdownMenuItem className="rounded-xl gap-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                              <Edit className="w-4 h-4" /> Edit
                           </DropdownMenuItem>
                           <DropdownMenuItem className="rounded-xl gap-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                              <Eye className="w-4 h-4" /> Preview
                           </DropdownMenuItem>
                           <DropdownMenuItem className="rounded-xl gap-3 text-xs font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-50">
                              <Trash2 className="w-4 h-4" /> Delete
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
               </div>

               {/* Content */}
               <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{banner.type}</span>
                     <h4 className="text-xl font-playfair font-bold text-black dark:text-white mt-2 line-clamp-1">{banner.title}</h4>
                     
                     <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3">
                           <Calendar className="w-3.5 h-3.5 text-gray-400" />
                           <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{banner.schedule}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <Layout className="w-3.5 h-3.5 text-gray-400" />
                           <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Priority: {banner.priority}</span>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between border-t border-gray-50 dark:border-zinc-900 mt-auto">
                     <button className="text-[9px] font-black uppercase tracking-widest text-black dark:text-white hover:underline flex items-center gap-2">
                        View Analytics <ExternalLink className="w-3 h-3" />
                     </button>
                     <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                           <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-950 bg-gray-100 dark:bg-zinc-800" />
                        ))}
                        <div className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-950 bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-[8px] font-bold">+2</div>
                     </div>
                  </div>
               </div>
            </Card>
         ))}

         {/* Add Banner Placeholder */}
         <button className="h-[400px] rounded-[2.5rem] border-2 border-dashed border-gray-100 dark:border-zinc-800 flex flex-col items-center justify-center gap-4 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all group">
            <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
               <Plus className="w-8 h-8 text-gray-300" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Add Promotional Asset</span>
         </button>
      </div>
    </div>
  );
}
