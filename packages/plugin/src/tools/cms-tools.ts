import { z } from 'zod'
import type { ToolSet } from 'ai'
import type { CMSToolsOptions } from './types'

type PayloadInstance = {
  find: (args: {
    collection: string
    limit?: number
    page?: number
    sort?: string
    depth?: number
    where?: Record<string, unknown>
  }) => Promise<{
    docs: unknown[]
    totalDocs: number
    totalPages: number
    page?: number
    hasNextPage?: boolean
  }>
  findByID: (args: { collection: string; id: string; depth?: number }) => Promise<unknown>
  create: (args: { collection: string; data: Record<string, unknown>; draft?: boolean }) => Promise<unknown>
  update: (args: { collection: string; id: string; data: Record<string, unknown>; draft?: boolean }) => Promise<unknown>
  findGlobal: (args: { slug: string; depth?: number }) => Promise<unknown>
  updateGlobal: (args: { slug: string; data: Record<string, unknown> }) => Promise<unknown>
  count: (args: { collection: string }) => Promise<{ totalDocs: number }>
}

function summarizeDoc(doc: unknown): Record<string, unknown> {
  const d = doc as Record<string, unknown>
  const summary: Record<string, unknown> = { id: d.id }
  for (const key of ['title', 'name', 'slug', 'filename', 'email', 'category', 'year', 'role', '_status', 'createdAt', 'updatedAt']) {
    if (d[key] !== undefined) summary[key] = d[key]
  }
  return summary
}

export function buildCMSTools(payload: PayloadInstance, options: CMSToolsOptions = {}): ToolSet {
  const readableCollections = options.readableCollections ?? ['users', 'media']
  const writableCollections = options.writableCollections ?? []
  const readableGlobals = options.readableGlobals ?? []
  const writableGlobals = options.writableGlobals ?? []

  const allCollections = [...new Set([...readableCollections, ...writableCollections])]

  if (allCollections.length === 0) {
    return {}
  }

  const collectionEnum = allCollections as [string, ...string[]]
  const writableEnum = writableCollections.length > 0
    ? writableCollections as [string, ...string[]]
    : collectionEnum

  const searchableCollections = allCollections.filter((c) => !['users', 'media'].includes(c)) as [string, ...string[]]

  const tools: ToolSet = {
    listContent: {
      description: 'List documents from a collection. Returns titles, IDs, and key fields.',
      inputSchema: z.object({
        collection: z.enum(collectionEnum).describe('Collection slug to query'),
        limit: z.number().min(1).max(50).default(10).describe('Max documents'),
        page: z.number().min(1).default(1).describe('Page number'),
        sort: z.string().optional().describe('Sort field, prefix - for descending'),
      }),
      execute: async ({ collection, limit, page, sort }) => {
        const result = await payload.find({
          collection,
          limit,
          page,
          sort: sort ?? '-createdAt',
          depth: 0,
        })
        return {
          docs: result.docs.map(summarizeDoc),
          totalDocs: result.totalDocs,
          totalPages: result.totalPages,
          page: result.page,
          hasNextPage: result.hasNextPage,
        }
      },
    },

    readDocument: {
      description: 'Read a single document by ID.',
      inputSchema: z.object({
        collection: z.enum(collectionEnum).describe('Collection slug'),
        id: z.string().describe('Document ID'),
      }),
      execute: async ({ collection, id }) => {
        return payload.findByID({ collection, id, depth: 1 })
      },
    },

    getStats: {
      description: 'Get document counts per collection.',
      inputSchema: z.object({
        _unused: z.string().optional(),
      }),
      execute: async () => {
        const counts: Record<string, number> = {}
        await Promise.all(
          allCollections.map(async (slug) => {
            const result = await payload.count({ collection: slug })
            counts[slug] = result.totalDocs
          }),
        )
        return counts
      },
    },
  }

  if (writableCollections.length > 0) {
    tools.createDocument = {
      description: 'Create a new document in a collection.',
      inputSchema: z.object({
        collection: z.enum(writableEnum).describe('Collection to create in'),
        data: z.record(z.unknown()).describe('Document data'),
        draft: z.boolean().default(true).describe('Create as draft'),
      }),
      execute: async ({ collection, data, draft }) => {
        const doc = await payload.create({ collection, data, draft })
        const r = doc as Record<string, unknown>
        return {
          id: r.id,
          message: `Created ${collection} document`,
          adminUrl: `/admin/collections/${collection}/${r.id}`,
        }
      },
    }

    tools.updateDocument = {
      description: 'Update an existing document by ID. Only send changed fields.',
      inputSchema: z.object({
        collection: z.enum(writableEnum).describe('Collection slug'),
        id: z.string().describe('Document ID'),
        data: z.record(z.unknown()).describe('Fields to update (partial)'),
        draft: z.boolean().optional().describe('false = publish, true = keep draft'),
      }),
      execute: async ({ collection, id, data, draft }) => {
        const doc = await payload.update({ collection, id, data, draft })
        const r = doc as Record<string, unknown>
        return {
          id: r.id,
          message: `Updated ${collection} document`,
          adminUrl: `/admin/collections/${collection}/${r.id}`,
        }
      },
    }
  }

  if (readableGlobals.length > 0) {
    const globalEnum = readableGlobals as [string, ...string[]]
    tools.readGlobal = {
      description: 'Read a global configuration object.',
      inputSchema: z.object({
        slug: z.enum(globalEnum).describe('Global slug'),
      }),
      execute: async ({ slug }) => {
        return payload.findGlobal({ slug, depth: 1 })
      },
    }
  }

  if (writableGlobals.length > 0) {
    const wGlobalEnum = writableGlobals as [string, ...string[]]
    tools.updateGlobal = {
      description: 'Update a global configuration.',
      inputSchema: z.object({
        slug: z.enum(wGlobalEnum).describe('Global slug'),
        data: z.record(z.unknown()).describe('Fields to update'),
      }),
      execute: async ({ slug, data }) => {
        await payload.updateGlobal({ slug, data })
        return { message: `Updated global: ${slug}`, adminUrl: `/admin/globals/${slug}` }
      },
    }
  }

  if (searchableCollections.length > 0) {
    tools.searchContent = {
      description: 'Search a collection by text query on title/name fields.',
      inputSchema: z.object({
        collection: z.enum(searchableCollections).describe('Collection to search'),
        query: z.string().describe('Text to search for'),
        limit: z.number().min(1).max(20).default(10),
      }),
      execute: async ({ collection, query, limit }) => {
        const searchField = collection === 'team-members' ? 'name' : 'title'
        const result = await payload.find({
          collection,
          limit,
          where: { [searchField]: { contains: query } },
          depth: 0,
        })
        return {
          docs: result.docs.map((doc) => {
            const d = doc as Record<string, unknown>
            return { id: d.id, [searchField]: d[searchField], slug: d.slug, updatedAt: d.updatedAt }
          }),
          totalDocs: result.totalDocs,
        }
      },
    }
  }

  return tools
}
