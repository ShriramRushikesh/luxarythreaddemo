"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, XCircle, Trash2, Eye, Reply, StarIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ADMIN_REVIEWS = [
  {
    id: "REV-8921",
    customer: "John Doe",
    email: "john@example.com",
    product: "Silk Evening Dress",
    productImage: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=100",
    rating: 5,
    text: "Outstanding quality. Shipped very fast. Highly recommend to everyone looking for a fine dress.",
    date: "2 hours ago",
    status: "pending",
    images: []
  },
  {
    id: "REV-8920",
    customer: "Alice Smith",
    email: "alice@example.com",
    product: "Air Max 270",
    productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=100",
    rating: 2,
    text: "The shoes look great but they arrived with a massive scuff mark on the side. I want a refund.",
    date: "5 hours ago",
    status: "pending",
    images: ["https://images.unsplash.com/photo-1608667508764-33cf0726b13a?auto=format&fit=crop&q=80&w=150"]
  },
  {
    id: "REV-8915",
    customer: "Mike T.",
    email: "mike@example.com",
    product: "Oxford Brogues",
    productImage: "https://images.unsplash.com/photo-1614252339464-47f154be8b2b?auto=format&fit=crop&q=80&w=100",
    rating: 5,
    text: "This is a spam message from a competitor trying to steal SEO ranking www.cheapshoes.com",
    date: "1 day ago",
    status: "rejected",
    images: []
  },
  {
    id: "REV-8910",
    customer: "Sarah J.",
    email: "sarah@example.com",
    product: "Leather Tote",
    productImage: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=100",
    rating: 4,
    text: "Very spacious and durable. Smells incredibly good out of the box.",
    date: "2 days ago",
    status: "approved",
    images: []
  }
];

