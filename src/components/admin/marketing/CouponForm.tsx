"use client";

import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Zap, 
  Info, 
  Settings, 
  Target, 
  Calendar as CalendarIcon, 
  Tag, 
  Sparkles,
  ArrowLeft,
  Wand2,
  CheckCircle2,
  AlertCircle,
  Ticket
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const couponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").max(20),
  description: z.string().min(5, "Description is required"),
  status: z.boolean().default(true),
  type: z.enum(["percentage", "fixed", "free_shipping"]),
  value: z.number().min(0).default(0),
  maxDiscount: z.number().optional(),
  minOrderValue: z.number().optional(),
  applicableTo: z.enum(["all", "categories", "products", "brands"]).default("all"),
  usageLimitTotal: z.number().optional(),
  usageLimitPerCustomer: z.number().default(1),
  firstOrderOnly: z.boolean().default(false),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
  noExpiry: z.boolean().default(false),
  stackable: z.boolean().default(false),
  userEligibility: z.enum(["all", "new", "segment"]).default("all"),
  visibleOnStore: z.boolean().default(true),
});

type CouponFormValues = z.infer<typeof couponSchema>;

export function CouponForm() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<any>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
      description: "",
      status: true,
      type: "percentage",
      value: 0,
      maxDiscount: undefined,
      minOrderValue: undefined,
      applicableTo: "all",
      usageLimitTotal: undefined,
      usageLimitPerCustomer: 1,
      firstOrderOnly: false,
      startDate: "",
      endDate: "",
      noExpiry: false,
      stackable: false,
      userEligibility: "all",
      visibleOnStore: true,
    }
  });

  const formValues = useWatch({ control });

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success("Coupon created successfully!", {
      description: `Coupon code ${data.code} is now active.`
    });
    router.push("/admin/marketing/coupons");
  };

  const generateCode = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const code = "SALE" + Math.floor(1000 + Math.random() * 9000);
      setValue("code", code);
      setIsGenerating(false);
      toast.info("Auto-generated code: " + code);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-900 pb-8">
        <div className="flex items-center gap-6">
           <Link href="/admin/marketing/coupons">
              <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-gray-100 dark:hover:border-zinc-800 transition-all">
                 <ArrowLeft className="w-5 h-5" />
              </Button>
           </Link>
           <div>
              <h2 className="text-3xl font-playfair font-bold text-black dark:text-white">Create Coupon</h2>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">New Promotional Offer</p>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
           <Button type="button" variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-zinc-900">
              Save as Draft
           </Button>
           <Button type="submit" className="h-12 px-8 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-black/20 dark:shadow-white/10 hover:scale-105 transition-transform">
              Publish Coupon
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">
         <div className="xl:col-span-2 space-y-12">
            {/* Section 1: Basic Info */}
            <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-8">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-gray-50 dark:bg-zinc-900">
                     <Tag className="w-4 h-4 text-black dark:text-white" />
                  </div>
                  <h3 className="text-lg font-playfair font-bold">Basic Information</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <div className="flex items-center justify-between">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Coupon Code</Label>
                        <button 
                           type="button"
                           onClick={generateCode}
                           disabled={isGenerating}
                           className="text-[9px] font-bold uppercase tracking-widest text-black dark:text-white flex items-center gap-1.5 hover:underline disabled:opacity-50"
                        >
                           <Wand2 className="w-3 h-3" /> Auto-generate
                        </button>
                     </div>
                     <Input 
                        {...register("code")}
                        placeholder="e.g. SAVE20"
                        className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-white transition-all uppercase placeholder:normal-case font-bold tracking-widest"
                     />
                     {errors.code && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest italic">{(errors.code.message as string)}</p>}
                  </div>

                  <div className="space-y-3">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Internal Description</Label>
                     <Input 
                        {...register("description")}
                        placeholder="Description for internal reference"
                        className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-white transition-all"
                     />
                     {errors.description && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest italic">{(errors.description.message as string)}</p>}
                  </div>
               </div>

               <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800">
                  <div className="space-y-1">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">Active Status</p>
                     <p className="text-[9px] text-gray-400 uppercase tracking-widest">Enable or disable this coupon instantly</p>
                  </div>
                  <Switch 
                     checked={formValues.status}
                     onCheckedChange={(val) => setValue("status", val)}
                     className="data-[state=checked]:bg-emerald-500"
                  />
               </div>
            </Card>

            {/* Section 2: Discount & Type */}
            <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-8">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-gray-50 dark:bg-zinc-900">
                     <Sparkles className="w-4 h-4 text-black dark:text-white" />
                  </div>
                  <h3 className="text-lg font-playfair font-bold">Discount Configuration</h3>
               </div>

               <div className="space-y-6">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Discount Type</Label>
                  <RadioGroup 
                     defaultValue="percentage" 
                     className="grid grid-cols-1 md:grid-cols-3 gap-4"
                     value={formValues.type}
                     onValueChange={(val: any) => setValue("type", val)}
                  >
                     {[
                        { id: "percentage", label: "Percentage %", desc: "Percentage off total value" },
                        { id: "fixed", label: "Fixed Amount ₹", desc: "Flat amount off total" },
                        { id: "free_shipping", label: "Free Shipping", desc: "Remove shipping cost" }
                     ].map((item) => (
                        <div key={item.id}>
                           <RadioGroupItem value={item.id} id={item.id} className="peer sr-only" />
                           <Label
                              htmlFor={item.id}
                              className="flex flex-col items-center justify-between rounded-2xl border-2 border-gray-50 bg-white p-6 hover:bg-gray-50 peer-data-[state=checked]:border-black dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:peer-data-[state=checked]:border-white cursor-pointer transition-all"
                           >
                              <span className="text-[10px] font-bold uppercase tracking-widest mb-1">{item.label}</span>
                              <span className="text-[9px] text-gray-400 text-center leading-relaxed h-8 flex items-center">{item.desc}</span>
                           </Label>
                        </div>
                     ))}
                  </RadioGroup>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-3">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {formValues.type === "percentage" ? "Discount Percentage" : formValues.type === "fixed" ? "Discount Amount (₹)" : "Shipping Discount (%)"}
                     </Label>
                     <div className="relative">
                        <Input 
                           type="number"
                           {...register("value", { valueAsNumber: true })}
                           className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-white transition-all pl-10"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                           {formValues.type === "fixed" ? "₹" : "%"}
                        </span>
                     </div>
                  </div>

                  {formValues.type === "percentage" && (
                     <div className="space-y-3">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Maximum Discount Cap (Optional)</Label>
                        <div className="relative">
                           <Input 
                              type="number"
                              {...register("maxDiscount", { valueAsNumber: true })}
                              placeholder="No limit"
                              className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-white transition-all pl-10"
                           />
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">₹</span>
                        </div>
                     </div>
                  )}
               </div>
            </Card>

            {/* Section 3: Conditions */}
            <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-8">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-gray-50 dark:bg-zinc-900">
                     <Settings className="w-4 h-4 text-black dark:text-white" />
                  </div>
                  <h3 className="text-lg font-playfair font-bold">Conditions & Requirements</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Minimum Order Value (₹)</Label>
                     <div className="relative">
                        <Input 
                           type="number"
                           {...register("minOrderValue", { valueAsNumber: true })}
                           placeholder="0.00"
                           className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-white transition-all pl-10"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">₹</span>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Applicable To</Label>
                     <Select value={formValues.applicableTo} onValueChange={(val: any) => setValue("applicableTo", val)}>
                        <SelectTrigger className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                           <SelectValue placeholder="Select scope" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                           <SelectItem value="all">All Products</SelectItem>
                           <SelectItem value="categories">Specific Categories</SelectItem>
                           <SelectItem value="products">Specific Products</SelectItem>
                           <SelectItem value="brands">Specific Brands</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
            </Card>

            {/* Section 4: Usage Limits */}
            <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-8">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-gray-50 dark:bg-zinc-900">
                     <Zap className="w-4 h-4 text-black dark:text-white" />
                  </div>
                  <h3 className="text-lg font-playfair font-bold">Usage Restrictions</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Usage Limit</Label>
                     <Input 
                        type="number"
                        {...register("usageLimitTotal", { valueAsNumber: true })}
                        placeholder="Unlimited"
                        className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-white transition-all"
                     />
                  </div>

                  <div className="space-y-3">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Limit Per Customer</Label>
                     <Input 
                        type="number"
                        {...register("usageLimitPerCustomer", { valueAsNumber: true })}
                        defaultValue={1}
                        className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-white transition-all"
                     />
                  </div>
               </div>

               <div className="flex items-center space-x-3 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800">
                  <Checkbox 
                     id="firstOrderOnly" 
                     checked={formValues.firstOrderOnly} 
                     onCheckedChange={(val) => setValue("firstOrderOnly", !!val)}
                  />
                  <Label htmlFor="firstOrderOnly" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 cursor-pointer">
                     Restrict to First Order Only
                  </Label>
               </div>
            </Card>

            {/* Section 5: Validity */}
            <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-8">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-gray-50 dark:bg-zinc-900">
                     <CalendarIcon className="w-4 h-4 text-black dark:text-white" />
                  </div>
                  <h3 className="text-lg font-playfair font-bold">Validity Period</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Start Date & Time</Label>
                     <Input 
                        type="datetime-local"
                        {...register("startDate")}
                        className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-white transition-all"
                     />
                  </div>

                  <div className="space-y-3">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">End Date & Time</Label>
                     <Input 
                        type="datetime-local"
                        {...register("endDate")}
                        disabled={formValues.noExpiry}
                        className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 focus:border-black dark:focus:border-white transition-all disabled:opacity-30"
                     />
                  </div>
               </div>

               <div className="flex items-center space-x-3 px-1">
                  <Checkbox 
                     id="noExpiry" 
                     checked={formValues.noExpiry} 
                     onCheckedChange={(val) => setValue("noExpiry", !!val)}
                  />
                  <Label htmlFor="noExpiry" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 cursor-pointer">
                     This coupon never expires
                  </Label>
               </div>
            </Card>

            {/* Section 6: Additional Settings */}
            <Card className="p-8 bg-white dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-8">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-gray-50 dark:bg-zinc-900">
                     <Target className="w-4 h-4 text-black dark:text-white" />
                  </div>
                  <h3 className="text-lg font-playfair font-bold">Visibility & Targeting</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">User Eligibility</Label>
                     <Select value={formValues.userEligibility} onValueChange={(val: any) => setValue("userEligibility", val)}>
                        <SelectTrigger className="h-12 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                           <SelectValue placeholder="Target audience" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                           <SelectItem value="all">All Registered Users</SelectItem>
                           <SelectItem value="new">New Customers Only</SelectItem>
                           <SelectItem value="segment">Specific Segments (VIP, Inactive)</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 h-12 self-end">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Visible on Store Banner</p>
                     <Switch 
                        checked={formValues.visibleOnStore}
                        onCheckedChange={(val) => setValue("visibleOnStore", val)}
                     />
                  </div>
               </div>

               <div className="flex items-center space-x-3 px-1">
                  <Checkbox 
                     id="stackable" 
                     checked={formValues.stackable} 
                     onCheckedChange={(val) => setValue("stackable", !!val)}
                  />
                  <Label htmlFor="stackable" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 cursor-pointer">
                     Allow combination with other discount codes
                  </Label>
               </div>
            </Card>
         </div>

         {/* Preview Sidebar */}
         <div className="xl:sticky xl:top-32 space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 pl-2">Live Preview</h3>
            
            <Card className="bg-black text-white dark:bg-white dark:text-black p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="p-2.5 rounded-2xl bg-white/10 dark:bg-black/10">
                        <Ticket className="w-5 h-5" />
                     </div>
                     <Badge className="bg-emerald-500 text-white border-none text-[8px] font-black uppercase tracking-widest px-3">Live Draft</Badge>
                  </div>
                  
                  <div>
                     <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 dark:text-gray-500 mb-2">Exclusive Offer</p>
                     <h4 className="text-4xl font-playfair font-bold">
                        {formValues.type === "percentage" ? `${formValues.value || 0}% OFF` : 
                         formValues.type === "fixed" ? `₹${formValues.value || 0} OFF` : 
                         "FREE SHIPPING"}
                     </h4>
                     <p className="text-xs mt-3 text-gray-300 dark:text-zinc-500 font-medium leading-relaxed">
                        {formValues.description || "Enter your coupon description to see it here..."}
                     </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 dark:border-black/10 flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-[8px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold">Use Code</span>
                        <span className="text-xl font-black tracking-widest uppercase mt-1">
                           {formValues.code || "XXXXXX"}
                        </span>
                     </div>
                     <button type="button" className="h-10 px-4 rounded-xl bg-white text-black dark:bg-black dark:text-white text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                        Copy
                     </button>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                     <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest font-bold text-gray-400 dark:text-zinc-500">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Min Order: ₹{formValues.minOrderValue || 0}
                     </div>
                     {formValues.type === "percentage" && formValues.maxDiscount && (
                        <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest font-bold text-gray-400 dark:text-zinc-500">
                           <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                           Max Discount: ₹{formValues.maxDiscount}
                        </div>
                     )}
                     <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest font-bold text-gray-400 dark:text-zinc-500">
                        <CalendarIcon className="w-3 h-3" />
                        Valid till: {formValues.noExpiry ? "Unlimited" : (formValues.endDate ? new Date(formValues.endDate).toLocaleDateString() : "No end date set")}
                     </div>
                  </div>
               </div>

               {/* Decorative elements */}
               <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
               <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
            </Card>

            <Card className="p-6 bg-gray-50/50 dark:bg-zinc-900/50 border-dashed border-2 border-gray-100 dark:border-zinc-800 rounded-3xl space-y-4">
               <div className="flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">Validation Insights</h4>
               </div>
               <div className="space-y-3">
                  <p className="text-[11px] leading-relaxed text-gray-500">
                     • {formValues.stackable ? "Stackable enabled: customers can use this with other codes." : "Non-stackable: this will be the only code applied."}
                  </p>
                  <p className="text-[11px] leading-relaxed text-gray-500">
                     • {formValues.usageLimitPerCustomer === 1 ? "One-time use per customer enforced." : `Up to ${formValues.usageLimitPerCustomer} uses per customer allowed.`}
                  </p>
                  {formValues.firstOrderOnly && (
                     <p className="text-[11px] leading-relaxed text-amber-600 font-bold">
                        • Restricted to new customers only.
                     </p>
                  )}
               </div>
            </Card>
         </div>
      </div>
    </form>
  );
}
