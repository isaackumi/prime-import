'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
    Menu,
    ChevronRight,
    X,
    Grid3X3
} from 'lucide-react'
import { trpc } from '@/lib/trpc/client'
import { useRouter, useSearchParams } from 'next/navigation'

interface CategoriesSidebarProps {
    onCategorySelect?: (categorySlug: string) => void
}

export function CategoriesSidebar({ onCategorySelect }: CategoriesSidebarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentCategory = searchParams.get('category')

    const { data: categories, isLoading } = trpc.categories.getAll.useQuery()

    const handleCategoryClick = (categorySlug: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('category', categorySlug)
        const currentPath = window.location.pathname
        router.push(`${currentPath}?${params.toString()}`)
        onCategorySelect?.(categorySlug)
        setIsOpen(false)
    }

    const handleSubcategoryClick = (subcategorySlug: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('category', subcategorySlug)
        const currentPath = window.location.pathname
        router.push(`${currentPath}?${params.toString()}`)
        onCategorySelect?.(subcategorySlug)
        setIsOpen(false)
    }

    const clearCategory = () => {
        const params = new URLSearchParams(searchParams)
        params.delete('category')
        const currentPath = window.location.pathname
        router.push(`${currentPath}?${params.toString()}`)
        onCategorySelect?.('')
        setIsOpen(false)
    }

    if (isLoading) {
        return (
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />
                <div className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
            </div>
        )
    }

    const categoriesList = categories?.docs || []

    return (
        <div className="relative">
            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center space-x-4">
                <Button
                    variant="outline"
                    className="bg-white text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]"
                    onClick={() => setIsOpen(true)}
                >
                    <Grid3X3 className="w-4 h-4 mr-2" />
                    Categories
                </Button>

                {/* Quick Category Pills */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 max-w-2xl">
                    {categoriesList.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.slug)}
                            onMouseEnter={() => setHoveredCategory(category.id)}
                            onMouseLeave={() => setHoveredCategory(null)}
                            className={`relative px-3 py-1 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[1px] hover:translate-y-[1px] whitespace-nowrap ${currentCategory === category.slug
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-black hover:bg-blue-50'
                                }`}
                            style={{
                                backgroundColor: currentCategory === category.slug ? category.color || '#2563eb' : undefined,
                            }}
                        >
                            {category.name}

                            {/* Subcategories Dropdown */}
                            {category.subcategories && category.subcategories.length > 0 && hoveredCategory === category.id && (
                                <div className="absolute top-full left-0 mt-1 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 min-w-48 max-h-64 overflow-y-auto">
                                    {category.subcategories.map((subcategory: any) => (
                                        <button
                                            key={subcategory.id}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleSubcategoryClick(subcategory.slug)
                                            }}
                                            className="w-full px-4 py-2 text-left text-sm font-bold hover:bg-blue-50 border-b border-gray-200 last:border-b-0"
                                            style={{
                                                backgroundColor: subcategory.color ? `${subcategory.color}20` : undefined,
                                            }}
                                        >
                                            {subcategory.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </button>
                    ))}

                    {currentCategory && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearCategory}
                            className="bg-red-50 text-red-600 border-red-600 font-bold flex-shrink-0"
                        >
                            <X className="w-3 h-3 mr-1" />
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            {/* Mobile Categories */}
            <div className="lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            className="bg-white text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]"
                        >
                            <Menu className="w-4 h-4 mr-2" />
                            Categories
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 bg-white border-r-4 border-black">
                        <SheetHeader className="border-b-4 border-black pb-4">
                            <SheetTitle className="text-2xl font-bold text-black">Categories</SheetTitle>
                        </SheetHeader>

                        <div className="py-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                            {currentCategory && (
                                <Button
                                    variant="outline"
                                    onClick={clearCategory}
                                    className="w-full bg-red-50 text-red-600 border-red-600 font-bold mb-4"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Clear Filter
                                </Button>
                            )}

                            {categoriesList.map((category) => (
                                <div key={category.id} className="space-y-1">
                                    <button
                                        onClick={() => handleCategoryClick(category.slug)}
                                        className={`w-full text-left px-4 py-3 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${currentCategory === category.slug
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-black hover:bg-blue-50'
                                            }`}
                                        style={{
                                            backgroundColor: currentCategory === category.slug ? category.color || '#2563eb' : undefined,
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{category.name}</span>
                                            {category.subcategories && category.subcategories.length > 0 && (
                                                <ChevronRight className="w-4 h-4" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Subcategories */}
                                    {category.subcategories && category.subcategories.length > 0 && (
                                        <div className="ml-4 space-y-1">
                                            {category.subcategories.map((subcategory: any) => (
                                                <button
                                                    key={subcategory.id}
                                                    onClick={() => handleSubcategoryClick(subcategory.slug)}
                                                    className={`w-full text-left px-4 py-2 text-sm font-bold border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${currentCategory === subcategory.slug
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-black hover:bg-blue-50'
                                                        }`}
                                                    style={{
                                                        backgroundColor: currentCategory === subcategory.slug ? subcategory.color || '#2563eb' : undefined,
                                                    }}
                                                >
                                                    {subcategory.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
} 