import { Bot } from "grammy";
import type { DownloadableFileModel } from "../../../../application/model/DownloadableFileModel.ts"
import type { ExternalFileRepositoryPort } from "../../../../application/ports/ExternalFileRepositoryPort.ts"
import type { TelegramContext } from "../routes/TelegramRoutes.ts"
import { type FileFlavor, hydrateFiles } from "@grammyjs/files";

export class TelegramFileRepository implements ExternalFileRepositoryPort {
  constructor(private readonly bot: Bot<FileFlavor<TelegramContext>>) {
    bot.api.config.use(hydrateFiles(bot.token));
  }

  async download(
    downloadableFile: DownloadableFileModel
  ): Promise<ReadableStream> {
    const file = await this.bot.api.getFile(downloadableFile.id);
    const url = `https://api.telegram.org/file/bot${this.bot.token}/${file.file_path}`;

    const res = await fetch(url);

    if (!res.ok || !res.body) throw new Error();

    return res.body;
  }
}
