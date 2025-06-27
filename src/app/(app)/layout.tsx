import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc/provider";
import { CartProvider } from "@/contexts/cart-context";
import { Navbar } from "@/components/navigation/navbar";
import { Toaster } from "sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prime Importation - B2B & B2C Import/Export Solutions",
  description: "Leading importation business providing B2B and B2C solutions. Connect global suppliers with businesses and consumers worldwide.",
  keywords: "importation, B2B, B2C, global trade, suppliers, wholesale, retail, import export",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCProvider>
      <CartProvider>
        <Navbar />
        {children}
        <Toaster position="top-right" />
      </CartProvider>
    </TRPCProvider>
  );
}
