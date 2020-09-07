import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('AuthenticationUser', () => {
  it('Deve autenticar um usuário', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeRepository, fakeHashProvider);
    const authUser = new AuthenticateUserService(
      fakeRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    const responseAuth = await authUser.execute({
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    expect(responseAuth).toHaveProperty('token');
  });

  it('Não deve se autenticar com usuário não cadastrado', () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authUser = new AuthenticateUserService(
      fakeRepository,
      fakeHashProvider,
    );

    expect(
      authUser.execute({ email: 'lhleonardo@hotmail.com', password: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Não deve se autenticar com credenciais inválidas', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeRepository, fakeHashProvider);
    const authUser = new AuthenticateUserService(
      fakeRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    expect(
      authUser.execute({
        email: 'lhleonardo@hotmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
