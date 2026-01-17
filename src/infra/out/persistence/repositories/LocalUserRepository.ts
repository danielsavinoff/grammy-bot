import type {
  CreateUserInput,
  UserRepositoryPort,
} from "../../../../application/ports/UserRepositoryPort.ts";
import type { ProviderSource } from "../../../../domain/provider/Provider.ts";
import type { User } from "../../../../domain/user/User.ts";

export class LocalUserRepository implements UserRepositoryPort {
  private readonly storage: User[] = [];

  findByExternalIdAndSource(
    externalId: string,
    source: ProviderSource
  ): User | null {
    const user = this.storage.find((user) => {
      const providers = user.providers;

      if (!providers) {
        return false;
      }

      const provider = providers.find(
        (provider) =>
          provider.externalId === externalId && provider.source === source
      );

      return Boolean(provider);
    });

    return user ?? null;
  }

  createUser(input: CreateUserInput): User {
    const userId = crypto.randomUUID();

    const user: User = {
      id: userId,
      firstName: input.firstName,
      providers: [
        {
          externalId: input.externalId,
          source: input.source,
          userId: userId,
        },
      ],
    };

    this.storage.push(user);

    return user;
  }

  findById(id: string): User | null {
    const user = this.storage.find((user) => user.id === id);

    return user ?? null;
  }
}
