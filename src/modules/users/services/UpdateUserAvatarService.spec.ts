import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

describe('Update Avatar', () => {
  it('Deve atualizar a foto de perfil', async () => {
    const fakeStorage = new FakeStorageProvider();
    const fakeRepository = new FakeUsersRepository();
    const service = new UpdateUserAvatarService(fakeRepository, fakeStorage);

    const user = await fakeRepository.create({
      email: 'lhleonardo@hotmail.com',
      name: 'Leonardo Braz',
      password: '123456',
    });

    const response = await service.execute({
      userId: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(response.avatar).toBe('avatar.png');
  });

  it('Não deve atualizar avatar de usuário inválido', async () => {
    const fakeStorage = new FakeStorageProvider();
    const fakeRepository = new FakeUsersRepository();
    const service = new UpdateUserAvatarService(fakeRepository, fakeStorage);

    expect(
      service.execute({
        userId: 'invalid_user_id',
        avatarFilename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve trocar a foto de perfil do usuário e apagar a antiga', async () => {
    const userRepository = new FakeUsersRepository();
    const storage = new FakeStorageProvider();
    const updateService = new UpdateUserAvatarService(userRepository, storage);

    const mockedMethod = jest.spyOn(storage, 'deleteFile');

    const user = await userRepository.create({
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    await updateService.execute({
      userId: user.id,
      avatarFilename: 'avatar.png',
    });

    await updateService.execute({
      userId: user.id,
      avatarFilename: 'avatar_2.png',
    });

    expect(mockedMethod).toBeCalledWith('avatar.png');
  });
});
