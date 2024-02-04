FROM node:20.11.0-alpine3.19 as build
WORKDIR /app
COPY . .
RUN npm ci

CMD node app.js
