export class ResultNotFoundException extends Error {
  constructor(message = "Result was not found.") {
    super(message);
    this.name = ResultNotFoundException.name;
  }
}
