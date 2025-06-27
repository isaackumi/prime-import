'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowLeft,
    Shield,
    User,
    Store
} from 'lucide-react'
import { toast } from 'sonner'

export default function SignUpPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        accountType: 'customer' as 'customer' | 'store'
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

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match')
            setIsLoading(false)
            return
        }

        try {
            // TODO: Implement actual registration
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Store user session
            localStorage.setItem('user', JSON.stringify({
                id: '1',
                email: formData.email,
                name: `${formData.firstName} ${formData.lastName}`,
                role: formData.accountType
            }))

            toast.success('Account created successfully!')
            router.push('/')
        } catch (error) {
            toast.error('Registration failed. Please try again.')
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
                    <h1 className="text-4xl font-bold text-black mb-2">Join Prime Importation</h1>
                    <p className="text-xl text-gray-600">Create your account</p>
                </div>

                {/* Sign Up Form */}
                <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                    <CardHeader className="bg-green-600 border-b-4 border-black">
                        <CardTitle className="text-2xl font-bold text-white flex items-center">
                            <User className="w-6 h-6 mr-2" />
                            Create Account
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Account Type Selection */}
                            <div>
                                <Label className="text-sm font-bold text-black mb-2 block">
                                    Account Type
                                </Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, accountType: 'customer' }))}
                                        className={`p-3 border-2 border-black font-bold transition-all duration-200 ${formData.accountType === 'customer'
                                                ? 'bg-blue-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                : 'bg-white text-black hover:bg-blue-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                            }`}
                                    >
                                        <User className="w-4 h-4 mx-auto mb-1" />
                                        Customer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, accountType: 'store' }))}
                                        className={`p-3 border-2 border-black font-bold transition-all duration-200 ${formData.accountType === 'store'
                                                ? 'bg-green-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                : 'bg-white text-black hover:bg-green-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                            }`}
                                    >
                                        <Store className="w-4 h-4 mx-auto mb-1" />
                                        Store Owner
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName" className="text-sm font-bold text-black">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="mt-1 border-2 border-black bg-white text-black placeholder:text-black/60"
                                        placeholder="First name"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName" className="text-sm font-bold text-black">
                                        Last Name
                                    </Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="mt-1 border-2 border-black bg-white text-black placeholder:text-black/60"
                                        placeholder="Last name"
                                        required
                                    />
                                </div>
                            </div>

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
                                        placeholder="Create a password"
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

                            <div>
                                <Label htmlFor="confirmPassword" className="text-sm font-bold text-black">
                                    Confirm Password
                                </Label>
                                <div className="relative mt-1">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-10 border-2 border-black bg-white text-black placeholder:text-black/60"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>

                        {/* Security Notice */}
                        <div className="mt-6 bg-green-50 border-2 border-green-600 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-bold text-green-600">Secure Registration</span>
                            </div>
                            <p className="text-xs text-green-600 mt-1">
                                Your data is encrypted and protected
                            </p>
                        </div>

                        {/* Links */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link href="/sign-in" className="text-blue-600 hover:text-blue-800 font-bold">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 