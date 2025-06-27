import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
    slug: 'orders',
    admin: {
        useAsTitle: 'orderNumber',
    },
    fields: [
        {
            name: 'orderNumber',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'customer',
            type: 'group',
            fields: [
                {
                    name: 'email',
                    type: 'email',
                    required: true,
                },
                {
                    name: 'firstName',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'lastName',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'phone',
                    type: 'text',
                },
            ],
        },
        {
            name: 'shippingAddress',
            type: 'group',
            fields: [
                {
                    name: 'address1',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'address2',
                    type: 'text',
                },
                {
                    name: 'city',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'state',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'zipCode',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'country',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'items',
            type: 'array',
            fields: [
                {
                    name: 'product',
                    type: 'relationship',
                    relationTo: 'products',
                    required: true,
                },
                {
                    name: 'quantity',
                    type: 'number',
                    required: true,
                    min: 1,
                },
                {
                    name: 'price',
                    type: 'number',
                    required: true,
                    min: 0,
                },
                {
                    name: 'total',
                    type: 'number',
                    required: true,
                    min: 0,
                },
            ],
        },
        {
            name: 'subtotal',
            type: 'number',
            required: true,
            min: 0,
        },
        {
            name: 'tax',
            type: 'number',
            required: true,
            min: 0,
            defaultValue: 0,
        },
        {
            name: 'shipping',
            type: 'number',
            required: true,
            min: 0,
            defaultValue: 0,
        },
        {
            name: 'total',
            type: 'number',
            required: true,
            min: 0,
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Processing', value: 'processing' },
                { label: 'Shipped', value: 'shipped' },
                { label: 'Delivered', value: 'delivered' },
                { label: 'Cancelled', value: 'cancelled' },
                { label: 'Refunded', value: 'refunded' },
            ],
            defaultValue: 'pending',
        },
        {
            name: 'paymentStatus',
            type: 'select',
            required: true,
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Paid', value: 'paid' },
                { label: 'Failed', value: 'failed' },
                { label: 'Refunded', value: 'refunded' },
            ],
            defaultValue: 'pending',
        },
        {
            name: 'stripePaymentIntentId',
            type: 'text',
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'stripeSessionId',
            type: 'text',
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'notes',
            type: 'textarea',
        },
    ],
} 