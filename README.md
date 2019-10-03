## Before all

```bash
rename file development.example.env to development.env
rename file production.example.env to production.env
```

## Documentation

```bash
# swagger documentation
 http://localhost:3000/api/docs
```

## Docker

```bash
# start docker in production
$ docker-compose up

# start docker in development
docker-compose -f docker-compose.dev.yaml up
```

## Production

```bash
$ npm install

$

# build app
$ npm run build

# create tables in procuction db
$ npm run init:prod

# start production app
$ npm run start:prod
```

## Development

```bash
$ npm install
# create tables in development db
$ npm run init:dev

# start app
$ npm run start

# start app in watch mode
$ npm run start:dev
```
