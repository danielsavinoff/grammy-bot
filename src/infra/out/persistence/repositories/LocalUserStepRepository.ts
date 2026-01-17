import { UserStepRepositoryPort } from "../../../../application/ports/UserStepRepositoryPort";
import { ProviderSource } from "../../../../domain/provider/Provider";
import { UserStep } from "../../../../domain/user-step/UserStep";

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
