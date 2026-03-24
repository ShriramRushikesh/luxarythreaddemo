import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import BrandShowcase from "@/components/sections/BrandShowcase";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import InstagramFeed from "@/components/sections/InstagramFeed";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandShowcase />
      <WhyChooseUs />
      <InstagramFeed />
      <Newsletter />
      <Footer />
    </main>
  );
}
