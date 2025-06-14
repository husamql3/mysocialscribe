#!/bin/bash

# Script Vars
APP_DIR=~/mysocialscribe
LOG_FILE="/var/log/deploy.log"

# Function for logging
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to check command success
check_command() {
    if [ $? -ne 0 ]; then
        log "Error: $1 failed"
        exit 1
    fi
}

# Exit on any error
set -e

# Create log directory if it doesn't exist
sudo mkdir -p "$(dirname "$LOG_FILE")"
sudo touch "$LOG_FILE"
sudo chown "$(whoami)" "$LOG_FILE"

log "Starting deployment process..."

# Update package list and upgrade existing packages
log "Updating system packages..."
sudo apt update && sudo apt upgrade -y
check_command "System update"

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    log "Installing Docker..."
    sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" -y
    sudo apt update
    sudo apt install docker-ce -y
    check_command "Docker installation"
fi

# Install Docker Compose if not present or update it
log "Installing/Updating Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
check_command "Docker Compose installation"

# Ensure Docker starts on boot and start Docker service
log "Configuring Docker service..."
sudo systemctl enable docker
sudo systemctl start docker

# Clean up old Docker resources
log "Cleaning up Docker resources..."
sudo docker system prune -f --volumes
sudo docker image prune -f

# Clone or update repository
if [ -d "$APP_DIR" ]; then
    log "Updating existing repository..."
    cd "$APP_DIR"
    git fetch origin
    git reset --hard origin/main
else
    log "Cloning repository..."
    git clone https://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@github.com/mysocialscribe/mysocialscribe.git "$APP_DIR"
    cd "$APP_DIR"
fi
check_command "Repository setup"

# Create .env file
log "Setting up environment variables..."
cat > "$APP_DIR/.env" << EOF
GA_MEASUREMENT_ID=$GA_MEASUREMENT_ID
NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
NEXT_PUBLIC_AUTH_CALLBACK_URL=$NEXT_PUBLIC_AUTH_CALLBACK_URL
NODE_ENV=$NODE_ENV
EOF

# Stop running containers
log "Stopping existing containers..."
sudo docker-compose down || true

# SSL certificate setup
if [ ! -d "/etc/letsencrypt/live/$DOMAIN_NAME" ]; then
    log "Setting up SSL certificate..."
    sudo apt install certbot -y
    sudo certbot certonly --standalone -d "$DOMAIN_NAME" --non-interactive --agree-tos -m "$EMAIL"
    check_command "SSL certificate generation"
fi

# Build and run containers
log "Building and starting containers..."
sudo docker-compose up --build -d
check_command "Container startup"

# Health check
log "Performing health check..."
sleep 10
if ! sudo docker-compose ps | grep "Up"; then
    log "ERROR: Containers failed to start properly"
    sudo docker-compose logs
    exit 1
fi

log "Deployment completed successfully!
----------------------------------------
Domain: https://$DOMAIN_NAME
Environment Variables Status:
- NEXT_PUBLIC_SUPABASE_URL: ${NEXT_PUBLIC_SUPABASE_URL:+set}${NEXT_PUBLIC_SUPABASE_URL:-not set}
- NEXT_PUBLIC_SUPABASE_ANON_KEY: ${NEXT_PUBLIC_SUPABASE_ANON_KEY:+set}${NEXT_PUBLIC_SUPABASE_ANON_KEY:-not set}
- GA_MEASUREMENT_ID: ${GA_MEASUREMENT_ID:+set}${GA_MEASUREMENT_ID:-not set}
- NEXT_PUBLIC_AUTH_CALLBACK_URL: ${NEXT_PUBLIC_AUTH_CALLBACK_URL:+set}${NEXT_PUBLIC_AUTH_CALLBACK_URL:-not set}
- NEXT_PUBLIC_BASE_URL: ${NEXT_PUBLIC_BASE_URL:+set}${NEXT_PUBLIC_BASE_URL:-not set}
- NODE_ENV: ${NODE_ENV:+set}${NODE_ENV:-not set}
----------------------------------------"
