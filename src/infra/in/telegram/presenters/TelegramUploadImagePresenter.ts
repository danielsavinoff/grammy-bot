export interface TelegramUploadImageViewModel {
  text: string;
}

export class TelegramUploadImagePresenter {
  present(): TelegramUploadImageViewModel {
    return { text: "Please, upload an image." };
  }
}
