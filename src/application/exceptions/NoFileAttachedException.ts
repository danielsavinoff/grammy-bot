export class NoFileAttachedException extends Error {
  constructor(data?: { message?: string }) {
    const fallbackMessage = "No file attached. Please attach a file.";
    super(data?.message ?? fallbackMessage);
    this.name = NoFileAttachedException.name;
  }
}
