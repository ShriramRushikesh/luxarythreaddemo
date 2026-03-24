"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950 font-sans transition-colors duration-300">
      <AdminSidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopbar setMobileOpen={setMobileOpen} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
