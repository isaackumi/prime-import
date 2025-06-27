'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Heart, Star, Plus, Minus } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { toast } from 'sonner'

interface ProductCardProps {
    product: {
        id: string
        name: string
        slug: string
        price: number
        compareAtPrice?: number
        images?: Array<{
            image: {
                url: string
                alt: string
            }
        }>
        store?: {
            name: string
            slug: string
        }
        isFeatured?: boolean
    }
}

export function ProductCard({ product }: ProductCardProps) {
    const [quantity, setQuantity] = useState(1)
    const { addItem } = useCart()
    const discount = product.compareAtPrice
        ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
        : 0

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.images?.[0]?.image.url,
            storeId: product.store?.slug || '',
            storeName: product.store?.name || '',
        })
        toast.success(`${quantity} ${product.name} added to cart!`)
    }

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity)
        }
    }

    return (
        <Card className="group border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
            <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative overflow-hidden border-b-4 border-black">
                    <div className="aspect-[4/3] relative bg-gray-100">
                        {product.images && product.images[0] ? (
                            <Image
                                src={product.images[0].image.url}
                                alt={product.images[0].image.alt || product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <span className="text-gray-500 font-bold">No Image</span>
                            </div>
                        )}

                        {/* Badges */}
                        <div className="absolute top-2 left-2 space-y-2">
                            {product.isFeatured && (
                                <Badge className="bg-yellow-400 text-black border-2 border-black font-bold">
                                    FEATURED
                                </Badge>
                            )}
                            {discount > 0 && (
                                <Badge className="bg-red-500 text-white border-2 border-black font-bold">
                                    -{discount}%
                                </Badge>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-8 h-8 p-0 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                            >
                                <Heart className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Store Name */}
                    {product.store && (
                        <Link
                            href={`/store/${product.store.slug}`}
                            className="text-xs font-bold text-blue-600 hover:underline"
                        >
                            {product.store.name}
                        </Link>
                    )}

                    {/* Product Name */}
                    <Link href={`/product/${product.slug}`}>
                        <h3 className="font-bold text-xl text-black hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                            {product.name}
                        </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600 font-bold">(24)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-black">
                            ${product.price.toFixed(2)}
                        </span>
                        {product.compareAtPrice && (
                            <span className="text-sm text-gray-500 line-through font-bold">
                                ${product.compareAtPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-black">Quantity:</span>
                        <div className="flex items-center border-2 border-black bg-white">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleQuantityChange(quantity - 1)}
                                className="w-8 h-8 p-0 hover:bg-gray-100 border-r border-black"
                            >
                                <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-bold min-w-[2rem] text-center">
                                {quantity}
                            </span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleQuantityChange(quantity + 1)}
                                className="w-8 h-8 p-0 hover:bg-gray-100 border-l border-black"
                            >
                                <Plus className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        onClick={handleAddToCart}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
} 