export class UserNotFoundException extends Error {
  constructor(message = "User was not found.") {
    super(message);
    this.name = UserNotFoundException.name;
  }
}
