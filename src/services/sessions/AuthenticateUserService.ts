import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import config from '../../config';
import User from '../../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const validUser = await userRepository.findOne({ where: { email } });

    if (!validUser) {
      throw new Error('Bad credentials.');
    }

    const validPassword = await compare(password, validUser.password);

    if (!validPassword) {
      throw new Error('Bad credentials.');
    }

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
