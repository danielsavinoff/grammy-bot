import type { UserNumberRepositoryPort } from "../../../../application/ports/UserNumberRepositoryPort.ts";

export class LocalUserNumberRepository implements UserNumberRepositoryPort {
  private storage: Record<string, number> = {};

  findByUserId(userId: string): number | null {
    return this.storage[userId] ?? null;
  }

  setByUserId(userId: string, number: number): void {
    this.storage[userId] = number;
  }
}
