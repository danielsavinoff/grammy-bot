export interface ImageTransformPort {
  transform(buffer: ArrayBuffer): Promise<ArrayBuffer>;
}
