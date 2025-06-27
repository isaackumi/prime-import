'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    BarChart3,
    ShoppingBag,
    Package,
    Users,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Eye,
    Plus,
    Edit,
    Trash2,
    Settings,
    Download,
    Upload,
    Search,
    Filter,
    Calendar,
    Star,
    MessageSquare,
    AlertCircle,
    CheckCircle,
    Clock,
    Truck,
    CreditCard,
    Store
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('overview')

    // Mock data - in real app, this would come from tRPC
    const stats = [
        {
            title: 'Total Sales',
            value: '$12,450',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign
        },
        {
            title: 'Orders',
            value: '156',
            change: '+8.2%',
            trend: 'up',
            icon: ShoppingBag
        },
        {
            title: 'Products',
            value: '89',
            change: '+3.1%',
            trend: 'up',
            icon: Package
        },
        {
            title: 'Customers',
            value: '1,234',
            change: '+15.3%',
            trend: 'up',
            icon: Users
        }
    ]

    const recentOrders = [
        {
            id: '#ORD-001',
            customer: 'John Doe',
            product: 'Wireless Headphones',
            amount: '$129.99',
            status: 'completed',
            date: '2024-01-15'
        },
        {
            id: '#ORD-002',
            customer: 'Jane Smith',
            product: 'Smart Watch',
            amount: '$299.99',
            status: 'processing',
            date: '2024-01-14'
        },
        {
            id: '#ORD-003',
            customer: 'Mike Johnson',
            product: 'Laptop Stand',
            amount: '$49.99',
            status: 'shipped',
            date: '2024-01-13'
        },
        {
            id: '#ORD-004',
            customer: 'Sarah Wilson',
            product: 'Phone Case',
            amount: '$19.99',
            status: 'pending',
            date: '2024-01-12'
        }
    ]

    const topProducts = [
        {
            name: 'Wireless Headphones',
            sales: 45,
            revenue: '$5,849.55',
            rating: 4.8
        },
        {
            name: 'Smart Watch',
            sales: 32,
            revenue: '$9,599.68',
            rating: 4.6
        },
        {
            name: 'Laptop Stand',
            sales: 28,
            revenue: '$1,399.72',
            rating: 4.9
        },
        {
            name: 'Phone Case',
            sales: 25,
            revenue: '$499.75',
            rating: 4.7
        }
    ]

    const notifications = [
        {
            type: 'order',
            message: 'New order #ORD-005 received',
            time: '2 minutes ago',
            read: false
        },
        {
            type: 'payment',
            message: 'Payment processed for order #ORD-003',
            time: '1 hour ago',
            read: false
        },
        {
            type: 'inventory',
            message: 'Low stock alert: Wireless Headphones',
            time: '3 hours ago',
            read: true
        },
        {
            type: 'review',
            message: 'New 5-star review for Smart Watch',
            time: '5 hours ago',
            read: true
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500'
            case 'processing':
                return 'bg-blue-500'
            case 'shipped':
                return 'bg-purple-500'
            case 'pending':
                return 'bg-yellow-500'
            default:
                return 'bg-gray-500'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return CheckCircle
            case 'processing':
                return Clock
            case 'shipped':
                return Truck
            case 'pending':
                return AlertCircle
            default:
                return Clock
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <div>
                            <h1 className="text-3xl font-bold text-black">Store Dashboard</h1>
                            <p className="text-gray-600">Manage your store, products, and orders</p>
                        </div>
                        <div className="flex space-x-4">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Product
                            </Button>
                            <Button variant="outline" className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]">
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <Card key={stat.title} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-bold text-black">{stat.value}</p>
                                        <div className="flex items-center mt-2">
                                            {stat.trend === 'up' ? (
                                                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                                            )}
                                            <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                                {stat.change}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="orders" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">
                            Orders
                        </TabsTrigger>
                        <TabsTrigger value="products" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">
                            Products
                        </TabsTrigger>
                        <TabsTrigger value="customers" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">
                            Customers
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold">
                            Analytics
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Orders */}
                            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                                <CardHeader className="bg-blue-600 border-b-4 border-black">
                                    <CardTitle className="text-xl font-bold text-white flex items-center">
                                        <ShoppingBag className="w-5 h-5 mr-2" />
                                        Recent Orders
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {recentOrders.map((order) => {
                                            const StatusIcon = getStatusIcon(order.status)
                                            return (
                                                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-black">
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`} />
                                                        <div>
                                                            <p className="font-semibold text-black">{order.id}</p>
                                                            <p className="text-sm text-gray-600">{order.customer}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-black">{order.amount}</p>
                                                        <p className="text-sm text-gray-600">{order.date}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]">
                                        View All Orders
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Top Products */}
                            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                                <CardHeader className="bg-green-600 border-b-4 border-black">
                                    <CardTitle className="text-xl font-bold text-white flex items-center">
                                        <Star className="w-5 h-5 mr-2" />
                                        Top Products
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {topProducts.map((product) => (
                                            <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-black">
                                                <div>
                                                    <p className="font-semibold text-black">{product.name}</p>
                                                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-black">{product.revenue}</p>
                                                    <div className="flex items-center">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]">
                                        View All Products
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Notifications */}
                            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                                <CardHeader className="bg-purple-600 border-b-4 border-black">
                                    <CardTitle className="text-xl font-bold text-white flex items-center">
                                        <MessageSquare className="w-5 h-5 mr-2" />
                                        Notifications
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {notifications.map((notification, index) => (
                                            <div key={index} className={`p-3 rounded-lg border-2 border-black ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                                                <p className="font-semibold text-black">{notification.message}</p>
                                                <p className="text-sm text-gray-600">{notification.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]">
                                        View All Notifications
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Orders Tab */}
                    <TabsContent value="orders" className="space-y-6">
                        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                            <CardHeader className="bg-blue-600 border-b-4 border-black">
                                <CardTitle className="text-xl font-bold text-white flex items-center justify-between">
                                    <span>Order Management</span>
                                    <div className="flex space-x-2">
                                        <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[1px] hover:translate-y-[1px]">
                                            <Download className="w-4 h-4 mr-2" />
                                            Export
                                        </Button>
                                        <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[1px] hover:translate-y-[1px]">
                                            <Filter className="w-4 h-4 mr-2" />
                                            Filter
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full border-4 border-black">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-3 text-left font-bold border-2 border-black">Order ID</th>
                                                <th className="p-3 text-left font-bold border-2 border-black">Customer</th>
                                                <th className="p-3 text-left font-bold border-2 border-black">Product</th>
                                                <th className="p-3 text-left font-bold border-2 border-black">Amount</th>
                                                <th className="p-3 text-left font-bold border-2 border-black">Status</th>
                                                <th className="p-3 text-left font-bold border-2 border-black">Date</th>
                                                <th className="p-3 text-left font-bold border-2 border-black">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentOrders.map((order) => {
                                                const StatusIcon = getStatusIcon(order.status)
                                                return (
                                                    <tr key={order.id} className="border-2 border-black">
                                                        <td className="p-3 border-2 border-black font-semibold">{order.id}</td>
                                                        <td className="p-3 border-2 border-black">{order.customer}</td>
                                                        <td className="p-3 border-2 border-black">{order.product}</td>
                                                        <td className="p-3 border-2 border-black font-semibold">{order.amount}</td>
                                                        <td className="p-3 border-2 border-black">
                                                            <Badge className={`${getStatusColor(order.status)} text-white`}>
                                                                {order.status}
                                                            </Badge>
                                                        </td>
                                                        <td className="p-3 border-2 border-black">{order.date}</td>
                                                        <td className="p-3 border-2 border-black">
                                                            <div className="flex space-x-2">
                                                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[1px] hover:translate-y-[1px]">
                                                                    <Eye className="w-4 h-4" />
                                                                </Button>
                                                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[1px] hover:translate-y-[1px]">
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Products Tab */}
                    <TabsContent value="products" className="space-y-6">
                        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                            <CardHeader className="bg-green-600 border-b-4 border-black">
                                <CardTitle className="text-xl font-bold text-white flex items-center justify-between">
                                    <span>Product Management</span>
                                    <div className="flex space-x-2">
                                        <Button size="sm" className="bg-white text-green-600 hover:bg-gray-100 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[1px] hover:translate-y-[1px]">
                                            <Upload className="w-4 h-4 mr-2" />
                                            Import
                                        </Button>
                                        <Button size="sm" className="bg-white text-green-600 hover:bg-gray-100 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[1px] hover:translate-y-[1px]">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Product
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {topProducts.map((product) => (
                                        <Card key={product.name} className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1">
                                            <CardContent className="p-4">
                                                <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                                    <Package className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <h3 className="font-bold text-black mb-2">{product.name}</h3>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-gray-600">{product.sales} sales</span>
                                                    <div className="flex items-center">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                                    </div>
                                                </div>
                                                <p className="font-semibold text-black mb-3">{product.revenue}</p>
                                                <div className="flex space-x-2">
                                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[1px] hover:translate-y-[1px]">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[1px] hover:translate-y-[1px]">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Customers Tab */}
                    <TabsContent value="customers" className="space-y-6">
                        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                            <CardHeader className="bg-purple-600 border-b-4 border-black">
                                <CardTitle className="text-xl font-bold text-white flex items-center justify-between">
                                    <span>Customer Management</span>
                                    <Button size="sm" className="bg-white text-purple-600 hover:bg-gray-100 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[1px] hover:translate-y-[1px]">
                                        <Users className="w-4 h-4 mr-2" />
                                        View All Customers
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="text-center py-12">
                                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-black mb-2">Customer Management</h3>
                                    <p className="text-gray-600 mb-4">Manage your customer relationships, view purchase history, and track customer engagement.</p>
                                    <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]">
                                        Coming Soon
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics" className="space-y-6">
                        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                            <CardHeader className="bg-orange-600 border-b-4 border-black">
                                <CardTitle className="text-xl font-bold text-white flex items-center justify-between">
                                    <span>Analytics Dashboard</span>
                                    <Button size="sm" className="bg-white text-orange-600 hover:bg-gray-100 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[1px] hover:translate-y-[1px]">
                                        <BarChart3 className="w-4 h-4 mr-2" />
                                        Advanced Analytics
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="text-center py-12">
                                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-black mb-2">Advanced Analytics</h3>
                                    <p className="text-gray-600 mb-4">Get detailed insights into your store performance, customer behavior, and sales trends.</p>
                                    <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px]">
                                        Coming Soon
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
} 