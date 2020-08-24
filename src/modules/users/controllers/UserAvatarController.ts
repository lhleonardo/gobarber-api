import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;

    const updateAvatarService = container.resolve(UpdateUserAvatarService);
    const updatedUser = await updateAvatarService.execute({
      userId: request.user.id,
      avatarFilename: filename,
    });

    delete updatedUser.password;
    return response.json(updatedUser);
  }
}
