import type { ProviderSource } from "../../domain/provider/Provider.ts";

export interface ExternalIdentityModel {
  externalId: string;
  source: ProviderSource;
}
