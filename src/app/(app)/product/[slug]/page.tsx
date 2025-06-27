'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    ShoppingCart,
    Heart,
    Star,
    Plus,
    Minus,
    ArrowLeft,
    Truck,
    Shield,
    RotateCcw
} from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { trpc } from '@/lib/trpc/client'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'

export default function ProductPage() {
    const params = useParams()
    const slug = params.slug as string
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const { addItem } = useCart()

    const { data: product, isLoading, error } = trpc.products.getBySlug.useQuery({ slug })

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
                        <div className="space-y-6">
                            <div className="h-8 bg-gray-200 animate-pulse rounded" />
                            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2" />
                            <div className="h-4 bg-gray-200 animate-pulse rounded" />
                            <div className="h-12 bg-gray-200 animate-pulse rounded" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-red-50 p-8 max-w-md mx-auto">
                            <h3 className="text-xl font-bold text-red-600 mb-2">Product Not Found</h3>
                            <p className="text-red-500">{error?.message || 'The product you are looking for does not exist.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const discount = product.compareAtPrice
        ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
        : 0

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: typeof product.images?.[0]?.image === 'string'
                ? product.images[0].image
                : product.images?.[0]?.image?.url || '',
            storeId: typeof product.store === 'string' ? product.store : product.store?.slug || '',
            storeName: typeof product.store === 'string' ? '' : product.store?.name || '',
        })
        toast.success(`${quantity} ${product.name} added to cart!`)
    }

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Products
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg overflow-hidden">
                            {product.images && product.images[selectedImage] ? (
                                <Image
                                    src={typeof product.images[selectedImage].image === 'string'
                                        ? product.images[selectedImage].image
                                        : product.images[selectedImage].image.url || ''
                                    }
                                    alt={typeof product.images[selectedImage].image === 'string'
                                        ? product.name
                                        : product.images[selectedImage].image.alt || product.name
                                    }
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <span className="text-gray-500 font-bold">No Image</span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Images */}
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square relative bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg overflow-hidden transition-all duration-200 ${selectedImage === index
                                            ? 'border-blue-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                                            : 'hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                                            }`}
                                    >
                                        <Image
                                            src={typeof image.image === 'string' ? image.image : image.image.url || ''}
                                            alt={typeof image.image === 'string' ? product.name : image.image.alt || product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        {/* Store Name */}
                        {product.store && typeof product.store !== 'string' && (
                            <Link
                                href={`/store/${product.store.slug}`}
                                className="inline-block text-sm font-bold text-blue-600 hover:underline"
                            >
                                {product.store.name}
                            </Link>
                        )}

                        {/* Product Name */}
                        <h1 className="text-4xl font-bold text-black">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center space-x-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 font-bold">(24 reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-4">
                            <span className="text-3xl font-bold text-black">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.compareAtPrice && (
                                <span className="text-lg text-gray-500 line-through font-bold">
                                    ${product.compareAtPrice.toFixed(2)}
                                </span>
                            )}
                            {discount > 0 && (
                                <Badge className="bg-red-500 text-white border-2 border-black font-bold text-sm">
                                    -{discount}% OFF
                                </Badge>
                            )}
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed">
                                    {typeof product.description === 'string'
                                        ? product.description
                                        : 'Product description available'
                                    }
                                </p>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="flex items-center space-x-4">
                            <span className="text-lg font-bold text-black">Quantity:</span>
                            <div className="flex items-center border-2 border-black bg-white">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    className="w-10 h-10 p-0 hover:bg-gray-100 border-r border-black"
                                >
                                    <Minus className="w-4 h-4" />
                                </Button>
                                <span className="px-4 py-2 text-lg font-bold min-w-[3rem] text-center">
                                    {quantity}
                                </span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    className="w-10 h-10 p-0 hover:bg-gray-100 border-l border-black"
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={handleAddToCart}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
                            >
                                <ShoppingCart className="w-6 h-6 mr-2" />
                                Add to Cart
                            </Button>

                            <Button
                                variant="outline"
                                className="px-6 bg-white text-black font-bold py-4 text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
                            >
                                <Heart className="w-6 h-6" />
                            </Button>
                        </div>

                        <Separator />

                        {/* Product Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                                <Truck className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-bold">Free Shipping</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-blue-600" />
                                <span className="text-sm font-bold">Secure Payment</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RotateCcw className="w-5 h-5 text-orange-600" />
                                <span className="text-sm font-bold">30 Day Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 