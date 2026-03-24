"use client";

import React from "react";
import { Search, Bell, Moon, Sun, Monitor, User, Settings, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";

const AdminTopbar = ({ setMobileOpen }: { setMobileOpen: (v: boolean) => void }) => {
  const { setTheme, theme } = useTheme();

  return (
    <header className="h-20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 w-full max-w-xl">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden" 
          onClick={() => setMobileOpen(true)}
        >
           <Menu className="w-5 h-5" />
        </Button>
        
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
          <Input 
            placeholder="Global search: orders, products, customers..." 
            className="pl-10 h-10 bg-gray-50/50 dark:bg-zinc-900/50 border-transparent focus:bg-white dark:focus:bg-zinc-900 focus:border-gray-200 dark:focus:border-zinc-700 transition-all rounded-full text-[10px] font-bold uppercase tracking-widest w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
              <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 rounded-xl">
            <DropdownMenuItem onClick={() => setTheme("light")} className="text-[10px] font-bold uppercase tracking-widest gap-3">
              <Sun className="w-4 h-4" /> Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="text-[10px] font-bold uppercase tracking-widest gap-3">
              <Moon className="w-4 h-4" /> Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="text-[10px] font-bold uppercase tracking-widest gap-3">
              <Monitor className="w-4 h-4" /> System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full relative">
           <Bell className="w-[1.1rem] h-[1.1rem]" />
           <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950" />
        </Button>

        {/* User Account */}
        <DropdownMenu>
          <DropdownMenuTrigger>
             <button className="flex items-center gap-3 p-1 pl-3 pr-1 rounded-full border border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all group">
                <span className="hidden sm:inline text-[9px] font-bold uppercase tracking-widest">Admin User</span>
                <Avatar className="w-8 h-8 group-hover:scale-95 transition-transform">
                   <AvatarImage src="/images/admin-avatar.jpg" />
                   <AvatarFallback className="bg-black text-white text-[10px] font-bold">AD</AvatarFallback>
                </Avatar>
             </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl overflow-hidden p-2">
            <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-gray-400 p-3">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="opacity-50" />
            <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest p-3 gap-4 rounded-lg cursor-pointer">
              <User className="w-4 h-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest p-3 gap-4 rounded-lg cursor-pointer">
              <Settings className="w-4 h-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="opacity-50" />
            <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest p-3 gap-4 rounded-lg cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
              <LogOut className="w-4 h-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminTopbar;
