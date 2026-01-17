import type { ProviderSource } from '../../domain/provider/Provider.ts';
import type { UserStep } from '../../domain/user-step/UserStep.ts';
import type { UserStepRepositoryPort } from '../ports/UserStepRepositoryPort.ts';

export class StartUserRegistrationUseCase {
  constructor(private readonly userStepRepository: UserStepRepositoryPort) {}

  execute(externalId: string, source: ProviderSource) {
    const step = "registration_fill_in_name" as UserStep;

    this.userStepRepository.setByExternalIdAndSource(externalId, source, step);

    return step;
  }
}
