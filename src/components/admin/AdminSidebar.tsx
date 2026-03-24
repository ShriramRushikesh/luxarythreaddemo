"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Tag, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Package,
  Layers,
  Database,
  Mail,
  Menu,
  X,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { 
    name: "Products", 
    href: "/admin/products", 
    icon: Package,
    submenu: [
      { name: "All Products", href: "/admin/products" },
      { name: "Add Product", href: "/admin/products/new" },
      { name: "Categories", href: "/admin/products/categories" },
      { name: "Brands", href: "/admin/products/brands" },
      { name: "Inventory", href: "/admin/products/inventory" },
    ]
  },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag, badge: "New" },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { 
    name: "Analytics", 
    href: "/admin/analytics", 
    icon: BarChart3,
    submenu: [
      { name: "Overview", href: "/admin/analytics" },
      { name: "Reports", href: "/admin/reports" },
    ]
  },
  { 
    name: "Marketing", 
    href: "/admin/marketing", 
    icon: Tag,
    submenu: [
      { name: "Overview", href: "/admin/marketing" },
      { name: "Coupons", href: "/admin/marketing/coupons" },
      { name: "Newsletter", href: "/admin/marketing/newsletter" },
      { name: "Banners", href: "/admin/marketing/banners" },
      { name: "Flash Sales", href: "/admin/marketing/flash-sales" },
      { name: "Loyalty", href: "/admin/marketing/loyalty" },
    ]
  },
  { 
    name: "Logistics", 
    href: "/admin/logistics", 
    icon: Truck,
    submenu: [
      { name: "Dashboard", href: "/admin/logistics" },
      { name: "Carriers", href: "/admin/logistics/carriers" },
      { name: "Labels", href: "/admin/logistics/labels" },
      { name: "Warehouse", href: "/admin/logistics/warehouse" },
      { name: "Returns", href: "/admin/logistics/returns" },
    ]
  },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminSidebar = ({ 
  isCollapsed, 
  setIsCollapsed,
  mobileOpen,
  setMobileOpen
}: { 
  isCollapsed: boolean, 
  setIsCollapsed: (v: boolean) => void,
  mobileOpen: boolean,
  setMobileOpen: (v: boolean) => void
}) => {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 bg-white dark:bg-zinc-950 border-r border-gray-100 dark:border-zinc-800 transition-all duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none",
        isCollapsed ? "w-[80px]" : "w-[280px]",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-50 dark:border-zinc-900">
          {!isCollapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-playfair font-bold tracking-tight">LT <span className="text-gray-400">Admin</span></span>
            </Link>
          )}
          {isCollapsed && (
            <div className="mx-auto text-xl font-playfair font-bold tracking-tight text-center">LT</div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileOpen(false)}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-8">
           <div className="px-4 space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || (item.submenu && item.submenu.some(s => pathname === s.href));
                const hasSubmenu = !!item.submenu;
                
                return (
                  <div key={item.name} className="space-y-1">
                    {hasSubmenu ? (
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-lg transition-all text-sm font-bold uppercase tracking-widest",
                          isActive ? "bg-black text-white dark:bg-white dark:text-black shadow-lg" : "text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white"
                        )}
                      >
                         <div className="flex items-center gap-4">
                            <item.icon className="w-4 h-4 shrink-0" />
                            {!isCollapsed && <span>{item.name}</span>}
                         </div>
                         {!isCollapsed && (
                           <ChevronDown className={cn("w-3 h-3 transition-transform", openSubmenu === item.name && "rotate-180")} />
                         )}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg transition-all text-sm font-bold uppercase tracking-widest",
                          isActive ? "bg-black text-white dark:bg-white dark:text-black shadow-lg" : "text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white"
                        )}
                      >
                         <div className="flex items-center gap-4">
                            <item.icon className="w-4 h-4 shrink-0" />
                            {!isCollapsed && <span>{item.name}</span>}
                         </div>
                         {!isCollapsed && item.badge && (
                            <span className="bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                               {item.badge}
                            </span>
                         )}
                      </Link>
                    )}

                    {/* Submenu */}
                    {hasSubmenu && openSubmenu === item.name && !isCollapsed && (
                      <div className="ml-10 mt-2 space-y-1">
                         {item.submenu!.map((sub) => (
                           <Link
                             key={sub.name}
                             href={sub.href}
                             className={cn(
                               "block py-2 text-[10px] font-bold uppercase tracking-widest transition-colors",
                               pathname === sub.href ? "text-black dark:text-white" : "text-gray-400 hover:text-black dark:hover:text-white"
                             )}
                           >
                              {sub.name}
                           </Link>
                         ))}
                      </div>
                    )}
                  </div>
                );
              })}
           </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-50 dark:border-zinc-900">
           {!isCollapsed ? (
             <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-zinc-900 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs uppercase">AD</div>
                <div className="flex flex-col overflow-hidden">
                   <span className="text-[10px] font-bold uppercase tracking-widest truncate">Admin User</span>
                   <span className="text-[8px] text-gray-400 uppercase tracking-widest truncate">admin@luxurythreads.in</span>
                </div>
             </div>
           ) : (
             <div className="w-10 h-10 mx-auto rounded-full bg-black text-white flex items-center justify-center font-bold text-xs uppercase">AD</div>
           )}
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
