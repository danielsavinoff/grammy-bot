import { ResultNotFoundException } from "../exceptions/ResultNotFoundException.ts";
import { UserNotFoundException } from "../exceptions/UserNotFoundException.ts";
import type { FileInfoRepositoryPort } from "../ports/FileInfoRepositoryPort.ts";
import type { FileStorageRepositoryPort } from "../ports/FileStorageRepositoryPort.ts";
import type { UserNumberRepositoryPort } from "../ports/UserNumberRepositoryPort.ts";
import type { UserRepositoryPort } from "../ports/UserRepositoryPort.ts";

export class GetResultUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly fileInfoRepository: FileInfoRepositoryPort,
    private readonly fileStorageRepository: FileStorageRepositoryPort,
    private readonly userNumberRepository: UserNumberRepositoryPort
  ) {}

  async execute(userId?: string) {
    if (!userId) {
      throw new UserNotFoundException();
    }

    const fileInfo = this.fileInfoRepository.findOne({
      userId: userId,
      original: false,
    });

    if (!fileInfo) {
      throw new ResultNotFoundException();
    }

    const file = await this.fileStorageRepository.load(fileInfo.path);
    const user = this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    const number = this.userNumberRepository.findByUserId(userId);

    return {
      file,
      text: `${user.firstName}, ${number}`,
    };
  }
}
