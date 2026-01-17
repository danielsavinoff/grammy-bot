import { Bot } from "grammy";
import { TelegramRoutes } from "./infra/in/telegram/routes/TelegramRoutes";
import { TelegramMessageSender } from "./infra/out/telegram/TelegramMessageSender";

const token = process.env.BOT_AUTHENTICATION_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN is required");
}

const bot = new Bot(token);
new TelegramRoutes(bot);
new TelegramMessageSender(bot);

bot.start();
