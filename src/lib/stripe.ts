import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-05-28.basil',
})

export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
    return await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        automatic_payment_methods: {
            enabled: true,
        },
    })
}

export const createCheckoutSession = async (params: {
    lineItems: Array<{
        price_data: {
            currency: string
            product_data: {
                name: string
                description?: string
                images?: string[]
            }
            unit_amount: number
        }
        quantity: number
    }>
    successUrl: string
    cancelUrl: string
    metadata?: Record<string, string>
}) => {
    return await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: params.lineItems,
        mode: 'payment',
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,
        metadata: params.metadata,
    })
}

export const createConnectedAccount = async (email: string, businessType: 'individual' | 'company' = 'individual') => {
    return await stripe.accounts.create({
        type: 'express',
        email,
        business_type: businessType,
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
        },
    })
} 