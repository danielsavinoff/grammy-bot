import type { ProviderSource } from "../../domain/provider/Provider.ts";
import type { UserStep } from "../../domain/user-step/UserStep.ts";

export interface UserStepRepositoryPort {
  getByExternalIdAndSource(
    externalId: string,
    source: ProviderSource
  ): UserStep | null;
  setByExternalIdAndSource(
    externalId: string,
    source: ProviderSource,
    step: UserStep
  ): void;
}
