import type { FileInfo } from "../../domain/file/FileInfo";
import type { FileMetadata } from "../../domain/file/FileMetadata";

export interface FindFileInfoData {
  userId: string;
  original: boolean;
}

export interface FileInfoRepositoryPort {
  store(userId: string, fileMeta: FileMetadata): FileInfo;
  findOne(data: FindFileInfoData): FileInfo | null;
}
