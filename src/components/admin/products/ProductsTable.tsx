"use client";

import React, { useState } from "react";
import { 
  MoreVertical, 
  Edit, 
  Copy, 
  Eye, 
  Trash2, 
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  ExternalLink
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ConfirmationModal from "../shared/ConfirmationModal";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  sku: string;
}

const initialProducts: Product[] = [
  {
    id: "LT-GU-001",
    name: "Gucci Double G Belt",
    brand: "Gucci",
    category: "Accessories",
    price: 35000,
    stock: 12,
    status: "Active",
    sku: "GC-BELT-BLK-L"
  },
  {
    id: "LT-PR-042",
    name: "Prada Nylon Tote Bag",
    brand: "Prada",
    category: "Bags",
    price: 95000,
    stock: 4,
    status: "Active",
    sku: "PR-TOTE-NY-M"
  },
  {
    id: "LT-LV-089",
    name: "Louis Vuitton Keepall 55",
    brand: "Louis Vuitton",
    category: "Travel",
    price: 145000,
    stock: 2,
    status: "Active",
    sku: "LV-KP-55-MN"
  },
  {
    id: "LT-DR-012",
    name: "Dior Oblique Sneakers",
    brand: "Dior",
    category: "Footwear",
    price: 82000,
    stock: 0,
    status: "Inactive",
    sku: "DR-SNK-B23-42"
  },
  {
    id: "LT-RC-005",
    name: "Rolex Submariner Date",
    brand: "Rolex",
    category: "Watches",
    price: 850000,
    stock: 1,
    status: "Active",
    sku: "RX-SUB-126610"
  }
];

