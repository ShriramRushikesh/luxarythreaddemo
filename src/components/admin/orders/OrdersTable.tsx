"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MoreVertical, 
  Eye, 
  Truck, 
  Printer, 
  XCircle, 
  RefreshCcw, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Mail,
  Copy
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
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import UpdateStatusModal from "./UpdateStatusModal";

interface Order {
  id: string;
  date: string;
  customer: {
    name: string;
    email: string;
  };
  products: number;
  total: number;
  payment: {
    method: string;
    status: "Paid" | "Pending" | "Failed";
  };
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

const mockOrders: Order[] = [
  {
    id: "LT-2024-001",
    date: "24 Jan 2024, 10:30 AM",
    customer: { name: "Aarav Sharma", email: "aarav@example.com" },
    products: 3,
    total: 12499,
    payment: { method: "Razorpay UPI", status: "Paid" },
    status: "Pending"
  },
  {
    id: "LT-2024-002",
    date: "24 Jan 2024, 11:15 AM",
    customer: { name: "Sanya Malhotra", email: "sanya@test.com" },
    products: 1,
    total: 35000,
    payment: { method: "Credit Card", status: "Paid" },
    status: "Processing"
  },
  {
    id: "LT-2024-003",
    date: "23 Jan 2024, 04:45 PM",
    customer: { name: "Rohan Gupta", email: "rohan@lux.in" },
    products: 2,
    total: 8200,
    payment: { method: "Net Banking", status: "Paid" },
    status: "Shipped"
  },
  {
    id: "LT-2024-004",
    date: "22 Jan 2024, 09:20 AM",
    customer: { name: "Ananya Panday", email: "ananya@stars.com" },
    products: 5,
    total: 156000,
    payment: { method: "Wallet", status: "Paid" },
    status: "Delivered"
  },
  {
    id: "LT-2024-005",
    date: "21 Jan 2024, 06:10 PM",
    customer: { name: "Vikram Seth", email: "vikram@seth.me" },
    products: 2,
    total: 45000,
    payment: { method: "COD", status: "Pending" },
    status: "Cancelled"
  }
];

const statusStyles = {
  Pending: "bg-orange-50 text-orange-600 border-none",
  Processing: "bg-blue-50 text-blue-600 border-none",
  Shipped: "bg-purple-50 text-purple-600 border-none",
  Delivered: "bg-green-50 text-green-600 border-none",
  Cancelled: "bg-red-50 text-red-600 border-none",
};

const OrdersTable = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{ id: string, status: string } | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.length === mockOrders.length ? [] : mockOrders.map(o => o.id));
  };

  const copyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`Order ID ${id} copied to clipboard`);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
      {selectedOrder && (
        <UpdateStatusModal 
          isOpen={isStatusModalOpen} 
          onClose={() => {
            setIsStatusModalOpen(false);
            setSelectedOrder(null);
          }} 
          currentStatus={selectedOrder.status} 
          orderId={selectedOrder.id} 
        />
      )}
      {selectedIds.length > 0 && (
        <div className="bg-black text-white px-8 py-4 flex items-center justify-between animate-in slide-in-from-top-4">
           <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{selectedIds.length} orders selected</span>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-3">
                 <Button variant="ghost" className="text-white hover:bg-white/10 text-[9px] font-bold uppercase tracking-widest gap-2">
                    <Truck className="w-3.5 h-3.5" /> Ship Selected
                 </Button>
                 <Button variant="ghost" className="text-white hover:bg-white/10 text-[9px] font-bold uppercase tracking-widest gap-2">
                    <Printer className="w-3.5 h-3.5" /> Print Invoices
                 </Button>
              </div>
           </div>
           <Button variant="ghost" className="text-red-400 hover:bg-red-500/10 text-[9px] font-bold uppercase tracking-widest" onClick={() => setSelectedIds([])}>Cancel</Button>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-gray-50 dark:border-zinc-900 h-16">
            <TableHead className="w-12 pl-8">
              <Checkbox 
                checked={selectedIds.length === mockOrders.length && mockOrders.length > 0} 
                onCheckedChange={toggleSelectAll}
                className="rounded-none data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
            </TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Order #</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Products</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Payment</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</TableHead>
            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right pr-8">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockOrders.map((order) => (
            <TableRow 
              key={order.id} 
              className="border-gray-50 dark:border-zinc-900 group hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer"
            >
              <TableCell className="pl-8" onClick={(e) => e.stopPropagation()}>
                <Checkbox 
                  checked={selectedIds.includes(order.id)}
                  onCheckedChange={() => toggleSelect(order.id)}
                  className="rounded-none data-[state=checked]:bg-black data-[state=checked]:border-black"
                />
              </TableCell>
              <TableCell className="py-5">
                <div className="flex items-center gap-2">
                   <Link href={`/admin/orders/${order.id}`} className="text-[11px] font-bold hover:underline transition-all">
                      {order.id}
                   </Link>
                   <button onClick={(e) => { e.stopPropagation(); copyOrderId(order.id); }} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded">
                      <Copy className="w-3 h-3 text-gray-400" />
                   </button>
                </div>
              </TableCell>
              <TableCell className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{order.date}</TableCell>
              <TableCell>
                 <div className="flex flex-col">
                    <span className="text-[11px] font-bold">{order.customer.name}</span>
                    <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold line-clamp-1">{order.customer.email}</span>
                 </div>
              </TableCell>
              <TableCell className="text-[11px] font-bold">{order.products} Items</TableCell>
              <TableCell className="text-[11px] font-bold">₹{order.total.toLocaleString()}</TableCell>
              <TableCell>
                 <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest">{order.payment.method}</span>
                    <div className="flex items-center gap-1.5">
                       <div className={cn(
                         "h-1.5 w-1.5 rounded-full",
                         order.payment.status === "Paid" ? "bg-green-500" : "bg-orange-500"
                       )} />
                       <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">{order.payment.status}</span>
                    </div>
                 </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={cn(
                  "rounded-full px-3 py-1 text-[8px] font-bold uppercase tracking-widest",
                  statusStyles[order.status]
                )}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right pr-8" onClick={(e) => e.stopPropagation()}>
                 <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/orders/${order.id}`}>
                       <Button variant="ghost" size="icon" className="w-9 h-9 opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-zinc-800 transition-all border border-transparent hover:border-gray-100 dark:hover:border-zinc-700">
                          <Eye className="w-4 h-4" />
                       </Button>
                    </Link>
                    <DropdownMenu>
                       <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon" className="w-9 h-9 hover:bg-white dark:hover:bg-zinc-800 transition-all">
                             <MoreVertical className="w-4 h-4" />
                          </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-2xl border-gray-100 dark:border-zinc-800">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder({ id: order.id, status: order.status });
                              setIsStatusModalOpen(true);
                            }}
                            className="text-[10px] font-bold uppercase tracking-widest p-3 gap-3 rounded-xl"
                          >
                             <RefreshCcw className="w-4 h-4" /> Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest p-3 gap-3 rounded-xl"><Printer className="w-4 h-4" /> Print Invoice</DropdownMenuItem>
                          <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest p-3 gap-3 rounded-xl"><Truck className="w-4 h-4" /> Track Order</DropdownMenuItem>
                          <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest p-3 gap-3 rounded-xl"><Mail className="w-4 h-4" /> Send Email</DropdownMenuItem>
                          <div className="h-px bg-gray-50 dark:bg-zinc-900 my-1 mx-2" />
                          <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest p-3 gap-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"><XCircle className="w-4 h-4" /> Cancel Order</DropdownMenuItem>
                       </DropdownMenuContent>
                    </DropdownMenu>
                 </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="px-8 py-8 border-t border-gray-50 dark:border-zinc-900 flex items-center justify-between bg-gray-50/30 dark:bg-zinc-900/10">
         <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Showing 5 of 1,234 orders</p>
         <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950" disabled><ChevronLeft className="w-4 h-4" /></Button>
            <div className="flex items-center gap-2">
               <Button className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black">1</Button>
               <Button variant="ghost" className="w-10 h-10 rounded-xl text-gray-400">2</Button>
               <Button variant="ghost" className="w-10 h-10 rounded-xl text-gray-400 text-[10px]">...</Button>
               <Button variant="ghost" className="w-10 h-10 rounded-xl text-gray-400 text-[10px]">49</Button>
            </div>
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950"><ChevronRight className="w-4 h-4" /></Button>
         </div>
      </div>
    </div>
  );
};

export default OrdersTable;
