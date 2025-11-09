# docker file created for test !!!

# 1. Base image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package.json package-lock.json ./

# 4. Install dependencies
RUN npm ci

# 5. Copy source files
COPY . .

# 6. Build TypeScript
RUN npm run build

# 7. Expose port
EXPOSE 3000

# 8. Run app
CMD ["node", "dist/server.js"]
