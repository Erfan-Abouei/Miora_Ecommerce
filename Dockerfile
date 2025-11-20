FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

ENV DATABASE_URL="mysql://ErFaNK:ErFaN_KiNg138787@mysql:3306/miora_ecommerce"

RUN npm run build

EXPOSE 3000

# دستور برای شروع برنامه
CMD ["npm", "start"]
