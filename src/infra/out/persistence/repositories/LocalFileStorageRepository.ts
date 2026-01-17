import mime from "mime";
import type { DownloadableFileModel } from "../../../../application/model/DownloadableFileModel.ts";
import type { FileStorageRepositoryPort } from "../../../../application/ports/FileStorageRepositoryPort.ts";
import type { FileMetadata } from "../../../../domain/file/FileMetadata.ts";
import { createWriteStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { EmptyMimeException } from "../exceptions/EmptyMimeException.ts";

export class LocalFileStorageRepository implements FileStorageRepositoryPort {
  private readonly storageDir = "./storage/files";

  async uploadFromStream(
    stream: ReadableStream<Uint8Array>,
    fileInfo: DownloadableFileModel
  ): Promise<FileMetadata> {
    const folderExists = await this.checkFolderExists(this.storageDir);

    if (!folderExists) {
      await fs.mkdir(this.storageDir, { recursive: true });
    }

    if (!fileInfo.mime) {
      throw new EmptyMimeException();
    }

    const filePath = this.getFilePath(fileInfo.mime);
    await pipeline(stream, createWriteStream(filePath));

    return {
      path: filePath,
      sizeInBytes: fileInfo.sizeInBytes ?? 0,
      mime: fileInfo.mime ?? "application/octet-stream",
      original: fileInfo.original,
    };
  }

  private async checkFolderExists(folderPath: string) {
    try {
      await fs.access(folderPath);
      return true;
    } catch (error) {
      return false;
    }
  }

  async load(path: string): Promise<ArrayBuffer> {
    const file = (await fs.readFile(path)).buffer;

    return file;
  }

  async uploadFromArrayBuffer(
    buffer: ArrayBuffer,
    fileInfo: DownloadableFileModel
  ): Promise<FileMetadata> {
    const folderExists = await this.checkFolderExists(this.storageDir);

    if (!folderExists) {
      await fs.mkdir(this.storageDir, { recursive: true });
    }

    if (!fileInfo.mime) {
      throw new EmptyMimeException();
    }

    const filePath = this.getFilePath(fileInfo.mime);
    await fs.writeFile(filePath, Buffer.from(buffer));

    return {
      path: filePath,
      sizeInBytes: fileInfo.sizeInBytes ?? 0,
      mime: fileInfo.mime ?? "application/octet-stream",
      original: fileInfo.original,
    };
  }

  private getFilePath(fileMime: string) {
    const fileExt = mime.getExtension(fileMime);
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = path.join(this.storageDir, fileName);

    return filePath;
  }
}
