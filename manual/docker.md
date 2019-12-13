# Déploiement

---

## Docker

### Serveur local dans un container docker

```bash
# démarre l'application dans un conteneur Docker
# avec webpack-dev-server en mode `development`
# accessible à http://localhost:NODE_PORT
docker-compose -f ./docker-compose.localhost.yml up --build
```

### Tester l'application en local dans un environement de production

Pré-requis:

- une installation locale active de https://github.com/jwilder/nginx-proxy
- un certificat ssl auto-signé
- [instructions](https://medium.com/@francoisromain/set-a-local-web-development-environment-with-custom-urls-and-https-3fbe91d2eaf0)

```bash
# Démarre l'application dans un container Docker
# avec un serveur express.js en mode `production`
# accessible à https://camino.local
docker-compose -f ./docker-compose.local.yml up --build
```

### Serveur de production

Pré-requis:

- une installation active de https://github.com/jwilder/nginx-proxy
- [instructions](https://medium.com/@francoisromain/host-multiple-websites-with-https-inside-docker-containers-on-a-single-server-18467484ab95)

```bash
# démarre l'application dans un container Docker
# en mode `production`
# accessible à https://{VUE_APP_API_URL}
docker-compose up --build
```
