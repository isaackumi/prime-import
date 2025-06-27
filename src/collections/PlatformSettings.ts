import type { CollectionConfig } from 'payload'

export const PlatformSettings: CollectionConfig = {
    slug: 'platform-settings',
    admin: {
        useAsTitle: 'name',
        group: 'Admin',
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => user?.role === 'super_admin',
        update: ({ req: { user } }) => user?.role === 'super_admin',
        delete: ({ req: { user } }) => user?.role === 'super_admin',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            defaultValue: 'Default Settings',
        },
        {
            name: 'platformFeePercentage',
            type: 'number',
            required: true,
            min: 0,
            max: 100,
            defaultValue: 5,
            admin: {
                description: 'Percentage fee charged on all transactions (0-100)',
            },
        },
        {
            name: 'minimumPayoutAmount',
            type: 'number',
            required: true,
            min: 0,
            defaultValue: 50,
            admin: {
                description: 'Minimum amount required for payout to store owners',
            },
        },
        {
            name: 'payoutSchedule',
            type: 'select',
            required: true,
            options: [
                { label: 'Daily', value: 'daily' },
                { label: 'Weekly', value: 'weekly' },
                { label: 'Monthly', value: 'monthly' },
            ],
            defaultValue: 'weekly',
        },
        {
            name: 'currency',
            type: 'select',
            required: true,
            options: [
                { label: 'USD', value: 'usd' },
                { label: 'EUR', value: 'eur' },
                { label: 'GBP', value: 'gbp' },
                { label: 'CAD', value: 'cad' },
            ],
            defaultValue: 'usd',
        },
        {
            name: 'taxRate',
            type: 'number',
            required: true,
            min: 0,
            max: 100,
            defaultValue: 0,
            admin: {
                description: 'Default tax rate percentage (0-100)',
            },
        },
        {
            name: 'isActive',
            type: 'checkbox',
            defaultValue: true,
        },
    ],
} 