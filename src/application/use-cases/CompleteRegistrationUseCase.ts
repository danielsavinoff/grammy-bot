import type { ProviderSource } from "../../domain/provider/Provider.ts";
import type { UserStep } from "../../domain/user-step/UserStep.ts";
import { EmptyFirstNameException } from "../exceptions/EmptyFirstNameException.ts";
import type { UserRegistrationModel } from "../model/UserRegistrationModel.ts";
import type { UserRepositoryPort } from "../ports/UserRepositoryPort.ts";
import type { UserStepRepositoryPort } from "../ports/UserStepRepositoryPort.ts";

export class CompleteUserRegistrationUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly userStepRepository: UserStepRepositoryPort
  ) {}

  execute(
    externalId: string,
    source: ProviderSource,
    userRegistration: UserRegistrationModel
  ): UserStep {
    if (!userRegistration.firstName) {
      throw new EmptyFirstNameException();
    }

    const step = "choose_number";

    this.userRepository.createUser({
      externalId: externalId,
      source: source,
      firstName: userRegistration.firstName,
    });
    this.userStepRepository.setByExternalIdAndSource(externalId, source, step);

    return step;
  }
}
