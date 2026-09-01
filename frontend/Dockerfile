FROM node:21-bookworm-slim AS base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM base AS build

COPY . .

RUN npm run build

FROM nginx:mainline-alpine-slim AS production

WORKDIR /usr/share/nginx/html

RUN rm -rf ./* && mkdir /etc/nginx/sites-enabled

COPY nginx.conf /etc/nginx/nginx.conf
COPY default-site /etc/nginx/sites-enabled/default

COPY --from=build /app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]