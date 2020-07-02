import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/users/CreateUserService';
import User from '../models/User';

const routes = Router();

routes.get('/', async (request, response) => {
  try {
    const repository = getRepository(User);
    // não mostre a senha dos usuários na consulta de todos cadastrados
    const users = await repository.find({
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
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

export default routes;
