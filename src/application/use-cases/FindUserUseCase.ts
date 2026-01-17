import type { ExternalIdentityModel } from "../model/ExternalIdentityModel.ts";
import type { UserRepositoryPort } from "../ports/UserRepositoryPort.ts";

export class FindUserByExternalIdentityUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  execute(input: ExternalIdentityModel) {
    let user = this.userRepository.findByExternalIdAndSource(
      input.externalId,
      input.source
    );

    return user;
  }
}
