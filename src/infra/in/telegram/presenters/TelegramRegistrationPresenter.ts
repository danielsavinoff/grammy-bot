export interface TelegramRegistrationViewModel {
  text: string;
}

export class TelegramRegistrationPresenter {
  present(): TelegramRegistrationViewModel {
    return { text: "Welcome! Please, enter your name" };
  }
}
