import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../../models/User';

import config from '../../config/upload';

interface Request {
  userId: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new Error('Only authenticated users can change avatar');
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

    await userRepository.save(user);

    return user;
  }
}
