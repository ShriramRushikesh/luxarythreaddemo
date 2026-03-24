"use client";

import React from "react";
import OrderDetailsView from "@/components/admin/orders/OrderDetailsView";

const OrderDetailPage = ({ params }: { params: { id: string } }) => {
  return <OrderDetailsView id={params.id} />;
};

export default OrderDetailPage;
