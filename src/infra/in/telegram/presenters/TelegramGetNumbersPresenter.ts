import { InlineKeyboard } from "grammy";

export interface TelegramGetNumbersViewModel {
  text: string;
  replyMarkup: InlineKeyboard;
}

export class TelegramGetNumbersPresenter {
  present(numbers: number[]): TelegramGetNumbersViewModel {
    const keyboard = new InlineKeyboard();
    const pageNumbers = numbers.slice(0, 8);

    pageNumbers.forEach((number, index) => {
      keyboard.text(number.toString(), `choose_number:${number}`);
      if ((index + 1) % 4 === 0) {
        keyboard.row();
      }
    });

    keyboard.row().text("Back", "numbers:back").text("Next", "numbers:next");

    return {
      text: "Choose a number:",
      replyMarkup: keyboard,
    };
  }
}
