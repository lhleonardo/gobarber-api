import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '../services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const service = container.resolve(CreateUserService);
    const user = await service.execute({ name, email, password });

    return response.json(classToClass(user));
  }
}
