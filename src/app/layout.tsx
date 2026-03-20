import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MiniCart from "@/components/cart/MiniCart";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Cynkare | Premium Skincare & Beauty",
  description: "Premium skincare products, perfumes, and beauty essentials for glowing, flawless skin. Glow starts here with Cynkare.",
  keywords: "skincare, beauty, whitening lotions, black soap, face creams, perfumes, Ghana",
  openGraph: {
    title: "Cynkare | Premium Skincare & Beauty",
    description: "Premium skincare products for glowing, flawless skin",
    type: "website",
  },
  icons: {
    icon: "/cynkarelogo.PNG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <MiniCart />
        <WhatsAppButton />
      </body>
    </html>
  );
}
