'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
    ShoppingCart,
    Menu,
    User,
    Store,
    Search,
    LogOut,
    Shield
} from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function Navbar() {
    const { state } = useCart()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        setUser(null)
        router.push('/')
        toast.success('Logged out successfully')
    }

    return (
        <nav className="bg-white border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">PI</span>
                        </div>
                        <span className="text-xl font-bold text-black">Prime Importation</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/"
                            className="text-black hover:text-blue-600 font-bold transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="text-black hover:text-blue-600 font-bold transition-colors duration-200"
                        >
                            Products
                        </Link>
                        <Link
                            href="/stores"
                            className="text-black hover:text-blue-600 font-bold transition-colors duration-200"
                        >
                            Stores
                        </Link>
                        <Link
                            href="/about"
                            className="text-black hover:text-blue-600 font-bold transition-colors duration-200"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-black hover:text-blue-600 font-bold transition-colors duration-200"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden sm:flex bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                        >
                            <Search className="w-4 h-4" />
                        </Button>

                        {/* Cart */}
                        <Link href="/cart">
                            <Button
                                variant="outline"
                                size="sm"
                                className="relative bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {state.itemCount > 0 && (
                                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-2 border-black text-xs font-bold">
                                        {state.itemCount}
                                    </Badge>
                                )}
                            </Button>
                        </Link>

                        {/* User Menu */}
                        {user ? (
                            <div className="hidden sm:flex items-center space-x-2">
                                {user.role === 'super_admin' && (
                                    <Link href="/super-admin">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="bg-yellow-400 text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                                        >
                                            <Shield className="w-4 h-4 mr-1" />
                                            Admin
                                        </Button>
                                    </Link>
                                )}
                                <Button
                                    onClick={handleLogout}
                                    variant="outline"
                                    size="sm"
                                    className="bg-white text-red-600 border-red-600 hover:bg-red-50 font-bold"
                                >
                                    <LogOut className="w-4 h-4 mr-1" />
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center space-x-2">
                                <Link href="/sign-in">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                                    >
                                        <User className="w-4 h-4 mr-1" />
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/sign-up">
                                    <Button
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]"
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Create Store Button */}
                        <Button
                            className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]"
                        >
                            <Store className="w-4 h-4 mr-2" />
                            Create Store
                        </Button>

                        {/* Mobile Menu */}
                        <div className="md:hidden">
                            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                                    >
                                        <Menu className="w-4 h-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-80 bg-white border-l-4 border-black">
                                    <SheetHeader className="border-b-4 border-black pb-4">
                                        <SheetTitle className="text-2xl font-bold text-black">Menu</SheetTitle>
                                    </SheetHeader>

                                    <div className="py-4 space-y-4">
                                        <Link
                                            href="/"
                                            className="block text-black hover:text-blue-600 font-bold transition-colors duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Home
                                        </Link>
                                        <Link
                                            href="/products"
                                            className="block text-black hover:text-blue-600 font-bold transition-colors duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Products
                                        </Link>
                                        <Link
                                            href="/stores"
                                            className="block text-black hover:text-blue-600 font-bold transition-colors duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Stores
                                        </Link>
                                        <Link
                                            href="/about"
                                            className="block text-black hover:text-blue-600 font-bold transition-colors duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            About
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="block text-black hover:text-blue-600 font-bold transition-colors duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Contact
                                        </Link>

                                        {/* Mobile Auth Section */}
                                        {user ? (
                                            <div className="pt-4 border-t-2 border-black space-y-2">
                                                {user.role === 'super_admin' && (
                                                    <Link href="/super-admin">
                                                        <Button
                                                            className="w-full bg-yellow-400 text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            <Shield className="w-4 h-4 mr-2" />
                                                            Admin Dashboard
                                                        </Button>
                                                    </Link>
                                                )}
                                                <Button
                                                    onClick={() => {
                                                        handleLogout()
                                                        setIsMobileMenuOpen(false)
                                                    }}
                                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                                                >
                                                    <LogOut className="w-4 h-4 mr-2" />
                                                    Logout
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="pt-4 border-t-2 border-black space-y-2">
                                                <Link href="/sign-in">
                                                    <Button
                                                        className="w-full bg-white text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        <User className="w-4 h-4 mr-2" />
                                                        Sign In
                                                    </Button>
                                                </Link>
                                                <Link href="/sign-up">
                                                    <Button
                                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        Sign Up
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}

                                        <div className="pt-4 border-t-2 border-black">
                                            <Button
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <Store className="w-4 h-4 mr-2" />
                                                Create Store
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
} 