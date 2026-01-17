import { Bot, type Context } from "grammy";
import type { UserStep } from "../../../../domain/user-step/UserStep.ts";
import type { FindUserByExternalIdentityUseCase } from "../../../../application/use-cases/FindUserUseCase.ts";
import type { User } from "../../../../domain/user/User.ts";
import type { ProviderSource } from "../../../../domain/provider/Provider.ts";
import type { FindExternalUserStepUseCase } from "../../../../application/use-cases/FindUserStepUseCase.ts";
import type { StartUserRegistrationUseCase } from "../../../../application/use-cases/StartUserRegistrationUseCase.ts";
import type { CompleteUserRegistrationUseCase } from "../../../../application/use-cases/CompleteRegistrationUseCase.ts";
import { EmptyFirstNameException } from "../../../../application/exceptions/EmptyFirstNameException.ts";
import type { PersistImageUseCase } from "../../../../application/use-cases/PersistImageUseCase.ts";
import type { PersistNumberUseCase } from "../../../../application/use-cases/PersistNumberUseCase.ts";
import type { GetNumbersUseCase } from "../../../../application/use-cases/GetNumbersUseCase.ts";
import type { TelegramGetNumbersPresenter } from "../presenters/TelegramGetNumbersPresenter.ts";
import type { TelegramRegistrationPresenter } from "../presenters/TelegramRegistrationPresenter.ts";
import { ValueNotNumberException } from "../../../../application/exceptions/ValueNotNumberException.ts";
import { ValueOutOfRangeException } from "../../../../application/exceptions/ValueOutOfRangeException.ts";
import { TelegramUploadImagePresenter } from "../presenters/TelegramUploadImagePresenter.ts";
import { GetResultUseCase } from "../../../../application/use-cases/GetResultUseCase.ts";
import { TelegramDocumentToFileMapper } from "../mappers/TelegramDocumentToFileMapper.ts";
import { NoFileAttachedException } from "../../../../application/exceptions/NoFileAttachedException.ts";
import { FileSizeOverflowException } from "../../../../application/exceptions/FileSizeOverflowException.ts";
import type { FileFlavor } from "@grammyjs/files";
import { FileNotImageException } from "../../../../application/exceptions/FileNotImageException.ts";

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
    private readonly bot: Bot<FileFlavor<TelegramContext>>,

    private readonly findUserByExternalIdentity: FindUserByExternalIdentityUseCase,
    private readonly findExternalUserStep: FindExternalUserStepUseCase,
    private readonly startUserRegistration: StartUserRegistrationUseCase,
    private readonly completeRegistration: CompleteUserRegistrationUseCase,
    private readonly persistImage: PersistImageUseCase,
    private readonly persistNumber: PersistNumberUseCase,
    private readonly getNumbers: GetNumbersUseCase,
    private readonly getResult: GetResultUseCase,

    private readonly getNumbersPresenter: TelegramGetNumbersPresenter,
    private readonly telegramRegistrationPresenter: TelegramRegistrationPresenter,
    private readonly telegramUploadImagePresenter: TelegramUploadImagePresenter,

    private readonly telegramDocumentToFile: TelegramDocumentToFileMapper
  ) {
    this.bot.use(async (ctx, next) => {
      if (!ctx.from) return next();

      ctx.state ??= {};

      const externalId = String(ctx.from.id);

      const [user, step] = await Promise.all([
        this.findUserByExternalIdentity.execute({
          externalId,
          source: this.source,
        }),
        this.findExternalUserStep.execute({
          externalId,
          source: this.source,
        }),
      ]);

      ctx.state.user = user ?? undefined;
      ctx.state.step = step ?? undefined;

      await next();
    });

    this.bot.on("message", async (ctx) => {
      const externalId = ctx.from.id.toString();
      const user = ctx.state.user;
      const step = ctx.state.step;

      let nextStep: UserStep | undefined;

      if (user) {
        switch (step) {
          case "upload_image": {
            try {
              const file = ctx.msg.document;
              const downloadableFile = this.telegramDocumentToFile.map(file);

              nextStep = await this.persistImage.execute(
                {
                  externalId: externalId,
                  source: this.source,
                  userId: user.id,
                },
                downloadableFile
              );
              break;
            } catch (err) {
              if (err instanceof NoFileAttachedException) {
                return ctx.reply(err.message);
              }
              if (err instanceof FileSizeOverflowException) {
                return ctx.reply(err.message);
              }
              if (err instanceof FileNotImageException) {
                return ctx.reply(err.message);
              }

              throw err;
            }
          }
          case "choose_number": {
            try {
              nextStep = this.persistNumber.execute(
                externalId,
                this.source,
                ctx.msg.text
              );
              break;
            } catch (err) {
              if (err instanceof ValueNotNumberException) {
                return ctx.reply(err.message);
              }
              if (err instanceof ValueOutOfRangeException) {
                return ctx.reply(err.message);
              }

              throw err;
            }
          }
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

              throw err;
            }
            break;
          }
          default:
            nextStep = this.startUserRegistration.execute(
              ctx.from.id.toString(),
              this.source
            );
        }
      }

      switch (nextStep) {
        case "registration_fill_in_name": {
          const viewModel = this.telegramRegistrationPresenter.present();
          return ctx.reply(viewModel.text);
        }
        case "choose_number": {
          const numbers = this.getNumbers.execute();
          const viewModel = this.getNumbersPresenter.present(numbers);
          return ctx.reply(viewModel.text, {
            reply_markup: viewModel.replyMarkup,
          });
        }
        case "upload_image": {
          const viewModel = this.telegramUploadImagePresenter.present();
          return ctx.reply(viewModel.text);
        }
        case "result": {
          // const result = this.getResult.execute();
        }
      }
    });
  }
}
