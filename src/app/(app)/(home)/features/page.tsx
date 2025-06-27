'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Store,
    ShoppingBag,
    Shield,
    Zap,
    Users,
    Globe,
    BarChart3,
    CreditCard,
    Truck,
    Smartphone,
    Palette,
    Headphones,
    TrendingUp,
    CheckCircle,
    Star,
    Award
} from 'lucide-react'
import Link from 'next/link'

export default function FeaturesPage() {
    const mainFeatures = [
        {
            icon: Store,
            title: 'Multi-Tenant Architecture',
            description: 'Each store operates independently with its own branding, products, and customer base.',
            benefits: ['Custom domains', 'Branded storefronts', 'Independent operations', 'Scalable infrastructure']
        },
        {
            icon: Shield,
            title: 'Enterprise Security',
            description: 'Bank-level security with SSL encryption, PCI compliance, and fraud protection.',
            benefits: ['SSL encryption', 'PCI compliance', 'Fraud detection', 'Data protection']
        },
        {
            icon: Zap,
            title: 'Lightning Fast Performance',
            description: 'Optimized for speed with CDN, caching, and modern web technologies.',
            benefits: ['Global CDN', 'Smart caching', 'Optimized images', 'Fast loading']
        },
        {
            icon: CreditCard,
            title: 'Secure Payment Processing',
            description: 'Stripe-powered payments with support for multiple payment methods.',
            benefits: ['Credit cards', 'Digital wallets', 'Bank transfers', 'Automatic payouts']
        }
    ]

    const storeFeatures = [
        {
            icon: Palette,
            title: 'Custom Store Design',
            description: 'Personalize your store with custom themes, colors, and branding.'
        },
        {
            icon: ShoppingBag,
            title: 'Product Management',
            description: 'Easy product catalog management with bulk import/export capabilities.'
        },
        {
            icon: BarChart3,
            title: 'Analytics Dashboard',
            description: 'Comprehensive analytics to track sales, customers, and performance.'
        },
        {
            icon: Truck,
            title: 'Shipping & Fulfillment',
            description: 'Integrated shipping with major carriers and fulfillment options.'
        },
        {
            icon: Users,
            title: 'Customer Management',
            description: 'Manage customer accounts, orders, and communication.'
        },
        {
            icon: Smartphone,
            title: 'Mobile Optimized',
            description: 'Fully responsive design that works perfectly on all devices.'
        }
    ]

    const platformFeatures = [
        {
            icon: Globe,
            title: 'Global Reach',
            description: 'Sell to customers worldwide with multi-currency and multi-language support.'
        },
        {
            icon: TrendingUp,
            title: 'Scalable Infrastructure',
            description: 'Built to handle growth from startup to enterprise level.'
        },
        {
            icon: Headphones,
            title: '24/7 Support',
            description: 'Round-the-clock customer support via email, phone, and live chat.'
        },
        {
            icon: Award,
            title: 'Award-Winning Platform',
            description: 'Recognized for innovation and excellence in e-commerce solutions.'
        }
    ]

    const testimonials = [
        {
            name: 'Sarah Chen',
            store: 'TechGadgets Pro',
            content: 'Prime Importation transformed our business. We went from zero to $50K in sales within 6 months!',
            rating: 5
        },
        {
            name: 'Mike Rodriguez',
            store: 'Fashion Forward',
            content: 'The platform is incredibly easy to use. Our customers love the shopping experience.',
            rating: 5
        },
        {
            name: 'Emily Johnson',
            store: 'Home & Garden Co',
            content: 'Best decision we made for our business. The analytics help us make data-driven decisions.',
            rating: 5
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <Badge className="mb-6 bg-yellow-400 text-black border-2 border-black font-bold text-sm px-4 py-2">
                            Platform Features
                        </Badge>

                        <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
                            Everything You Need
                            <span className="block text-blue-600">to Succeed</span>
                        </h1>

                        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Our comprehensive platform provides all the tools, features, and support
                            you need to build, grow, and scale your online business.
                            From store creation to global expansion, we've got you covered.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/pricing">
                                <Button
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
                                >
                                    View Pricing
                                </Button>
                            </Link>

                            <Link href="/sign-up">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="bg-white text-black font-bold py-4 px-8 text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
                                >
                                    Start Free Trial
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Core Platform Features
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The foundation that powers thousands of successful online stores
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {mainFeatures.map((feature) => (
                            <Card key={feature.title} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
                                <CardHeader className="bg-blue-600 border-b-4 border-black">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                                        <feature.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-white">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="text-gray-700 mb-4">{feature.description}</p>
                                    <ul className="space-y-2">
                                        {feature.benefits.map((benefit) => (
                                            <li key={benefit} className="flex items-center text-sm text-gray-600">
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Store Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Store Management Features
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Powerful tools to manage your store and grow your business
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {storeFeatures.map((feature) => (
                            <Card key={feature.title} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
                                <CardHeader className="bg-green-600 border-b-4 border-black">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                                        <feature.icon className="w-6 h-6 text-green-600" />
                                    </div>
                                    <CardTitle className="text-lg font-bold text-white">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="text-gray-700">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platform Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Platform Advantages
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Why thousands of entrepreneurs choose Prime Importation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {platformFeatures.map((feature) => (
                            <Card key={feature.title} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <feature.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-black mb-2">{feature.title}</h3>
                                            <p className="text-gray-700">{feature.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            What Our Users Say
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Real stories from successful entrepreneurs using our platform
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <Card key={testimonial.name} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                                    <div>
                                        <p className="font-bold text-black">{testimonial.name}</p>
                                        <p className="text-sm text-gray-600">{testimonial.store}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Experience These Features?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of entrepreneurs who are already building their
                        digital empires with Prime Importation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/sign-up">
                            <Button
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
                            >
                                Start Your Free Trial
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 text-lg border-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
                            >
                                Schedule Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}