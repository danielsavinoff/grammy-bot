export class UnreadableImageDimensionsException extends Error {
  constructor(data?: { message?: string }) {
    const fallbackMessage = "Could not read image dimensions.";
    super(data?.message ?? fallbackMessage);
    this.name = UnreadableImageDimensionsException.name;
  }
}
