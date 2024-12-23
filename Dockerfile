FROM node:18.18.0-alpine AS base

# Install dependencies
RUN apk add --no-cache curl python3 py3-pip ffmpeg

# Install yt-dlp
RUN mkdir -p ~/.local/bin && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ~/.local/bin/yt-dlp && \
    chmod a+rx ~/.local/bin/yt-dlp

# Add yt-dlp to PATH
ENV PATH="/root/.local/bin:${PATH}"

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app ./
RUN yarn build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Create necessary directories with proper permissions
RUN mkdir -p /app/.next/cache && \
    mkdir -p /app/public/downloads && \
    addgroup -g 1000 appgroup && \
    adduser -D -u 1000 -G appgroup appuser && \
    chown -R appuser:appgroup /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Ensure downloads directory has proper permissions
RUN chown -R appuser:appgroup /app/public/downloads && \
    chmod -R 755 /app/public/downloads

USER appuser

EXPOSE 3000
CMD ["node", "server.js"]
