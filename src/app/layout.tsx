import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./(app)/globals.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Prime Importation - B2B & B2C Import/Export Solutions",
    description: "Leading importation business providing B2B and B2C solutions. Connect global suppliers with businesses and consumers worldwide.",
    keywords: "importation, B2B, B2C, global trade, suppliers, wholesale, retail, import export",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${dmSans.className} antialiased`}>
                {children}
            </body>
        </html>
    );
} 