'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
    CreditCard,
    Truck,
    Shield,
    ArrowLeft,
    CheckCircle,
    AlertCircle,
    Loader2
} from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { trpc } from '@/lib/trpc/client'
import { toast } from 'sonner'

interface CheckoutForm {
    email: string
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    phone: string
}

function CheckoutContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { state, clearCart } = useCart()
    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending')

    const [formData, setFormData] = useState<CheckoutForm>({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
        phone: ''
    })

    // Check if payment was successful
    useEffect(() => {
        const payment_intent = searchParams.get('payment_intent')
        const payment_intent_client_secret = searchParams.get('payment_intent_client_secret')

        if (payment_intent && payment_intent_client_secret) {
            // Payment was successful, redirect to success page
            router.push(`/checkout/success?payment_intent=${payment_intent}`)
        }
    }, [searchParams, router])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validateForm = (): boolean => {
        const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'phone']
        for (const field of requiredFields) {
            if (!formData[field as keyof CheckoutForm]) {
                toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`)
                return false
            }
        }

        if (!formData.email.includes('@')) {
            toast.error('Please enter a valid email address')
            return false
        }

        return true
    }

    const handleCheckout = async () => {
        if (!validateForm()) return
        if (state.items.length === 0) {
            toast.error('Your cart is empty')
            return
        }

        setIsProcessing(true)
        setPaymentStatus('pending')

        try {
            // Create order in database
            const orderData = {
                items: state.items.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    storeId: item.storeId
                })),
                customer: {
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                    phone: formData.phone
                },
                total: state.total,
                status: 'pending'
            }

            // Create Stripe checkout session
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderData,
                    successUrl: `${window.location.origin}/checkout/success`,
                    cancelUrl: `${window.location.origin}/checkout`,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create checkout session')
            }

            const { url } = await response.json()

            // Redirect to Stripe Checkout
            window.location.href = url

        } catch (error) {
            console.error('Checkout error:', error)
            setPaymentStatus('failed')
            toast.error('Checkout failed. Please try again.')
        } finally {
            setIsProcessing(false)
        }
    }

    if (state.items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-12 max-w-md mx-auto">
                            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-black mb-4">Your Cart is Empty</h2>
                            <p className="text-gray-600 mb-8">You need to add items to your cart before checkout.</p>
                            <Button
                                onClick={() => router.push('/')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Continue Shopping
                            </Button>
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
                    <Button
                        onClick={() => router.push('/cart')}
                        variant="outline"
                        className="mb-4 bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Cart
                    </Button>
                    <h1 className="text-4xl font-bold text-black">Checkout</h1>
                    <p className="text-xl text-gray-600 mt-2">Complete your purchase</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Checkout Form */}
                    <div className="space-y-6">
                        {/* Customer Information */}
                        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                            <CardHeader className="bg-blue-600 border-b-4 border-black">
                                <CardTitle className="text-2xl font-bold text-white flex items-center">
                                    <CreditCard className="w-6 h-6 mr-2" />
                                    Customer Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="firstName" className="text-sm font-bold text-black">
                                            First Name *
                                        </Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="mt-1 border-2 border-black bg-white text-black"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName" className="text-sm font-bold text-black">
                                            Last Name *
                                        </Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="mt-1 border-2 border-black bg-white text-black"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="email" className="text-sm font-bold text-black">
                                        Email Address *
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 border-2 border-black bg-white text-black"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="phone" className="text-sm font-bold text-black">
                                        Phone Number *
                                    </Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="mt-1 border-2 border-black bg-white text-black"
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Shipping Address */}
                        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                            <CardHeader className="bg-green-600 border-b-4 border-black">
                                <CardTitle className="text-2xl font-bold text-white flex items-center">
                                    <Truck className="w-6 h-6 mr-2" />
                                    Shipping Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <Label htmlFor="address" className="text-sm font-bold text-black">
                                        Street Address *
                                    </Label>
                                    <Textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="mt-1 border-2 border-black bg-white text-black"
                                        rows={3}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="city" className="text-sm font-bold text-black">
                                            City *
                                        </Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="mt-1 border-2 border-black bg-white text-black"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="state" className="text-sm font-bold text-black">
                                            State/Province *
                                        </Label>
                                        <Input
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="mt-1 border-2 border-black bg-white text-black"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="zipCode" className="text-sm font-bold text-black">
                                            ZIP/Postal Code *
                                        </Label>
                                        <Input
                                            id="zipCode"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className="mt-1 border-2 border-black bg-white text-black"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="country" className="text-sm font-bold text-black">
                                            Country *
                                        </Label>
                                        <Input
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="mt-1 border-2 border-black bg-white text-black"
                                            required
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                            <CardHeader className="bg-purple-600 border-b-4 border-black">
                                <CardTitle className="text-2xl font-bold text-white flex items-center">
                                    <Shield className="w-6 h-6 mr-2" />
                                    Order Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {state.items.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-gray-100 border-2 border-black rounded"></div>
                                                <div>
                                                    <p className="font-bold text-black">{item.name}</p>
                                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-black">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}

                                    <div className="border-t-2 border-black pt-4 space-y-2">
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
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Button */}
                        <Button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-6 h-6 mr-2" />
                                    Proceed to Payment
                                </>
                            )}
                        </Button>

                        {/* Security Notice */}
                        <div className="bg-green-50 border-2 border-green-600 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-bold text-green-600">Secure Payment</span>
                            </div>
                            <p className="text-xs text-green-600 mt-1">
                                Your payment information is encrypted and secure
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    )
} 