export class ValueNotNumberException extends Error {
  constructor(data?: { message?: string }) {
    const fallbackMessage = "Value is not a number. Please, enter a number.";
    super(data?.message ?? fallbackMessage);
    this.name = ValueNotNumberException.name;
  }
}
