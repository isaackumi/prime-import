'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Users,
    Target,
    Award,
    Globe,
    Heart,
    Zap,
    Shield,
    TrendingUp,
    Star,
    CheckCircle,
    Store,
    ShoppingBag
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
    const stats = [
        { label: 'Active Stores', value: '500+', icon: Store },
        { label: 'Products Sold', value: '50K+', icon: ShoppingBag },
        { label: 'Happy Customers', value: '100K+', icon: Heart },
        { label: 'Countries Served', value: '25+', icon: Globe },
    ]

    const values = [
        {
            icon: Target,
            title: 'Innovation',
            description: 'Constantly pushing boundaries to deliver cutting-edge e-commerce solutions.'
        },
        {
            icon: Shield,
            title: 'Trust & Security',
            description: 'Your data and transactions are protected with enterprise-grade security.'
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Building a global community of entrepreneurs and creators.'
        },
        {
            icon: Zap,
            title: 'Performance',
            description: 'Lightning-fast platform designed for optimal user experience.'
        }
    ]

    const team = [
        {
            name: 'Sarah Johnson',
            role: 'CEO & Founder',
            image: '/api/placeholder/150/150',
            bio: 'Former tech executive with 15+ years in e-commerce and digital transformation.'
        },
        {
            name: 'Michael Chen',
            role: 'CTO',
            image: '/api/placeholder/150/150',
            bio: 'Full-stack architect with expertise in scalable cloud infrastructure.'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Head of Product',
            image: '/api/placeholder/150/150',
            bio: 'Product strategist focused on user experience and business growth.'
        },
        {
            name: 'David Kim',
            role: 'Head of Operations',
            image: '/api/placeholder/150/150',
            bio: 'Operations expert with deep knowledge in logistics and customer success.'
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
                            About Prime Importation
                        </Badge>

                        <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
                            Empowering
                            <span className="block text-blue-600">Digital Entrepreneurs</span>
                        </h1>

                        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                            We're on a mission to democratize e-commerce by providing entrepreneurs
                            with the tools they need to build successful online businesses.
                            Our multi-tenant platform makes it easy for anyone to create,
                            manage, and scale their digital storefront.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
                                >
                                    Get in Touch
                                </Button>
                            </Link>

                            <Link href="/features">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="bg-white text-black font-bold py-4 px-8 text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
                                >
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-black mb-2">{stat.value}</div>
                                <div className="text-gray-600 font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-black mb-6">
                                Our Mission
                            </h2>
                            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                                To democratize e-commerce by providing entrepreneurs with
                                the tools, platform, and support they need to build
                                successful online businesses. We believe everyone should
                                have the opportunity to turn their passion into profit.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Through our innovative multi-tenant platform, we're making
                                it easier than ever for creators, makers, and entrepreneurs
                                to reach global markets and build sustainable businesses.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="bg-blue-600 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="text-2xl font-bold text-white mb-4">Why We Do This</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center text-white">
                                        <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                                        Empower entrepreneurs worldwide
                                    </li>
                                    <li className="flex items-center text-white">
                                        <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                                        Create economic opportunities
                                    </li>
                                    <li className="flex items-center text-white">
                                        <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                                        Build sustainable communities
                                    </li>
                                    <li className="flex items-center text-white">
                                        <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                                        Drive innovation in e-commerce
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Our Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value) => (
                            <Card key={value.title} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
                                <CardHeader className="bg-blue-600 border-b-4 border-black">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                                        <value.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-white">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="text-gray-700">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The passionate people behind Prime Importation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <Card key={member.name} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
                                <CardHeader className="bg-purple-600 border-b-4 border-black text-center">
                                    <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <Users className="w-12 h-12 text-purple-600" />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-white">{member.name}</CardTitle>
                                    <p className="text-purple-200 font-semibold">{member.role}</p>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="text-gray-700 text-sm">{member.bio}</p>
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
                        Ready to Start Your Journey?
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
                                Get Started Today
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 text-lg border-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
                            >
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}