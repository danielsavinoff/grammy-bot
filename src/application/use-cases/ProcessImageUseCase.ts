import type { FileInfo } from "../../domain/file/FileInfo.ts";
import type { Provider } from "../../domain/provider/Provider.ts";
import type { UserStep } from "../../domain/user-step/UserStep.ts";
import type { DownloadableFileModel } from "../model/DownloadableFileModel.ts";
import type { FileInfoRepositoryPort } from "../ports/FileInfoRepositoryPort.ts";
import type { FileStorageRepositoryPort } from "../ports/FileStorageRepositoryPort.ts";
import type { ImageTransformPort } from "../ports/ImageTransformPort.ts";
import type { OutboundMessagePort } from "../ports/OutboundMessagePort.ts";
import type { UserStepRepositoryPort } from "../ports/UserStepRepositoryPort.ts";
import { GetResultUseCase } from "./GetResultUseCase.ts";

export class ProcessImageUseCase {
  constructor(
    private readonly userStepRepository: UserStepRepositoryPort,
    private readonly getResult: GetResultUseCase,
    private readonly fileStorageRepository: FileStorageRepositoryPort,
    private readonly imageTransform: ImageTransformPort,
    private readonly fileInfoRepository: FileInfoRepositoryPort,
    private readonly outboundMessagePublisher: OutboundMessagePort
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
    this.fileInfoRepository.store(provider.userId, processedFileMetadata);

    const step: UserStep = "result";

    this.userStepRepository.setByExternalIdAndSource(
      provider.externalId,
      provider.source,
      step
    );

    const result = await this.getResult.execute(provider.userId);
    this.outboundMessagePublisher.sendWithAttachment(
      provider.externalId,
      result.text,
      result.file
    );
  }
}
