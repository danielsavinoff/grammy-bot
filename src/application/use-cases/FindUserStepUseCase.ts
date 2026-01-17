import type { ExternalIdentityModel } from "../model/ExternalIdentityModel.ts";
import type { UserStepRepositoryPort } from "../ports/UserStepRepositoryPort.ts";

export class FindExternalUserStepUseCase {
  constructor(
    private readonly externalUserStepRepository: UserStepRepositoryPort
  ) {}

  execute(input: ExternalIdentityModel) {
    const step = this.externalUserStepRepository.getByExternalIdAndSource(
      input.externalId,
      input.source
    );

    return step ?? undefined;
  }
}
