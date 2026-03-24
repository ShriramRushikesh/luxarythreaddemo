"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGallery from "@/components/products/detail/ProductGallery";
import ProductInfo from "@/components/products/detail/ProductInfo";
import ProductFeatures from "@/components/products/detail/ProductFeatures";
import ProductTabs from "@/components/products/detail/ProductTabs";
import ProductReviews from "@/components/products/detail/ProductReviews";
import ProductCarousel from "@/components/products/detail/ProductCarousel";
import { Share2, Facebook, Twitter, Link as LinkIcon, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockProduct = {
  id: 1,
  name: "Premium Luxury Supima Cotton T-Shirt",
  brand: "Zara Premium",
  price: 3999,
  salePrice: 2499,
  rating: 4.5,
  reviewsCount: 124,
  sku: "LT-MTS-001",
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596755094514-f87034a26cc1?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594932224011-37d402b43b67?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617137968427-839f26ce17ad?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539109132314-3477524c859c?q=80&w=1974&auto=format&fit=crop",
  ],
  variants: [
    { size: "S", stock: 10 },
    { size: "M", stock: 15 },
    { size: "L", stock: 3 },
    { size: "XL", stock: 0 },
  ],
};

const relatedProducts = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 10,
  name: `Premium Related Item ${i + 1}`,
  brand: "Zara Luxury",
  price: 2000 + (i * 500),
  salePrice: i % 2 === 0 ? 1500 + (i * 500) : undefined,
  images: [
    `https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=1920&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-${1600000000000 + i}?q=80&w=1920&auto=format&fit=crop`,
  ],
  rating: 4.5,
  isNew: true,
}));

const ProductDetailPage = () => {
  // JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": mockProduct.name,
    "image": mockProduct.images,
    "description": "Premium Luxury Supima Cotton T-Shirt from Zara Premium collection. Authentic export surplus.",
    "sku": mockProduct.sku,
    "brand": {
      "@type": "Brand",
      "name": mockProduct.brand
    },
    "offers": {
      "@type": "Offer",
      "url": "https://luxurythreads.in/products/premium-tshirt",
      "priceCurrency": "INR",
      "price": mockProduct.salePrice,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": mockProduct.rating,
      "reviewCount": mockProduct.reviewsCount
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mt-28 mb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 mb-24">
          {/* Left: Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={mockProduct.images} />
          </div>

          {/* Right: Info & Actions */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <ProductInfo product={mockProduct} />
            <ProductFeatures />
            
            {/* Share Buttons */}
            <div className="pt-6 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Share with Friends</h4>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="rounded-full border-gray-100 hover:bg-green-500 hover:text-white transition-all">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-gray-100 hover:bg-blue-600 hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-gray-100 hover:bg-black hover:text-white transition-all">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-gray-100 hover:bg-gray-100 transition-all">
                  <LinkIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Bottom Content */}
        <div className="space-y-24">
          <ProductTabs>
            {{
              description: (
                <div className="max-w-4xl space-y-6">
                  <p className="text-sm text-gray-500 leading-relaxed italic border-l-4 border-gray-100 pl-6 py-2">
                    "Experience the ultimate comfort of the finest Supima cotton. Our Premium Luxury T-shirt is a testament to timeless style and exceptional craftsmanship, meticulously sourced from authentic export surplus collections."
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Elevate your everyday essentials with our Premium Luxury Supima Cotton T-Shirt. Crafted from long-staple cotton fibers, this piece offers an incredibly soft hand-feel, a subtle sheen, and remarkable durability. The tailored fit ensures a sophisticated look, whether worn as a standalone statement or layered under a sharp blazer.
                  </p>
                  <div className="grid grid-cols-2 gap-12 pt-6">
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Highlights</h5>
                      <ul className="text-xs text-gray-500 space-y-2 list-disc pl-4">
                        <li>Long-staple Supima cotton</li>
                        <li>High-tenacity stitching</li>
                        <li>Fade-resistant colors</li>
                        <li>Pre-shrunk fabric</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Composition</h5>
                      <p className="text-xs text-gray-500">100% Pima Cotton. Ethically sourced and processed to reduce environmental impact. OEKO-TEX certified.</p>
                    </div>
                  </div>
                </div>
              ),
              "size-fit": (
                <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      This t-shirt is designed for a **true-to-size classic fit**. If you prefer a more relaxed or oversized look, we recommend sizing up.
                    </p>
                    <table className="w-full text-xs text-left">
                      <thead className="border-b border-gray-100">
                        <tr>
                          <th className="py-3 uppercase tracking-widest font-bold">Size (cm)</th>
                          <th className="py-3 uppercase tracking-widest font-bold">Chest</th>
                          <th className="py-3 uppercase tracking-widest font-bold">Length</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        <tr><td className="py-3 font-medium">S</td><td>96</td><td>68</td></tr>
                        <tr><td className="py-3 font-medium">M</td><td>102</td><td>70</td></tr>
                        <tr><td className="py-3 font-medium">L</td><td>108</td><td>72</td></tr>
                        <tr><td className="py-3 font-medium">XL</td><td>114</td><td>74</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-gray-50 p-8 flex items-center justify-center border border-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop" 
                      alt="Size Reference" 
                      className="w-full h-auto grayscale opacity-50"
                    />
                  </div>
                </div>
              ),
              reviews: <ProductReviews />,
            }}
          </ProductTabs>

          <ProductCarousel title="You may also like" products={relatedProducts} />
          <ProductCarousel title="Recently viewed" products={relatedProducts.slice(0, 4)} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
