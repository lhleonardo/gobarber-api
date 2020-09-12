import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderServices from '../services/ListProvidersService';

class ProvidersController {
  async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const service = container.resolve(ListProviderServices);

    const providers = await service.execute({ excludeUserId: userId });

    return response.status(200).json(providers);
  }
}

export default ProvidersController;
