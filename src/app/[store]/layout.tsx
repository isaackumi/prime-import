import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { TRPCProvider } from '@/lib/trpc/provider'
import { CartProvider } from '@/contexts/cart-context'
import { Toaster } from 'sonner'

interface StoreLayoutProps {
    children: React.ReactNode
}

export default function StoreLayout({ children }: StoreLayoutProps) {
    return (
        <TRPCProvider>
            <CartProvider>
                {children}
                <Toaster position="top-right" />
            </CartProvider>
        </TRPCProvider>
    )
}

function StoreHeader({ store }: { store: any }) {
    return (
        <header className="bg-white border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {store.logo && (
                            <img
                                src={store.logo.url}
                                alt={store.name}
                                className="h-12 w-12 object-cover border-2 border-black"
                            />
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-black">{store.name}</h1>
                            {store.description && (
                                <p className="text-gray-600 text-sm">{store.description}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <a
                            href="/"
                            className="text-blue-600 hover:text-blue-800 font-bold"
                        >
                            Back to Prime Importation
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
} 