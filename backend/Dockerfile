FROM node:24-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM base AS build

COPY . .

RUN npm run build

FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY --from=build /app/dist ./dist

# RUN apk add --no-cache curl && npm install -g @nestjs/cli@11 && npm install --prod
RUN apk add --no-cache curl && npm install --prod

EXPOSE 3001

CMD node dist/src/main.js