export default function AdminReviewManagement() {
  const [activeTab, setActiveTab] = useState("pending");
  const filtered = ADMIN_REVIEWS.filter(r => activeTab === 'all' || r.status === activeTab);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-3xl font-playfair font-bold text-black dark:text-white">Review Moderation</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">Approve, Reject, or Respond to Customer Feedback</p>
         </div>
      </div>

      <Tabs defaultValue="pending" onValueChange={setActiveTab} className="space-y-6">
         <TabsList className="bg-transparent border-b border-gray-100 dark:border-zinc-800 w-full justify-start rounded-none h-auto p-0 gap-8">
            {[
               { id: "pending", label: "Pending Approval", count: 2 },
               { id: "approved", label: "Live Reviews", count: 1245 },
               { id: "rejected", label: "Rejected", count: 45 },
               { id: "all", label: "All Reviews" }
            ].map(tab => (
               <TabsTrigger 
                 key={tab.id}
                 value={tab.id} 
                 className="data-[state=active]:border-black dark:data-[state=active]:border-white border-b-2 border-transparent rounded-none px-0 pb-3 pt-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 data-[state=active]:text-black dark:data-[state=active]:text-white transition-all bg-transparent shadow-none"
               >
                 {tab.label} {tab.count !== undefined && <span className="ml-2 bg-gray-100 dark:bg-zinc-800 text-gray-500 px-2 py-0.5 rounded-full">{tab.count}</span>}
               </TabsTrigger>
            ))}
         </TabsList>

         <TabsContent value={activeTab}>
            <div className="space-y-4">
               {filtered.map(review => (
                 <Card key={review.id} className="p-0 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-gray-200 dark:hover:border-zinc-700 transition-colors">
                    <div className="flex flex-col lg:flex-row">
                       
                       {/* Left Side: Detail */}
                       <div className="flex-1 p-6 flex flex-col md:flex-row gap-6 border-b lg:border-b-0 lg:border-r border-gray-50 dark:border-zinc-900/50">
                          
                          {/* Product Context */}
                          <div className="w-full md:w-48 shrink-0 flex items-center justify-between md:flex-col md:items-start gap-4">
                             <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0">
                                   <Image src={review.productImage} alt={review.product} fill className="object-cover" />
                                </div>
                                <div>
                                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Target Product</p>
                                   <p className="text-sm font-bold truncate max-w-[150px]">{review.product}</p>
                                </div>
                             </div>
                             
                             <div className="hidden md:block w-full border-t border-gray-100 dark:border-zinc-800 my-2"></div>
                             
                             <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer</p>
                                <p className="text-sm font-bold">{review.customer}</p>
                                <p className="text-[10px] text-gray-400 truncate max-w-[150px]">{review.email}</p>
                             </div>
                          </div>

                          {/* Review Content */}
                          <div className="flex-1 space-y-4">
                             <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                   <div className="flex items-center">
                                      {[1,2,3,4,5].map(s => (
                                         <Star key={s} className={cn("w-4 h-4", s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-200 dark:fill-zinc-800 dark:text-zinc-700")} />
                                      ))}
                                   </div>
                                   <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">{review.date}</span>
                                </div>
                                <Badge variant="outline" className="text-[9px] uppercase tracking-widest border-gray-200 dark:border-zinc-800">
                                   ID: {review.id}
                                </Badge>
                             </div>
                             
                             <p className="text-sm font-medium leading-relaxed max-w-2xl">{review.text}</p>
                             
                             {review.images.length > 0 && (
                                <div className="flex gap-2">
                                   {review.images.map((img, i) => (
                                      <div key={i} className="relative w-16 h-16 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden cursor-pointer">
                                         <Image src={img} alt="Attachment" fill className="object-cover hover:scale-110 transition-transform" />
                                      </div>
                                   ))}
                                </div>
                             )}
                          </div>
                       </div>

                       {/* Right Side: Actions */}
                       <div className="w-full lg:w-64 p-6 bg-gray-50 dark:bg-zinc-900/30 flex flex-col justify-center gap-3">
                          {review.status === 'pending' && (
                             <>
                                <Button className="w-full justify-start h-12 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20 dark:border-emerald-800/50 shadow-none font-bold text-xs uppercase tracking-widest">
                                   <CheckCircle className="w-4 h-4 mr-2" /> Approve
                                </Button>
                                <Button variant="outline" className="w-full justify-start h-12 rounded-xl text-rose-500 border-rose-200 hover:bg-rose-50 dark:border-rose-900/50 dark:hover:bg-rose-900/20 font-bold text-xs uppercase tracking-widest">
                                   <XCircle className="w-4 h-4 mr-2" /> Reject
                                </Button>
                             </>
                          )}
                          
                          {review.status === 'approved' && (
                             <>
                                <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-gray-200 dark:border-zinc-800 font-bold text-xs uppercase tracking-widest bg-white dark:bg-zinc-950">
                                   <Reply className="w-4 h-4 mr-2" /> Respond
                                </Button>
                                <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-gray-200 dark:border-zinc-800 font-bold text-xs uppercase tracking-widest bg-white dark:bg-zinc-950">
                                   <StarIcon className="w-4 h-4 mr-2" /> Feature Top
                                </Button>
                             </>
                          )}

                          <Button variant="ghost" className="w-full justify-start h-12 rounded-xl text-gray-400 hover:text-black dark:hover:text-white font-bold text-xs uppercase tracking-widest">
                             <Eye className="w-4 h-4 mr-2" /> View Details
                          </Button>

                          {review.status === 'rejected' && (
                             <Button variant="ghost" className="w-full justify-start h-12 rounded-xl text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 font-bold text-xs uppercase tracking-widest mt-auto">
                                <Trash2 className="w-4 h-4 mr-2" /> Delete Perm
                             </Button>
                          )}
                       </div>
                    </div>
                 </Card>
               ))}

               {filtered.length === 0 && (
                 <div className="p-20 text-center text-gray-400 border border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl">
                   <p className="font-bold text-sm">No reviews found in this tab.</p>
                 </div>
               )}
            </div>
         </TabsContent>
      </Tabs>
    </div>
  );
}
