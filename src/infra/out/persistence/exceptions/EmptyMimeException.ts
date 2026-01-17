export class EmptyMimeException extends Error {
  constructor(data?: { message?: string }) {
    const fallbackMessage = "Empty mime.";
    super(data?.message ?? fallbackMessage);
    this.name = EmptyMimeException.name;
  }
}
