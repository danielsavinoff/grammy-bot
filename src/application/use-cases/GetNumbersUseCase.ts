export class GetNumbersUseCase {
  private total = 100;

  execute(page: number = 1, limit: number = 10) {
    const numbers: number[] = [];

    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, this.total);

    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }

    return {
      numbers: numbers,
      total: this.total,
    };
  }
}
