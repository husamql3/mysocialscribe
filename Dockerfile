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

# Create .next directory and set permissions before copying files
RUN mkdir -p /app/.next/cache && \
    chown -R node:node /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set permissions for the downloads directory
RUN mkdir -p /app/public/downloads && \
    chmod -R 755 /app/public/downloads && \
    chown -R node:node /app/public/downloads

USER node

EXPOSE 3000
CMD ["node", "server.js"]
