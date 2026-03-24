"use client";

import React from "react";
import { AbandonedCartTracker } from "@/components/admin/marketing/AbandonedCartTracker";

export default function AdminAbandonedCartsPage() {
  return (
    <div className="max-w-[1400px] mx-auto pb-10">
      <AbandonedCartTracker />
    </div>
  );
}
