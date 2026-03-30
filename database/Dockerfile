FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy the database package (knexfile, migrations, seeds, package.json)
COPY . .

# Install dependencies
RUN pnpm install

# Run migrations and exit
CMD ["pnpm", "run", "migrate", "&&", "exit", "0"]
