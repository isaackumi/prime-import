import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ paymentIntent: string }> }
) {
    const { paymentIntent } = await params

    try {
        const payload = await getPayload({ config: configPromise })

        // Find order by payment intent ID
        const orders = await payload.find({
            collection: 'orders',
            where: {
                stripePaymentIntentId: {
                    equals: paymentIntent,
                },
            },
            depth: 2, // Populate product relationships
            limit: 1,
        })

        if (orders.docs.length === 0) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            )
        }

        const order = orders.docs[0]

        // Format order data for frontend
        const formattedOrder = {
            id: order.id,
            orderNumber: order.orderNumber,
            customer: order.customer,
            shippingAddress: order.shippingAddress,
            items: order.items,
            subtotal: order.subtotal,
            tax: order.tax,
            shipping: order.shipping,
            total: order.total,
            status: order.status,
            paymentStatus: order.paymentStatus,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        }

        return NextResponse.json(formattedOrder)
    } catch (error) {
        console.error('Error fetching order:', error)
        return NextResponse.json(
            { error: 'Failed to fetch order' },
            { status: 500 }
        )
    }
} 