import { Bot, type Context } from "grammy";
import type { OutboundMessagePort } from '../../../application/ports/OutboundMessagePort.ts';

export class TelegramMessageSender implements OutboundMessagePort {
  constructor(private readonly bot: Bot<Context>) {}

  send(externalId: string, message: string): void {
    void this.bot.api.sendMessage(externalId, message);
  }
}
