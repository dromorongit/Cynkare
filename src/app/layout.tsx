import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import ConditionalMiniCart from "@/components/cart/ConditionalMiniCart";
import ConditionalWhatsAppButton from "@/components/ui/ConditionalWhatsAppButton";

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
        <ConditionalHeader />
        <main>{children}</main>
        <ConditionalFooter />
        <ConditionalMiniCart />
        <ConditionalWhatsAppButton />
      </body>
    </html>
  );
}
