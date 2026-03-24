"use client";

import React from "react";
import { Star, ThumbsUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const reviews = [
  { id: 1, user: "Karan S.", rating: 5, date: "Mar 12, 2026", text: "The fit is absolutely perfect. The quality of the fabric is top tier, exactly as described. One of my favorite purchases!", verified: true, helpful: 12 },
  { id: 2, user: "Ananya M.", rating: 4, date: "Feb 28, 2026", text: "Lovely fabric and fast delivery. Slightly loosely fit for a medium size, but still looks great.", verified: true, helpful: 5 },
  { id: 3, user: "Rahul J.", rating: 5, date: "Feb 15, 2026", text: "Authentic surplus item. Can't believe the price for this quality. Highly recommended!", verified: true, helpful: 18 },
];

const ProductReviews = () => {
  const ratings = [
    { star: 5, count: 60 },
    { star: 4, count: 25 },
    { star: 3, count: 10 },
    { star: 2, count: 3 },
    { star: 1, count: 2 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      {/* Sidebar: Overall Rating */}
      <div className="lg:col-span-4 space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-6xl font-mono font-bold tracking-tighter">4.5</h2>
            <div className="space-y-1">
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Based on 124 reviews</p>
            </div>
          </div>
          
          <div className="space-y-4 pt-6">
            {ratings.map((r) => (
              <div key={r.star} className="flex items-center gap-4 group cursor-pointer">
                <span className="text-[10px] font-bold w-4">{r.star}★</span>
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-black transition-all group-hover:opacity-60" style={{ width: `${r.count}%` }} />
                </div>
                <span className="text-[10px] font-bold text-gray-400 w-8">{r.count}%</span>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full rounded-none py-8 uppercase tracking-[0.2em] font-bold text-xs border-black bg-white text-black border hover:bg-black hover:text-white transition-all">
          Write a Review
        </Button>
      </div>

      {/* Review List */}
      <div className="lg:col-span-8 space-y-12 divide-y divide-gray-100">
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-xs uppercase tracking-[0.3em] font-bold">124 Reviews</h3>
          <select className="text-[10px] uppercase font-bold tracking-widest border-none bg-transparent focus:ring-0 cursor-pointer">
            <option>Most Recent</option>
            <option>Most Helpful</option>
            <option>Highest Rated</option>
          </select>
        </div>

        {reviews.map((review) => (
          <div key={review.id} className="pt-10 space-y-4 group">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex gap-1 text-black">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("w-3 h-3", i < review.rating ? "fill-current" : "fill-none")} />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest">{review.user}</span>
                  {review.verified && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-100">
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Verified Buyer</span>
                    </div>
                  )}
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed italic pr-12">"{review.text}"</p>
            <div className="flex items-center gap-6 pt-2">
              <button className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest">
                <ThumbsUp className="w-3 h-3" />
                Helpful ({review.helpful})
              </button>
              <button className="text-[10px] font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest">Report</button>
            </div>
          </div>
        ))}

        <div className="pt-10 flex justify-center">
          <Button variant="link" className="text-black uppercase tracking-widest font-bold border-b border-black rounded-none hover:no-underline">
            Load More Reviews
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
