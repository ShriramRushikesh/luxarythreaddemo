"use client";

import React, { useState } from "react";
import { Plus, X, Trash2, Layers, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const VariantBuilder = () => {
  const [hasVariants, setHasVariants] = useState(false);
  const [attributes, setAttributes] = useState([
    { name: "Size", values: ["S", "M", "L", "XL"] },
    { name: "Color", values: ["Black", "White", "Midnight Blue"] }
  ]);

  const [newValue, setNewValue] = useState("");

  const addValue = (attrIndex: number) => {
    if (!newValue) return;
    const newAttrs = [...attributes];
    newAttrs[attrIndex].values.push(newValue);
    setAttributes(newAttrs);
    setNewValue("");
  };

  const removeValue = (attrIndex: number, valIndex: number) => {
    const newAttrs = [...attributes];
    newAttrs[attrIndex].values.splice(valIndex, 1);
    setAttributes(newAttrs);
  };

  // Generate Cartesian Product of variants
  const getVariants = () => {
    return attributes.reduce((a, b) => {
      return a.flatMap(d => b.values.map(e => `${d} / ${e}`));
    }, [""]);
  };

  const variants = getVariants().filter(v => v !== "");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between p-6 bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center shadow-lg">
               <Layers className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
               <h3 className="text-[10px] font-bold uppercase tracking-widest">Product Variants</h3>
               <p className="text-[8px] text-gray-400 uppercase tracking-widest font-bold">Manage sizes, colors, and stock</p>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <Label htmlFor="variants-toggle" className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Has Variants</Label>
            <Switch 
              id="variants-toggle" 
              checked={hasVariants} 
              onCheckedChange={setHasVariants}
              className="data-[state=checked]:bg-black dark:data-[state=checked]:bg-white"
            />
         </div>
      </div>

      {hasVariants && (
        <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
          {/* Attributes Config */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {attributes.map((attr, attrIndex) => (
              <div key={attrIndex} className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{attr.name}</span>
                    <button className="text-[8px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600">Remove Attribute</button>
                 </div>
                 <div className="flex flex-wrap gap-2 p-4 border border-gray-100 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950">
                    {attr.values.map((val, valIndex) => (
                      <Badge key={valIndex} variant="secondary" className="rounded-full px-3 py-1 gap-2 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 text-[8px] font-bold uppercase tracking-widest group">
                         {val}
                         <button onClick={() => removeValue(attrIndex, valIndex)} className="hover:text-red-500 transition-colors">
                            <X className="w-2.5 h-2.5" />
                         </button>
                      </Badge>
                    ))}
                    <div className="flex items-center gap-2 w-full mt-2">
                       <Input 
                         placeholder="Add value..." 
                         className="h-8 text-[9px] border-none bg-gray-50/50 rounded-lg focus:bg-white" 
                         onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                             addValue(attrIndex);
                             e.preventDefault();
                           }
                         }}
                         onChange={(e) => setNewValue(e.target.value)}
                         value={newValue}
                       />
                       <Button size="icon" className="w-8 h-8 h bg-black text-white hover:bg-black/90 rounded-lg" onClick={() => addValue(attrIndex)}>
                          <Plus className="w-4 h-4" />
                       </Button>
                    </div>
                 </div>
              </div>
            ))}
            <Button variant="outline" className="h-24 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-black dark:hover:border-white transition-all">
               <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-gray-400" />
               </div>
               <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Add New Attribute</span>
            </Button>
          </div>

          {/* Variants Table */}
          <div className="space-y-4 pt-10 border-t border-gray-50 dark:border-zinc-900">
             <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold uppercase tracking-widest">Generated Combinations</h4>
                <Button variant="ghost" className="text-[9px] font-bold uppercase tracking-widest gap-2">
                   <RefreshCcw className="w-3.5 h-3.5" /> Regenerate
                </Button>
             </div>

             <div className="border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">
                <Table>
                   <TableHeader className="bg-gray-50/50 dark:bg-zinc-900/50">
                      <TableRow className="hover:bg-transparent border-gray-50 dark:border-zinc-900">
                         <TableHead className="text-[9px] font-bold uppercase tracking-widest pl-6">Variant</TableHead>
                         <TableHead className="text-[9px] font-bold uppercase tracking-widest">SKU</TableHead>
                         <TableHead className="text-[9px] font-bold uppercase tracking-widest">Price (₹)</TableHead>
                         <TableHead className="text-[9px] font-bold uppercase tracking-widest">Stock</TableHead>
                         <TableHead className="text-[9px] font-bold uppercase tracking-widest text-right pr-6">Status</TableHead>
                      </TableRow>
                   </TableHeader>
                   <TableBody>
                      {variants.map((v, i) => (
                        <TableRow key={i} className="border-gray-50 dark:border-zinc-900 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                           <TableCell className="text-[10px] font-bold py-4 pl-6">{v}</TableCell>
                           <TableCell className="py-4">
                              <Input className="h-8 w-32 border-none bg-gray-50/50 text-[10px] uppercase font-bold tracking-widest" placeholder="Auto-generated" />
                           </TableCell>
                           <TableCell className="py-4">
                              <Input className="h-8 w-24 border-none bg-gray-50/50 text-[10px] font-bold" defaultValue="0" />
                           </TableCell>
                           <TableCell className="py-4">
                              <Input className="h-8 w-20 border-none bg-gray-50/50 text-[10px] font-bold" defaultValue="0" />
                           </TableCell>
                           <TableCell className="text-right pr-6 py-4">
                              <Badge className="bg-green-50 text-green-600 text-[8px] font-bold uppercase tracking-widest border-none px-2">Active</Badge>
                           </TableCell>
                        </TableRow>
                      ))}
                   </TableBody>
                </Table>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantBuilder;
