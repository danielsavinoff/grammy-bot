import type { FileInfo } from "../../domain/file/FileInfo";
import type { Provider } from "../../domain/provider/Provider";
import type { UserStep } from "../../domain/user-step/UserStep";
import type { DownloadableFileModel } from "../model/DownloadableFileModel";
import type { FileInfoRepositoryPort } from "../ports/FileInfoRepositoryPort";
import type { FileStorageRepositoryPort } from "../ports/FileStorageRepositoryPort";
import type { ImageTransformPort } from "../ports/ImageTransformPort";
import type { UserStepRepositoryPort } from "../ports/UserStepRepositoryPort";
import { GetResultUseCase } from "./GetResultUseCase";

export class ProcessImageUseCase {
  constructor(
    private readonly userStepRepository: UserStepRepositoryPort,
    private readonly getResult: GetResultUseCase,
    private readonly fileStorageRepository: FileStorageRepositoryPort,
    private readonly imageTransform: ImageTransformPort,
    private readonly fileInfoRepository: FileInfoRepositoryPort
  ) {}

  async execute(provider: Provider, fileInfo: FileInfo) {
    const buffer = await this.fileStorageRepository.load(fileInfo.path);
    const processedBuffer = await this.imageTransform.transform(buffer);

    const downloadableFile: DownloadableFileModel = {
      mime: fileInfo.mime,
      sizeInBytes: fileInfo.sizeInBytes,
      original: false,
      id: "",
    };
    const processedFileMetadata =
      await this.fileStorageRepository.uploadFromArrayBuffer(
        processedBuffer,
        downloadableFile
      );
    const processedFileInfo = this.fileInfoRepository.store(
      provider.userId,
      processedFileMetadata
    );

    const step: UserStep = "result";

    this.userStepRepository.setByExternalIdAndSource(
      provider.externalId,
      provider.source,
      step
    );

    this.getResult.execute();
  }
}
