import { Router } from 'express';
import AuthenticateUserService from '../services/sessions/AuthenticateUserService';

const routes = Router();

routes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const service = new AuthenticateUserService();

    const { user, token } = await service.execute({ email, password });

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default routes;
