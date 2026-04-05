/**
 * Payload's `payload generate:importmap` can fail with tsx + Node 22 (loadEnv / @next/env).
 * Node's built-in TypeScript stripping loads the config without that path.
 */
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const payloadGen = path.join(
  process.cwd(),
  'node_modules/payload/dist/bin/generateImportMap/index.js',
)
const { generateImportMap } = await import(pathToFileURL(payloadGen).href)

const configUrl = pathToFileURL(path.join(process.cwd(), 'src/payload.config.ts')).href
const mod = await import(configUrl)
const raw = mod.default ?? mod
const config = raw instanceof Promise ? await raw : raw
await generateImportMap(config, { force: true })
