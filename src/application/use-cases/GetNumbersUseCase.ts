export class GetNumbersUseCase {
  execute(page: number = 1, limit: number = 10) {
    const numbers = [];

    for (let i = (page - 1) * limit; i < page * limit; i++) {
      numbers.push(i);
    }

    return numbers;
  }
}
