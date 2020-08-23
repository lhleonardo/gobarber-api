import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';

import config from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  userId: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 403);
    }

    // precisa apagar avatar antigo
    if (user.avatar) {
      // caminho até a imagem
      const oldAvatarPath = path.join(config.directory, user.avatar);

      // obtem status de arquivo, para verificar sua existencia
      const avatarExists = await fs.promises.stat(oldAvatarPath);

      if (avatarExists) {
        await fs.promises.unlink(oldAvatarPath);
      }
    }

    user.avatar = avatarFilename;

    await this.userRepository.save(user);

    return user;
  }
}
