import { InlineKeyboard } from "grammy";

export interface TelegramGetNumbersViewModel {
  text: string;
  replyMarkup: InlineKeyboard;
}

export class TelegramGetNumbersPresenter {
  present(
    numbers: number[],
    currentPage: number,
    total: number
  ): TelegramGetNumbersViewModel {
    const keyboard = new InlineKeyboard();

    numbers.forEach((number, index) => {
      keyboard.text(number.toString(), String(number));
      if ((index + 1) % 4 === 0) {
        keyboard.row();
      }
    });

    const hasBack = currentPage > 1;
    const hasNext = currentPage < total;
    if (hasBack || hasNext) {
      const navRow = keyboard.row();
      if (hasBack) {
        navRow.text("Back", `choose_number:${currentPage - 1}`);
      }
      if (hasNext) {
        navRow.text("Next", `choose_number:${currentPage + 1}`);
      }
    }

    return {
      text: "Choose a number:",
      replyMarkup: keyboard,
    };
  }
}
