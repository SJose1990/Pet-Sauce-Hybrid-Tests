#!/bin/bash

# Break on any error
set -e

echo "Starting project initialization..."

# Download and install NVM from GitHub
echo "Fetching latest nvm from GitHub..."
if [ ! -d "$HOME/.nvm" ]; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
else
    echo "nvm directory already exists, skipping download."
fi

# Activate NVM for the current session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

echo "nvm is now active."

# Use NVM to install Node.js
echo "Installing Node.js version 22..."
nvm install 22
nvm use 22
nvm alias default 22
echo "Node.js version: $(node -v)"

# Setup pnpm using Corepack
echo "Setting up pnpm..."
npm install --global corepack@latest --force
corepack enable
corepack install
echo "pnpm version: $(pnpm --version)"

# Finalize Project Dependencies
echo "Installing project dependencies..."
pnpm install --frozen-lockfile

echo "Installing Playwright browsers..."
npx playwright install --with-deps

echo "----------------------------------------"
echo "Setup complete!"
