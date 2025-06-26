"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarSidebar from "./navbar-sidebar";
import { useState } from "react";
import { Menu, MenuIcon } from "lucide-react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}

const NavbarItem = ({
    href,
    children,
    isActive
}: NavbarItemProps) => {
    return (
        <Button
            asChild
            variant="outline"
            className={cn("bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg", isActive && "bg-black text-white hover:bg-black hover:text-white")}
        >
            <Link href={href}>{children}</Link>
        </Button>
    );
}

const navbarItems = [
    {
        href: "/",
        children: "Home",
        isActive: false
    },
    {
        href: "/about",
        children: "About",
        isActive: false
    },
    {
        href: "/features",
        children: "Features",
        isActive: false
    },
    {
        href: "/pricing",
        children: "Pricing",
        isActive: false
    },
    {
        href: "/contact",
        children: "Contact",
        isActive: false
    }
];

export const Navbar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    return (
        <nav className="h-20 flex border-b justify-between font-medium bg-white">
            <Link href="/" className="pl-6 items-center flex">
                <span className={cn("text-5xl font-semibold", poppins.className)}>Shoppn</span>
            </Link>
            <NavbarSidebar items={navbarItems} open={open} onOpenChange={setOpen} />
            <div className="items-center gap-4 hidden lg:flex">
                {navbarItems.map((item) => (
                    <NavbarItem key={item.href} {...item} isActive={pathname === item.href} />
                ))}
            </div>
            <div className="hidden lg:flex items-center gap-4">
                <Button variant="secondary" className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg" asChild>
                    <Link href="/sign-in"> Login </Link>
                </Button>
                <Button variant="secondary" className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black  text-white hover:bg-pink-400 hover:text-black transition-colors text-lg" asChild>
                    <Link href="/sign-up"> Start Selling </Link>
                </Button>
                {/* <Button variant="elevated" className="rounded-full"> Start Selling</Button> */}
            </div>
            <div className="lg:hidden flex items-center justify-center">
                <Button variant="ghost" className="size-12 border-transparent bg-white" onClick={() => setOpen(true)}>
                    <MenuIcon />
                </Button>
            </div>
        </nav>
    );
};