import type { ProviderSource } from "../../domain/provider/Provider.ts";
import type { UserStep } from "../../domain/user-step/UserStep.ts";
import { ValueNotNumberException } from "../exceptions/ValueNotNumberException.ts";
import { ValueOutOfRangeException } from "../exceptions/ValueOutOfRangeException.ts";
import type { UserStepRepositoryPort } from "../ports/UserStepRepositoryPort.ts";

export class PersistNumberUseCase {
  constructor(private readonly userStepRepository: UserStepRepositoryPort) {}

  execute(
    externalId: string,
    source: ProviderSource,
    value: unknown
  ): UserStep {
    if (!this.isNumber(value)) {
      throw new ValueNotNumberException();
    }

    const number = Number(value);

    if (number < 0 || number > 100) {
      throw new ValueOutOfRangeException();
    }

    // store number

    const step = "upload_image";
    this.userStepRepository.setByExternalIdAndSource(externalId, source, step);

    return step;
  }

  private isNumber(value: unknown) {
    return (
      (typeof value === "number" && Number.isFinite(value)) ||
      (typeof value === "string" &&
        value.trim() !== "" &&
        Number.isFinite(Number(value)))
    );
  }
}
