'use client'

import { ProductCard } from './product-card'
import { trpc } from '@/lib/trpc/client'

interface ProductsGridProps {
    storeSlug?: string
    category?: string
    limit?: number
}

export function ProductsGrid({ storeSlug, category, limit = 12 }: ProductsGridProps) {
    const { data: products, isLoading, error } = trpc.products.getAll.useQuery({
        storeSlug,
        category,
        limit,
    })

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white animate-pulse"
                    >
                        <div className="aspect-[4/3] bg-gray-200 border-b-4 border-black" />
                        <div className="p-6 space-y-4">
                            <div className="h-4 bg-gray-200 rounded" />
                            <div className="h-6 bg-gray-200 rounded" />
                            <div className="h-4 bg-gray-200 rounded w-1/2" />
                            <div className="h-10 bg-gray-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-red-50 p-8 max-w-md mx-auto">
                    <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Products</h3>
                    <p className="text-red-500">{error.message}</p>
                </div>
            </div>
        )
    }

    if (!products?.docs || products.docs.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-yellow-50 p-8 max-w-md mx-auto">
                    <h3 className="text-xl font-bold text-yellow-600 mb-2">No Products Found</h3>
                    <p className="text-yellow-500">Try adjusting your search criteria</p>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.docs.map((product) => (
                <ProductCard
                    key={product.id}
                    product={{
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        compareAtPrice: product.compareAtPrice || undefined,
                        images: product.images?.map(img => ({
                            image: {
                                url: typeof img.image === 'string' ? img.image : img.image.url || '',
                                alt: typeof img.image === 'string' ? '' : img.image.alt || '',
                            }
                        })) || undefined,
                        store: typeof product.store === 'string' ? undefined : product.store ? {
                            name: product.store.name,
                            slug: product.store.slug,
                        } : undefined,
                        isFeatured: product.isFeatured || undefined,
                    }}
                />
            ))}
        </div>
    )
} 