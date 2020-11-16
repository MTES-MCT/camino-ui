#https://github.com/fabriziocucci/vuejs.org/blob/7f9aa12833c085b97a826df3ba240f7d9e069e1b/src/v2/cookbook/dockerize-vuejs-app.md

FROM node:15-alpine as build-stage
LABEL maintainer=francois.romain@beta.gouv.fr

ENV dir /app
WORKDIR $dir

COPY package*.json ./
RUN npm ci

COPY index.js ./
COPY vue.config.js ./
COPY babel.config.js ./
COPY src src/
COPY public public/
RUN npm run build

FROM node:15-alpine as production-stage

COPY --from=build-stage /app/package*.json ./
RUN npm ci --only=prod
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/index.js .

CMD ["npm", "start"]
