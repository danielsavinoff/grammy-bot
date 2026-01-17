export class UnreadableImageDimensionsException extends Error {
  constructor(message = "Could not read image dimensions.") {
    super(message);
    this.name = UnreadableImageDimensionsException.name;
  }
}
