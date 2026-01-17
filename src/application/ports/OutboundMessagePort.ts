export interface OutboundMessagePort {
  sendWithAttachment(
    externalId: string,
    message: string,
    attachment: ArrayBuffer
  ): void;
}
