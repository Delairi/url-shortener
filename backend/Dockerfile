FROM node:alpine

WORKDIR /usr/backend/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4002

CMD ["npm", "start"]
