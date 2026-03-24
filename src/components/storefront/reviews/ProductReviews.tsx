"use client";

import React, { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, User, CheckCircle2, Flag, CornerDownRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { WriteReviewModal } from "./WriteReviewModal";

// Mock Data
const REVIEW_STATS = {
  average: 4.5,
  total: 124,
  breakdown: [
    { stars: 5, count: 75, percent: 60 },
    { stars: 4, count: 31, percent: 25 },
    { stars: 3, count: 12, percent: 10 },
    { stars: 2, count: 4, percent: 3 },
    { stars: 1, count: 2, percent: 2 },
  ]
};

const MOCK_REVIEWS = [
  {
    id: "r1",
    author: "Priya S.",
    avatar: "",
    verified: true,
    rating: 5,
    date: "2 weeks ago",
    title: "Great quality, fits perfectly!",
    content: "Absolutely love the fabric quality. The stitching is impeccable and it looks exactly like it does in the pictures. Highly recommend to anyone looking for premium luxury wear.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150"],
    size: "Size M",
    helpful: 47,
    unhelpful: 2,
    storeResponse: {
      date: "1 week ago",
      content: "Thank you for the wonderful review, Priya! We're thrilled that you loved the fabric and fit. Looking forward to serving you again."
    }
  },
  {
    id: "r2",
    author: "Vikram R.",
    avatar: "",
    verified: true,
    rating: 4,
    date: "1 month ago",
    title: "Good, but slightly tight",
    content: "The design is fantastic and the material feels very premium. However, the fit is slightly tighter across the shoulders than I expected from a size L. Would recommend sizing up if you prefer a relaxed fit.",
    images: [],
    size: "Size L",
    helpful: 12,
    unhelpful: 1,
    storeResponse: null
  },
  {
    id: "r3",
    author: "Ayesha M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    verified: false,
    rating: 5,
    date: "2 months ago",
    title: "Worth every penny!",
    content: "This is my third purchase from Luxury Threads and they never disappoint. The attention to detail is just mind-blowing.",
    images: ["https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=150", "https://images.unsplash.com/photo-1614252339464-47f154be8b2b?auto=format&fit=crop&q=80&w=150"],
    size: "Size S",
    helpful: 89,
    unhelpful: 0,
    storeResponse: null
  }
];

