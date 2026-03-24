"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Heart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import CartSidebar from "../cart/CartSidebar";

const navItems = [
  { name: "Men", href: "/products?gender=men" },
  { name: "Women", href: "/products?gender=women" },
  { name: "New Arrivals", href: "/products?status=new" },
  { name: "Brands", href: "/brands" },
  { name: "Sale", href: "/products?status=sale" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { onOpen, items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Men", href: "/products?gender=men" },
    { name: "Women", href: "/products?gender=women" },
    { name: "New Arrivals", href: "/products?status=new" },
    { name: "Brands", href: "/products?view=brands" },
    { name: "Sale", href: "/products?status=sale" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12",
          isScrolled ? "bg-background/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className={cn(
              "text-2xl font-bold tracking-tighter font-playfair transition-colors duration-300",
              isScrolled ? "text-primary" : "text-white"
            )}
          >
            LT <span className="text-sm font-light tracking-widest ml-1 uppercase">Pune</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium uppercase tracking-widest transition-colors duration-300",
                  isScrolled ? "text-muted-foreground hover:text-primary" : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className={cn(
            "flex items-center gap-4 sm:gap-6 transition-colors duration-300",
            isScrolled ? "text-primary" : "text-white"
          )}>
            <button className="p-2 hover:bg-gray-100/10 rounded-full transition-all">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/account/wishlist" className="p-2 hover:bg-gray-100/10 rounded-full transition-all relative">
              <Heart className="w-5 h-5" />
              <span className={cn(
                "absolute top-1 right-1 w-2 h-2 rounded-full border-2",
                isScrolled ? "bg-black border-white" : "bg-white border-black"
              )} />
            </Link>
            <button 
              onClick={onOpen}
              className="p-2 hover:bg-gray-100/10 rounded-full transition-all relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {items.length > 0 && (
                <span className={cn(
                  "absolute -top-1 -right-1 text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 transition-colors duration-300",
                  isScrolled ? "bg-black text-white border-white" : "bg-white text-black border-black"
                )}>
                  {items.length}
                </span>
              )}
            </button>
            <Link href="/account" className="p-2 hover:bg-gray-100/10 rounded-full transition-all">
              <User className="w-5 h-5" />
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100/10 rounded-full transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <CartSidebar />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-bold font-playfair">LT PUNE</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-medium uppercase tracking-widest border-b border-border pb-2"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
