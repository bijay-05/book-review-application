FROM node:24-alpine

# Create app directory
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD npm run start:dev