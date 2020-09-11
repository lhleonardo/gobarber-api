import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authUser: AuthenticateUserService;

describe('AuthenticationUser', () => {
  beforeEach(() => {
    fakeRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authUser = new AuthenticateUserService(fakeRepository, fakeHashProvider);
  });

  it('Deve autenticar um usuário', async () => {
    const createUser = new CreateUserService(fakeRepository, fakeHashProvider);

    await createUser.execute({
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    const user = await authUser.execute({
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('token');
  });

  it('Não deve se autenticar com usuário não cadastrado', async () => {
    await expect(
      authUser.execute({ email: 'lhleonardo@hotmail.com', password: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Não deve se autenticar com credenciais inválidas', async () => {
    const createUser = new CreateUserService(fakeRepository, fakeHashProvider);

    await createUser.execute({
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    await expect(
      authUser.execute({
        email: 'lhleonardo@hotmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
