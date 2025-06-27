'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    MessageSquare,
    Send,
    CheckCircle,
    Users,
    Globe,
    Shield
} from 'lucide-react'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000))

        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false)
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 3000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            details: 'support@primeimport.com',
            description: 'Get in touch with our support team'
        },
        {
            icon: Phone,
            title: 'Call Us',
            details: '+1 (555) 123-4567',
            description: 'Speak with our customer success team'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            details: '123 Business Ave, Tech City, TC 12345',
            description: 'Our headquarters location'
        },
        {
            icon: Clock,
            title: 'Business Hours',
            details: 'Mon-Fri: 9AM-6PM EST',
            description: 'We\'re here to help during business hours'
        }
    ]

    const faqs = [
        {
            question: 'How do I create a store on Prime Importation?',
            answer: 'Creating a store is simple! Just sign up for an account, choose your store name and URL, and start adding products. Our platform handles all the technical details for you.'
        },
        {
            question: 'What are the fees for selling on your platform?',
            answer: 'We charge a small percentage fee on each transaction. The exact rate depends on your plan. Check our pricing page for detailed information.'
        },
        {
            question: 'How do payments work?',
            answer: 'We use Stripe for secure payment processing. Customers can pay with credit cards, and you\'ll receive payouts directly to your bank account.'
        },
        {
            question: 'Can I customize my store design?',
            answer: 'Yes! You can customize your store\'s colors, layout, and branding to match your business identity. We offer various themes and customization options.'
        },
        {
            question: 'Do you provide customer support?',
            answer: 'Absolutely! Our support team is available via email, phone, and live chat during business hours. We\'re here to help you succeed.'
        },
        {
            question: 'Is there a limit on how many products I can sell?',
            answer: 'No limits! You can add as many products as you want to your store. Our platform is designed to scale with your business growth.'
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
                            Get in Touch
                        </Badge>

                        <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
                            Let's Build
                            <span className="block text-blue-600">Something Amazing</span>
                        </h1>

                        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Have questions about our platform? Want to discuss your business needs?
                            We'd love to hear from you. Our team is here to help you succeed.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl font-bold text-black mb-6">Send us a Message</h2>

                            {isSubmitted ? (
                                <Card className="border-4 border-green-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-green-50">
                                    <CardContent className="p-6 text-center">
                                        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                                        <p className="text-green-700">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                                    <CardHeader className="bg-blue-600 border-b-4 border-black">
                                        <CardTitle className="text-2xl font-bold text-white flex items-center">
                                            <MessageSquare className="w-6 h-6 mr-2" />
                                            Contact Form
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-black mb-2">
                                                        Name *
                                                    </label>
                                                    <Input
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="border-2 border-black bg-white text-black placeholder:text-black/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        placeholder="Your full name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-black mb-2">
                                                        Email *
                                                    </label>
                                                    <Input
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        className="border-2 border-black bg-white text-black placeholder:text-black/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        placeholder="your@email.com"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-black mb-2">
                                                    Subject *
                                                </label>
                                                <Input
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    className="border-2 border-black bg-white text-black placeholder:text-black/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="What's this about?"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-black mb-2">
                                                    Message *
                                                </label>
                                                <Textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows={6}
                                                    className="border-2 border-black bg-white text-black placeholder:text-black/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                                    placeholder="Tell us how we can help you..."
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4 mr-2" />
                                                        Send Message
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-bold text-black mb-6">Get in Touch</h2>

                            <div className="space-y-6">
                                {contactInfo.map((info) => (
                                    <Card key={info.title} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
                                        <CardContent className="p-6">
                                            <div className="flex items-start space-x-4">
                                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <info.icon className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-black mb-1">{info.title}</h3>
                                                    <p className="text-blue-600 font-semibold mb-1">{info.details}</p>
                                                    <p className="text-gray-600 text-sm">{info.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Additional Info */}
                            <div className="mt-8 p-6 bg-gray-50 border-4 border-black">
                                <h3 className="text-lg font-bold text-black mb-4">Why Choose Prime Importation?</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <Shield className="w-5 h-5 text-blue-600" />
                                        <span className="text-sm text-gray-700">Enterprise-grade security</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Users className="w-5 h-5 text-blue-600" />
                                        <span className="text-sm text-gray-700">24/7 customer support</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Globe className="w-5 h-5 text-blue-600" />
                                        <span className="text-sm text-gray-700">Global reach and scalability</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Find answers to common questions about our platform
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
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of entrepreneurs who are already building their
                        digital empires with Prime Importation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
                        >
                            Start Your Store Today
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 text-lg border-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[4px] hover:translate-y-[4px]"
                        >
                            View Pricing
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}