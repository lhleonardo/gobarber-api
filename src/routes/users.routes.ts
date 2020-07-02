import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import CreateUserService from '../services/users/CreateUserService';
import User from '../models/User';

import ensureAuthentication from '../middlewares/ensureAuthentication';

import config from '../config/upload';
import UpdateUserAvatarService from '../services/users/UpdateUserAvatarService';

const routes = Router();
const upload = multer(config);

routes.get('/', async (request, response) => {
  try {
    const repository = getRepository(User);
    // não mostre a senha dos usuários na consulta de todos cadastrados
    const users = await repository.find({
      select: ['id', 'name', 'email', 'avatar', 'createdAt', 'updatedAt'],
    });

    return response.json(users);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

routes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const service = new CreateUserService();
    const user = await service.execute({ name, email, password });

    // não mostrar a senha no corpo da requisição
    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

routes.patch(
  '/',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const { filename } = request.file;

      const updateAvatarService = new UpdateUserAvatarService();
      const updatedUser = await updateAvatarService.execute({
        userId: request.user.id,
        avatarFilename: filename,
      });

      delete updatedUser.password;
      return response.json(updatedUser);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default routes;
