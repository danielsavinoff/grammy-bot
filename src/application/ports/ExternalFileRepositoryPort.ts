import type { DownloadableFileModel } from "../model/DownloadableFileModel";

export interface ExternalFileRepositoryPort {
  download(file: DownloadableFileModel): Promise<ReadableStream>;
}
