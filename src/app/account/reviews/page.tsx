"use client";

import React from "react";
import { Star, Clock, AlertCircle, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WriteReviewModal } from "@/components/storefront/reviews/WriteReviewModal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const PENDING_REVIEWS = [
  { id: "1", name: "Silk Evening Dress", orderId: "ORD-9824", deliveredOn: "Yesterday", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=150" },
  { id: "2", name: "Oxford Brogues - Brown", orderId: "ORD-9750", deliveredOn: "3 days ago", image: "https://images.unsplash.com/photo-1614252339464-47f154be8b2b?auto=format&fit=crop&q=80&w=150" }
];

const PUBLISHED_REVIEWS = [
  {
    id: "r1",
    productName: "Air Max 270",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    date: "Oct 12, 2026",
    status: "live",
    title: "The best running shoes ever!",
    content: "Absolutely phenomenal cushioning. I've been running in these for weeks and they feel incredible."
  },
  {
    id: "r2",
    productName: "Leather Weekend Duffle",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=150",
    rating: 4,
    date: "Sep 28, 2026",
    status: "pending_approval",
    title: "Great quality, slightly heavy",
    content: "The leather is pristine and the hardware feels virtually indestructible. It is a bit heavy even when empty, but that's expected."
  }
];

export default function MyReviewsPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 min-h-screen">
       <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-playfair font-bold">My Reviews</h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-2">Manage your feedback and pending requests</p>
          </div>
       </div>

       {/* Pending Reviews Section */}
       {PENDING_REVIEWS.length > 0 && (
         <div className="mb-12">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
               <Clock className="w-3 h-3 text-amber-500" /> Pending Action Required
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {PENDING_REVIEWS.map(item => (
                 <div key={item.id} className="flex gap-4 p-4 rounded-3xl border border-amber-100 dark:border-amber-900/30 bg-amber-50/30 dark:bg-amber-500/5 items-center justify-between group">
                    <div className="flex gap-4 items-center">
                       <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                       </div>
                       <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Delivered {item.deliveredOn}</p>
                          <h4 className="font-bold">{item.name}</h4>
                       </div>
                    </div>
                    <WriteReviewModal trigger={
                      <Button className="h-10 px-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-zinc-950 text-amber-700 dark:text-amber-300 text-[10px] font-bold uppercase tracking-widest shadow-sm hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors">
                        Review
                      </Button>
                    } />
                 </div>
               ))}
            </div>
         </div>
       )}

       {/* Submitted Reviews */}
       <div>
         <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Past Reviews</h3>
         <div className="space-y-6">
            {PUBLISHED_REVIEWS.map(review => (
               <div key={review.id} className="p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col md:flex-row gap-6">
                  
                  {/* Left Column: Product Info */}
                  <div className="w-full md:w-64 shrink-0 flex gap-4 md:flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-gray-100 dark:border-zinc-900 pb-4 md:pb-0 md:pr-6">
                     <div className="w-20 h-20 md:w-full md:h-48 rounded-2xl overflow-hidden relative bg-gray-50 dark:bg-zinc-900">
                        <Image src={review.image} alt={review.productName} fill className="object-cover" />
                     </div>
                     <div className="flex-1">
                        <h4 className="font-bold text-sm md:mt-4">{review.productName}</h4>
                        <Link href={`/products/${review.id}`} className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black dark:hover:text-white underline mt-1 block">
                           View Product
                        </Link>
                     </div>
                  </div>

                  {/* Right Column: Review Details */}
                  <div className="flex-1 space-y-4">
                     <div className="flex justify-between items-start">
                        <div>
                           <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center">
                                 {[1, 2, 3, 4, 5].map(star => (
                                   <Star key={star} className={cn("w-4 h-4", star <= review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-200 dark:fill-zinc-800 dark:text-zinc-700")} />
                                 ))}
                              </div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-l border-gray-200 dark:border-zinc-800 pl-2">{review.date}</span>
                           </div>
                           <h5 className="font-bold text-lg">{review.title}</h5>
                        </div>

                        {review.status === 'live' ? (
                           <Badge className="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 text-[9px] uppercase tracking-widest">
                              Live
                           </Badge>
                        ) : (
                           <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 text-[9px] uppercase tracking-widest flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> Moderation Pending
                           </Badge>
                        )}
                     </div>

                     <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed">{review.content}</p>

                     <div className="pt-4 border-t border-gray-50 dark:border-zinc-900/50 flex gap-4">
                        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                           <Edit className="w-3 h-3" /> Edit
                        </button>
                        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-rose-500 transition-colors">
                           <Trash2 className="w-3 h-3" /> Delete
                        </button>
                     </div>
                  </div>

               </div>
            ))}
         </div>
       </div>

    </div>
  );
}
