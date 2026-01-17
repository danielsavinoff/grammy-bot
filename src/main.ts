import { Bot } from "grammy";
import {
  TelegramRoutes,
  type TelegramContext,
} from "./infra/in/telegram/routes/TelegramRoutes.ts";
import { LocalUserRepository } from "./infra/out/persistence/repositories/LocalUserRepository.ts";
import { LocalUserStepRepository } from "./infra/out/persistence/repositories/LocalUserStepRepository.ts";
import { LocalFileStorageRepository } from "./infra/out/persistence/repositories/LocalFileStorageRepository.ts";
import { FindUserByExternalIdentityUseCase } from "./application/use-cases/FindUserUseCase.ts";
import { FindExternalUserStepUseCase } from "./application/use-cases/FindUserStepUseCase.ts";
import { StartUserRegistrationUseCase } from "./application/use-cases/StartUserRegistrationUseCase.ts";
import { CompleteUserRegistrationUseCase } from "./application/use-cases/CompleteRegistrationUseCase.ts";
import { PersistImageUseCase } from "./application/use-cases/PersistImageUseCase.ts";
import { PersistNumberUseCase } from "./application/use-cases/PersistNumberUseCase.ts";
import { GetNumbersUseCase } from "./application/use-cases/GetNumbersUseCase.ts";
import { ProcessImageUseCase } from "./application/use-cases/ProcessImageUseCase.ts";
import { TelegramGetNumbersPresenter } from "./infra/in/telegram/presenters/TelegramGetNumbersPresenter.ts";
import { TelegramRegistrationPresenter } from "./infra/in/telegram/presenters/TelegramRegistrationPresenter.ts";
import { TelegramUploadImagePresenter } from "./infra/in/telegram/presenters/TelegramUploadImagePresenter.ts";
import { GetResultUseCase } from "./application/use-cases/GetResultUseCase.ts";
import { TelegramDocumentToFileMapper } from "./infra/in/telegram/mappers/TelegramDocumentToFileMapper.ts";
import { TelegramFileRepository } from "./infra/in/telegram/repositories/TelegramFileRepository.ts";
import { type FileFlavor } from "@grammyjs/files";
import { LocalFileInfoRepository } from "./infra/out/persistence/repositories/LocalFileInfoRepository.ts";
import { ImageTransformClient } from "./infra/out/image/client/ImageTransformClient.ts";

const token = process.env.BOT_AUTHENTICATION_TOKEN;

if (!token) {
  throw new Error("BOT_AUTHENTICATION_TOKEN is required");
}

const bot = new Bot<FileFlavor<TelegramContext>>(token);

const userRepository = new LocalUserRepository();
const userStepRepository = new LocalUserStepRepository();
const telegramFileRepository = new TelegramFileRepository(bot);
const localFileStorageRepository = new LocalFileStorageRepository();
const localFileInfoRepository = new LocalFileInfoRepository();
const imageTransformClient = new ImageTransformClient();

const findUserByExternalIdentity = new FindUserByExternalIdentityUseCase(
  userRepository
);
const findExternalUserStep = new FindExternalUserStepUseCase(
  userStepRepository
);
const startUserRegistration = new StartUserRegistrationUseCase(
  userStepRepository
);
const completeRegistration = new CompleteUserRegistrationUseCase(
  userRepository,
  userStepRepository
);
const persistNumber = new PersistNumberUseCase(userStepRepository);
const getNumbers = new GetNumbersUseCase();
const getResult = new GetResultUseCase();
const processImage = new ProcessImageUseCase(
  userStepRepository,
  getResult,
  localFileStorageRepository,
  imageTransformClient,
  localFileInfoRepository
);
const persistImage = new PersistImageUseCase(
  userStepRepository,
  telegramFileRepository,
  localFileStorageRepository,
  localFileInfoRepository,
  processImage
);

const telegramGetNumbersPresenter = new TelegramGetNumbersPresenter();
const telegramRegistrationPresenter = new TelegramRegistrationPresenter();
const telegramUploadImagePresenter = new TelegramUploadImagePresenter();

const telegramDocumentToFileMapper = new TelegramDocumentToFileMapper();

new TelegramRoutes(
  bot,
  findUserByExternalIdentity,
  findExternalUserStep,
  startUserRegistration,
  completeRegistration,
  persistImage,
  persistNumber,
  getNumbers,
  getResult,
  telegramGetNumbersPresenter,
  telegramRegistrationPresenter,
  telegramUploadImagePresenter,
  telegramDocumentToFileMapper
);
// new TelegramMessageSender(bot);

bot.start();
