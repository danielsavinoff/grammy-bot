export class FileSizeOverflowException extends Error {
  constructor(
    data?: {
      message?: string;
      params?: { maxSizeInBytes?: number; sizeInBytes?: number };
    }
  ) {
    const { maxSizeInBytes, sizeInBytes } = data?.params ?? {};
    const fallbackMessage =
      maxSizeInBytes || sizeInBytes
        ? `File size extends accepted size. Received ${sizeInBytes ?? "unknown"} bytes (max ${maxSizeInBytes ?? "unknown"}).`
        : "File size extends accepted size. Please upload a file up to 5 MB.";

    super(data?.message ?? fallbackMessage);
    this.name = FileSizeOverflowException.name;
  }
}
