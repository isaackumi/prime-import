'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    CheckCircle,
    Package,
    Truck,
    CreditCard,
    ArrowLeft,
    Home,
    Download,
    Mail
} from 'lucide-react'
import { useCart } from '@/contexts/cart-context'

function SuccessContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { clearCart } = useCart()
    const [order, setOrder] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const paymentIntent = searchParams.get('payment_intent')

        if (paymentIntent) {
            // Fetch order details
            fetch(`/api/orders/${paymentIntent}`)
                .then(res => res.json())
                .then(data => {
                    setOrder(data)
                    setIsLoading(false)
                })
                .catch(error => {
                    console.error('Error fetching order:', error)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }

        // Clear cart on successful payment
        clearCart()
    }, [searchParams, clearCart])

    const handleDownloadReceipt = () => {
        // Implement receipt download
        console.log('Downloading receipt...')
    }

    const handleEmailReceipt = () => {
        // Implement email receipt
        console.log('Emailing receipt...')
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-black mb-2">Payment Successful!</h1>
                    <p className="text-xl text-gray-600">Thank you for your purchase</p>
                </div>

                {/* Order Details */}
                {order && (
                    <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white mb-8">
                        <CardHeader className="bg-green-600 border-b-4 border-black">
                            <CardTitle className="text-2xl font-bold text-white flex items-center">
                                <Package className="w-6 h-6 mr-2" />
                                Order Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-bold text-black mb-4">Order Information</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Order Number:</span>
                                            <span className="font-bold">{order.orderNumber}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Date:</span>
                                            <span className="font-bold">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Status:</span>
                                            <Badge className="bg-green-100 text-green-800 border-green-600 font-bold">
                                                {order.status}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Payment:</span>
                                            <Badge className="bg-blue-100 text-blue-800 border-blue-600 font-bold">
                                                {order.paymentStatus}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-black mb-4">Customer Information</h3>
                                    <div className="space-y-2">
                                        <p className="font-bold">
                                            {order.customer.firstName} {order.customer.lastName}
                                        </p>
                                        <p className="text-gray-600">{order.customer.email}</p>
                                        <p className="text-gray-600">{order.customer.phone}</p>
                                        <div className="text-gray-600">
                                            <p>{order.shippingAddress.address1}</p>
                                            {order.shippingAddress.address2 && (
                                                <p>{order.shippingAddress.address2}</p>
                                            )}
                                            <p>
                                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                                            </p>
                                            <p>{order.shippingAddress.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mt-6">
                                <h3 className="text-lg font-bold text-black mb-4">Items Ordered</h3>
                                <div className="space-y-3">
                                    {order.items.map((item: any, index: number) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border-2 border-black">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-gray-200 border-2 border-black rounded"></div>
                                                <div>
                                                    <p className="font-bold text-black">{item.product?.name || 'Product'}</p>
                                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-black">${item.total.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Totals */}
                                <div className="mt-6 border-t-2 border-black pt-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span className="font-bold">${order.subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping:</span>
                                            <span className="font-bold text-green-600">Free</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax:</span>
                                            <span className="font-bold">${order.tax.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t-2 border-black pt-2">
                                            <div className="flex justify-between">
                                                <span className="text-lg font-bold text-black">Total:</span>
                                                <span className="text-2xl font-bold text-black">${order.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Button
                        onClick={handleDownloadReceipt}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download Receipt
                    </Button>

                    <Button
                        onClick={handleEmailReceipt}
                        variant="outline"
                        className="bg-white text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                        <Mail className="w-5 h-5 mr-2" />
                        Email Receipt
                    </Button>

                    <Button
                        onClick={() => router.push('/')}
                        variant="outline"
                        className="bg-white text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Continue Shopping
                    </Button>
                </div>

                {/* Shipping Information */}
                <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                    <CardHeader className="bg-blue-600 border-b-4 border-black">
                        <CardTitle className="text-2xl font-bold text-white flex items-center">
                            <Truck className="w-6 h-6 mr-2" />
                            Shipping Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Package className="w-6 h-6 text-blue-600" />
                                </div>
                                <h4 className="font-bold text-black">Order Confirmed</h4>
                                <p className="text-sm text-gray-600">Your order has been received</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Truck className="w-6 h-6 text-yellow-600" />
                                </div>
                                <h4 className="font-bold text-black">Processing</h4>
                                <p className="text-sm text-gray-600">We're preparing your order</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <CheckCircle className="w-6 h-6 text-gray-600" />
                                </div>
                                <h4 className="font-bold text-black">Shipped</h4>
                                <p className="text-sm text-gray-600">On its way to you</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    )
} 