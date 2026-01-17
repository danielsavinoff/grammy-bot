export class GetNumbersUseCase {
  execute() {
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

    return numbers;
  }
}
