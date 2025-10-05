FROM mariadb:latest

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=nation
ENV MYSQL_USER=nation_user
ENV MYSQL_PASSWORD=nation_user

COPY nation.sql /docker-entrypoint-initdb.d/
COPY init-user.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
