"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Save, 
  Trash2, 
  Eye, 
  ChevronRight, 
  Info, 
  DollarSign, 
  Package as PackageIcon, 
  Layers, 
  Image as ImageIcon, 
  Truck, 
  Search as SearchIcon, 
  ShieldCheck,
  Check
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import RichTextEditor from "./RichTextEditor";
import MediaUpload from "./MediaUpload";
import VariantBuilder from "./VariantBuilder";
import { cn } from "@/lib/utils";
import ConfirmationModal from "../shared/ConfirmationModal";

const productSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  sku: z.string().min(3, "SKU is required"),
  shortDescription: z.string().max(160, "Short description must be under 160 characters").optional(),
  description: z.string().min(20, "Please provide a detailed description"),
  regularPrice: z.number().min(0),
  salePrice: z.number().optional(),
  costPrice: z.number().optional(),
  stockQuantity: z.number().min(0),
  lowStockThreshold: z.number().min(0),
  status: z.enum(["Active", "Inactive"]),
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  weight: z.number().optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const ProductForm = ({ initialData }: { initialData?: any }) => {
  const [activeSection, setActiveSection] = useState("basic");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState: { errors, isDirty }, watch, setValue } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      status: "Active",
      stockQuantity: 0,
      lowStockThreshold: 5,
      regularPrice: 0,
    }
  });

  // Auto-save simulation
  React.useEffect(() => {
    if (isDirty) {
      const timer = setTimeout(() => {
        toast.info("Draft auto-saved", {
          description: "Your changes have been saved to the cloud",
          duration: 2000
        });
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isDirty, watch()]);

  const onSubmit = (data: ProductFormValues) => {
    setIsSaving(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Publishing product...',
        success: () => {
          setIsSaving(false);
          return 'Product published successfully!';
        },
        error: 'Failed to publish product',
      }
    );
  };

  const sections = [
    { id: "basic", label: "Basic Info", icon: Info },
    { id: "description", label: "Description", icon: ChevronRight },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "inventory", label: "Inventory", icon: PackageIcon },
    { id: "variants", label: "Variants", icon: Layers },
    { id: "media", label: "Media", icon: ImageIcon },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "seo", label: "SEO", icon: SearchIcon },
    { id: "auth", label: "Authenticity", icon: ShieldCheck },
  ];

  const handleCategoryChange = (v: string) => setValue("category", v, { shouldValidate: true });
  const handleBrandChange = (v: string) => setValue("brand", v, { shouldValidate: true });

  const FormSection = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <div id={id} className="scroll-mt-32 space-y-8 py-10 border-b border-gray-50 dark:border-zinc-900 last:border-0">
       <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-black dark:bg-white rounded-full" />
          <h2 className="text-xl font-playfair font-bold">{title}</h2>
       </div>
       {children}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col lg:flex-row gap-12">
      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => toast.success("Product deleted successfully")}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone and will remove all associated data from the system."
      />

      {/* Left Sidebar - Navigation */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-32 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => {
                setActiveSection(section.id);
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                activeSection === section.id 
                  ? "bg-black text-white shadow-xl translate-x-1" 
                  : "text-gray-400 hover:text-black dark:hover:text-white"
              )}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Content */}
      <div className="flex-1 max-w-4xl space-y-4">
        <FormSection id="basic" title="Basic Information">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Product Name</Label>
                 <Input {...register("name")} placeholder="e.g. Gucci Double G Belt" className="rounded-xl h-12 border-gray-100 dark:border-zinc-800 focus:border-black transition-all" />
                 {errors.name && <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">SKU</Label>
                 <Input {...register("sku")} placeholder="GC-BELT-BLK-01" className="rounded-xl h-12 border-gray-100 dark:border-zinc-800 focus:border-black transition-all" />
                 {errors.sku && <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest">{errors.sku.message}</p>}
              </div>
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</Label>
                 <Select onValueChange={(v) => v && handleCategoryChange(v as string)}>
                    <SelectTrigger className="rounded-xl h-12 border-gray-100 dark:border-zinc-800">
                       <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="men">Men's Apparel</SelectItem>
                       <SelectItem value="women">Women's Apparel</SelectItem>
                       <SelectItem value="acc">Accessories</SelectItem>
                    </SelectContent>
                 </Select>
                 {errors.category && <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest">{errors.category.message}</p>}
              </div>
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Brand</Label>
                 <Select onValueChange={(v) => v && handleBrandChange(v as string)}>
                    <SelectTrigger className="rounded-xl h-12 border-gray-100 dark:border-zinc-800">
                       <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="gucci">Gucci</SelectItem>
                       <SelectItem value="prada">Prada</SelectItem>
                       <SelectItem value="lv">Louis Vuitton</SelectItem>
                    </SelectContent>
                 </Select>
                 {errors.brand && <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest">{errors.brand.message}</p>}
              </div>
           </div>
           <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</Label>
              <div className="flex items-center gap-6 p-4 bg-gray-50/50 dark:bg-zinc-900/50 rounded-2xl border border-gray-100 dark:border-zinc-800">
                 <div className="flex items-center gap-3">
                   <Switch 
                     checked={watch("status") === "Active"} 
                     onCheckedChange={(v) => setValue("status", v ? "Active" : "Inactive")} 
                   />
                   <span className="text-[10px] font-bold uppercase tracking-widest">{watch("status")}</span>
                 </div>
                 <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Visible on store frontend</p>
              </div>
           </div>
        </FormSection>

        <FormSection id="description" title="Description">
           <div className="space-y-6">
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Short Description (max 160 chars)</Label>
                 <Textarea {...register("shortDescription")} className="rounded-2xl min-h-[100px] border-gray-100 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-widest" />
              </div>
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Detailed Description</Label>
                 <RichTextEditor value={watch("description") || ""} onChange={(v) => setValue("description", v, { shouldDirty: true })} />
                 {errors.description && <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest">{errors.description.message}</p>}
              </div>
           </div>
        </FormSection>

        <FormSection id="pricing" title="Pricing & Profit">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-gray-50/50 dark:bg-zinc-900/50 rounded-3xl border border-gray-100 dark:border-zinc-800">
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Regular Price (₹)</Label>
                 <Input type="number" {...register("regularPrice", { valueAsNumber: true })} className="rounded-xl h-12 border-none bg-white font-bold" />
              </div>
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sale Price (₹)</Label>
                 <Input type="number" {...register("salePrice", { valueAsNumber: true })} className="rounded-xl h-12 border-none bg-white font-bold" />
              </div>
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Cost per item (₹)</Label>
                 <Input type="number" {...register("costPrice", { valueAsNumber: true })} className="rounded-xl h-12 border-none bg-white font-bold" />
              </div>
           </div>
           <div className="p-6 bg-green-50/50 dark:bg-green-950/10 rounded-2xl flex items-center justify-between border border-green-100 dark:border-green-950/30">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5" />
                 </div>
                 <div className="space-y-0.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-green-700 dark:text-green-400">Estimated Margin</h4>
                    <p className="text-[9px] text-green-600/70 font-bold uppercase tracking-widest">Based on cost and regular price</p>
                 </div>
              </div>
              <span className="text-2xl font-playfair font-bold text-green-700 dark:text-green-400">
                 ₹{((watch("regularPrice") || 0) - (watch("costPrice") || 0)).toLocaleString()} ({(
                   ((watch("regularPrice") || 0) - (watch("costPrice") || 0)) / (watch("regularPrice") || 1) * 100
                 ).toFixed(1)}%)
              </span>
           </div>
        </FormSection>

        <FormSection id="inventory" title="Inventory">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Stock Quantity</Label>
                 <Input type="number" {...register("stockQuantity", { valueAsNumber: true })} className="rounded-xl h-12 border-gray-100 dark:border-zinc-800" />
              </div>
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Low Stock Alert Threshold</Label>
                 <Input type="number" {...register("lowStockThreshold", { valueAsNumber: true })} className="rounded-xl h-12 border-gray-100 dark:border-zinc-800" />
              </div>
           </div>
        </FormSection>

        <FormSection id="variants" title="Variants Management">
           <VariantBuilder />
        </FormSection>

        <FormSection id="media" title="Images & Media">
           <MediaUpload />
        </FormSection>

        <FormSection id="shipping" title="Shipping Details">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 md:col-span-1">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Weight (kg)</Label>
                 <Input type="number" step="0.01" {...register("weight", { valueAsNumber: true })} className="rounded-xl h-12 border-gray-100 dark:border-zinc-800" />
              </div>
              <div className="space-y-2 md:col-span-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Shipping Class</Label>
                 <Select>
                    <SelectTrigger className="rounded-xl h-12 border-gray-100 dark:border-zinc-800">
                       <SelectValue placeholder="Standard Luxury" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="std">Standard Shipping</SelectItem>
                       <SelectItem value="hvy">Heavy/Bulk Item</SelectItem>
                       <SelectItem value="frg">Fragile - Special Handling</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
           </div>
        </FormSection>

        <FormSection id="seo" title="Search Engine Optimization">
           <div className="space-y-6">
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Meta Title</Label>
                 <Input {...register("metaTitle")} className="rounded-xl h-12 border-gray-100 dark:border-zinc-800" />
              </div>
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Meta Description</Label>
                 <Textarea {...register("metaDescription")} className="rounded-2xl min-h-[100px] border-gray-100 dark:border-zinc-800" />
              </div>
           </div>
        </FormSection>

        <FormSection id="auth" title="Authenticity & Verification">
           <div className="p-6 bg-black text-white dark:bg-white dark:text-black rounded-3xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 border border-white/20 dark:border-black/20 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
                 <div className="space-y-1">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]">Verified Export Surplus</h4>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest"> luxury threads authentication protocol</p>
                 </div>
              </div>
              <Button type="button" variant="outline" className="rounded-full h-10 px-6 border-white/20 hover:bg-white hover:text-black text-[9px] font-bold uppercase tracking-widest">Upload Certificate</Button>
           </div>
        </FormSection>
      </div>

      {/* Right Sidebar - Actions & Preview */}
      <div className="w-full lg:w-80 shrink-0">
        <div className="sticky top-32 space-y-6">
          <div className="bg-white dark:bg-zinc-950 p-6 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
               <Eye className="w-4 h-4 text-gray-400" /> Publication
            </h3>
            <div className="space-y-3">
               <Button type="submit" disabled={isSaving} className="w-full h-12 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-[10px] shadow-xl hover:-translate-y-1 transition-all">
                  {isSaving ? "Publishing..." : "Publish Product"}
               </Button>
               <Button type="button" variant="outline" className="w-full h-12 rounded-full border-gray-100 dark:border-zinc-800 font-bold uppercase tracking-widest text-[10px]">
                  Save as Draft
               </Button>
            </div>
            <div className="pt-6 border-t border-gray-50 dark:border-zinc-900">
               <Button type="button" onClick={() => setIsDeleteModalOpen(true)} variant="ghost" className="w-full h-12 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 font-bold uppercase tracking-widest text-[10px] gap-2">
                  <Trash2 className="w-4 h-4" /> Delete Product
               </Button>
            </div>
          </div>

          <div className="bg-gray-50/50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 space-y-4">
             <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Quick Preview</h4>
             <div className="aspect-[4/5] bg-white dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-300">Image Preview</div>
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                   <p className="text-white text-[10px] font-bold uppercase truncate">{watch("name") || "Product Name"}</p>
                   <p className="text-white/70 text-[12px] font-playfair font-bold">₹{(watch("regularPrice") || 0).toLocaleString()}</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
