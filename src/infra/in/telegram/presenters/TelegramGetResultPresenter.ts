import { InputFile } from "grammy";

export interface TelegramGetResultViewModel {
  text: string;
  file: InputFile;
}

export class TelegramGetResultPresenter {
  present(text: string, attachment: ArrayBuffer): TelegramGetResultViewModel {
    const buffer = Buffer.from(attachment);
    const inputFile = new InputFile(buffer, "image.jpg");

    return {
      text: text,
      file: inputFile,
    };
  }
}
