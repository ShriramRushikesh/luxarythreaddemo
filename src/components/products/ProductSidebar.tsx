"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useProductFilters } from "@/hooks/use-product-filters";
import { cn } from "@/lib/utils";

const categories = ["T-Shirts", "Shirts", "Jeans", "Jackets", "Accessories"];
const brands = ["Gucci", "Prada", "Louis Vuitton", "Zara", "H&M", "Levi's", "Armani", "Versace", "Burberry", "Balenciaga", "Fendi", "Saint Laurent"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#000080" },
  { name: "Red", hex: "#FF0000" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Gray", hex: "#808080" },
  { name: "Gold", hex: "#D4AF37" },
  { name: "Green", hex: "#008000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Brown", hex: "#A52A2A" },
  { name: "Purple", hex: "#800080" },
];

const ProductSidebar = () => {
  const { filters, updateFilters, clearFilters } = useProductFilters();
  const [brandSearch, setBrandSearch] = useState("");
  const [showAllBrands, setShowAllBrands] = useState(false);

  const filteredBrands = brands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );
  const displayBrands = showAllBrands ? filteredBrands : filteredBrands.slice(0, 8);

  const handleFilterChange = (key: string, value: any) => {
    updateFilters({ [key]: value });
  };

  const handleArrayFilter = (key: string, value: string) => {
    const current = (filters[key] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilters({ [key]: updated });
  };

  return (
    <aside className="w-full space-y-10 group">
      {/* Category */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Category</h4>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-3">
              <Checkbox
                id={`cat-${cat}`}
                checked={(filters.category as string[])?.includes(cat)}
                onCheckedChange={() => handleArrayFilter("category", cat)}
                className="rounded-none border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <label htmlFor={`cat-${cat}`} className="text-sm font-medium tracking-wide cursor-pointer hover:text-black/60 transition-colors">
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[1px] w-full bg-border" />

      {/* Brand */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Brand</h4>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search brands..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs border border-border bg-muted/30 rounded-none focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="space-y-3">
          {displayBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-3">
              <Checkbox
                id={`brand-${brand}`}
                checked={(filters.brand as string[])?.includes(brand)}
                onCheckedChange={() => handleArrayFilter("brand", brand)}
                className="rounded-none border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <label htmlFor={`brand-${brand}`} className="text-sm font-medium tracking-wide cursor-pointer hover:text-black/60 transition-colors">
                {brand}
              </label>
            </div>
          ))}
        </div>
        {filteredBrands.length > 8 && (
          <button
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-black mt-2 transition-colors flex items-center gap-1"
          >
            {showAllBrands ? "Show Less" : `Show More (${filteredBrands.length - 8})`}
            {showAllBrands ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      <div className="h-[1px] w-full bg-gray-100" />

      {/* Price Range */}
      <div className="space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Price Range</h4>
        <Slider
          defaultValue={[500, 50000]}
          max={50000}
          min={500}
          step={100}
          value={filters.price ? (filters.price as string[]).map(Number) : [500, 50000]}
          onValueChange={(val) => updateFilters({ price: val })}
          className="py-4"
        />
        <div className="flex justify-between items-center text-[11px] font-mono tracking-tighter">
          <span className="bg-muted px-3 py-1 border border-border">₹{((filters.price as unknown) as number[])?.[0] || 500}</span>
          <span className="text-muted-foreground/50">to</span>
          <span className="bg-muted px-3 py-1 border border-border">₹{((filters.price as unknown) as number[])?.[1] || 50000}</span>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-100" />

      {/* Size */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleArrayFilter("size", size)}
              className={cn(
                "w-10 h-10 border text-[10px] font-bold tracking-widest flex items-center justify-center transition-all duration-300 hover:border-primary",
                (filters.size as string[])?.includes(size) ? "bg-primary text-primary-foreground border-primary" : "border-border bg-background text-muted-foreground"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-100" />

      {/* Color */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Color</h4>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => handleArrayFilter("color", color.name)}
              title={color.name}
              className={cn(
                "w-7 h-7 rounded-full border-2 transition-all p-0.5",
                (filters.color as string[])?.includes(color.name) ? "border-black scale-110" : "border-transparent"
              )}
            >
              <div 
                className="w-full h-full rounded-full border border-black/10 shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-100" />

      {/* Condition & Availability */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Availability</h4>
          <RadioGroup 
            value={filters.availability as string || ""}
            onValueChange={(val) => handleFilterChange("availability", val)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="in-stock" id="in-stock" className="border-gray-300 text-black focus:ring-black" />
              <label htmlFor="in-stock" className="text-sm font-medium tracking-wide">In Stock</label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="out-of-stock" id="out-of-stock" className="border-gray-300 text-black focus:ring-black" />
              <label htmlFor="out-of-stock" className="text-sm font-medium tracking-wide">Out of Stock</label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Condition</h4>
          <RadioGroup 
            value={filters.condition as string || ""}
            onValueChange={(val) => handleFilterChange("condition", val)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="new" id="cond-new" className="border-gray-300 text-black focus:ring-black" />
              <label htmlFor="cond-new" className="text-sm font-medium tracking-wide">New Arrivals</label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="surplus" id="cond-surplus" className="border-gray-300 text-black focus:ring-black" />
              <label htmlFor="cond-surplus" className="text-sm font-medium tracking-wide">Export Surplus</label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <Button 
        variant="outline" 
        onClick={clearFilters}
        className="w-full rounded-none uppercase tracking-[0.2em] font-bold text-[10px] py-6 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      >
        Clear All Filters
      </Button>
    </aside>
  );
};

export default ProductSidebar;
