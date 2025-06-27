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
  title: "Prime Importation",
  description: "A modern multi-tenant e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} antialiased`}
      >
        <TRPCProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Toaster position="top-right" />
          </CartProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
