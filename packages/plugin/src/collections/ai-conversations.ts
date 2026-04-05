import type { CollectionConfig } from 'payload'

export const aiConversationsCollection: CollectionConfig = {
  slug: 'ai-conversations',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    group: 'AI',
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => {
      if (!req.user) return false
      return {
        'user.value': {
          equals: req.user.id,
        },
      }
    },
    update: ({ req }) => {
      if (!req.user) return false
      return {
        'user.value': {
          equals: req.user.id,
        },
      }
    },
    delete: ({ req }) => {
      if (!req.user) return false
      return {
        'user.value': {
          equals: req.user.id,
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 120,
    },
    {
      name: 'messages',
      type: 'array',
      fields: [
        {
          name: 'role',
          type: 'select',
          required: true,
          options: [
            { label: 'User', value: 'user' },
            { label: 'Assistant', value: 'assistant' },
          ],
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      index: true,
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create' && req.user) {
          return { ...data, user: req.user.id }
        }
        return data
      },
    ],
  },
  timestamps: true,
}
