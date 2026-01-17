export class FileSizeOverflowException extends Error {
  constructor(
    message = "File size extends accepted size. Please upload a file up to 5 MB."
  ) {
    super(message);
    this.name = FileSizeOverflowException.name;
  }
}
