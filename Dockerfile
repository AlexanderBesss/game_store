FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN chmod +x wait-for

RUN npm run build
