import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-white pt-20 pb-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold font-playfair mb-6">LT PUNE</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Luxury Threads Pune brings you the finest selection of authentic luxury apparel and accessories. Curated for the modern connoisseur.
          </p>
          <div className="flex gap-4">
            <Link href="#"><Facebook className="w-5 h-5 hover:text-gray-300 transition-colors" /></Link>
            <Link href="#"><Instagram className="w-5 h-5 hover:text-gray-300 transition-colors" /></Link>
            <Link href="#"><Twitter className="w-5 h-5 hover:text-gray-300 transition-colors" /></Link>
            <Link href="#"><Youtube className="w-5 h-5 hover:text-gray-300 transition-colors" /></Link>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Shop</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/products?gender=men" className="hover:text-white transition-colors">Men's Collection</Link></li>
            <li><Link href="/products?gender=women" className="hover:text-white transition-colors">Women's Collection</Link></li>
            <li><Link href="/products?status=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link href="/products?view=brands" className="hover:text-white transition-colors">Featured Brands</Link></li>
            <li><Link href="/products?status=sale" className="hover:text-white transition-colors">Flash Sale</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Customer Service</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Track Your Order</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Visit Our Store</h4>
          <p className="text-gray-400 text-sm mb-4">
            Koregaon Park, Lane 7<br />
            Pune, Maharashtra 411001
          </p>
          <p className="text-gray-400 text-sm mb-4">
            Email: care@luxurythreads.in<br />
            Phone: +91 98765 43210
          </p>
          <div className="mt-8">
            <h5 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">Secure Payment</h5>
            <div className="flex gap-4 grayscale opacity-70">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" className="h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 text-center text-xs text-gray-500 tracking-widest uppercase">
        © {new Date().getFullYear()} Luxury Threads Pune. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
