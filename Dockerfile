# Stage 0: Base image for all subsequent stages (lightweight Node.js)
FROM node:20-alpine AS base

# Install necessary packages for Next.js on Alpine (e.g., for image optimization libraries like sharp)
# This typically provides libc6-compat, which Next.js might rely on.
RUN apk add --no-cache libc6-compat

# Create a non-root user for security
# Next.js officially recommends running as a non-root user
RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs nextjs

# Set environment variables for all stages (if needed for build/install)
ENV NEXT_TELEMETRY_DISABLED 1

# Stage 1: Dependency Installation
FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
  else npm ci --only=production; \
  fi

# Stage 2: Next.js Build Stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules # Copy installed dependencies
COPY . .
RUN npm run build # This command creates the .next/standalone and .next/static folders

# Stage 3: Production Runtime
FROM base AS runner
WORKDIR /app

# Set production environment variables
ENV NODE_ENV production
# Cloud Run expects the app to listen on the PORT environment variable
ENV PORT 8080

# Copy the standalone output from the builder stage
# This copies the self-contained Next.js server and its minimal node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy public assets (important for images, fonts, etc.)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Copy any necessary next.config.js (if not part of standalone bundle, though it usually is)
# COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./

# Set the user to run the application as
USER nextjs

# Expose the port (for documentation/local testing; Cloud Run handles actual port mapping)
EXPOSE 8080

# Command to start the Next.js production server
CMD ["node", "server.js"]
