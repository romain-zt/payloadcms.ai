FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

# --- deps ---
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/cms/package.json ./apps/cms/
COPY packages/plugin/package.json ./packages/plugin/
RUN pnpm install --frozen-lockfile --filter @payloadcms-ai/cms...

# --- builder ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules
COPY . .
WORKDIR /app/apps/cms
RUN pnpm build

# --- runner ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/cms/.next/standalone ./
COPY --from=builder /app/apps/cms/.next/static ./apps/cms/.next/static
COPY --from=builder /app/apps/cms/public ./apps/cms/public 2>/dev/null || true

USER nextjs
EXPOSE 3001

CMD ["node", "apps/cms/server.js"]
