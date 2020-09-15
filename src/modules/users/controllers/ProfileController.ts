import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

import { classToClass } from 'class-transformer';

export default class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body;

    const service = container.resolve(ShowUserService);

    const user = await service.execute(userId);

    return response.status(200).json(classToClass(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, password, oldPassword } = request.body;

    const service = container.resolve(UpdateUserService);

    const result = await service.execute(userId, {
      name,
      email,
      password,
      oldPassword,
    });

    return response.status(200).json(classToClass(result));
  }
}
