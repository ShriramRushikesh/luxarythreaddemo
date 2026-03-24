"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductSidebar from "@/components/products/ProductSidebar";
import ProductHeader from "@/components/products/ProductHeader";
import ProductCard from "@/components/products/ProductCard";
import ProductGrid, { ProductSkeleton } from "@/components/products/ProductGrid";
import FilterChips from "@/components/products/FilterChips";
import { Button } from "@/components/ui/button";
import { useProductFilters } from "@/hooks/use-product-filters";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

// Mock data generator
const generateMockProducts = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: `Premium Luxury Item ${i + 1}`,
    brand: ["Gucci", "Prada", "Louis Vuitton", "Zara", "Armani"][Math.floor(Math.random() * 5)],
    price: 5000 + Math.floor(Math.random() * 45000),
    salePrice: Math.random() > 0.7 ? 4000 + Math.floor(Math.random() * 40000) : undefined,
    images: [
      `https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=1920&auto=format&fit=crop`,
      `https://images.unsplash.com/photo-${1600000000000 + i}?q=80&w=1920&auto=format&fit=crop`,
    ],
    rating: 4 + Math.random(),
    isNew: Math.random() > 0.8,
    isSurplus: Math.random() > 0.9,
  }));
};

const ProductsContent = () => {
  const { filters } = useProductFilters();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  // Real implementation would fetch from /api/products?filters=...
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 1000)); // Simulate delay
      return generateMockProducts(24);
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="mt-24 mb-24 px-6 lg:px-12 max-w-[1800px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block w-full lg:w-[280px] shrink-0">
            <ProductSidebar />
          </aside>

          {/* Main Content */}
          <section className="flex-1">
            <ProductHeader count={156} view={view} setView={setView} />
            
            <FilterChips />

            {isLoading ? (
              <ProductGrid columns={view === 'grid' ? 4 : 1}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </ProductGrid>
            ) : products && products.length > 0 ? (
              <>
                <ProductGrid columns={view === 'grid' ? 4 : 1}>
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </ProductGrid>
                
                {/* Pagination */}
                <div className="mt-20 flex flex-col items-center gap-6">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
                    You've viewed 24 of 156 products
                  </p>
                  <div className="w-64 h-[2px] bg-muted relative">
                    <div className="absolute top-0 left-0 h-full w-[15%] bg-primary" />
                  </div>
                  <Button variant="outline" className="rounded-none px-12 py-7 uppercase tracking-[0.2em] font-bold border-black hover:bg-black hover:text-white transition-all h-auto mt-4">
                    Load More
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair mb-2">No products found</h3>
                  <p className="text-gray-400 text-sm italic">Try adjusting your filters to find what you're looking for.</p>
                </div>
                <Button onClick={() => window.location.href='/products'} variant="link" className="text-black uppercase tracking-widest font-bold border-b border-black rounded-none hover:no-underline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
