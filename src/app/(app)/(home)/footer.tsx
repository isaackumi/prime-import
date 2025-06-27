import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Store,
    Shield,
    Zap,
    Users,
    Heart,
    Globe
} from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Store className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Prime Importation</h3>
                                <p className="text-sm text-gray-400">Multi-Vendor Platform</p>
                            </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed">
                            Empowering entrepreneurs to build their digital empires.
                            Create, grow, and scale your online business with our
                            comprehensive multi-tenant e-commerce platform.
                        </p>

                        <div className="flex space-x-4">
                            <Link href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold border-b-2 border-blue-600 pb-2 inline-block">
                            Quick Links
                        </h4>

                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/features" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Store Categories */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold border-b-2 border-blue-600 pb-2 inline-block">
                            Featured Stores
                        </h4>

                        <ul className="space-y-3">
                            <li>
                                <Link href="/tech-gadgets" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <Store className="w-4 h-4 mr-2" />
                                    Tech Gadgets
                                </Link>
                            </li>
                            <li>
                                <Link href="/fashion-boutique" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <Store className="w-4 h-4 mr-2" />
                                    Fashion Boutique
                                </Link>
                            </li>
                            <li>
                                <Link href="/home-garden" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <Store className="w-4 h-4 mr-2" />
                                    Home & Garden
                                </Link>
                            </li>
                            <li>
                                <Link href="/sports-equipment" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                                    <Store className="w-4 h-4 mr-2" />
                                    Sports Equipment
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold border-b-2 border-blue-600 pb-2 inline-block">
                            Stay Updated
                        </h4>

                        <p className="text-gray-300">
                            Subscribe to our newsletter for the latest updates,
                            store launches, and exclusive offers.
                        </p>

                        <div className="space-y-3">
                            <div className="flex">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                                />
                                <Button className="bg-blue-600 hover:bg-blue-700 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]">
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 pt-4">
                            <div className="flex items-center space-x-3 text-gray-300">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span>support@primeimport.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300">
                                <Phone className="w-4 h-4 text-blue-400" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <span>123 Business Ave, Tech City, TC 12345</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Highlight */}
            <div className="border-t border-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="flex items-center space-x-3 text-gray-300">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h5 className="font-semibold">Secure Payments</h5>
                                <p className="text-sm text-gray-400">Stripe powered</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 text-gray-300">
                            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h5 className="font-semibold">Fast Delivery</h5>
                                <p className="text-sm text-gray-400">Worldwide shipping</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 text-gray-300">
                            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h5 className="font-semibold">Multi-Vendor</h5>
                                <p className="text-sm text-gray-400">Thousands of stores</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 text-gray-300">
                            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                                <Heart className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h5 className="font-semibold">24/7 Support</h5>
                                <p className="text-sm text-gray-400">Always here to help</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 text-gray-400">
                            <Globe className="w-4 h-4" />
                            <span>&copy; {currentYear} Prime Importation. All rights reserved.</span>
                        </div>

                        <div className="flex space-x-6 text-sm text-gray-400">
                            <Link href="/privacy" className="hover:text-blue-400 transition-colors duration-200">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-blue-400 transition-colors duration-200">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="hover:text-blue-400 transition-colors duration-200">
                                Cookie Policy
                            </Link>
                            <Link href="/sitemap" className="hover:text-blue-400 transition-colors duration-200">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer