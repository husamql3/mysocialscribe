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

# Create necessary directories and set up user/group
RUN mkdir -p /app/.next/cache && \
    mkdir -p /app/public/downloads && \
    # Try to use an available GID/UID
    addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    # Set permissions
    chown -R appuser:appgroup /app && \
    chown -R appuser:appgroup /app/public/downloads && \
    chmod -R 755 /app/public/downloads

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Ensure all copied files have correct ownership
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000
CMD ["node", "server.js"]
