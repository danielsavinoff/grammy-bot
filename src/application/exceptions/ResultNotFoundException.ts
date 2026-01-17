export class ResultNotFoundException extends Error {
  constructor(data?: { message?: string }) {
    const fallbackMessage = "Result was not found.";
    super(data?.message ?? fallbackMessage);
    this.name = ResultNotFoundException.name;
  }
}