export function ProductReviews() {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("recent");
  
  // Handlers for mocked help logic
  const [votedHelpful, setVotedHelpful] = useState<Record<string, 'up' | 'down'>>({});

  const toggleVote = (id: string, dir: 'up' | 'down') => {
    setVotedHelpful(prev => ({
      ...prev,
      [id]: prev[id] === dir ? null : dir
    }) as Record<string, 'up' | 'down'>);
  };

  const StarDisplay = ({ rating, size = "sm" }: { rating: number, size?: "sm" | "lg" }) => {
     return (
        <div className="flex items-center gap-1">
           {[1, 2, 3, 4, 5].map(star => (
             <Star key={star} className={cn(
               size === "sm" ? "w-3 h-3" : "w-6 h-6",
               star <= rating ? "fill-amber-400 text-amber-400" : (star - 0.5 === rating ? "fill-amber-400 text-amber-400 opacity-50" : "fill-gray-100 text-gray-200 dark:fill-zinc-800 dark:text-zinc-700")
             )} />
           ))}
        </div>
     );
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 mt-20 border-t border-gray-100 dark:border-zinc-900" id="reviews">
       
       <h2 className="text-3xl font-playfair font-bold mb-12">Customer Reviews</h2>
       
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Stats & Breakdown */}
          <div className="lg:col-span-4 space-y-10">
             
             {/* Overall Stats */}
             <div className="flex items-center gap-6">
                <div className="text-6xl font-playfair font-black">{REVIEW_STATS.average.toFixed(1)}</div>
                <div className="space-y-2">
                   <StarDisplay rating={REVIEW_STATS.average} size="lg" />
                   <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Based on {REVIEW_STATS.total} reviews</p>
                </div>
             </div>

             {/* Progress Bars */}
             <div className="space-y-4">
               {REVIEW_STATS.breakdown.map((row) => (
                 <div 
                   key={row.stars} 
                   className={cn(
                     "flex items-center gap-4 cursor-pointer group transition-opacity",
                     filterRating && filterRating !== row.stars ? "opacity-30" : "opacity-100 hover:opacity-80"
                   )}
                   onClick={() => setFilterRating(filterRating === row.stars ? null : row.stars)}
                 >
                    <div className="w-16 flex items-center gap-2 text-xs font-bold text-gray-500">
                       {row.stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </div>
                    <Progress value={row.percent} className="h-2 flex-1 bg-gray-100 dark:bg-zinc-800" />
                    <div className="w-10 text-right text-[10px] font-bold text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                       ({row.count})
                    </div>
                 </div>
               ))}
               {filterRating && (
                 <button 
                   onClick={() => setFilterRating(null)} 
                   className="text-[10px] font-bold uppercase tracking-widest text-amber-500 hover:text-amber-600 mt-2 block"
                 >
                    Clear Filter
                 </button>
               )}
             </div>

             {/* CTA */}
             <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-900 text-center space-y-4">
                <h4 className="font-playfair font-bold text-lg">Share your thoughts</h4>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">If you’ve used this product, share your thoughts with other customers.</p>
                <div className="pt-2">
                   <WriteReviewModal />
                </div>
             </div>
          </div>

          {/* Right Column: Review Feed */}
          <div className="lg:col-span-8">
             
             {/* Toolbar */}
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-zinc-900">
                <div className="flex flex-wrap gap-2">
                   {/* Quick Filters */}
                   {['All Stars', 'With Images', 'Verified Purchase'].map(filter => (
                     <button key={filter} className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-300 hover:border-black dark:hover:border-white transition-colors bg-white dark:bg-zinc-950">
                        {filter}
                     </button>
                   ))}
                </div>
                
                <div className="w-48 shrink-0">
                  <Select value={sortBy} onValueChange={(v) => v && setSortBy(v as string)}>
                    <SelectTrigger className="h-10 rounded-xl bg-gray-50 dark:bg-zinc-900 border-transparent text-xs font-bold">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="helpful">Most Helpful</SelectItem>
                      <SelectItem value="high">Highest Rating</SelectItem>
                      <SelectItem value="low">Lowest Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
             </div>

             {/* Reviews List */}
             <div className="space-y-10">
                {MOCK_REVIEWS.filter(r => filterRating ? r.rating === filterRating : true).map((review) => (
                   <div key={review.id} className="group">
                      
                      {/* Meta Info */}
                      <div className="flex justify-between items-start mb-4">
                         <div className="flex items-center gap-4">
                            {review.avatar ? (
                               <div className="w-12 h-12 rounded-full overflow-hidden relative border border-gray-100 dark:border-zinc-800 shrink-0">
                                  <Image src={review.avatar} alt={review.author} fill className="object-cover" />
                               </div>
                            ) : (
                               <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center font-playfair font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-zinc-700 shrink-0">
                                  {review.author.charAt(0)}
                               </div>
                            )}
                            <div>
                               <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-bold">{review.author}</h4>
                                  {review.verified && (
                                     <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                        <CheckCircle2 className="w-3 h-3" /> Verified
                                     </span>
                                  )}
                               </div>
                               <div className="flex items-center gap-4">
                                  <StarDisplay rating={review.rating} />
                                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</span>
                               </div>
                            </div>
                         </div>
                         <button className="text-gray-300 hover:text-black dark:text-zinc-700 dark:hover:text-white transition-colors opacity-0 group-hover:opacity-100" title="Report Review">
                            <Flag className="w-4 h-4" />
                         </button>
                      </div>

                      {/* Content */}
                      <div className="pl-16 space-y-4">
                         <div className="space-y-2">
                             <h5 className="font-bold text-lg">{review.title}</h5>
                             <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">{review.content}</p>
                         </div>
                         
                         {review.images.length > 0 && (
                            <div className="flex gap-3 pt-2">
                               {review.images.map((img, i) => (
                                  <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                                     <Image src={img} alt="Review attachment" fill className="object-cover" />
                                  </div>
                               ))}
                            </div>
                         )}

                         <div className="flex items-center justify-between pt-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-50 dark:bg-zinc-900 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-zinc-800 text-gray-500">
                               Purchased: {review.size}
                            </span>
                            
                            <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                               <span className="text-[10px] uppercase tracking-widest hidden sm:inline mr-2">Helpful?</span>
                               <button 
                                 onClick={() => toggleVote(review.id, 'up')}
                                 className={cn("flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors", votedHelpful[review.id] === 'up' && "text-black dark:text-white")}
                               >
                                  <ThumbsUp className={cn("w-4 h-4", votedHelpful[review.id] === 'up' && "fill-black dark:fill-white")} /> {review.helpful + (votedHelpful[review.id] === 'up' ? 1 : 0)}
                               </button>
                               <button 
                                 onClick={() => toggleVote(review.id, 'down')}
                                 className={cn("flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors", votedHelpful[review.id] === 'down' && "text-black dark:text-white")}
                               >
                                  <ThumbsDown className={cn("w-4 h-4 mt-1", votedHelpful[review.id] === 'down' && "fill-black dark:fill-white")} /> {review.unhelpful + (votedHelpful[review.id] === 'down' ? 1 : 0)}
                               </button>
                            </div>
                         </div>

                         {/* Store Response */}
                         {review.storeResponse && (
                            <div className="mt-6 ml-4 sm:ml-8 p-6 bg-gray-50/50 dark:bg-zinc-900/30 rounded-3xl border border-gray-100 dark:border-zinc-800/50 relative">
                               <CornerDownRight className="w-5 h-5 text-gray-300 dark:text-zinc-700 absolute -left-8 top-6" />
                               <div className="flex items-center justify-between mb-3">
                                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                     <span className="w-4 h-4 bg-black text-white dark:bg-white dark:text-black flex items-center justify-center rounded-full">L</span> Response from Luxury Threads
                                  </span>
                                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{review.storeResponse.date}</span>
                               </div>
                               <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">{review.storeResponse.content}</p>
                            </div>
                         )}

                      </div>
                   </div>
                ))}
             </div>

             {/* Pagination */}
             <div className="mt-16 flex justify-center">
                <Button variant="outline" className="h-12 px-10 rounded-2xl border-gray-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest">
                   Load More Reviews
                </Button>
             </div>

          </div>
       </div>
    </div>
  );
}
