export class ValueNotNumberException extends Error {
  constructor(message = "Value is not a number. Please, enter a number.") {
    super(message);
    this.name = ValueNotNumberException.name;
  }
}
