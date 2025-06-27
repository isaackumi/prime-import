'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductsGrid } from '@/components/products/products-grid'
import { CategoriesSidebar } from '@/components/categories/categories-sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Filter, X } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

function ProductsContent() {
    const searchParams = useSearchParams()
    const isMobile = useIsMobile()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-black">All Products</h1>
                        <p className="text-xl text-gray-600 mt-2">Discover amazing products from our stores</p>
                    </div>

                    {/* Mobile Sidebar Toggle */}
                    {isMobile && (
                        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                            <SheetTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-80 bg-white border-r-4 border-black p-0">
                                <SheetHeader className="border-b-4 border-black p-4">
                                    <SheetTitle className="text-2xl font-bold text-black flex items-center justify-between">
                                        <span>Categories</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setIsSidebarOpen(false)}
                                            className="w-8 h-8 p-0 border-2 border-black bg-white hover:bg-gray-100"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="p-4">
                                    <CategoriesSidebar />
                                </div>
                            </SheetContent>
                        </Sheet>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Desktop Sidebar */}
                    {!isMobile && (
                        <div className="lg:col-span-1">
                            <CategoriesSidebar />
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        <ProductsGrid />
                    </div>
                </div>
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