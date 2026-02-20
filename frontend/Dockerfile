FROM node:21-bookworm-slim AS base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM base AS build

COPY . .

RUN npm run build

FROM nginx:mainline-alpine-slim AS production

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]