import { z } from 'zod'
import { zodSchema } from 'ai'
import type { ToolSet } from 'ai'

const PAYLOAD_URL = process.env.PAYLOAD_API_URL ?? 'http://localhost:3000'
const PAYLOAD_KEY = process.env.PAYLOAD_API_KEY ?? ''

async function payloadFetch(path: string, options?: RequestInit) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (PAYLOAD_KEY) {
    headers['Authorization'] = `Bearer ${PAYLOAD_KEY}`
  }

  const res = await fetch(`${PAYLOAD_URL}/api${path}`, {
    ...options,
    headers: { ...headers, ...options?.headers },
  })

  return res.json()
}

function summarize(doc: Record<string, unknown>): Record<string, unknown> {
  const summary: Record<string, unknown> = { id: doc.id }
  for (const key of ['title', 'name', 'slug', 'filename', 'email', 'category', 'year', 'role', '_status', 'createdAt', 'updatedAt']) {
    if (doc[key] !== undefined) summary[key] = doc[key]
  }
  return summary
}

export const cmsTools: ToolSet = {
  listContent: {
    description: 'List documents from a collection. Returns titles, IDs, and key fields.',
    inputSchema: zodSchema(z.object({
      collection: z.string().describe('The collection slug to query (e.g. "posts", "pages", "media")'),
      limit: z.number().min(1).max(50).default(10).describe('Max documents to return'),
      page: z.number().min(1).default(1).describe('Page number'),
      sort: z.string().optional().describe('Sort field, prefix with - for descending'),
    })),
    execute: async ({ collection, limit, page, sort }: { collection: string; limit: number; page: number; sort?: string }) => {
      const params = new URLSearchParams({
        limit: String(limit),
        page: String(page),
        sort: sort || '-createdAt',
        depth: '0',
      })
      const result = await payloadFetch(`/${collection}?${params}`)
      return {
        docs: (result.docs ?? []).map(summarize),
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
        page: result.page,
      }
    },
  },

  readDocument: {
    description: 'Read a single document by ID from a collection. Returns all fields.',
    inputSchema: zodSchema(z.object({
      collection: z.string().describe('The collection slug'),
      id: z.string().describe('The document ID'),
    })),
    execute: async ({ collection, id }: { collection: string; id: string }) => {
      return payloadFetch(`/${collection}/${id}?depth=1`)
    },
  },

  createDocument: {
    description: 'Create a new document in a collection.',
    inputSchema: zodSchema(z.object({
      collection: z.string().describe('The collection to create in'),
      data: z.record(z.unknown()).describe('The document data'),
    })),
    execute: async ({ collection, data }: { collection: string; data: Record<string, unknown> }) => {
      const result = await payloadFetch(`/${collection}`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
      return {
        id: result.doc?.id ?? result.id,
        message: `Created document in ${collection}`,
      }
    },
  },

  updateDocument: {
    description: 'Update an existing document by ID. Only send fields you want to change.',
    inputSchema: zodSchema(z.object({
      collection: z.string().describe('The collection slug'),
      id: z.string().describe('The document ID to update'),
      data: z.record(z.unknown()).describe('Fields to update'),
    })),
    execute: async ({ collection, id, data }: { collection: string; id: string; data: Record<string, unknown> }) => {
      const result = await payloadFetch(`/${collection}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
      return {
        id: result.doc?.id ?? result.id,
        message: `Updated document in ${collection}`,
      }
    },
  },

  searchContent: {
    description: 'Search across a collection by text query.',
    inputSchema: zodSchema(z.object({
      collection: z.string().describe('Collection to search in'),
      query: z.string().describe('Text to search for'),
      limit: z.number().min(1).max(20).default(10),
    })),
    execute: async ({ collection, query, limit }: { collection: string; query: string; limit: number }) => {
      const params = new URLSearchParams({
        limit: String(limit),
        depth: '0',
        'where[title][contains]': query,
      })
      const result = await payloadFetch(`/${collection}?${params}`)
      return {
        docs: (result.docs ?? []).map(summarize),
        totalDocs: result.totalDocs,
      }
    },
  },
}
