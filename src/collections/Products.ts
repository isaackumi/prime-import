import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
        },
        {
            name: 'description',
            type: 'richText',
        },
        {
            name: 'store',
            type: 'relationship',
            relationTo: 'stores',
            required: true,
        },
        {
            name: 'images',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
        {
            name: 'price',
            type: 'number',
            required: true,
            min: 0,
        },
        {
            name: 'compareAtPrice',
            type: 'number',
            min: 0,
        },
        {
            name: 'costPerItem',
            type: 'number',
            min: 0,
        },
        {
            name: 'sku',
            type: 'text',
        },
        {
            name: 'barcode',
            type: 'text',
        },
        {
            name: 'trackQuantity',
            type: 'checkbox',
            defaultValue: true,
        },
        {
            name: 'quantity',
            type: 'number',
            min: 0,
            defaultValue: 0,
        },
        {
            name: 'categories',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
        },
        {
            name: 'tags',
            type: 'array',
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                },
            ],
        },
        {
            name: 'weight',
            type: 'number',
            min: 0,
        },
        {
            name: 'weightUnit',
            type: 'select',
            options: [
                { label: 'Grams', value: 'g' },
                { label: 'Kilograms', value: 'kg' },
                { label: 'Ounces', value: 'oz' },
                { label: 'Pounds', value: 'lb' },
            ],
            defaultValue: 'g',
        },
        {
            name: 'isActive',
            type: 'checkbox',
            defaultValue: true,
        },
        {
            name: 'isFeatured',
            type: 'checkbox',
            defaultValue: false,
        },
        {
            name: 'stripeProductId',
            type: 'text',
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'stripePriceId',
            type: 'text',
            admin: {
                readOnly: true,
            },
        },
    ],
} 