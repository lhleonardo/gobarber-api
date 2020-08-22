import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const routes = Router();

routes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const service = new AuthenticateUserService();

  const { user, token } = await service.execute({ email, password });

  return response.json({ user, token });
});

export default routes;
