import { Bot, Context } from "grammy";
import { UserStep } from "../../../../domain/user-step/UserStep";
import { FindUserByExternalIdentityUseCase } from "../../../../application/use-cases/FindUserUseCase";
import { User } from "../../../../domain/user/User";
import { ProviderSource } from "../../../../domain/provider/Provider";
import { FindExternalUserStepUseCase } from "../../../../application/use-cases/FindUserStepUseCase";
import { StartUserRegistrationUseCase } from "../../../../application/use-cases/StartUserRegistrationUseCase";
import { CompleteUserRegistrationUseCase } from "../../../../application/use-cases/CompleteRegistrationUseCase";
import { EmptyFirstNameException } from "../../../../application/exceptions/EmptyFirstNameException";
import { PersistImageUseCase } from "../../../../application/use-cases/PersistImageUseCase";
import { PersistNumberUseCase } from "../../../../application/use-cases/PersistNumberUseCase";
import { GetNumbersUseCase } from "../../../../application/use-cases/GetNumbersUseCase";

export interface BotState {
  user?: User;
  step?: UserStep;
}

export type TelegramContext = Context & {
  state: BotState;
};

export class TelegramRoutes {
  private readonly source: ProviderSource = "TELEGRAM";

  constructor(
    private readonly bot: Bot<TelegramContext>,
    private readonly findUserByExternalIdentity: FindUserByExternalIdentityUseCase,
    private readonly findExternalUserStep: FindExternalUserStepUseCase,
    private readonly startUserRegistration: StartUserRegistrationUseCase,
    private readonly completeRegistration: CompleteUserRegistrationUseCase,
    private readonly persistImage: PersistImageUseCase,
    private readonly persistNumber: PersistNumberUseCase,
    private readonly getNumbers: GetNumbersUseCase
  ) {
    this.bot.on("message", (ctx) => {
      console.log(ctx.message);
      const externalId = ctx.from.id.toString();
      const user = ctx.state.user;
      const step = ctx.state.step;

      let nextStep: UserStep;

      if (user) {
        switch (step) {
          case "upload_image":
            nextStep = this.persistImage.execute();
          case "choose_number":
            nextStep = this.persistNumber.execute();
          default:
            nextStep = "choose_number";
        }
      } else {
        switch (step) {
          case "registration_fill_in_name": {
            try {
              nextStep = this.completeRegistration.execute(
                externalId,
                this.source,
                {
                  firstName: ctx.msg.text,
                }
              );
            } catch (err) {
              if (err instanceof EmptyFirstNameException) {
                return ctx.reply(err.message);
              }
            }
          }
          default:
            nextStep = this.startUserRegistration.execute(
              ctx.from.id.toString(),
              this.source
            );
        }
      }

      switch (nextStep) {
        case "choose_number": {
          const numbers = this.getNumbers.execute();
          // use presenter to get telegram view model and return
        }
        case "upload_image":
      }
    });

    this.bot.use(async (ctx, next) => {
      if (!ctx.from) return next();

      const externalId = ctx.from.id.toString();

      const user = this.findUserByExternalIdentity.execute({
        externalId: externalId,
        source: this.source,
      });
      ctx.state.user = user ?? undefined;

      const step = this.findExternalUserStep.execute({
        externalId: externalId,
        source: this.source,
      });
      ctx.state.step = step;

      await next();
    });
  }
}
