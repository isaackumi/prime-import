import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
        return NextResponse.json(
            { error: 'No signature provided' },
            { status: 400 }
        )
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        console.error('Webhook signature verification failed:', err)
        return NextResponse.json(
            { error: 'Invalid signature' },
            { status: 400 }
        )
    }

    const payload = await getPayload({ config: configPromise })

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session

                // Find order by session ID
                const orders = await payload.find({
                    collection: 'orders',
                    where: {
                        stripeSessionId: {
                            equals: session.id,
                        },
                    },
                    limit: 1,
                })

                if (orders.docs.length > 0) {
                    const order = orders.docs[0]

                    // Update order status
                    await payload.update({
                        collection: 'orders',
                        id: order.id,
                        data: {
                            status: 'processing',
                            paymentStatus: 'paid',
                        },
                    })

                    // Send confirmation email (implement email service)
                    console.log(`Order ${order.orderNumber} payment completed`)
                }
                break
            }

            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent

                // Find order by payment intent ID
                const orders = await payload.find({
                    collection: 'orders',
                    where: {
                        stripePaymentIntentId: {
                            equals: paymentIntent.id,
                        },
                    },
                    limit: 1,
                })

                if (orders.docs.length > 0) {
                    const order = orders.docs[0]

                    // Update order status
                    await payload.update({
                        collection: 'orders',
                        id: order.id,
                        data: {
                            status: 'processing',
                            paymentStatus: 'paid',
                        },
                    })

                    console.log(`Order ${order.orderNumber} payment succeeded`)
                }
                break
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent

                // Find order by payment intent ID
                const orders = await payload.find({
                    collection: 'orders',
                    where: {
                        stripePaymentIntentId: {
                            equals: paymentIntent.id,
                        },
                    },
                    limit: 1,
                })

                if (orders.docs.length > 0) {
                    const order = orders.docs[0]

                    // Update order status
                    await payload.update({
                        collection: 'orders',
                        id: order.id,
                        data: {
                            status: 'cancelled',
                            paymentStatus: 'failed',
                        },
                    })

                    console.log(`Order ${order.orderNumber} payment failed`)
                }
                break
            }

            case 'charge.refunded': {
                const charge = event.data.object as Stripe.Charge

                // Find order by payment intent ID
                const orders = await payload.find({
                    collection: 'orders',
                    where: {
                        stripePaymentIntentId: {
                            equals: charge.payment_intent as string,
                        },
                    },
                    limit: 1,
                })

                if (orders.docs.length > 0) {
                    const order = orders.docs[0]

                    // Update order status
                    await payload.update({
                        collection: 'orders',
                        id: order.id,
                        data: {
                            status: 'refunded',
                            paymentStatus: 'refunded',
                        },
                    })

                    console.log(`Order ${order.orderNumber} refunded`)
                }
                break
            }

            default:
                console.log(`Unhandled event type: ${event.type}`)
        }

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error('Webhook error:', error)
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        )
    }
} 