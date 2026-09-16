FROM node:24-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM base AS build

COPY . .

RUN npm run build

FROM node:24-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --prod

FROM dhi.io/node:24-alpine

## DHI image, write access in user's home directory only
## needed for creating app.log file by application on start up
WORKDIR /home/node/app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

USER node

EXPOSE 3001

CMD node dist/src/main.js