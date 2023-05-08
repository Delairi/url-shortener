FROM node:alpine as development
ARG REDIS_URL=redis://default:Phhblqm2aifX2aOeVAbruiFNNwOVKyuy@redis-19322.c253.us-central1-1.gce.cloud.redislabs.com:19322
ENV REDIS_URL=${REDIS_URL}
WORKDIR /usr/backend/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

FROM node:alpine

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/backend/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/backend/app/dist ./dist

CMD ["node", "dist/index.js"]

