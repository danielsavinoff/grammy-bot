Добавьте BOT_AUTHENTICATION_TOKEN в .env

```sh
git clone https://github.com/danielsavinoff/grammy-bot.git
cd grammy-bot
npm ci
node --experimental-transform-types --env-file .env ./src/main.ts
```
