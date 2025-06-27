'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/client'
import { toast } from 'sonner'

const createStoreSchema = z.object({
    name: z.string().min(2, 'Store name must be at least 2 characters'),
    slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
    description: z.string().optional(),
})

type CreateStoreForm = z.infer<typeof createStoreSchema>

export function CreateStoreForm() {
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<CreateStoreForm>({
        resolver: zodResolver(createStoreSchema),
    })

    const createStore = trpc.stores.create.useMutation({
        onSuccess: () => {
            toast.success('Store created successfully!')
            reset()
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to create store')
        },
    })

    const onSubmit = async (data: CreateStoreForm) => {
        setIsLoading(true)
        try {
            await createStore.mutateAsync(data)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CardHeader className="bg-yellow-400 border-b-4 border-black">
                <CardTitle className="text-2xl font-bold text-black">Create Your Store</CardTitle>
                <CardDescription className="text-black/80">
                    Set up your multi-tenant store in minutes
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold text-black">
                            Store Name *
                        </label>
                        <Input
                            id="name"
                            {...register('name')}
                            className="border-2 border-black bg-white text-black placeholder:text-black/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter store name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600 font-bold">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="slug" className="text-sm font-bold text-black">
                            Store URL *
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/60 font-mono">
                                primeimport.com/store/
                            </span>
                            <Input
                                id="slug"
                                {...register('slug')}
                                className="pl-32 border-2 border-black bg-white text-black placeholder:text-black/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="your-store"
                            />
                        </div>
                        {errors.slug && (
                            <p className="text-sm text-red-600 font-bold">{errors.slug.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-bold text-black">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            {...register('description')}
                            className="border-2 border-black bg-white text-black placeholder:text-black/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Tell customers about your store..."
                            rows={3}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 transform hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating Store...' : 'Create Store'}
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-sm text-black/60">
                        By creating a store, you agree to our{' '}
                        <a href="#" className="text-blue-600 font-bold underline">
                            Terms of Service
                        </a>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
} 