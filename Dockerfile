FROM node:24-alpine AS base

FROM base AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

ARG NEXT_PUBLIC_MYORIGIN_API_URL
ARG NEXT_PUBLIC_API_URL
 
ENV NEXT_PUBLIC_MYORIGIN_API_URL=${NEXT_PUBLIC_MYORIGIN_API_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN pnpm build && pnpm prune --prod

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]