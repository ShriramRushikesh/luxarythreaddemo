"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  Heart, 
  Star, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const menuItems = [
  { name: "Profile", href: "/account/profile", icon: User },
  { name: "Orders", href: "/account/orders", icon: ShoppingBag, badge: 2 },
  { name: "Addresses", href: "/account/addresses", icon: MapPin },
  { name: "Wishlist", href: "/account/wishlist", icon: Heart, count: 5 },
  { name: "Reviews", href: "/account/reviews", icon: Star },
  { name: "Notifications", href: "/account/notifications", icon: Bell },
  { name: "Loyalty Points", href: "/account/loyalty", icon: TrendingUp },
  { name: "Settings", href: "/account/settings", icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Header />
      
      <main className="mt-32 mb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex gap-12">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-[280px] shrink-0 bg-background border border-border p-8 shadow-sm h-fit sticky top-32">
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-border">
             <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-playfair text-xl">JD</div>
             <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest">John Doe</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Premium Member</span>
             </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between p-4 group transition-all duration-300 border border-transparent",
                    isActive ? "bg-primary text-primary-foreground shadow-xl translate-x-1" : "hover:bg-muted/50 hover:border-border"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={cn("w-4 h-4", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary")} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.name}</span>
                  </div>
                  {item.badge && !isActive && (
                    <span className="bg-primary text-primary-foreground text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3 h-3 text-primary-foreground/50" />}
                </Link>
              );
            })}
            <button className="w-full flex items-center gap-4 p-4 mt-8 text-red-500 hover:bg-red-50 transition-all group">
               <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border px-6 py-4 flex justify-between items-center z-[60] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
         {[
           { icon: User, href: "/account/profile" },
           { icon: ShoppingBag, href: "/account/orders" },
           { icon: Heart, href: "/account/wishlist" },
           { icon: Bell, href: "/account/notifications" },
           { icon: Settings, href: "/account/settings" }
         ].map((item) => {
           const isActive = pathname === item.href;
           return (
             <Link key={item.href} href={item.href} className={cn(
               "p-3 rounded-full transition-all",
                isActive ? "bg-primary text-primary-foreground shadow-lg scale-110" : "text-muted-foreground"
             )}>
                <item.icon className="w-5 h-5" />
             </Link>
           );
         })}
      </nav>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
