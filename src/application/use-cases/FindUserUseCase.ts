import { ExternalIdentityModel } from "../model/ExternalIdentityModel";
import { UserRepositoryPort } from "../ports/UserRepositoryPort";

export class FindUserByExternalIdentityUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  execute(input: ExternalIdentityModel) {
    let user = this.userRepository.getByExternalIdAndSource(
      input.externalId,
      input.source
    );

    return user;
  }
}
