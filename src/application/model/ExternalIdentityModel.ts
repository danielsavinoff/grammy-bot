import { ProviderSource } from "../../domain/provider/Provider";

export interface ExternalIdentityModel {
  externalId: string;
  source: ProviderSource;
}
