import type { ProviderSource } from "../../domain/provider/Provider.ts";
import type { UserStep } from "../../domain/user-step/UserStep.ts";
import { NoFileAttachedException } from "../exceptions/NoFileAttachedException.ts";
import type { DownloadableFileModel } from "../model/DownloadableFileModel.ts";
import type { UserStepRepositoryPort } from "../ports/UserStepRepositoryPort.ts";

export class PersistImageUseCase {
  constructor(private readonly userStepRepository: UserStepRepositoryPort) {}

  execute(
    externalId: string,
    source: ProviderSource,
    downloadableFile?: DownloadableFileModel
  ): UserStep {
    if (!downloadableFile) {
      throw new NoFileAttachedException();
    }

    const step = "result";
    this.userStepRepository.setByExternalIdAndSource(externalId, source, step);

    return step;
  }
}
