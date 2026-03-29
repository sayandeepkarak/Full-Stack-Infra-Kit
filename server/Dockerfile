FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies (without frozen-lockfile as requested)
RUN pnpm install

# Copy source code (respecting .dockerignore if it existed, but we'll copy everything for now)
COPY . .

# Expose the port
EXPOSE 4000

# Start the application
CMD ["node", "index.js"]