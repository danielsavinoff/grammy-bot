import { ProviderSource } from "../../domain/provider/Provider";
import { UserStep } from "../../domain/user-step/UserStep";
import { UserStepRepositoryPort } from "../ports/UserStepRepositoryPort";

export class StartUserRegistrationUseCase {
  constructor(private readonly userStepRepository: UserStepRepositoryPort) {}

  execute(externalId: string, source: ProviderSource) {
    const step = "registration_fill_in_name" as UserStep;

    this.userStepRepository.setByExternalIdAndSource(externalId, source, step);

    return step;
  }
}
