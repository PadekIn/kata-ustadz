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

# Copy folder views di src/views ke dist/views
RUN cp -r src/views dist/views

# Jalankan aplikasi
CMD ["node", "dist/server.js"]
