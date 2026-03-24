"use client";

import React from "react";
import OrderFilters from "@/components/admin/orders/OrderFilters";
import OrdersTable from "@/components/admin/orders/OrdersTable";

const AdminOrdersPage = () => {
  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-2 h-8 bg-black dark:bg-white rounded-full" />
             <h1 className="text-4xl font-playfair font-bold">Orders</h1>
          </div>
          <p className="text-[12px] text-gray-400 font-bold uppercase tracking-[0.3em] pl-5">Manage and track store fulfillment</p>
        </div>
      </div>

      <OrderFilters />
      <OrdersTable />
    </div>
  );
};

export default AdminOrdersPage;
