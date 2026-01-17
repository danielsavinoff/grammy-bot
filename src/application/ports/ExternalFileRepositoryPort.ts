import type { DownloadableFileModel } from "../model/DownloadableFileModel.ts"

export interface ExternalFileRepositoryPort {
  download(file: DownloadableFileModel): Promise<ReadableStream>;
}
