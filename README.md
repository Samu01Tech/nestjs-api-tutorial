# My Bookmark API with NestJS

## Description

This is me creating a bookmark API with basic authentication following the freeCodeCamp.org tutorial [https://youtu.be/GHTA143_b-s](https://youtu.be/GHTA143_b-s)

## Installation

```bash
# I used pnpm for dependencies
$ pnpm install
```

## Running the app

```bash
# watch mode / dev
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## Env Files

_File names_

**Dev e Production**: `.env`

**Test Mode**: `.env.test`

_Content_

```sh
DATABASE_URL="postgresql://<user>:<password>@localhost:<port>/nest?schema=public"
JWT="<your jwt secret>"
```
