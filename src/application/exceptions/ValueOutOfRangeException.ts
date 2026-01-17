export class ValueOutOfRangeException extends Error {
  constructor(
    data?: {
      message?: string;
      params?: { min?: number; max?: number; value?: number };
    }
  ) {
    const { min, max, value } = data?.params ?? {};
    const fallbackMessage =
      min !== undefined || max !== undefined || value !== undefined
        ? `Value is out of range. Received ${value ?? "unknown"} (expected ${min ?? "?"} to ${max ?? "?"}).`
        : "Value is out of a range. Please, enter a number from 0 to 100.";

    super(data?.message ?? fallbackMessage);
    this.name = ValueOutOfRangeException.name;
  }
}
