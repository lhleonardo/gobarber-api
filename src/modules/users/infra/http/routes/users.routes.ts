import { Router } from 'express';
import multer from 'multer';

import ensureAuthentication from '../middlewares/ensureAuthentication';

import config from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import CreateUserService from '@modules/users/services/CreateUserService';

import { container } from 'tsyringe';

const routes = Router();
const upload = multer(config);

// routes.get('/', async (request, response) => {
//   const userRepository = new UserRepository();
//   // não mostre a senha dos usuários na consulta de todos cadastrados
//   const users = await repository.find({
//     select: ['id', 'name', 'email', 'avatar', 'createdAt', 'updatedAt'],
//   });

//   return response.json(users);
// });

routes.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const service = container.resolve(CreateUserService);
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

    const updateAvatarService = container.resolve(UpdateUserAvatarService);
    const updatedUser = await updateAvatarService.execute({
      userId: request.user.id,
      avatarFilename: filename,
    });

    delete updatedUser.password;
    return response.json(updatedUser);
  },
);

export default routes;
