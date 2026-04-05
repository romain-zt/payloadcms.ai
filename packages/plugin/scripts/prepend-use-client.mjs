import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(dir, '..', 'dist')

const directive = "'use client';\n"

for (const file of ['client.mjs', 'client.js']) {
  const p = path.join(dist, file)
  if (!fs.existsSync(p)) continue
  let code = fs.readFileSync(p, 'utf8')
  if (code.startsWith("'use client'") || code.startsWith('"use client"')) continue
  fs.writeFileSync(p, directive + code)
}
