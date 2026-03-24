"use client";

import React from "react";
import { 
  Eye, 
  RefreshCcw, 
  MoreVertical,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "#LT-5021",
    customer: "Amit Sharma",
    date: "2 mins ago",
    total: "₹12,499",
    status: "Pending",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    products: "2 items"
  },
  {
    id: "#LT-5020",
    customer: "Priya Patel",
    date: "15 mins ago",
    total: "₹4,250",
    status: "Processing",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    products: "1 item"
  },
  {
    id: "#LT-5019",
    customer: "Rahul Verma",
    date: "1 hour ago",
    total: "₹28,900",
    status: "Shipped",
    color: "bg-purple-50 text-purple-600 border-purple-100",
    products: "3 items"
  },
  {
    id: "#LT-5018",
    customer: "Sneha Reddy",
    date: "3 hours ago",
    total: "₹15,000",
    status: "Delivered",
    color: "bg-green-50 text-green-600 border-green-100",
    products: "2 items"
  },
  {
    id: "#LT-5017",
    customer: "Vikram Singh",
    date: "5 hours ago",
    total: "₹8,750",
    status: "Cancelled",
    color: "bg-red-50 text-red-600 border-red-100",
    products: "1 item"
  }
];

const RecentOrdersTable = () => {
  return (
    <Card className="border-none shadow-sm dark:bg-zinc-900 mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Recent Orders</CardTitle>
          <div className="text-2xl font-playfair font-bold">Latest Transactions</div>
        </div>
        <Button variant="outline" size="sm" className="rounded-full text-[9px] font-bold uppercase tracking-widest gap-2">
          View All <ExternalLink className="w-3 h-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-50 dark:border-zinc-800">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Order #</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Products</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-gray-50 dark:border-zinc-800 group hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                <TableCell className="text-[11px] font-bold py-4">{order.id}</TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold">{order.customer}</span>
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest">{order.date}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-4">{order.products}</TableCell>
                <TableCell className="text-[11px] font-bold py-4">{order.total}</TableCell>
                <TableCell className="py-4">
                  <Badge variant="outline" className={cn("rounded-none text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 border-none", order.color)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="w-8 h-8 group-hover:bg-white dark:group-hover:bg-zinc-900 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="w-8 h-8 group-hover:bg-white dark:group-hover:bg-zinc-900 transition-colors">
                          <RefreshCcw className="w-3.5 h-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="text-[10px] font-bold uppercase tracking-widest">
                        <DropdownMenuItem>Mark as Shipped</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Delivered</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Cancel Order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTable;
