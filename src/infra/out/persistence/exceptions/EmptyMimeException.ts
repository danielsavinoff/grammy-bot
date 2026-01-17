export class EmptyMimeException extends Error {
  constructor(message = "Empty mime.") {
    super(message);
    this.name = EmptyMimeException.name;
  }
}
