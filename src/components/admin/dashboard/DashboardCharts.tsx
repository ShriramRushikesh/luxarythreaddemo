"use client";

import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Sales Overview Data
const salesData = [
  { name: "Oct 01", revenue: 45000 },
  { name: "Oct 05", revenue: 52000 },
  { name: "Oct 10", revenue: 48000 },
  { name: "Oct 15", revenue: 61000 },
  { name: "Oct 20", revenue: 55000 },
  { name: "Oct 25", revenue: 67000 },
  { name: "Oct 30", revenue: 72000 },
];

// Order Status Data
const orderStatusData = [
  { name: "Delivered", value: 65, color: "#10b981" },
  { name: "Shipped", value: 20, color: "#3b82f6" },
  { name: "Processing", value: 10, color: "#f59e0b" },
  { name: "Cancelled", value: 5, color: "#ef4444" },
];

// Top Products Data
const topProductsData = [
  { name: "Gucci Belt", revenue: 125000 },
  { name: "Prada Bag", revenue: 98000 },
  { name: "LV Wallet", revenue: 85000 },
  { name: "Dior Tee", revenue: 72000 },
  { name: "Rolex Sub", revenue: 210000 },
];

// Revenue by Category Data
const categoryData = [
  { name: "Men's", value: 45, color: "#000000" },
  { name: "Women's", value: 35, color: "#666666" },
  { name: "Accessories", value: 20, color: "#999999" },
];

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
      {/* Sales Overview */}
      <Card className="border-none shadow-sm dark:bg-zinc-900">
        <CardHeader>
           <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Sales Overview</CardTitle>
           <CardDescription className="text-2xl font-playfair font-bold text-black dark:text-white">Monthly Revenue</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] pt-4">
           <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis 
                   dataKey="name" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 10, fontWeight: 700 }}
                   dy={10}
                 />
                 <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 10, fontWeight: 700 }}
                   tickFormatter={(v) => `₹${v/1000}k`}
                 />
                 <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                   cursor={{ stroke: '#000', strokeWidth: 1 }}
                 />
                 <Line 
                   type="monotone" 
                   dataKey="revenue" 
                   stroke="#000" 
                   strokeWidth={3} 
                   dot={{ r: 4, fill: '#000', strokeWidth: 2, stroke: '#fff' }} 
                   activeDot={{ r: 6, strokeWidth: 0 }}
                 />
              </LineChart>
           </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Order Status */}
      <Card className="border-none shadow-sm dark:bg-zinc-900">
        <CardHeader>
           <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Order Fulfillment</CardTitle>
           <CardDescription className="text-2xl font-playfair font-bold text-black dark:text-white">Status Distribution</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center">
           <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                 <Pie
                   data={orderStatusData}
                   innerRadius={80}
                   outerRadius={120}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {orderStatusData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip />
                 <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
           </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card className="border-none shadow-sm dark:bg-zinc-900">
        <CardHeader>
           <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Performance</CardTitle>
           <CardDescription className="text-2xl font-playfair font-bold text-black dark:text-white">Top Selling Products</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] pt-4">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData} layout="vertical">
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                 <XAxis 
                   type="number" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 10, fontWeight: 700 }}
                   tickFormatter={(v) => `₹${v/1000}k`}
                 />
                 <YAxis 
                   dataKey="name" 
                   type="category" 
                   axisLine={false} 
                   tickLine={false}
                   tick={{ fontSize: 10, fontWeight: 700 }}
                   width={100}
                 />
                 <Tooltip cursor={{ fill: '#f8fafc' }} />
                 <Bar dataKey="revenue" fill="#000" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
           </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue by Category */}
      <Card className="border-none shadow-sm dark:bg-zinc-900">
        <CardHeader>
           <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Market Share</CardTitle>
           <CardDescription className="text-2xl font-playfair font-bold text-black dark:text-white">Revenue by Category</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center">
           <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                 <Pie
                   data={categoryData}
                   cx="50%"
                   cy="50%"
                   labelLine={false}
                   outerRadius={120}
                   fill="#8884d8"
                   dataKey="value"
                 >
                   {categoryData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip />
                 <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
           </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
