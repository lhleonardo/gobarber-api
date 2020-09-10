import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

let userRepository: FakeUsersRepository;
let mailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('Forgot Password', () => {
  beforeEach(() => {
    userRepository = new FakeUsersRepository();
    mailProvider = new FakeMailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      mailProvider,
      userRepository,
    );
  });

  it('Deve permitir recuperar a senha a partir do e-mail', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');
    await userRepository.create({
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({ email: 'lhleonardo@hotmail.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Não deve permitir recuperar senha de usuário não cadastrado', async () => {
    expect(
      sendForgotPasswordEmail.execute({ email: 'lhleonardo@hotmail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
