import { ProviderSource } from "../../domain/provider/Provider";
import { UserStep } from "../../domain/user-step/UserStep";

export interface UserStepRepository {
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
