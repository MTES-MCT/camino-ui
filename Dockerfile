#https://github.com/fabriziocucci/vuejs.org/blob/7f9aa12833c085b97a826df3ba240f7d9e069e1b/src/v2/cookbook/dockerize-vuejs-app.md

FROM node:16.12-alpine as build-stage
LABEL maintainer=francois.romain@beta.gouv.fr

ENV dir /app
WORKDIR $dir

COPY package*.json ./
# On désactive husky
RUN npm set-script prepare ""
RUN npm ci

COPY index.js ./
COPY vite.config.js ./
COPY babel.config.js ./
COPY src src/
RUN npm run build

FROM node:16.12-alpine as production-stage

COPY --from=build-stage /app/package*.json ./
RUN npm ci --only=prod
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/index.js .

CMD ["npm", "start"]
