# Gunakan base image Node.js
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json dan install dependencies
COPY package.json ./
RUN npm install

# Copy seluruh source code
COPY . .

# Build TypeScript
RUN npm run build

# Jalankan aplikasi
CMD ["node", "dist/server.js"]
