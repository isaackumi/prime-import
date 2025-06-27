'use client'

import { useState, useEffect, Suspense, lazy } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CategoriesSidebar } from '@/components/categories/categories-sidebar'
import { Input } from '@/components/ui/input'
import { Search, Filter, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import {
  ShoppingBag,
  Store,
  Users,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'

// Lazy load the ProductsGrid component
const ProductsGrid = lazy(() => import('@/components/products/products-grid').then(module => ({ default: module.ProductsGrid })))

// Lazy load the CreateStoreForm component
const CreateStoreForm = lazy(() => import('@/components/store/create-store-form').then(module => ({ default: module.CreateStoreForm })))

// Loading skeleton for ProductsGrid
function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  )
}

// Loading skeleton for CreateStoreForm
function CreateStoreFormSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto animate-pulse">
      <div className="h-16 bg-gray-200 rounded-t-lg mb-6" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-20 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

function HomeContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const searchParams = useSearchParams()
  const isMobile = useIsMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const category = searchParams.get('category')

  const handleCategorySelect = (categorySlug: string) => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge className="mb-6 bg-yellow-400 text-black border-2 border-black font-bold text-sm px-4 py-2">
              🌍 Global Import/Export Solutions
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
              Your Gateway to
              <span className="block text-blue-600">Global Trade</span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Prime Importation connects businesses and consumers with premium suppliers worldwide.
              From B2B wholesale to B2C retail, we make global trade accessible and profitable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                <Store className="w-5 h-5 mr-2" />
                Start Importing
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-white text-black font-bold py-4 px-8 text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                <Globe className="w-5 h-5 mr-2" />
                Browse Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white"
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
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              {category ? `Products in ${category}` : 'Featured Products'}
            </h2>
            <p className="text-xl text-gray-600">
              {category
                ? `Discover amazing products in ${category}`
                : 'Discover amazing products from our community of merchants'
              }
            </p>
          </div>

          <Suspense fallback={<ProductsGridSkeleton />}>
            <ProductsGrid category={category || undefined} />
          </Suspense>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-black font-bold py-4 px-8 text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Store List Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Featured Stores
            </h2>
            <p className="text-xl text-gray-600">
              Visit our featured stores and discover unique products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Tech Gadgets Store", slug: "tech-gadgets", description: "Latest tech gadgets and electronics", color: "#2563eb" },
              { name: "Fashion Boutique", slug: "fashion-boutique", description: "Trendy fashion items", color: "#ec4899" },
              { name: "Home & Garden", slug: "home-garden", description: "Everything for your home", color: "#059669" },
              { name: "Sports Equipment", slug: "sports-equipment", description: "Quality sports equipment", color: "#dc2626" }
            ].map((store) => (
              <Card key={store.slug} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
                <CardHeader className="border-b-4 border-black" style={{ backgroundColor: `${store.color}20` }}>
                  <CardTitle className="text-xl font-bold text-black">{store.name}</CardTitle>
                  <CardDescription className="text-gray-700">{store.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Link href={`/${store.slug}`}>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                      Visit Store
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Why Choose Prime Importation?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted partner for global trade and import/export solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-yellow-50 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
              <CardHeader className="bg-yellow-400 border-b-4 border-black">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">B2B & B2C</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700">
                  Serve both business customers and individual consumers with flexible pricing and terms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-blue-50 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
              <CardHeader className="bg-blue-400 border-b-4 border-black">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">Trade Compliance</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700">
                  Full compliance with international trade regulations and customs requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-green-50 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
              <CardHeader className="bg-green-400 border-b-4 border-black">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">Fast Logistics</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700">
                  Efficient shipping and logistics solutions with real-time tracking worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-purple-50 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
              <CardHeader className="bg-purple-400 border-b-4 border-black">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">Global Network</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700">
                  Extensive network of verified suppliers and buyers across multiple continents.
                </p>
              </CardContent>
            </Card>

            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-red-50 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
              <CardHeader className="bg-red-400 border-b-4 border-black">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">Market Insights</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700">
                  Real-time market data and trends to help you make informed trading decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-orange-50 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
              <CardHeader className="bg-orange-400 border-b-4 border-black">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-black">Quality Control</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700">
                  Rigorous quality control processes to ensure product standards and customer satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Create Store Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">
                Ready to Start Trading?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of successful traders who have built their businesses on Prime Importation.
                Connect with global suppliers and buyers, and start your import/export journey today.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Verified supplier network</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Trade compliance support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Secure payment processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">24/7 trade support</span>
                </div>
              </div>
            </div>

            <div>
              <Suspense fallback={<CreateStoreFormSkeleton />}>
                <CreateStoreForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] bg-blue-600 p-8">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg">Verified Suppliers</div>
            </div>
            <div className="border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] bg-green-600 p-8">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-lg">Products Traded</div>
            </div>
            <div className="border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] bg-purple-600 p-8">
              <div className="text-4xl font-bold mb-2">$50M+</div>
              <div className="text-lg">Trade Volume</div>
            </div>
            <div className="border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] bg-orange-600 p-8">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-lg">Countries Served</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
