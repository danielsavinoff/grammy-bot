import { ProviderSource } from "../../domain/provider/Provider";
import { UserStep } from "../../domain/user-step/UserStep";
import { EmptyFirstNameException } from "../exceptions/EmptyFirstNameException";
import { UserRegistrationModel } from "../model/UserRegistrationModel";
import { UserRepositoryPort } from "../ports/UserRepositoryPort";

export class CompleteUserRegistrationUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  execute(
    externalId: string,
    source: ProviderSource,
    userRegistration: UserRegistrationModel
  ): UserStep {
    if (!userRegistration.firstName) {
      throw new EmptyFirstNameException();
    }

    this.userRepository.createUser({
      externalId: externalId,
      source: source,
      firstName: userRegistration.firstName,
    });

    return "choose_number";
  }
}
