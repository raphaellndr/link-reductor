# Based on official Next.js Docker example:
# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:20-alpine AS base


#################
# Dependencies  #
#################
FROM base AS deps

# Install libc6-compat for compatibility with certain Node packages
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with frozen lockfile
RUN corepack enable pnpm && pnpm i --frozen-lockfile


#################
# Builder stage #
#################
FROM base AS builder

WORKDIR /app

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application code
COPY . .

# Build Next.js application
# This creates the .next/standalone output
RUN corepack enable pnpm && pnpm run build


#################
# Runtime stage #
#################
FROM base AS runner

WORKDIR /app

# Set production environment
# First line ensures production optimizations
# Second line disables telemetry during runtime
# Third and fourth lines configure server binding
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# Create non-root user and group
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone output for minimal production bundle
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Start Next.js server using the standalone output
CMD ["node", "server.js"]
