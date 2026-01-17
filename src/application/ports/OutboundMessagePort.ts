export interface OutboundMessagePort {
  send(externalId: string, message: string): void;
}
