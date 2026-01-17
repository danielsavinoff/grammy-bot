export class UserNotFoundException extends Error {
  constructor(data?: { message?: string }) {
    const fallbackMessage = "User was not found.";
    super(data?.message ?? fallbackMessage);
    this.name = UserNotFoundException.name;
  }
}
