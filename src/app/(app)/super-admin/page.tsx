'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Users,
    Store,
    ShoppingBag,
    DollarSign,
    Settings,
    TrendingUp,
    Shield,
    Activity
} from 'lucide-react'
import { trpc } from '@/lib/trpc/client'

export default function AdminDashboard() {
    const [platformFee, setPlatformFee] = useState(5)
    const [minPayout, setMinPayout] = useState(50)

    const { data: stores } = trpc.stores.getAll.useQuery()
    const { data: products } = trpc.products.getAll.useQuery({ limit: 100 })
    const { data: categories } = trpc.categories.getAll.useQuery()

    const stats = [
        {
            title: 'Total Stores',
            value: stores?.docs?.length || 0,
            icon: Store,
            color: 'bg-blue-500',
        },
        {
            title: 'Total Products',
            value: products?.docs?.length || 0,
            icon: ShoppingBag,
            color: 'bg-green-500',
        },
        {
            title: 'Total Categories',
            value: categories?.docs?.length || 0,
            icon: Activity,
            color: 'bg-purple-500',
        },
        {
            title: 'Platform Revenue',
            value: '$12,450',
            icon: DollarSign,
            color: 'bg-yellow-500',
        },
    ]

    const handleSaveSettings = () => {
        // Implement save settings logic
        console.log('Saving settings:', { platformFee, minPayout })
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-black mb-2">Admin Dashboard</h1>
                    <p className="text-xl text-gray-600">
                        Super Admin Control Panel
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <Card key={stat.title} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-bold text-black">{stat.value}</p>
                                    </div>
                                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Platform Settings */}
                    <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                        <CardHeader className="bg-blue-600 border-b-4 border-black">
                            <CardTitle className="text-2xl font-bold text-white flex items-center">
                                <Settings className="w-6 h-6 mr-2" />
                                Platform Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-black mb-2">
                                    Platform Fee Percentage
                                </label>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="number"
                                        value={platformFee}
                                        onChange={(e) => setPlatformFee(Number(e.target.value))}
                                        className="flex-1 border-2 border-black bg-white text-black"
                                        min="0"
                                        max="100"
                                    />
                                    <span className="text-sm font-bold">%</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black mb-2">
                                    Minimum Payout Amount
                                </label>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-bold">$</span>
                                    <Input
                                        type="number"
                                        value={minPayout}
                                        onChange={(e) => setMinPayout(Number(e.target.value))}
                                        className="flex-1 border-2 border-black bg-white text-black"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={handleSaveSettings}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]"
                            >
                                Save Settings
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                        <CardHeader className="bg-green-600 border-b-4 border-black">
                            <CardTitle className="text-2xl font-bold text-white flex items-center">
                                <TrendingUp className="w-6 h-6 mr-2" />
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 border-2 border-black">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">New store created</p>
                                        <p className="text-xs text-gray-600">TechStore joined the platform</p>
                                    </div>
                                    <span className="text-xs text-gray-500">2 min ago</span>
                                </div>

                                <div className="flex items-center space-x-3 p-3 bg-gray-50 border-2 border-black">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">New product added</p>
                                        <p className="text-xs text-gray-600">iPhone 15 Pro added to TechStore</p>
                                    </div>
                                    <span className="text-xs text-gray-500">15 min ago</span>
                                </div>

                                <div className="flex items-center space-x-3 p-3 bg-gray-50 border-2 border-black">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">Order completed</p>
                                        <p className="text-xs text-gray-600">Order #12345 worth $299.99</p>
                                    </div>
                                    <span className="text-xs text-gray-500">1 hour ago</span>
                                </div>

                                <div className="flex items-center space-x-3 p-3 bg-gray-50 border-2 border-black">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">New category added</p>
                                        <p className="text-xs text-gray-600">Smart Home category created</p>
                                    </div>
                                    <span className="text-xs text-gray-500">2 hours ago</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                        <CardHeader className="bg-purple-600 border-b-4 border-black">
                            <CardTitle className="text-2xl font-bold text-white flex items-center">
                                <Shield className="w-6 h-6 mr-2" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]">
                                    <Users className="w-5 h-5 mr-2" />
                                    Manage Users
                                </Button>
                                <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]">
                                    <Store className="w-5 h-5 mr-2" />
                                    Manage Stores
                                </Button>
                                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]">
                                    <DollarSign className="w-5 h-5 mr-2" />
                                    View Reports
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 