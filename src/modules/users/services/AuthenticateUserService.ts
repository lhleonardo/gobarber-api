import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import config from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const validUser = await this.userRepository.findByEmail(email);

    if (!validUser) {
      throw new AppError('Bad credentials.', 401);
    }

    const validPassword = await compare(password, validUser.password);

    if (!validPassword) {
      throw new AppError('Bad credentials.', 401);
    }

    delete validUser.password;

    const token = sign({}, config.jwt.secret, {
      subject: validUser.id,
      expiresIn: config.jwt.expiresIn,
    });
    return {
      user: validUser,
      token,
    };
  }
}
