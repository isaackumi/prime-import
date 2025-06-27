import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
    try {
        const { orderData, successUrl, cancelUrl } = await request.json()

        const payload = await getPayload({ config: configPromise })

        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

        // Create order in database
        const order = await payload.create({
            collection: 'orders',
            data: {
                orderNumber,
                customer: {
                    email: orderData.customer.email,
                    firstName: orderData.customer.firstName,
                    lastName: orderData.customer.lastName,
                    phone: orderData.customer.phone,
                },
                shippingAddress: {
                    address1: orderData.customer.address,
                    city: orderData.customer.city,
                    state: orderData.customer.state,
                    zipCode: orderData.customer.zipCode,
                    country: orderData.customer.country,
                },
                items: orderData.items.map((item: any) => ({
                    product: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.price * item.quantity,
                })),
                subtotal: orderData.total,
                tax: 0,
                shipping: 0,
                total: orderData.total,
                status: 'pending',
                paymentStatus: 'pending',
            },
        })

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: orderData.items.map((item: any) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name || 'Product',
                        description: `From ${item.storeName || 'Store'}`,
                    },
                    unit_amount: Math.round(item.price * 100), // Convert to cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl,
            metadata: {
                orderId: order.id,
            },
            customer_email: orderData.customer.email,
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB', 'AU'],
            },
        })

        // Update order with session ID
        await payload.update({
            collection: 'orders',
            id: order.id,
            data: {
                stripePaymentIntentId: session.payment_intent as string,
                stripeSessionId: session.id,
            },
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error('Checkout error:', error)
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        )
    }
} 