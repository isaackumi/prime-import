import type { CollectionConfig } from 'payload'

export const Stores: CollectionConfig = {
    slug: 'stores',
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
            type: 'textarea',
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'banner',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'owner',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
        {
            name: 'stripeAccountId',
            type: 'text',
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'isActive',
            type: 'checkbox',
            defaultValue: false,
        },
        {
            name: 'theme',
            type: 'group',
            fields: [
                {
                    name: 'primaryColor',
                    type: 'text',
                    defaultValue: '#000000',
                },
                {
                    name: 'secondaryColor',
                    type: 'text',
                    defaultValue: '#ffffff',
                },
                {
                    name: 'accentColor',
                    type: 'text',
                    defaultValue: '#ff6b35',
                },
            ],
        },
        {
            name: 'contact',
            type: 'group',
            fields: [
                {
                    name: 'email',
                    type: 'email',
                },
                {
                    name: 'phone',
                    type: 'text',
                },
                {
                    name: 'address',
                    type: 'textarea',
                },
            ],
        },
    ],
} 