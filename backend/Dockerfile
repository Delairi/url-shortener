FROM node:alpine as development

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

