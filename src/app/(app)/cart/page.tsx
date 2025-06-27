'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    ShoppingCart,
    ArrowLeft,
    Plus,
    Minus,
    Trash2,
    CreditCard,
    Truck,
    LogIn
} from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { toast } from 'sonner'

export default function CartPage() {
    const { state, removeItem, updateQuantity, clearCart } = useCart()
    const [couponCode, setCouponCode] = useState('')
    const [user, setUser] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity >= 1) {
            updateQuantity(id, newQuantity)
        }
    }

    const handleRemoveItem = (id: string) => {
        removeItem(id)
        toast.success('Item removed from cart')
    }

    const handleClearCart = () => {
        clearCart()
        toast.success('Cart cleared')
    }

    const handleApplyCoupon = () => {
        // Implement coupon logic
        toast.info('Coupon functionality coming soon!')
    }

    const handleCheckout = () => {
        if (!user) {
            toast.error('Please sign in to checkout')
            router.push('/sign-in')
            return
        }

        if (state.items.length === 0) {
            toast.error('Your cart is empty')
            return
        }

        // Redirect to checkout page
        router.push('/checkout')
    }

    if (state.items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-12 max-w-md mx-auto">
                            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-black mb-4">Your Cart is Empty</h2>
                            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
                            <Link href="/">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                    </Link>
                    <h1 className="text-4xl font-bold text-black">Shopping Cart</h1>
                    <p className="text-gray-600 mt-2">
                        {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {state.items.map((item) => (
                            <Card key={item.id} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4">
                                        {/* Product Image */}
                                        <div className="relative w-24 h-24 bg-gray-100 border-2 border-black">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-gray-500 text-xs font-bold">No Image</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-black mb-1">{item.name}</h3>
                                            <p className="text-sm text-gray-600 mb-2">Store: {item.storeName}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xl font-bold text-black">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 p-0 border-2 border-black bg-white hover:bg-gray-100"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </Button>
                                                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 p-0 border-2 border-black bg-white hover:bg-gray-100"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-600 border-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Clear Cart Button */}
                        <div className="text-right">
                            <Button
                                variant="outline"
                                onClick={handleClearCart}
                                className="text-red-600 border-red-600 hover:bg-red-50 font-bold"
                            >
                                Clear Cart
                            </Button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white sticky top-4">
                            <CardHeader className="bg-blue-600 border-b-4 border-black">
                                <CardTitle className="text-2xl font-bold text-white">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                {/* Authentication Notice */}
                                {!user && (
                                    <div className="bg-yellow-50 border-2 border-yellow-600 p-4 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <LogIn className="w-5 h-5 text-yellow-600" />
                                            <span className="text-sm font-bold text-yellow-600">Sign In Required</span>
                                        </div>
                                        <p className="text-xs text-yellow-600 mt-1">
                                            You need to sign in to complete your purchase
                                        </p>
                                        <Link href="/sign-in">
                                            <Button className="w-full mt-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                                                Sign In to Checkout
                                            </Button>
                                        </Link>
                                    </div>
                                )}

                                {/* Coupon Code */}
                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">
                                        Coupon Code
                                    </label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Enter coupon code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            className="flex-1 border-2 border-black bg-white text-black placeholder:text-black/60"
                                        />
                                        <Button
                                            onClick={handleApplyCoupon}
                                            className="bg-yellow-400 text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-bold">${state.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-bold text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="font-bold">$0.00</span>
                                    </div>
                                    <div className="border-t-2 border-black pt-2">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-bold text-black">Total</span>
                                            <span className="text-2xl font-bold text-black">${state.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Button
                                    onClick={handleCheckout}
                                    disabled={!user}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <CreditCard className="w-5 h-5 mr-2" />
                                    {user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
                                </Button>

                                {/* Shipping Info */}
                                <div className="bg-green-50 border-2 border-green-600 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Truck className="w-5 h-5 text-green-600" />
                                        <span className="text-sm font-bold text-green-600">Free Shipping</span>
                                    </div>
                                    <p className="text-xs text-green-600 mt-1">
                                        Orders over $50 qualify for free shipping
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
} 