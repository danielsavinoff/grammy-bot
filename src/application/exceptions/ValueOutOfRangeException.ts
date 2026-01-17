export class ValueOutOfRangeException extends Error {
  constructor(
    message = "Value is out of a range. Please, enter a number from 0 to 100."
  ) {
    super(message);
    this.name = ValueOutOfRangeException.name;
  }
}
