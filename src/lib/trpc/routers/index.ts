import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../server'
import { getPayload } from 'payload'
import configPromise from "@payload-config";



// Stores router
const storesRouter = router({
    getAll: publicProcedure.query(async () => {

        const payload = await getPayload({ config: configPromise })
        const stores = await payload.find({
            collection: 'stores',
            where: {
                isActive: {
                    equals: true,
                },
            },
        })
        return stores
    }),

    getBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ input }) => {
            const payload = await getPayload({ config: configPromise })
            const store = await payload.find({
                collection: 'stores',
                where: {
                    slug: {
                        equals: input.slug,
                    },
                    isActive: {
                        equals: true,
                    },
                },
                limit: 1,
            })
            return store.docs[0] || null
        }),

    create: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                slug: z.string(),
                description: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const payload = await getPayload({ config: configPromise })
            const store = await payload.create({
                collection: 'stores',
                data: {
                    ...input,
                    owner: 'current-user-id', // This will be set from the authenticated user
                },
            })
            return store
        }),
})

// Products router
const productsRouter = router({
    getAll: publicProcedure
        .input(
            z.object({
                storeSlug: z.string().optional(),
                category: z.string().optional(),
                limit: z.number().optional(),
                page: z.number().optional(),
            })
        )
        .query(async ({ input }) => {
            const payload = await getPayload({ config: configPromise })

            const where: any = {
                isActive: {
                    equals: true,
                },
            }

            if (input.storeSlug) {
                where.store = {
                    slug: {
                        equals: input.storeSlug,
                    },
                }
            }

            if (input.category) {
                where.categories = {
                    slug: {
                        equals: input.category,
                    },
                }
            }

            const products = await payload.find({
                collection: 'products',
                where,
                limit: input.limit || 20,
                page: input.page || 1,
            })
            return products
        }),

    getBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ input }) => {
            const payload = await getPayload({ config: configPromise })
            const product = await payload.find({
                collection: 'products',
                where: {
                    slug: {
                        equals: input.slug,
                    },
                    isActive: {
                        equals: true,
                    },
                },
                limit: 1,
            })
            return product.docs[0] || null
        }),

    create: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                slug: z.string(),
                price: z.number(),
                storeId: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const payload = await getPayload({ config: configPromise })
            const product = await payload.create({
                collection: 'products',
                data: {
                    name: input.name,
                    slug: input.slug,
                    price: input.price,
                    store: input.storeId,
                    isActive: true,
                },
            })
            return product
        }),
})

// Categories router
const categoriesRouter = router({
    getAll: publicProcedure.query(async () => {
        const payload = await getPayload({ config: configPromise })

        // First get all parent categories (categories without parents)
        const parentCategories = await payload.find({
            collection: 'categories',
            where: {
                parent: {
                    exists: false,
                },
            },
            depth: 1, // This will populate subcategories
        })

        // Format the data to include subcategories properly
        const formattedCategories = parentCategories.docs.map((category: any) => ({
            ...category,
            subcategories: category.subcategories?.docs || [],
        }))

        return {
            docs: formattedCategories,
            totalDocs: formattedCategories.length,
            totalPages: 1,
            page: 1,
            limit: formattedCategories.length,
        }
    }),

    getBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ input }) => {
            const payload = await getPayload({ config: configPromise })
            const category = await payload.find({
                collection: 'categories',
                where: {
                    slug: {
                        equals: input.slug,
                    },
                },
                depth: 1,
                limit: 1,
            })

            if (category.docs[0]) {
                const formattedCategory = {
                    ...category.docs[0],
                    subcategories: category.docs[0].subcategories?.docs || [],
                }
                return formattedCategory
            }

            return null
        }),

    getSubcategories: publicProcedure
        .input(z.object({ parentSlug: z.string() }))
        .query(async ({ input }) => {
            const payload = await getPayload({ config: configPromise })

            // First get the parent category
            const parentCategory = await payload.find({
                collection: 'categories',
                where: {
                    slug: {
                        equals: input.parentSlug,
                    },
                },
                limit: 1,
            })

            if (parentCategory.docs.length === 0) {
                return { docs: [] }
            }

            // Then get all subcategories of this parent
            const subcategories = await payload.find({
                collection: 'categories',
                where: {
                    parent: {
                        equals: parentCategory.docs[0].id,
                    },
                },
            })

            return subcategories
        }),
})

// Orders router
const ordersRouter = router({
    create: publicProcedure
        .input(
            z.object({
                customer: z.object({
                    email: z.string().email(),
                    firstName: z.string(),
                    lastName: z.string(),
                    phone: z.string().optional(),
                }),
                shippingAddress: z.object({
                    address1: z.string(),
                    address2: z.string().optional(),
                    city: z.string(),
                    state: z.string(),
                    zipCode: z.string(),
                    country: z.string(),
                }),
                items: z.array(
                    z.object({
                        productId: z.string(),
                        quantity: z.number(),
                        price: z.number(),
                    })
                ),
                subtotal: z.number(),
                tax: z.number(),
                shipping: z.number(),
                total: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            const payload = await getPayload({ config: configPromise })

            // Generate order number
            const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

            const order = await payload.create({
                collection: 'orders',
                data: {
                    orderNumber,
                    customer: input.customer,
                    shippingAddress: input.shippingAddress,
                    items: input.items.map(item => ({
                        product: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                        total: item.price * item.quantity,
                    })),
                    subtotal: input.subtotal,
                    tax: input.tax,
                    shipping: input.shipping,
                    total: input.total,
                    status: 'pending',
                    paymentStatus: 'pending',
                },
            })
            return order
        }),

    getByOrderNumber: publicProcedure
        .input(z.object({ orderNumber: z.string() }))
        .query(async ({ input }) => {
            const payload = await getPayload({ config: configPromise })
            const order = await payload.find({
                collection: 'orders',
                where: {
                    orderNumber: {
                        equals: input.orderNumber,
                    },
                },
                limit: 1,
            })
            return order.docs[0] || null
        }),
})

export const appRouter = router({
    stores: storesRouter,
    products: productsRouter,
    categories: categoriesRouter,
    orders: ordersRouter,
})

export type AppRouter = typeof appRouter 