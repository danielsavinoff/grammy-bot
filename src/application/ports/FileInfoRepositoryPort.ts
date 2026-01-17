import type { FileInfo } from "../../domain/file/FileInfo.ts"
import type { FileMetadata } from "../../domain/file/FileMetadata.ts"

export interface FindFileInfoData {
  userId: string;
  original: boolean;
}

export interface FileInfoRepositoryPort {
  store(userId: string, fileMeta: FileMetadata): FileInfo;
  findOne(data: FindFileInfoData): FileInfo | null;
}
