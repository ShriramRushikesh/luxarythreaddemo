"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Layout, 
  Type, 
  Image as ImageIcon, 
  MousePointer2, 
  Plus, 
  GripVertical, 
  Trash2, 
  Smartphone, 
  Monitor,
  Send,
  Save,
  ChevronLeft,
  Mail,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

type BlockType = "header" | "hero" | "text" | "products" | "button" | "footer";

interface Block {
  id: string;
  type: BlockType;
  content: any;
}

export function EmailBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: "1", type: "header", content: { logo: "LUXURY THREADS" } },
    { id: "2", type: "hero", content: { title: "The Spring Collection", subtitle: "Elegance redefined for the modern connoisseur.", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" } },
    { id: "3", type: "text", content: { body: "Experience the finest craftsmanship and timeless designs. Our new collection features sustainable materials and artisanal details." } },
  ]);

  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: type === "text" ? { body: "New text block content..." } : 
               type === "button" ? { text: "Shop Now", link: "#" } : 
               type === "products" ? { count: 3 } : {},
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const onSendTest = () => {
    toast.success("Test email sent!", {
      description: "A preview has been sent to your administrator email."
    });
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 dark:border-zinc-900 pb-8">
        <div className="flex items-center gap-6">
           <Link href="/admin/marketing/newsletter">
              <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-gray-100 dark:hover:border-zinc-800 transition-all">
                 <ChevronLeft className="w-5 h-5" />
              </Button>
           </Link>
           <div>
              <h2 className="text-3xl font-playfair font-bold text-black dark:text-white">Email Campaign Builder</h2>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Designing: Spring Collection Launch</p>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 p-1.5 bg-gray-50 dark:bg-zinc-900 rounded-2xl mr-4 border border-gray-100 dark:border-zinc-800">
              <button 
                onClick={() => setPreviewMode("desktop")}
                className={cn("p-2 rounded-xl transition-all", previewMode === "desktop" ? "bg-white dark:bg-zinc-800 shadow-sm text-black dark:text-white" : "text-gray-400")}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setPreviewMode("mobile")}
                className={cn("p-2 rounded-xl transition-all", previewMode === "mobile" ? "bg-white dark:bg-zinc-800 shadow-sm text-black dark:text-white" : "text-gray-400")}
              >
                <Smartphone className="w-4 h-4" />
              </button>
           </div>
           <Button variant="outline" onClick={onSendTest} className="h-12 px-6 rounded-2xl border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-zinc-900">
              Send Test
           </Button>
           <Button className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Campaign
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12 items-start">
         {/* Sidebar: Blocks */}
         <div className="space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 pl-2">Content Blocks</h3>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { type: "header", icon: Layout, label: "Header" },
                 { type: "hero", icon: ImageIcon, label: "Hero Info" },
                 { type: "text", icon: Type, label: "Text Block" },
                 { type: "products", icon: ShoppingBag, label: "Product Grid" },
                 { type: "button", icon: MousePointer2, label: "Button / CTA" },
                 { type: "footer", icon: Settings, label: "Footer" },
               ].map((item) => (
                 <button 
                   key={item.type}
                   onClick={() => addBlock(item.type as BlockType)}
                   className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-all gap-3 group shadow-sm"
                 >
                    <div className="p-3 rounded-2xl bg-gray-50 dark:bg-zinc-900 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                       <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-black dark:group-hover:text-white">{item.label}</span>
                 </button>
               ))}
            </div>

            <Card className="p-6 bg-emerald-50 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-500 border-none rounded-3xl space-y-4">
               <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="text-[10px] font-bold uppercase tracking-widest">AI Content Assistant</h4>
               </div>
               <p className="text-[11px] leading-relaxed">
                  Need help with copy? Let AI generate professional subject lines and body text optimized for conversions.
               </p>
               <Button className="w-full h-10 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white border-none text-[9px] font-bold uppercase tracking-widest shadow-lg">
                  Generate Copy
               </Button>
            </Card>
         </div>

         {/* Canvas: Preview */}
         <div className="xl:col-span-3">
            <div className={cn(
              "mx-auto transition-all duration-500 ease-in-out bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden rounded-[3rem] border-8 border-gray-100 dark:border-zinc-900 relative",
              previewMode === "mobile" ? "max-w-[375px] min-h-[667px]" : "max-w-full min-h-[800px]"
            )}>
               <div className="p-4 bg-gray-50 dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                     </div>
                     <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Campaign Preview</span>
                  </div>
                  <Mail className="w-3 h-3 text-gray-400" />
               </div>

               {/* Email Content */}
               <div className="bg-white dark:bg-zinc-950 min-h-[600px]">
                  {blocks.map((block, index) => (
                    <div 
                      key={block.id} 
                      className="group relative hover:ring-2 hover:ring-blue-500 transition-all cursor-move"
                    >
                       <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                          <button className="p-2 rounded-lg bg-white dark:bg-zinc-800 shadow-xl border border-gray-100 dark:border-zinc-800">
                             <GripVertical className="w-3.5 h-3.5 text-gray-400" />
                          </button>
                          <button 
                            onClick={() => removeBlock(block.id)}
                            className="p-2 rounded-lg bg-rose-50 dark:bg-rose-500/10 shadow-xl border border-rose-100 dark:border-rose-900 text-rose-500"
                          >
                             <Trash2 className="w-3.5 h-3.5" />
                          </button>
                       </div>

                       {block.type === "header" && (
                         <div className="py-8 px-8 text-center border-b border-gray-50 dark:border-zinc-900">
                            <h1 className="text-xl font-playfair font-black tracking-[0.3em]">{block.content.logo}</h1>
                         </div>
                       )}

                       {block.type === "hero" && (
                         <div className="space-y-8 bg-gray-50 dark:bg-zinc-900">
                            <img src={block.content.image} alt="Hero" className="w-full h-[300px] object-cover" />
                            <div className="px-10 pb-12 py-4 text-center space-y-4">
                               <h2 className={cn(
                                 "font-playfair font-bold text-black dark:text-white leading-tight",
                                 previewMode === "mobile" ? "text-2xl" : "text-4xl"
                               )}>{block.content.title}</h2>
                               <p className="text-sm text-gray-500 dark:text-zinc-500 max-w-lg mx-auto leading-relaxed">{block.content.subtitle}</p>
                            </div>
                         </div>
                       )}

                       {block.type === "text" && (
                         <div className="px-12 py-10">
                            <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed text-center">
                               {block.content.body}
                            </p>
                         </div>
                       )}

                       {block.type === "button" && (
                         <div className="py-8 flex justify-center px-12">
                            <button className="h-14 px-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-transform">
                               {block.content.text}
                            </button>
                         </div>
                       )}

                       {block.type === "products" && (
                         <div className="px-8 py-10 bg-gray-50/50 dark:bg-zinc-900/50">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-center mb-8">Selected for you</h4>
                            <div className={cn(
                              "grid gap-6",
                              previewMode === "mobile" ? "grid-cols-1" : "grid-cols-3"
                            )}>
                               {[1, 2, 3].map((i) => (
                                 <div key={i} className="space-y-3">
                                    <div className="aspect-[4/5] bg-gray-200 dark:bg-zinc-800 rounded-2xl" />
                                    <div className="space-y-1 text-center">
                                       <div className="h-3 w-2/3 bg-gray-100 dark:bg-zinc-800 rounded mx-auto" />
                                       <div className="h-3 w-1/3 bg-gray-100 dark:bg-zinc-800 rounded mx-auto" />
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                       )}

                       {block.type === "footer" && (
                         <div className="py-12 px-12 bg-gray-100 dark:bg-zinc-900 text-center space-y-6">
                            <div className="flex justify-center gap-6">
                               {[1, 2, 3].map(i => (
                                 <div key={i} className="w-8 h-8 rounded-full bg-white/50 dark:bg-black/50" />
                               ))}
                            </div>
                            <div className="space-y-2">
                               <p className="text-[8px] uppercase tracking-widest text-gray-400 font-bold">123 Luxury Lane, London, UK</p>
                               <p className="text-[8px] uppercase tracking-widest text-gray-400 font-bold">Manage Preferences | Unsubscribe</p>
                            </div>
                         </div>
                       )}
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
