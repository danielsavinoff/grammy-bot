import type { Document } from "grammy/types";
import type { DownloadableFileModel } from "../../../../application/model/DownloadableFileModel";

export class TelegramDocumentToFileMapper {
  map(file?: Document): DownloadableFileModel | undefined {
    if (!file) {
      return;
    }

    return {
      id: file.file_id,
      mime: file.mime_type,
      sizeInBytes: file.file_size,
      original: true,
    };
  }
}
