import sharp from "sharp";
import type { ImageTransformPort } from "../../../../application/ports/ImageTransformPort";

export class ImageTransformClient implements ImageTransformPort {
  async transform(buffer: ArrayBuffer): Promise<ArrayBuffer> {
    const inputBuffer = Buffer.from(buffer);
    const outputBuffer = await sharp(inputBuffer).resize(1, 1).toBuffer();
    const arrayBuffer = Uint8Array.from(outputBuffer).buffer;

    return arrayBuffer;
  }
}
