FROM node:24-alpine

# Create app directory
WORKDIR /app

COPY package.json package-lock.json ./

RUN  npm install -g @nestjs/cli@11 && npm ci

COPY . .

CMD npm run start:dev