import type {
  CreateUserInput,
  UserRepositoryPort,
} from "../../../../application/ports/UserRepositoryPort.ts";
import type { ProviderSource } from "../../../../domain/provider/Provider.ts";
import type { User } from "../../../../domain/user/User.ts";

export class LocalUserRepository implements UserRepositoryPort {
  private readonly storage: Record<string, User> = {};

  getByExternalIdAndSource(
    externalId: string,
    source: ProviderSource
  ): User | null {
    return this.storage[`${source}:${externalId}`] ?? null;
  }

  createUser(input: CreateUserInput): User {
    const user: User = {
      id: crypto.randomUUID(),
      firstName: input.firstName,
    };

    this.storage[`${input.source}:${input.externalId}`] = user;

    return user;
  }
}
