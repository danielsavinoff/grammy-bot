import type { ProviderSource } from "../../domain/provider/Provider.ts";
import type { User } from "../../domain/user/User.ts";

export interface UserRepositoryPort {
  findByExternalIdAndSource(
    externalId: string,
    source: ProviderSource
  ): User | null;
  createUser(input: CreateUserInput): User;
  findById(id: string): User | null;
}

export interface CreateUserInput {
  externalId: string;
  source: ProviderSource;
  firstName: string;
}
