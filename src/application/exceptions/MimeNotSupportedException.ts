export class MimeNotSupportedException extends Error {
  constructor(
    data?: {
      message?: string;
      params?: { mime?: string; supported?: string[] };
    }
  ) {
    const { mime, supported } = data?.params ?? {};
    const fallbackMessage =
      mime || (supported && supported.length > 0)
        ? `Mime not supported. Received ${mime ?? "unknown"}${supported && supported.length > 0 ? ` (supported: ${supported.join(", ")})` : ""}.`
        : "Mime not supported.";

    super(data?.message ?? fallbackMessage);
    this.name = MimeNotSupportedException.name;
  }
}
