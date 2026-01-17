import type { UserStepRepositoryPort } from '../../../../application/ports/UserStepRepositoryPort.ts';
import type { ProviderSource } from '../../../../domain/provider/Provider.ts';
import type { UserStep } from '../../../../domain/user-step/UserStep.ts';

export class LocalUserStepRepository implements UserStepRepositoryPort {
  private storage: Record<string, UserStep> = {};

  getByExternalIdAndSource(
    externalId: string,
    source: ProviderSource
  ): UserStep | null {
    const step = this.storage[`${source}:${externalId}`];

    if (!step) {
      return null;
    }

    return step;
  }

  setByExternalIdAndSource(
    externalId: string,
    source: ProviderSource,
    step: UserStep
  ): void {
    this.storage[`${source}:${externalId}`] = step;
  }
}
