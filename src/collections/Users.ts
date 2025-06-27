import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    {
      name: "username",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "role",
      type: "select",
      required: true,
      options: [
        { label: "Super Admin", value: "super_admin" },
        { label: "Store Owner", value: "store_owner" },
        { label: "Customer", value: "customer" },
      ],
      defaultValue: "customer",
    },
    {
      name: "permissions",
      type: "array",
      fields: [
        {
          name: "resource",
          type: "select",
          options: [
            { label: "All", value: "all" },
            { label: "Stores", value: "stores" },
            { label: "Products", value: "products" },
            { label: "Orders", value: "orders" },
            { label: "Users", value: "users" },
            { label: "Categories", value: "categories" },
          ],
        },
        {
          name: "actions",
          type: "select",
          hasMany: true,
          options: [
            { label: "Read", value: "read" },
            { label: "Write", value: "write" },
            { label: "Delete", value: "delete" },
            { label: "Admin", value: "admin" },
          ],
        },
      ],
      admin: {
        condition: (data) => data.role === 'super_admin',
      },
    },
    {
      name: "assignedStores",
      type: "relationship",
      relationTo: "stores",
      hasMany: true,
      admin: {
        condition: (data) => data.role === 'store_owner',
      },
    },
    {
      name: "profile",
      type: "group",
      fields: [
        {
          name: "firstName",
          type: "text",
        },
        {
          name: "lastName",
          type: "text",
        },
        {
          name: "avatar",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "phone",
          type: "text",
        },
        {
          name: "address",
          type: "textarea",
        },
      ],
    },
  ],
}