const ProductsTable = () => {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.length === products.length ? [] : products.map(p => p.id));
  };

  const handleDelete = () => {
    if (productToDelete) {
       setProducts(prev => prev.filter(p => p.id !== productToDelete));
       toast.success("Product deleted successfully");
    }
    setProductToDelete(null);
  };

  const handleBulkDelete = () => {
    setProducts(prev => prev.filter(p => !selectedIds.includes(p.id)));
    toast.success(`${selectedIds.length} products deleted successfully`);
    setSelectedIds([]);
  };

  const handleStatusChange = (ids: string[], status: string) => {
    setProducts(prev => prev.map(p => ids.includes(p.id) ? { ...p, status } : p));
    toast.info(`Products marked as ${status}`);
  };

  const handleDuplicate = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
       const newProduct = { ...product, id: `${product.id}-COPY`, name: `${product.name} (Copy)` };
       setProducts([newProduct, ...products]);
       toast.success(`Duplicated ${product.name} successfully`);
    }
  };

  return (
    <div className="mt-8 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={productToDelete ? handleDelete : handleBulkDelete}
        title={productToDelete ? "Delete Product" : "Delete Selected Products"}
        description={productToDelete 
          ? "Are you sure you want to delete this product? This action cannot be undone." 
          : `Are you sure you want to delete ${selectedIds.length} selected products? This action cannot be undone.`}
      />

      {selectedIds.length > 0 && (
        <div className="bg-black text-white px-6 py-3 flex items-center justify-between animate-in slide-in-from-top-4">
           <span className="text-[10px] font-bold uppercase tracking-widest">{selectedIds.length} items selected</span>
           <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => handleStatusChange(selectedIds, "Active")} className="text-white hover:bg-white/10 text-[9px] font-bold uppercase tracking-widest">Activate</Button>
              <Button variant="ghost" className="text-white hover:bg-white/10 text-[9px] font-bold uppercase tracking-widest">Export</Button>
              <Button variant="ghost" onClick={() => setIsDeleteModalOpen(true)} className="text-red-400 hover:bg-red-500/10 text-[9px] font-bold uppercase tracking-widest">Delete</Button>
           </div>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-gray-50 dark:border-zinc-900 h-16">
            <TableHead className="w-12 pl-6">
              <Checkbox 
                checked={selectedIds.length === products.length && products.length > 0} 
                onCheckedChange={toggleSelectAll}
                className="rounded-none data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
            </TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Product</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Brand</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Price</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Stock</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="border-gray-50 dark:border-zinc-900 group hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors">
              <TableCell className="pl-6">
                <Checkbox 
                  checked={selectedIds.includes(product.id)}
                  onCheckedChange={() => toggleSelect(product.id)}
                  className="rounded-none data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
              </TableCell>
              <TableCell className="py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center font-bold text-xs">IMG</div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold">{product.name}</span>
                    <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold font-mono">{product.sku}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{product.category}</TableCell>
              <TableCell className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{product.brand}</TableCell>
              <TableCell className="py-5">
                {editingId === product.id ? (
                  <div className="flex items-center gap-2">
                    <Input className="h-8 w-24 text-[11px] font-bold rounded-none" defaultValue={product.price} />
                    <Button 
                      size="icon" 
                      className="w-8 h-8 bg-black text-white rounded-none" 
                      onClick={() => {
                        setEditingId(null);
                        toast.success("Price updated locally");
                      }}
                    >
                      <Check className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setEditingId(product.id)}
                    className="text-[11px] font-bold hover:bg-gray-100 dark:hover:bg-zinc-800 px-2 py-1 -ml-2 rounded-lg transition-colors"
                  >
                    ₹{product.price.toLocaleString()}
                  </button>
                )}
              </TableCell>
              <TableCell className="py-5">
                <Badge variant="outline" className={cn(
                  "rounded-none text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border-none",
                  product.stock === 0 ? "bg-red-50 text-red-600" : 
                  product.stock < 10 ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600"
                )}>
                  {product.stock} Units
                </Badge>
              </TableCell>
              <TableCell className="py-5">
                  <Badge variant="outline" className={cn(
                    "rounded-full h-2 w-2 p-0 mr-2",
                    product.status === "Active" ? "bg-green-500" : "bg-gray-300"
                  )} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{product.status}</span>
              </TableCell>
              <TableCell className="text-right pr-6 py-5">
                 <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="w-9 h-9 opacity-0 group-hover:opacity-100 h hover:bg-white dark:hover:bg-zinc-800 transition-all border border-transparent hover:border-gray-100 dark:hover:border-zinc-700">
                       <Edit className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                       <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon" className="w-9 h-9 h hover:bg-white dark:hover:bg-zinc-800 transition-all">
                             <MoreVertical className="w-4 h-4" />
                          </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl">
                          <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest p-3 gap-3 rounded-lg"><Eye className="w-4 h-4" /> View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(product.id)} className="text-[10px] font-bold uppercase tracking-widest p-3 gap-3 rounded-lg"><Copy className="w-4 h-4" /> Duplicate</DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              setProductToDelete(product.id);
                              setIsDeleteModalOpen(true);
                            }} 
                            className="text-[10px] font-bold uppercase tracking-widest p-3 gap-3 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                          >
                            <Trash2 className="w-4 h-4" /> Delete Product
                          </DropdownMenuItem>
                       </DropdownMenuContent>
                    </DropdownMenu>
                 </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="px-6 py-6 border-t border-gray-50 dark:border-zinc-900 flex items-center justify-between">
         <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Showing {products.length} products</p>
         <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-gray-100 dark:border-zinc-800" disabled><ChevronLeft className="w-4 h-4" /></Button>
            <div className="flex items-center gap-2">
               <Button className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black">1</Button>
               <Button variant="ghost" className="w-10 h-10 rounded-xl text-gray-400">2</Button>
               <Button variant="ghost" className="w-10 h-10 rounded-xl text-gray-400">3</Button>
            </div>
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-gray-100 dark:border-zinc-800"><ChevronRight className="w-4 h-4" /></Button>
         </div>
      </div>
    </div>
  );
};

export default ProductsTable;
