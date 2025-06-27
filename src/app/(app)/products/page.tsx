'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductsGrid } from '@/components/products/products-grid'
import { CategoriesSidebar } from '@/components/categories/categories-sidebar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Search, Filter, X } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

function ProductsContent() {
    const searchParams = useSearchParams()
    const isMobile = useIsMobile()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const category = searchParams.get('category')

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

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-black">All Products</h1>
                    <p className="text-xl text-gray-600 mt-2">Discover amazing products from our stores</p>
                </div>

                {/* Search and Filter Section */}
                <div
                    className="mb-8 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white"
                    style={{
                        backgroundColor: category ? '#2563eb10' : 'white',
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
                <ProductsGrid category={category || undefined} />
            </div>
        </div>
    )
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    )
} 