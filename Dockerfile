#https://github.com/fabriziocucci/vuejs.org/blob/7f9aa12833c085b97a826df3ba240f7d9e069e1b/src/v2/cookbook/dockerize-vuejs-app.md

FROM node:13-alpine
LABEL maintainer=francois.romain@beta.gouv.fr

ENV dir /app
WORKDIR $dir

# cache node_modules if no changes to package.json
# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY package.json /tmp/package.json
RUN cd /tmp && npm install && cp -a /tmp/node_modules $dir/

COPY package.json ./
COPY index.js ./
COPY vue.config.js ./
COPY babel.config.js ./
COPY src src/
COPY public public/

CMD npm run build && npm start
