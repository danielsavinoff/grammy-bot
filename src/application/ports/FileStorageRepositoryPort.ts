import type { FileMetadata } from "../../domain/file/FileMetadata.ts"
import type { DownloadableFileModel } from "../model/DownloadableFileModel.ts"

export interface FileStorageRepositoryPort {
  uploadFromStream(
    stream: ReadableStream,
    fileInfo: DownloadableFileModel
  ): Promise<FileMetadata>;
  uploadFromArrayBuffer(
    buffer: ArrayBuffer,
    fileInfo: DownloadableFileModel
  ): Promise<FileMetadata>;
  load(path: string): Promise<ArrayBuffer>;
}
