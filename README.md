# Digital Card

NestJS + GraphQL + Prisma + PostgreSQL.

## Запуск

```bash
docker compose up --build
```

Sandbox: [http://localhost:3000/graphql](http://localhost:3000/graphql). Если 3000 занят: `APP_PORT=4000 docker compose up --build`.

```graphql
query {
  profile {
    name
    description
    links {
      label
      url
    }
    skills {
      name
      category
    }
    experience {
      company
      position
      period
      achievements {
        text
      }
    }
  }
}
```

Остановка: `docker compose down`. Сброс данных: `docker compose down -v`.

## Локально

```bash
cp .env.example .env
npm ci
docker compose up postgres -d
npx prisma migrate deploy
npm run start:dev
```

Сиды отдельно, когда нужна визитка в базе:

```bash
npm run prisma:seed
```

## Структура

```
src/
  profile/
  link/
  skill/
  experience/
  achievement/
  database/postgres/digital-card/
  common/
prisma/
```
# about
