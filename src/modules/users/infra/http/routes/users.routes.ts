import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import ensureAuthentication from '../middlewares/ensureAuthentication';

import config from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserService from '@modules/users/services/CreateUserService';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

const routes = Router();
const upload = multer(config);

const userRepository = new UserRepository();

routes.get('/', async (request, response) => {
  const repository = getRepository(User);
  // não mostre a senha dos usuários na consulta de todos cadastrados
  const users = await repository.find({
    select: ['id', 'name', 'email', 'avatar', 'createdAt', 'updatedAt'],
  });

  return response.json(users);
});

routes.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const service = new CreateUserService(userRepository);
  const user = await service.execute({ name, email, password });

  // não mostrar a senha no corpo da requisição
  delete user.password;

  return response.json(user);
});

routes.patch(
  '/',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    const { filename } = request.file;

    const updateAvatarService = new UpdateUserAvatarService(userRepository);
    const updatedUser = await updateAvatarService.execute({
      userId: request.user.id,
      avatarFilename: filename,
    });

    delete updatedUser.password;
    return response.json(updatedUser);
  },
);

export default routes;
