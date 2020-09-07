import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('Create User', () => {
  it('Deve criar um novo usuário', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const service = new CreateUserService(fakeRepository, fakeHashProvider);

    const createdUser = await service.execute({
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    expect(createdUser).toHaveProperty('id');
  });

  it('Não deve permitir e-mail duplicado', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const service = new CreateUserService(fakeRepository, fakeHashProvider);

    const user: ICreateUserDTO = {
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    };

    await service.execute(user);

    expect(service.execute(user)).rejects.toBeInstanceOf(AppError);
  });
});
