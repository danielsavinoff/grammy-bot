export class NoFileAttachedException extends Error {
  constructor(message = "No file attached. Please attach a file.") {
    super(message);
    this.name = NoFileAttachedException.name;
  }
}
