import { UserStep } from "../../domain/user-step/UserStep";

export class PersistNumberUseCase {
  execute(): UserStep {
    return "upload_image";
  }
}
