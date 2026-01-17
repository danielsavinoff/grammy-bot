import { ExternalIdentityModel } from "../model/ExternalIdentityModel";
import { UserStepRepositoryPort } from "../ports/UserStepRepositoryPort";

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
