import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

describe('Forgot Password', () => {
  it('Deve permitir recuperar a senha a partir do e-mail', async () => {
    const mailProvider = new FakeMailProvider();
    const userRepository = new FakeUsersRepository();

    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    const service = new SendForgotPasswordEmailService(
      mailProvider,
      userRepository,
    );

    await userRepository.create({
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    await service.execute({ email: 'lhleonardo@hotmail.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Não deve permitir recuperar senha de usuário não cadastrado', async () => {
    const userRepository = new FakeUsersRepository();
    const mailProvider = new FakeMailProvider();

    const sendMail = new SendForgotPasswordEmailService(
      mailProvider,
      userRepository,
    );

    expect(
      sendMail.execute({ email: 'lhleonardo@hotmail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
