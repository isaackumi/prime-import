'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
    Check,
    X,
    Star,
    Zap,
    Crown,
    Rocket,
    Shield,
    Users,
    Globe,
    Headphones,
    BarChart3,
    CreditCard,
    Truck,
    Palette
} from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(false)

    const plans = [
        {
            name: 'Starter',
            icon: Rocket,
            price: { monthly: 29, annual: 290 },
            description: 'Perfect for new entrepreneurs getting started',
            features: [
                '1 Store',
                'Up to 100 products',
                'Basic analytics',
                'Standard support',
                'Mobile responsive',
                'SSL certificate',
                'Payment processing',
                'Basic themes'
            ],
            notIncluded: [
                'Custom domain',
                'Advanced analytics',
                'Priority support',
                'Custom branding',
                'Bulk import/export',
                'API access'
            ],
            color: 'bg-blue-600',
            popular: false
        },
        {
            name: 'Professional',
            icon: Zap,
            price: { monthly: 79, annual: 790 },
            description: 'Ideal for growing businesses',
            features: [
                '3 Stores',
                'Up to 1,000 products',
                'Advanced analytics',
                'Priority support',
                'Custom domains',
                'Custom branding',
                'Bulk import/export',
                'API access',
                'Multi-currency',
                'Advanced shipping'
            ],
            notIncluded: [
                'Unlimited stores',
                'Enterprise support',
                'Custom integrations',
                'Dedicated account manager'
            ],
            color: 'bg-green-600',
            popular: true
        },
        {
            name: 'Enterprise',
            icon: Crown,
            price: { monthly: 199, annual: 1990 },
            description: 'For established businesses and enterprises',
            features: [
                'Unlimited stores',
                'Unlimited products',
                'Enterprise analytics',
                '24/7 phone support',
                'Custom integrations',
                'Dedicated account manager',
                'White-label options',
                'Advanced security',
                'Multi-language support',
                'Custom development'
            ],
            notIncluded: [],
            color: 'bg-purple-600',
            popular: false
        }
    ]

    const features = [
        {
            name: 'Store Management',
            starter: true,
            professional: true,
            enterprise: true
        },
        {
            name: 'Product Catalog',
            starter: true,
            professional: true,
            enterprise: true
        },
        {
            name: 'Payment Processing',
            starter: true,
            professional: true,
            enterprise: true
        },
        {
            name: 'Mobile Responsive',
            starter: true,
            professional: true,
            enterprise: true
        },
        {
            name: 'SSL Security',
            starter: true,
            professional: true,
            enterprise: true
        },
        {
            name: 'Basic Analytics',
            starter: true,
            professional: true,
            enterprise: true
        },
        {
            name: 'Custom Domain',
            starter: false,
            professional: true,
            enterprise: true
        },
        {
            name: 'Advanced Analytics',
            starter: false,
            professional: true,
            enterprise: true
        },
        {
            name: 'Priority Support',
            starter: false,
            professional: true,
            enterprise: true
        },
        {
            name: 'Custom Branding',
            starter: false,
            professional: true,
            enterprise: true
        },
        {
            name: 'Bulk Import/Export',
            starter: false,
            professional: true,
            enterprise: true
        },
        {
            name: 'API Access',
            starter: false,
            professional: true,
            enterprise: true
        },
        {
            name: 'Multi-currency',
            starter: false,
            professional: true,
            enterprise: true
        },
        {
            name: 'Advanced Shipping',
            starter: false,
            professional: true,
            enterprise: true
        },
        {
            name: 'Unlimited Stores',
            starter: false,
            professional: false,
            enterprise: true
        },
        {
            name: 'Enterprise Support',
            starter: false,
            professional: false,
            enterprise: true
        },
        {
            name: 'Custom Integrations',
            starter: false,
            professional: false,
            enterprise: true
        },
        {
            name: 'Dedicated Manager',
            starter: false,
            professional: false,
            enterprise: true
        }
    ]

    const faqs = [
        {
            question: 'Can I change my plan later?',
            answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
        },
        {
            question: 'Is there a setup fee?',
            answer: 'No setup fees! All plans include free setup and migration assistance.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
        },
        {
            question: 'Do you offer refunds?',
            answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your payment.'
        },
        {
            question: 'Can I cancel anytime?',
            answer: 'Absolutely! You can cancel your subscription at any time with no penalties or fees.'
        },
        {
            question: 'Is there a free trial?',
            answer: 'Yes! All plans come with a 14-day free trial. No credit card required to start.'
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
                            Simple, Transparent Pricing
                        </Badge>

                        <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
                            Choose Your
                            <span className="block text-blue-600">Growth Plan</span>
                        </h1>

                        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Start free, scale as you grow. Choose the perfect plan for your business
                            with transparent pricing and no hidden fees.
                        </p>

                        {/* Billing Toggle */}
                        <div className="flex items-center justify-center space-x-4 mb-8">
                            <span className={`text-lg font-semibold ${!isAnnual ? 'text-black' : 'text-gray-500'}`}>
                                Monthly
                            </span>
                            <Switch
                                checked={isAnnual}
                                onCheckedChange={setIsAnnual}
                                className="data-[state=checked]:bg-blue-600"
                            />
                            <span className={`text-lg font-semibold ${isAnnual ? 'text-black' : 'text-gray-500'}`}>
                                Annual
                            </span>
                            {isAnnual && (
                                <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                                    Save 20%
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <Card
                                key={plan.name}
                                className={`relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1 ${plan.popular ? 'ring-4 ring-blue-500' : ''
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-bold">
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader className={`${plan.color} border-b-4 border-black text-center`}>
                                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <plan.icon className="w-8 h-8 text-gray-800" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                                    <p className="text-white/80">{plan.description}</p>
                                </CardHeader>

                                <CardContent className="p-6">
                                    <div className="text-center mb-6">
                                        <div className="text-4xl font-bold text-black">
                                            ${isAnnual ? plan.price.annual : plan.price.monthly}
                                        </div>
                                        <div className="text-gray-600">
                                            {isAnnual ? '/year' : '/month'}
                                        </div>
                                        {isAnnual && (
                                            <div className="text-sm text-green-600 font-semibold mt-1">
                                                Save ${(plan.price.monthly * 12) - plan.price.annual}/year
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <h4 className="font-bold text-black">What's included:</h4>
                                        <ul className="space-y-2">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-center text-sm">
                                                    <Check className="w-4 h-4 text-green-500 mr-2" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {plan.notIncluded.length > 0 && (
                                        <div className="space-y-4 mb-6">
                                            <h4 className="font-bold text-black">Not included:</h4>
                                            <ul className="space-y-2">
                                                {plan.notIncluded.map((feature) => (
                                                    <li key={feature} className="flex items-center text-sm text-gray-500">
                                                        <X className="w-4 h-4 text-red-500 mr-2" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <Link href="/sign-up">
                                        <Button
                                            className={`w-full font-bold py-3 px-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px] ${plan.popular
                                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    : 'bg-white hover:bg-gray-50 text-black'
                                                }`}
                                        >
                                            {plan.popular ? 'Get Started' : 'Choose Plan'}
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Comparison */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Compare Features
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            See exactly what's included in each plan
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="p-4 text-left font-bold">Feature</th>
                                    <th className="p-4 text-center font-bold">Starter</th>
                                    <th className="p-4 text-center font-bold">Professional</th>
                                    <th className="p-4 text-center font-bold">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, index) => (
                                    <tr key={feature.name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="p-4 font-semibold">{feature.name}</td>
                                        <td className="p-4 text-center">
                                            {feature.starter ? (
                                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                                            ) : (
                                                <X className="w-5 h-5 text-red-500 mx-auto" />
                                            )}
                                        </td>
                                        <td className="p-4 text-center">
                                            {feature.professional ? (
                                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                                            ) : (
                                                <X className="w-5 h-5 text-red-500 mx-auto" />
                                            )}
                                        </td>
                                        <td className="p-4 text-center">
                                            {feature.enterprise ? (
                                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                                            ) : (
                                                <X className="w-5 h-5 text-red-500 mx-auto" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need to know about our pricing
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {faqs.map((faq, index) => (
                            <Card key={index} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
                                <CardHeader className="bg-green-600 border-b-4 border-black">
                                    <CardTitle className="text-lg font-bold text-white">{faq.question}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="text-gray-700">{faq.answer}</p>
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
                                Start Free Trial
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 text-lg border-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
                            >
                                Contact Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}