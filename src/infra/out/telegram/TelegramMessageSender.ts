import { Bot, Context } from "grammy";
import { OutboundMessagePort } from "../../../application/ports/OutboundMessagePort";

export class TelegramMessageSender implements OutboundMessagePort {
  constructor(private readonly bot: Bot<Context>) {}

  send(externalId: string, message: string): void {
    void this.bot.api.sendMessage(externalId, message);
  }
}
