#https://github.com/fabriziocucci/vuejs.org/blob/7f9aa12833c085b97a826df3ba240f7d9e069e1b/src/v2/cookbook/dockerize-vuejs-app.md

# build stage
FROM node:alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]