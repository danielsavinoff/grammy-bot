import type {
  Provider,
  ProviderSource,
} from "../../domain/provider/Provider.ts";
import type { UserStep } from "../../domain/user-step/UserStep.ts";
import { FileNotImageException } from "../exceptions/FileNotImageException.ts";
import { FileSizeOverflowException } from "../exceptions/FileSizeOverflowException.ts";
import { NoFileAttachedException } from "../exceptions/NoFileAttachedException.ts";
import type { DownloadableFileModel } from "../model/DownloadableFileModel.ts";
import type { ExternalFileRepositoryPort } from "../ports/ExternalFileRepositoryPort.ts";
import type { FileInfoRepositoryPort } from "../ports/FileInfoRepositoryPort.ts";
import type { FileStorageRepositoryPort } from "../ports/FileStorageRepositoryPort.ts";
import type { UserStepRepositoryPort } from "../ports/UserStepRepositoryPort.ts";
import { ProcessImageUseCase } from "./ProcessImageUseCase.ts";

export class PersistImageUseCase {
  private readonly imageMime = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/tiff",
  ];

  constructor(
    private readonly userStepRepository: UserStepRepositoryPort,
    private readonly externalFileRepository: ExternalFileRepositoryPort,
    private readonly fileStorageRepository: FileStorageRepositoryPort,
    private readonly fileInfoRepository: FileInfoRepositoryPort,
    private readonly processImage: ProcessImageUseCase
  ) {}

  async execute(
    provider: Provider,
    downloadableFile?: DownloadableFileModel
  ): Promise<UserStep> {
    if (!downloadableFile) {
      throw new NoFileAttachedException();
    }

    const size = downloadableFile.sizeInBytes;

    if (!size || size > 5 * 2 ** 20) {
      throw new FileSizeOverflowException();
    }

    const mime = downloadableFile.mime;

    if (!mime || !this.imageMime.includes(mime)) {
      throw new FileNotImageException();
    }

    const stream = await this.externalFileRepository.download(downloadableFile);
    const file = await this.fileStorageRepository.uploadFromStream(
      stream,
      downloadableFile
    );
    const fileInfo = this.fileInfoRepository.store(provider.userId, file);
    await this.processImage.execute(provider, fileInfo);

    const step = "waiting_image_processing";
    this.userStepRepository.setByExternalIdAndSource(
      provider.externalId,
      provider.source,
      step
    );

    return step;
  }
}
