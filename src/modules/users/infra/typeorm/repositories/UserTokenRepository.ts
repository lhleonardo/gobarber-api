import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '../entities/UserToken';
import { Repository, getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async generate(userId: string): Promise<UserToken> {
    throw new AppError('Falta implementar');
  }
}
