### Database 
```
docker pull mariadb:latest
```

```
docker run -d \
  --name mariadb \
  -e MYSQL_ROOT_PASSWORD=root \
  -p 3306:3306 \
  -v mariadb_data:/var/lib/mysql \
  mariadb:latest
```

#### Import dumb file
```
docker exec -i mariadb mariadb -u root -proot < ./nation.sql
```

#### Create User
```
docker exec -it mariadb mariadb -u root -p
```

```
CREATE USER 'nation_user'@'%' IDENTIFIED BY 'nation_user';
```

```
GRANT ALL PRIVILEGES ON nation.* TO 'nation_user'@'%';
FLUSH PRIVILEGES;
```

```
docker exec -it mariadb mariadb -u nation_user -pnation_user nation
```

