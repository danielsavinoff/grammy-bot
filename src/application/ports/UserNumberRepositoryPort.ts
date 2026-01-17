export interface UserNumberRepositoryPort {
  findByUserId(userId: string): number | null;
  setByUserId(userId: string, number: number): void;
}
