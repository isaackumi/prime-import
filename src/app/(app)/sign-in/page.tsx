'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowLeft,
    Shield,
    User
} from 'lucide-react'
import { toast } from 'sonner'

export default function SignInPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // TODO: Implement actual authentication
            // For now, simulate authentication
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Store user session (replace with actual auth)
            localStorage.setItem('user', JSON.stringify({
                id: '1',
                email: formData.email,
                name: 'Test User',
                role: 'customer'
            }))

            toast.success('Successfully signed in!')
            router.push('/')
        } catch (error) {
            toast.error('Sign in failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-black mb-2">Welcome Back</h1>
                    <p className="text-xl text-gray-600">Sign in to your account</p>
                </div>

                {/* Sign In Form */}
                <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                    <CardHeader className="bg-blue-600 border-b-4 border-black">
                        <CardTitle className="text-2xl font-bold text-white flex items-center">
                            <User className="w-6 h-6 mr-2" />
                            Sign In
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="text-sm font-bold text-black">
                                    Email Address
                                </Label>
                                <div className="relative mt-1">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="pl-10 border-2 border-black bg-white text-black placeholder:text-black/60"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="password" className="text-sm font-bold text-black">
                                    Password
                                </Label>
                                <div className="relative mt-1">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-10 border-2 border-black bg-white text-black placeholder:text-black/60"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>

                        {/* Security Notice */}
                        <div className="mt-6 bg-green-50 border-2 border-green-600 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-bold text-green-600">Secure Sign In</span>
                            </div>
                            <p className="text-xs text-green-600 mt-1">
                                Your credentials are encrypted and secure
                            </p>
                        </div>

                        {/* Links */}
                        <div className="mt-6 text-center space-y-2">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link href="/sign-up" className="text-blue-600 hover:text-blue-800 font-bold">
                                    Sign up here
                                </Link>
                            </p>
                            <p className="text-sm text-gray-600">
                                <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800 font-bold">
                                    Forgot your password?
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Demo Credentials */}
                <div className="mt-6 text-center">
                    <Card className="border-2 border-yellow-400 bg-yellow-50">
                        <CardContent className="p-4">
                            <h3 className="font-bold text-yellow-800 mb-2">Demo Credentials</h3>
                            <div className="text-sm text-yellow-700 space-y-1">
                                <p><strong>Email:</strong> demo@example.com</p>
                                <p><strong>Password:</strong> password123</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 