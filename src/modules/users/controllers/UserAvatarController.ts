import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { filename } = request.file;

    const updateAvatarService = container.resolve(UpdateUserAvatarService);

    const updatedUser = await updateAvatarService.execute({
      userId,
      avatarFilename: filename,
    });

    return response.json(classToClass(updatedUser));
  }
}
