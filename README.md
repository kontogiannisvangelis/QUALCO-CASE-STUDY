# Qualco Case Study

A containerised full-stack sample application composed of an Angular front end, a Spring Boot REST API, and a MariaDB database loaded with sample nation statistics. The UI exposes dashboards to browse countries, their spoken languages, and GDP statistics.

## Project structure

- `case-study/` – Spring Boot service exposing the REST API and MyBatis data access layer
- `case-study-ui/` – Angular application served through NGINX
- `db/` – MariaDB image with schema and seed data
- `docker-compose.yml` – One-click environment for running all services together

## Key versions

- Spring Boot `2.7.18`
- Java `1.8`
- Angular `20.1`

## Prerequisites

- Docker 20+
- Docker Compose v2 (bundled with recent Docker Desktop / Docker Engine installations)

## Quick start

```bash
# from the repository root
docker compose up --build
```

Once the images finish building you can browse the application at:

- Front end: <http://localhost:4200>
- API : <http://localhost:8080>
- Database: exposed on `localhost:3306` with credentials `nation_user` / `nation_user`

Use `Ctrl+C` to stop the stack. Add `-d` to run it in the background and `docker compose down` to remove the containers.

## REST API

The back end is available on `http://localhost:8080`. Key endpoints:

- `GET /api/countries` – list countries with region metadata
- `GET /api/countries/{countryId}/languages` – list languages spoken in a given country
- `GET /api/countries/stats/max-gdp-per-country` – show the max GDP per country
- `GET /api/countries/stats/search?regionId=&fromYear=&toYear=` – filter GDP and population statistics by region and year range

## Local development

### Backend

```bash
cd case-study
./mvnw spring-boot:run
```

The service reads its datasource settings from `SPRING_DATASOURCE_*` environment variables; see `docker-compose.yml` for the defaults.

### Frontend

```bash
cd case-study-ui
npm install
npm run start
```

The Angular dev server will be available at <http://localhost:4200> and proxies API calls to the back end running on port 8080.

### Database migrations

Database schema and seed data live in `db/nation.sql`. When you start the `db` service, MariaDB loads the script automatically via Docker entrypoint hooks.
