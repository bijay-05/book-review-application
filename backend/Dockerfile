FROM node:22.11-alpine

# Create app directory
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run dev