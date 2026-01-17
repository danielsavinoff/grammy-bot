export class EmptyFirstNameException extends Error {
  constructor(data?: { message?: string }) {
    const fallbackMessage = "Empty first name. Please fill in your first name.";
    super(data?.message ?? fallbackMessage);
    this.name = EmptyFirstNameException.name;
  }
}
