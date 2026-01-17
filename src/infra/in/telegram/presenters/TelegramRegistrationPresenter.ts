import { UserStep } from "../../../../domain/user-step/UserStep";

export class TelegramRegistrationPresenter {
  present(step: UserStep) {
    switch (step) {
      case "registration_fill_in_name":
        return "Welcome, please fill in your name.";
    }
  }
}
