export type ProviderSource = "TELEGRAM";

export interface Provider {
  userId: string;
  externalId: string;
  source: ProviderSource;
}
