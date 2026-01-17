export class EmptyFirstNameException extends Error {
  constructor(message = "Empty first name. Please fill in your first name.") {
    super(message);
    this.name = EmptyFirstNameException.name;
  }
}
