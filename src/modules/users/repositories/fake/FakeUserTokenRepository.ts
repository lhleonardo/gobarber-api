import IUserTokenRepository from '../IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import { v4 as uuid } from 'uuid';

class FakeUserTokenRepository implements IUserTokenRepository {
  private tokens: UserToken[] = [];

  async generate(userId: string): Promise<UserToken> {
    const user = new UserToken();

    Object.assign(user, {
      userId,
      id: uuid(),
      token: uuid(),
    });

    this.tokens.push(user);

    return user;
  }
}

export default FakeUserTokenRepository;
