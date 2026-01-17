import type {
  FileInfoRepositoryPort,
  FindFileInfoData,
} from "../../../../application/ports/FileInfoRepositoryPort.ts";
import type { FileInfo } from "../../../../domain/file/FileInfo.ts";
import type { FileMetadata } from "../../../../domain/file/FileMetadata.ts";

export class LocalFileInfoRepository implements FileInfoRepositoryPort {
  private readonly storage: Record<string, FileInfo[]> = {};

  store(userId: string, fileMeta: FileMetadata): FileInfo {
    const fileInfo: FileInfo = {
      id: crypto.randomUUID(),
      path: fileMeta.path,
      sizeInBytes: fileMeta.sizeInBytes,
      mime: fileMeta.mime,
      original: fileMeta.original,
    };

    this.storage[userId] ??= [];
    this.storage[userId].push(fileInfo);

    return fileInfo;
  }

  findOne(data: FindFileInfoData): FileInfo | null {
    const files = this.storage[data.userId];
    const fileInfo = files.find((file) => file.original === data.original);

    if (!fileInfo) {
      return null;
    }

    return fileInfo;
  }
}
