import sharp from "sharp";
import type { ImageTransformPort } from "../../../../application/ports/ImageTransformPort.ts";
import { UnreadableImageDimensionsException } from "../exceptions/UnreadableImageDimensionsException.ts";

export class ImageTransformClient implements ImageTransformPort {
  async transform(buffer: ArrayBuffer): Promise<ArrayBuffer> {
    const inputBuffer = Buffer.from(buffer);

    const img = sharp(inputBuffer);
    const meta = await img.metadata();

    if (!meta.width || !meta.height) {
      throw new UnreadableImageDimensionsException();
    }

    const side = Math.min(meta.width, meta.height);

    const outputBuffer = await img
      .resize(side, side, {
        fit: "cover",
        position: "centre",
      })
      .toBuffer();

    return Uint8Array.from(outputBuffer).buffer;
  }
}
