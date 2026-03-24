"use client";

import React from "react";
import { ReportGenerator } from "@/components/admin/analytics/ReportGenerator";

export default function AdminReportsPage() {
  return (
    <div className="max-w-[1400px] mx-auto pb-10">
      <ReportGenerator />
    </div>
  );
}
