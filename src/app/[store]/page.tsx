'use client'

import { useEffect, useState, Suspense } from 'react'
import { ProductsGrid } from '@/components/products/products-grid'
import { CategoriesSidebar } from '@/components/categories/categories-sidebar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { trpc } from '@/lib/trpc/client'
import { useSearchParams } from 'next/navigation'
import { redirect } from 'next/navigation'
import { useIsMobile } from '@/hooks/use-mobile'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Filter, X } from 'lucide-react'

export default function StorePage() {
    const [searchTerm, setSearchTerm] = useState('')
    const searchParams = useSearchParams()
    const category = searchParams.get('category')
    const isMobile = useIsMobile()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Get store slug from subdomain or URL
    const [storeSlug, setStoreSlug] = useState('')

    useEffect(() => {
        // Extract subdomain from hostname
        const hostname = window.location.hostname
        const pathname = window.location.pathname

        // Try to get store slug from subdomain first
        let slug = ''
        const subdomain = hostname.split('.')[0]

        // Check if this is a Vercel domain (contains vercel.app)
        const isVercelDomain = hostname.includes('vercel.app')

        if (hostname.includes('.') && subdomain !== 'www' && subdomain !== 'localhost' && !isVercelDomain) {
            // Only use subdomain if it's not a Vercel domain
            slug = subdomain
        } else {
            // For Vercel domains or localhost, extract from pathname
            const pathSegments = pathname.split('/').filter(Boolean)
            if (pathSegments.length > 0) {
                slug = pathSegments[0]
            }
        }

        console.log('Store detection:', { hostname, pathname, subdomain, isVercelDomain, slug })
        setStoreSlug(slug)
    }, [])

    const { data: store, isLoading: storeLoading, error } = trpc.stores.getBySlug.useQuery(
        { slug: storeSlug },
        { enabled: !!storeSlug }
    )

    const handleCategorySelect = (categorySlug: string) => {
        // Category selection is handled by the sidebar component
        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Implement search functionality
        console.log('Searching for:', searchTerm)
    }

    if (storeLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded mb-4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-64 bg-gray-200 rounded" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!store) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-red-50 p-8 max-w-md mx-auto">
                            <h3 className="text-xl font-bold text-red-600 mb-2">Store Not Found</h3>
                            <p className="text-red-500 mb-4">The store you are looking for does not exist.</p>

                            {/* Temporary debugging info */}
                            <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded border mb-4">
                                <p><strong>Debug Info:</strong></p>
                                <p>Store Slug: {storeSlug || 'Not set'}</p>
                                <p>Hostname: {typeof window !== 'undefined' ? window.location.hostname : 'N/A'}</p>
                                <p>Pathname: {typeof window !== 'undefined' ? window.location.pathname : 'N/A'}</p>
                                {error && (
                                    <p className="text-red-500 mt-2">Error: {error.message}</p>
                                )}
                                <p className="mt-2">
                                    <a
                                        href="/api/seed"
                                        target="_blank"
                                        className="text-blue-600 hover:text-blue-800 underline"
                                    >
                                        Click here to seed the database
                                    </a>
                                </p>
                                <p className="mt-2 text-xs">
                                    <strong>Test URLs:</strong><br />
                                    • /tech-gadgets<br />
                                    • /fashion-boutique<br />
                                    • /home-garden<br />
                                    • /sports-equipment
                                </p>
                            </div>

                            <div className="mt-4">
                                <a
                                    href="/"
                                    className="text-blue-600 hover:text-blue-800 font-bold"
                                >
                                    ← Back to Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Store Header */}
            <header className="bg-white border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {store.logo && (
                                <img
                                    src={typeof store.logo === 'string' ? store.logo : store.logo.url || ''}
                                    alt={store.name}
                                    className="h-12 w-12 object-cover border-2 border-black"
                                />
                            )}
                            <div>
                                <h1 className="text-2xl font-bold text-black">{store.name}</h1>
                                {store.description && (
                                    <p className="text-gray-600 text-sm">{store.description}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <a
                                href="/"
                                className="text-blue-600 hover:text-blue-800 font-bold"
                            >
                                Back to Prime Importation
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search and Filter Section */}
                    <div
                        className="mb-8 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white"
                        style={{
                            backgroundColor: category ? `${store.theme?.primaryColor || '#2563eb'}10` : 'white',
                        }}
                    >
                        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                            <div className="flex-1">
                                <form onSubmit={handleSearch} className="flex gap-2">
                                    <Input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="flex-1 border-2 border-black bg-white text-black placeholder:text-black/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]"
                                    >
                                        <Search className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>

                            <CategoriesSidebar onCategorySelect={handleCategorySelect} />
                        </div>
                    </div>

                    {/* Products Grid */}
                    <ProductsGrid
                        storeSlug={storeSlug}
                        category={category || undefined}
                    />
                </div>
            </div>
        </div>
    )
} 