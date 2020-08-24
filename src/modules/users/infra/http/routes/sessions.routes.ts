import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserRepository from '../../typeorm/repositories/UserRepository';
import { container } from 'tsyringe';

const routes = Router();

routes.post('/', async (request, response) => {
  const userRepository = new UserRepository();
  const { email, password } = request.body;

  const service = container.resolve(AuthenticateUserService);

  const { user, token } = await service.execute({ email, password });

  return response.json({ user, token });
});

export default routes;
