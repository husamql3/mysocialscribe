FROM node:alpine AS base

# Install dependencies
RUN apk add --no-cache curl python3 py3-pip ffmpeg

# Install yt-dlp
RUN mkdir -p ~/.local/bin && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ~/.local/bin/yt-dlp && \
    chmod a+rx ~/.local/bin/yt-dlp

# Add yt-dlp to PATH
ENV PATH="/root/.local/bin:${PATH}"

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production server
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set permissions for the downloads directory
RUN mkdir -p /app/public/downloads && \
    chmod -R 755 /app/public/downloads

# Set ownership for the downloads directory
RUN chown -R node:node /app/public/downloads

EXPOSE 3000
CMD ["node", "server.js"]
