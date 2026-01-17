import { ProviderSource } from "../../domain/provider/Provider";
import { User } from "../../domain/user/User";

export interface UserRepositoryPort {
  getByExternalIdAndSource(
    externalId: string,
    source: ProviderSource
  ): User | null;
  createUser(input: CreateUserInput): User;
}

export interface CreateUserInput {
  externalId: string;
  source: ProviderSource;
  firstName: string;
}
