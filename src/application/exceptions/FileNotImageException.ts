export class FileNotImageException extends Error {
  constructor(message = "File is not an image. Upload an image.") {
    super(message);
    this.name = FileNotImageException.name;
  }
}
