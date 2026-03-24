import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: "Luxury Threads Pune | Authentic Luxury Fashion",
  description: "Experience the pinnacle of fashion with Luxury Threads Pune. Authentic luxury at affordable prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans")}>
      <body className={cn(
        "min-h-screen font-sans antialiased",
        inter.variable,
        playfair.variable
      )}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
