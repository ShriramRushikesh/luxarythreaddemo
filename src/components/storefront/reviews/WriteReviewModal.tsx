"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Upload, X, Check, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

interface WriteReviewModalProps {
  trigger?: React.ReactNode;
}

export function WriteReviewModal({ trigger }: WriteReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [fit, setFit] = useState("perfect");
  const [recommend, setRecommend] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Mock image upload
  const [images, setImages] = useState<string[]>([]);

  const RATING_DESC = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simulate realistic upload
    if (images.length >= 5) return;
    if (e.target.files && e.target.files[0]) {
       const url = URL.createObjectURL(e.target.files[0]);
       setImages(prev => [...prev, url]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const submitReview = async () => {
    if (!rating || text.length < 50 || !accepted) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setOpen(false);
      // Reset State
      setTimeout(() => setIsSuccess(false), 500);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          trigger ? (
            <div className="inline-block cursor-pointer">{trigger}</div>
          ) : (
            <Button className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-widest shadow-xl">
               Write a Review
            </Button>
          )
        }
      />
      
      <DialogContent className="sm:max-w-[700px] p-0 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden gap-0">
         {/* Success State */}
         {isSuccess ? (
            <div className="p-20 flex flex-col items-center justify-center text-center space-y-6">
               <div className="w-24 h-24 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center animate-in zoom-in duration-500">
                  <Check className="w-10 h-10 text-emerald-500" />
               </div>
               <div>
                  <h3 className="text-3xl font-playfair font-bold">Thank You!</h3>
                  <p className="text-sm font-medium text-gray-500 mt-2 max-w-sm">Your review has been submitted and is currently pending approval. It will be visible shortly.</p>
               </div>
            </div>
         ) : (
            <>
               <div className="p-8 border-b border-gray-50 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/50">
                  <DialogTitle className="text-2xl font-playfair font-bold">Share Your Thoughts</DialogTitle>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-2">Your feedback helps other shoppers make better decisions</p>
               </div>

               <div className="p-8 space-y-10 max-h-[70vh] overflow-y-auto align-top">
                  
                  {/* Rating */}
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Overall Rating <span className="text-rose-500">*</span></Label>
                        <span className="text-sm font-bold w-24 text-right transition-colors">{RATING_DESC[hoverRating || rating]}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                           <button
                             key={star}
                             type="button"
                             onClick={() => setRating(star)}
                             onMouseEnter={() => setHoverRating(star)}
                             onMouseLeave={() => setHoverRating(0)}
                             className="text-gray-200 dark:text-zinc-800 hover:scale-110 transition-transform focus:outline-none"
                           >
                              <Star className={cn("w-10 h-10 transition-colors", (hoverRating || rating) >= star ? "fill-amber-400 text-amber-400 dark:text-amber-500 dark:fill-amber-500" : "")} />
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Title & Text */}
                  <div className="space-y-6">
                     <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Review Title (Optional)</Label>
                        <Input 
                          placeholder="Summarize your experience" 
                          maxLength={100}
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          className="h-14 rounded-2xl bg-gray-50 dark:bg-zinc-900 border-transparent font-medium px-4"
                        />
                     </div>
                     
                     <div className="space-y-3">
                        <div className="flex justify-between">
                           <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Review Detail <span className="text-rose-500">*</span></Label>
                           <span className={cn("text-[10px] font-bold tracking-widest", text.length < 50 ? "text-rose-500" : "text-gray-400")}>{text.length}/1000 characters</span>
                        </div>
                        <Textarea 
                          placeholder="Share your thoughts with other customers. What did you like or dislike?" 
                          maxLength={1000}
                          value={text}
                          onChange={e => setText(e.target.value)}
                          className="min-h-[150px] rounded-2xl bg-gray-50 dark:bg-zinc-900 border-transparent font-medium p-4 resize-none leading-relaxed"
                        />
                        {text.length > 0 && text.length < 50 && (
                           <p className="text-[10px] font-bold text-rose-500">Minimum 50 characters required.</p>
                        )}
                     </div>
                  </div>

                  {/* Media Upload */}
                  <div className="space-y-4">
                     <div className="flex justify-between">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Upload Photos (Optional)</Label>
                        <span className="text-[10px] font-bold tracking-widest text-gray-400">{images.length}/5 photos</span>
                     </div>
                     <div className="flex flex-wrap gap-4">
                        {images.map((img, i) => (
                           <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden group bg-gray-100">
                              <Image src={img} alt="Upload preview" fill className="object-cover" />
                              <button 
                                onClick={() => removeImage(i)}
                                className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                 <X className="w-3 h-3" />
                              </button>
                           </div>
                        ))}
                        
                        {images.length < 5 && (
                           <Label className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 dark:border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-900 text-gray-400 transition-colors">
                              <Upload className="w-5 h-5 mb-2" />
                              <span className="text-[9px] font-bold uppercase tracking-widest">Upload</span>
                              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                           </Label>
                        )}
                     </div>
                  </div>

                  {/* Additional Attributes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100 dark:border-zinc-900">
                     <div className="space-y-4">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">How does it fit?</Label>
                        <div className="flex p-1 rounded-xl bg-gray-50 dark:bg-zinc-900">
                           {["Too Small", "Perfect", "Too Large"].map(option => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setFit(option.toLowerCase())}
                                className={cn(
                                  "flex-1 py-3 rounded-lg text-[10px] uppercase font-bold tracking-widest transition-all",
                                  fit === option.toLowerCase() ? "bg-white dark:bg-black shadow-sm text-black dark:text-white" : "text-gray-400 hover:text-black dark:hover:text-white"
                                )}
                              >
                                 {option}
                              </button>
                           ))}
                        </div>
                     </div>
                     
                     <div className="space-y-4">
                        <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Recommend Product?</Label>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-zinc-800">
                           <span className="text-sm font-bold text-gray-600 dark:text-gray-300">I would recommend this</span>
                           <Switch checked={recommend} onCheckedChange={setRecommend} />
                        </div>
                     </div>
                  </div>

               </div>

               {/* Footer Action */}
               <div className="p-6 border-t border-gray-100 dark:border-zinc-900 bg-gray-50 dark:bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4 flex-1">
                     <input 
                       type="checkbox" 
                       id="guidelines" 
                       checked={accepted}
                       onChange={e => setAccepted(e.target.checked)}
                       className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:checked:bg-white dark:checked:text-black shrink-0"
                     />
                     <Label htmlFor="guidelines" className="text-xs font-medium text-gray-500 leading-relaxed cursor-pointer">
                        I accept the <a href="/review-guidelines" className="text-black dark:text-white underline font-bold" target="_blank" rel="noreferrer">review guidelines</a>. Your review will be visible publicly under your associated profile name.
                     </Label>
                  </div>
                  
                  <Button 
                    onClick={submitReview}
                    disabled={!rating || text.length < 50 || !accepted || isSubmitting}
                    className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                     {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                     ) : (
                        "Submit Review"
                     )}
                  </Button>
               </div>
            </>
         )}
      </DialogContent>
    </Dialog>
  );
}
