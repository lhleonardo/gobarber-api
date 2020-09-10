import { inject } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  constructor(
    @inject('MailProvider')
    private mailService: IMailProvider,
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}
  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`O e-mail ${email} não está cadastrado na aplicação`);
    }

    const token = await this.userTokenRepository.generate(user.id);

    await this.mailService.sendMail(
      email,
      `Enviando recuperação de senha para ${user?.name} com o token ${token.token}`,
    );
  }
}
