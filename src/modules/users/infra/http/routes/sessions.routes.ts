import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserRepository from '../../typeorm/repositories/UserRepository';

const routes = Router();

const userRepository = new UserRepository();

routes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const service = new AuthenticateUserService(userRepository);

  const { user, token } = await service.execute({ email, password });

  return response.json({ user, token });
});

export default routes;
