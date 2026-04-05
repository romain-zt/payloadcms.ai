import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { createAIAssistantPlugin } from '@payloadcms/ai-assistant'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Waitlist } from './collections/Waitlist'
import { Pages } from './collections/Pages'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  plugins: [
    createAIAssistantPlugin({
      model: process.env.AI_MODEL ?? 'gpt-4o',
      collections: ['waitlist', 'pages', 'media'],
      globals: [],
    }),
  ],
  collections: [Users, Media, Waitlist, Pages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? '',
    },
  }),
  sharp,
})
