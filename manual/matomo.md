# Installation

## Conteneur Mysql
```bash
# récupère l'image mysql
docker pull mysql
```

```bash
# démarre mysql dans le conteneur mon_mysql
# admin mysql : root
# mot de passe admin : mdp
docker run --name mon_mysql -e MYSQL_ROOT_PASSWORD=mdp -d mysql:latest
```

## Conteneur Matomo
```bash
# récupère l'image matomo
docker pull matomo
```

```bash
# démarre matomo dans le conteneur mon_matomo
# port 8088
# serveur de base de données : conteneur mon_mysql
# volume matomo (-v) sur /var/www/html
# base de données : matomo
docker run -d -p 8088:80 --name mon_matomo --link mon_mysql:db -v matomo:/var/www/html matomo
```

Configuration de la base de données: Accès à localhost:8088
-> onglet 3. Installation de la base de données
- Serveur de base de données : mon_mysql
- Compte utilisateur : root
- Mot de passe : mdp
- Nom dela base : matomo
- Préfixe des tables : matomo_
- Adaptateur : PDO\MYSQL

Modification du fichier de config (en local): 
```bash
# ajoute la ligne 'enable_trusted_host_check=0' dans la partie '[General]' du fichier ./config/config.ini.php
docker exec -it mon_matomo sed -i -e "s/\"localhost\"/\"localhost\"\\nenable_trusted_host_check=0/g" ./config/config.ini.php
```