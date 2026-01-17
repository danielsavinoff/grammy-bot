import { Bot, InputFile } from "grammy";
import type { OutboundMessagePort } from "../../../application/ports/OutboundMessagePort.ts";
import type { FileFlavor } from "@grammyjs/files";
import type { TelegramContext } from "../../in/telegram/routes/TelegramRoutes.ts";

export class TelegramMessageSender implements OutboundMessagePort {
  constructor(private readonly bot: Bot<FileFlavor<TelegramContext>>) {}

  sendWithAttachment(
    externalId: string,
    message: string,
    attachment: ArrayBuffer
  ): void {
    const buffer = Buffer.from(attachment);
    const inputFile = new InputFile(buffer, "image.jpg");

    void this.bot.api.sendPhoto(externalId, inputFile, { caption: message });
  }
}
